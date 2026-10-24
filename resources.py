"""Bounded public API calls and a credential/content-free submission journal."""
import hashlib
import json
import os
from pathlib import Path
import time
import uuid

import httpx

from login import origin

TERMINAL = {"succeeded", "failed", "halted_by_agent", "cancelled", "outcome_unknown",
            "halted_emergency", "context_limit_exceeded"}
PAUSED = {"halted_pending_approval", "suspended_oscillation"}
CANCELLATION_FINISHED = TERMINAL | {"suspended_oscillation"}


class PilotError(RuntimeError):
    pass


def canonical(value):
    return json.dumps(value, sort_keys=True, separators=(",", ":"), ensure_ascii=False,
                      allow_nan=False)


def digest(value):
    return hashlib.sha256(canonical(value).encode()).hexdigest()


class Journal:
    def __init__(self, directory, *, api_base, issuer, user_id, model):
        self.root = Path(directory)
        self.binding = {"api_base": origin(api_base), "issuer": origin(issuer),
                        "user_id": user_id, "model": model}
        self.path = self.root / "journal.json"

    def __enter__(self):
        self.root.mkdir(parents=True, exist_ok=True)
        self.lock = (self.root / "pilot.lock").open("a+b")
        try:
            if self.lock.tell() == 0:
                self.lock.write(b"0")
                self.lock.flush()
            self.lock.seek(0)
            if os.name == "nt":
                import msvcrt
                msvcrt.locking(self.lock.fileno(), msvcrt.LK_NBLCK, 1)
            else:
                import fcntl
                fcntl.flock(self.lock, fcntl.LOCK_EX | fcntl.LOCK_NB)
            if self.path.exists():
                if self.path.stat().st_size > 65536:
                    raise PilotError("Journal exceeds its size limit.")
                self.data = json.loads(self.path.read_text(encoding="utf-8"))
                if self.data.get("binding") != self.binding or self.data.get("version") != 1:
                    raise PilotError("Journal account, deployment, model or version differs.")
            else:
                self.data = {"version": 1, "binding": self.binding,
                             "pilot_id": uuid.uuid4().hex, "stages": {}}
                self.save()
            return self
        except BaseException:
            self.lock.close()
            raise

    def save(self):
        temp = self.path.with_suffix(".tmp")
        with temp.open("w", encoding="utf-8") as stream:
            json.dump(self.data, stream, indent=2)
            stream.flush()
            os.fsync(stream.fileno())
        os.replace(temp, self.path)

    def __exit__(self, *_):
        self.lock.close()


class PublicAPI:
    def __init__(self, base, session, *, transport=None, allow_provider_charges=False, max_usd_per_run=0):
        import math
        if not math.isfinite(max_usd_per_run) or max_usd_per_run < 0 or (allow_provider_charges and max_usd_per_run <= 0) or (not allow_provider_charges and max_usd_per_run > 0):
            raise PilotError("Provider charges require explicit consent and a positive finite per-run admission budget")
        self.allow_provider_charges = allow_provider_charges
        self.max_usd_per_run = max_usd_per_run
        self.session = session
        self.http = httpx.Client(base_url=origin(base), timeout=15, trust_env=False,
                                 follow_redirects=False, transport=transport)

    def call(self, method, path, *, timeout=15, **kwargs):
        request_headers = kwargs.pop("headers", {})
        for attempt in range(2):
            with self.http.stream(method, path, timeout=max(0.1, min(timeout, 15)),
                                  headers={"Authorization": "Bearer " + self.session.bearer(),
                                           **request_headers}, **kwargs) as response:
                if response.status_code == 401 and attempt == 0:
                    self.session.refresh()
                    continue
                if not 200 <= response.status_code < 300:
                    raise PilotError(f"Public API {method} {path} failed (HTTP {response.status_code}).")
                chunks, size = [], 0
                for chunk in response.iter_bytes():
                    size += len(chunk)
                    if size > 1048576:
                        raise PilotError("Public API response exceeded the size limit.")
                    chunks.append(chunk)
                try:
                    return json.loads(b"".join(chunks))
                except (ValueError, UnicodeError, RecursionError):
                    raise PilotError("Public API returned malformed JSON.") from None
        raise PilotError("Public API authentication failed.")

    def capabilities(self, model=None):
        cap = self.call("GET", "/v1/capabilities")
        if cap.get("capabilities", {}).get("run_execution", {}).get("status") != "available":
            raise PilotError("Backend model execution is unavailable; no work submitted.")
        models = cap.get("models", {}).get("models", [])
        selected = model or (models[0] if len(models) == 1 else None)
        if not selected or selected not in models:
            raise PilotError("Select --model from the deployment's capabilities allowlist.")
        retention = cap.get("limits", {}).get("run_idempotency_retention_seconds")
        if type(retention) is not int or retention < 60:
            raise PilotError("Deployment supplies no usable run idempotency retention guarantee.")
        return selected, retention

    def run(self, journal, stage_name, workflow, *, retention, deadline_s=180, poll_s=0.5):
        workflow = {**workflow, "budget": {**workflow.get("budget", {}), "max_usd": self.max_usd_per_run}}
        stages = journal.data["stages"]
        expected_hash = digest(workflow)
        stage = stages.get(stage_name)
        if stage is None:
            stage = {"workflow_hash": expected_hash, "workspace_id": workflow["workspace_id"],
                     "idempotency_key": journal.data["pilot_id"] + ":" + stage_name,
                     "state": "planned"}
            stages[stage_name] = stage
            journal.save()
        if stage["workflow_hash"] != expected_hash:
            raise PilotError("Stage inputs changed; use a new state directory for a new experiment.")
        if "workflow_id" not in stage:
            if stage["state"] != "planned":
                raise PilotError("Workflow creation outcome is uncertain. Never replay it; use a new "
                                 "state directory after reviewing this journal. No run was submitted.")
            validation = self.call("POST", "/v1/workflows/validate", json={"workflow": workflow})
            if not validation.get("valid") or any(validation.get(layer, {}).get("status") != "ok"
                for layer in ("structural", "supported", "authorized", "executable")):
                raise PilotError("Workflow validation did not pass every layer.")
            stage["state"] = "workflow_create_uncertain"
            journal.save()
            response = self.call("POST", "/v1/workflows", json={"workflow": workflow})
            stage["workflow_id"] = response["workflow_id"]
            stage["state"] = "workflow_created"
            journal.save()
        if "run_id" not in stage:
            if "first_submitted_at" not in stage:
                stage["first_submitted_at"] = time.time()
                stage["replay_until"] = stage["first_submitted_at"] + retention - 5
            if time.time() >= stage["replay_until"]:
                raise PilotError("Run receipt is uncertain and its safe replay window expired. "
                                 "Reconcile the saved workspace/run history; no new run submitted.")
            stage["state"] = "run_create_uncertain"
            journal.save()
            run = self.call("POST", "/v1/runs", json={"workflow_id": stage["workflow_id"], "paid_inference_consent": self.allow_provider_charges},
                            headers={"Idempotency-Key": stage["idempotency_key"]})
            stage["run_id"], stage["state"] = run["run_id"], run["status"]
            journal.save()
        end = time.monotonic() + deadline_s
        while time.monotonic() < end:
            run = self.call("GET", f"/v1/runs/{stage['run_id']}", timeout=end-time.monotonic())
            if run.get("workflow_id") != stage["workflow_id"] or run.get("workspace_id") != stage["workspace_id"]:
                raise PilotError("Run receipt does not match this journal's workflow/workspace.")
            stage["state"] = run["status"]
            journal.save()
            if run["status"] not in TERMINAL | PAUSED | {"queued", "running"}:
                raise PilotError("Backend returned an unknown run state; no replacement submitted.")
            if run["status"] in TERMINAL | PAUSED:
                break
            time.sleep(min(poll_s, max(0, end-time.monotonic())))
        else:
            raise PilotError("Local polling deadline reached; run cancellation will be attempted.")
        if run["status"] != "succeeded":
            raise PilotError(f"Stage {stage_name} stopped with {run['status']}; no replacement submitted.")
        outputs = self.call("GET", f"/v1/runs/{stage['run_id']}/outputs").get("outputs", [])
        if len(outputs) != 1 or outputs[0].get("truncated") or outputs[0].get("kind") != "text":
            raise PilotError("Expected exactly one complete text output.")
        text = outputs[0].get("content")
        if not isinstance(text, str) or len(text) > 4096:
            raise PilotError("Model output is missing or exceeds the 4096-character bound.")
        return text, {"role": stage_name, "workflow_id": stage["workflow_id"],
                      "run_id": stage["run_id"], "status": run["status"],
                      "completion_basis": run.get("completion_basis"),
                      "model_output_sha256": hashlib.sha256(text.encode()).hexdigest()}

    def cancel_owned(self, journal, *, deadline_s=10):
        """Cancel only this journal's runs; never submit work to discover a receipt."""
        end, unresolved = time.monotonic() + deadline_s, []
        for stage in journal.data["stages"].values():
            if time.monotonic() >= end:
                unresolved.append("cancellation deadline")
                break
            if "run_id" not in stage:
                if stage.get("state") == "run_create_uncertain":
                    page = self.call("GET", "/v1/runs", timeout=end-time.monotonic(),
                                     params={"workspace_id": stage["workspace_id"], "limit": 100})
                    found = [r for r in page.get("runs", []) if r["workflow_id"] == stage["workflow_id"]]
                    if len(found) == 1 and not page.get("next_cursor"):
                        stage["run_id"] = found[0]["run_id"]
                        journal.save()
                    else:
                        unresolved.append("uncertain run submission")
                if "run_id" not in stage:
                    continue
            path = f"/v1/runs/{stage['run_id']}"
            run = self.call("GET", path, timeout=max(0.1, end-time.monotonic()))
            if run.get("workflow_id") != stage["workflow_id"] or run.get("workspace_id") != stage["workspace_id"]:
                raise PilotError("Refusing to cancel a run outside this journal's binding.")
            if run["status"] not in CANCELLATION_FINISHED:
                run = self.call("POST", path + "/cancel", timeout=max(0.1, end-time.monotonic()))["run"]
                while run["status"] not in CANCELLATION_FINISHED and time.monotonic() < end:
                    time.sleep(0.1)
                    run = self.call("GET", path, timeout=max(0.1, end-time.monotonic()))
            stage["state"] = run["status"]
            journal.save()
            if run["status"] not in CANCELLATION_FINISHED:
                unresolved.append(stage["run_id"])
        if unresolved:
            raise PilotError("Cancellation remains unconfirmed; journal retained for --cancel-only.")

    def close(self):
        self.http.close()
