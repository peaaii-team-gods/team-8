"""Owned temporary AGS resources, cleanup recovery, and inventory verification.

The journal contains IDs and before/after inventory metadata, never credentials.
DELETE /agents archives; it does not erase retained run/billing history.
"""

import hashlib
import json
import os
import sys
import uuid
from pathlib import Path


# Keep all HTTP error handling in one small wrapper so cleanup paths fail loudly
# instead of accidentally treating an unsuccessful response as an empty result.
def api(client, method, path, **kwargs):
    response = client.request(method, path, **kwargs)
    response.raise_for_status()
    return None if response.status_code == 204 else response.json()


def inventory(client):
    # Walk every monitor page so cleanup compares complete inventories, not just
    # the first page returned by the service.
    agents = {}
    cursor = None
    seen = set()
    while True:
        page = api(
            client, "GET", "/v1/public/monitors", params={"cursor": cursor} if cursor else {}
        )
        agents.update((item["agent_id"], item) for item in page["items"])
        cursor = page.get("next_cursor")
        if not cursor:
            break
        if cursor in seen:
            raise RuntimeError("Repeated inventory cursor; cannot verify cleanup.")
        seen.add(cursor)
    keys = {item["key_id"]: item for item in api(client, "GET", "/v1/keys")}
    # Return keyed maps so callers can compare, identify, and protect resources.
    return agents, keys


class TemporaryRun:
    def __init__(self, client, user_id):
        # Derive a stable per-account journal/lock name without storing secrets.
        self.client, self.user_id = client, user_id
        bound = str(client.base_url) + "\n" + user_id
        name = hashlib.sha256(bound.encode()).hexdigest()[:24]
        root = Path(
            os.getenv("AGS_DEMO_STATE_DIR")
            or (
                str(Path(os.environ["LOCALAPPDATA"]) / "RHM" / "ags-demo")
                if os.name == "nt"
                else str(Path.home() / ".local" / "state" / "rhm-ags-demo")
            )
        )
        root.mkdir(parents=True, exist_ok=True)
        self.path = root / f"{name}.json"
        self.lock_path = root / f"{name}.lock"
        self.state = None

    def __enter__(self):
        # Acquire an inter-process lock before reading or changing recovery state.
        # Kernel locks release even if the process dies. Keep the lock file so
        # another process never locks a replacement inode during cleanup.
        self.lock = self.lock_path.open("a+b")
        try:
            if self.lock.tell() == 0:
                self.lock.write(b"\0")
                self.lock.flush()
            self.lock.seek(0)
            if os.name == "nt":
                import msvcrt

                msvcrt.locking(self.lock.fileno(), msvcrt.LK_NBLCK, 1)
            else:
                import fcntl

                fcntl.flock(self.lock, fcntl.LOCK_EX | fcntl.LOCK_NB)
            self.path.with_suffix(".tmp").unlink(missing_ok=True)
            if self.path.exists():
                # A leftover journal means an earlier process may have lost a
                # response; finish that cleanup before starting another run.
                print("Recovering cleanup from the previous interrupted run...", flush=True)
                self.state = json.loads(self.path.read_text(encoding="utf-8"))
                if self.state["user_id"] != self.user_id:
                    raise RuntimeError("Cleanup journal belongs to another account.")
                self.cleanup()
            return self
        except BaseException:
            self.lock.close()
            raise

    def save(self):
        # Write atomically with restrictive permissions so a crash cannot leave a
        # half-written journal and the journal never contains provider secrets.
        temp = self.path.with_suffix(".tmp")
        descriptor = os.open(temp, os.O_WRONLY | os.O_CREAT | os.O_TRUNC, 0o600)
        with os.fdopen(descriptor, "w", encoding="utf-8") as stream:
            json.dump(self.state, stream)
            stream.flush()
            os.fsync(stream.fileno())
        os.replace(temp, self.path)

    def start(self, provider_secret):
        # Snapshot existing resources before registering anything owned by this run.
        agents, keys = inventory(self.client)
        self.state = {
            "user_id": self.user_id,
            "tag": "ags-demo-" + uuid.uuid4().hex,
            "before_agents": sorted(agents),
            "before_keys": sorted(keys),
            "agents": [],
            "key_id": None,
        }
        self.save()  # Save the unique label BEFORE making any server mutation.
        # Register the provider secret by a temporary label; only its returned ID
        # is persisted in the journal.
        key = api(
            self.client,
            "POST",
            "/v1/keys",
            json={
                "provider": "openrouter",
                "label": self.state["tag"],
                "secret": provider_secret,
            },
        )
        self.state["key_id"] = key["key_id"]
        self.save()

    def create_agent(self, name):
        # Create an owner-scoped hosted agent with bounded execution allowances.
        agent = api(
            self.client,
            "POST",
            "/v1/user-agents",
            json={
                "display_name": self.state["tag"] + " " + name,
                "objective": f"You are {name}. Collaborate through supplied peer messages. Finish with summary and result.",
                "model": {"mode": "tier", "tier": "free", "llm_key_ref": self.state["key_id"]},
                "run_policy": {
                    "mode": "task",
                    "caps_scope": "message",
                    "budget_usd": 0.10,
                    "max_ticks": 4,
                    "max_model_requests_per_tick": 4,
                    "tick_wall_clock_s": 120,
                },
            },
            headers={"Idempotency-Key": self.state["tag"] + ":" + name},
        )
        self.state["agents"].append(agent["agent_id"])
        self.save()
        print(f"Created {name}: {agent['agent_id']}", flush=True)
        return agent["agent_id"]

    def cleanup(self):
        # Discover resources from both the journal and server labels, covering
        # lost receipts and process interruption.
        if self.state is None:
            return
        state = self.state
        agents, keys = inventory(self.client)
        targets = set(state["agents"])
        # Labels recover creation receipts lost in a timeout/process crash.
        for aid in set(agents) - set(state["before_agents"]):
            agent = api(self.client, "GET", f"/v1/agents/{aid}")
            if agent["display_name"].startswith(state["tag"] + " "):
                targets.add(aid)
        key_ids = {kid for kid, key in keys.items() if key["label"] == state["tag"]}
        if state["key_id"]:
            key_ids.add(state["key_id"])
        state["agents"] = sorted(targets)
        self.save()
        errors = []
        waiting_billing = False
        # Cancel and archive only agents proven to belong to this demo run.
        for aid in sorted(targets & set(agents)):
            try:
                agent = api(self.client, "GET", f"/v1/agents/{aid}")
                if (
                    aid in state["before_agents"]
                    or agent["owner"]["user_id"] != self.user_id
                    or not agent["display_name"].startswith(state["tag"] + " ")
                ):
                    raise RuntimeError(f"Refusing to clean up an unrelated agent: {aid}")
                api(self.client, "POST", f"/v1/agents/{aid}:cancel")
                monitor = api(self.client, "GET", f"/v1/agents/{aid}/public-monitor")
                if monitor.get("unresolved_requests", 0):
                    waiting_billing = True
                    print(f"Keeping {aid} and its key until billing is reconciled.", flush=True)
                    continue
                api(self.client, "DELETE", f"/v1/agents/{aid}")
                print(f"Archived demo agent: {aid}", flush=True)
            except Exception as exc:
                errors.append(str(exc))
        requests = api(self.client, "GET", "/v1/billing/requests")["requests"]
        # Keep temporary resources when billing is unresolved so receipts remain
        # available for reconciliation instead of being deleted prematurely.
        if waiting_billing or any(item.get("agent_id") in targets for item in requests):
            raise RuntimeError(
                "Demo billing is unresolved; temporary key and journal retained for receipt verification. "
                "Resolve the billing requests, then run --cleanup-only."
            )
        for kid in sorted(key_ids & set(keys)):
            # Delete only newly registered keys with this run's exact label.
            try:
                if keys[kid]["label"] != state["tag"] or kid in state["before_keys"]:
                    raise RuntimeError("Refusing to delete a pre-existing/unrelated model key.")
                api(self.client, "DELETE", f"/v1/keys/{kid}")
                print(f"Deleted temporary provider-key registration: {kid}", flush=True)
            except Exception as exc:
                errors.append(str(exc))
        after_agents, after_keys = inventory(self.client)
        # Verify both cleanup and restoration of the original active inventories.
        if targets & set(after_agents) or key_ids & set(after_keys):
            raise RuntimeError("Cleanup incomplete; journal retained. " + "; ".join(errors))
        self.path.unlink(missing_ok=True)
        self.state = None
        if set(after_agents) != set(state["before_agents"]) or set(after_keys) != set(
            state["before_keys"]
        ):
            raise RuntimeError(
                "Demo resources removed, but inventories changed elsewhere; before/after equality failed."
            )
        print(
            "Verified: active agent IDs and registered key IDs match the pre-run inventories.",
            flush=True,
        )

    def __exit__(self, kind, value, traceback):
        # Always attempt cleanup, while preserving the original exception and lock
        # state when cleanup itself cannot complete.
        try:
            self.cleanup()
        except Exception as exc:
            if kind is None:
                raise
            print(f"CLEANUP FAILED: {exc}. Run again with --cleanup-only.", file=sys.stderr)
        finally:
            self.lock.close()
