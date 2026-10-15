"""Behavioral checks for the example's handoffs, credential reuse and cleanup.

All HTTP and native credential-store interactions are simulated. No real agent,
provider request, credential-store entry or invitation is created.
"""

import copy
import json
import sys
from types import SimpleNamespace
from unittest.mock import Mock

import resources as resources
import login as auth
import two_agents as demo
import httpx
import pytest

HTTP_CLIENT = httpx.Client


# The fake service models inventory, receipts, billing, and failure modes so the
# tests can verify recovery behavior without contacting AGS or spending credits.
class FakeAGS:
    def __init__(self):
        self.agents = {
            "old-agent": {
                "agent_id": "old-agent",
                "display_name": "Existing agent",
                "owner": {"user_id": "user-1"},
                "namespace": "hosted:user-1",
            }
        }
        self.keys = {"old-key": {"key_id": "old-key", "label": "Existing key"}}
        self.before = copy.deepcopy((self.agents, self.keys))
        self.messages = {}
        self.prompts = []
        self.created = 0
        self.fail_create = None
        self.lose_agent_receipt = False
        self.lose_key_receipt = False
        self.fail_delete = False
        self.park = False
        self.interrupt = False
        self.billing = []
        self.monitor_pending = False

    def response(self, request):
        path, method = request.url.path, request.method
        body = json.loads(request.content) if request.content else None
        if path == "/v1/access":
            return httpx.Response(
                200,
                json={
                    "user_id": "user-1",
                    "namespace": "hosted:user-1",
                    "grant": {
                        "enabled": True,
                        "max_agents": 10,
                        "max_budget_usd": 0.1,
                        "max_ticks": 4,
                        "max_model_requests_per_tick": 4,
                        "max_tick_wall_clock_s": 120,
                    },
                },
            )
        if path == "/v1/public/monitors":
            # Force pagination so cleanup must inspect the whole inventory.
            items = sorted(self.agents.values(), key=lambda a: a["agent_id"])
            offset = int(request.url.params.get("cursor", 0))
            return httpx.Response(
                200,
                json={
                    "items": items[offset : offset + 1],
                    "next_cursor": str(offset + 1) if offset + 1 < len(items) else None,
                },
            )
        if path == "/v1/keys":
            if method == "GET":
                return httpx.Response(200, json=list(self.keys.values()))
            self.keys["demo-key"] = {"key_id": "demo-key", "label": body["label"]}
            if self.lose_key_receipt:
                raise httpx.ReadTimeout("Receipt lost", request=request)
            return httpx.Response(201, json={"key_id": "demo-key"})
        if path.startswith("/v1/keys/"):
            del self.keys[path.rsplit("/", 1)[1]]
            return httpx.Response(204)
        if path == "/v1/billing/requests":
            return httpx.Response(200, json={"requests": self.billing})
        if path == "/v1/user-agents":
            self.created += 1
            if self.created == self.fail_create:
                return httpx.Response(503, json={"error": "creation unavailable"})
            aid = f"demo-agent-{self.created}"
            self.agents[aid] = {
                **body,
                "agent_id": aid,
                "owner": {"user_id": "user-1"},
                "namespace": "hosted:user-1",
            }
            if self.lose_agent_receipt:
                raise httpx.ReadTimeout("Receipt lost", request=request)
            return httpx.Response(201, json=self.agents[aid])
        aid = path.split("/")[3]
        if path.endswith(":cancel"):
            return httpx.Response(200, json={"cancelled": True})
        if method == "DELETE":
            if self.fail_delete:
                return httpx.Response(503, json={"error": "cleanup unavailable"})
            del self.agents[aid]
            return httpx.Response(204)
        if path.endswith("/messages"):
            if self.interrupt:
                raise KeyboardInterrupt
            self.prompts.append((aid, body["content"]))
            number = len(self.prompts)
            output = {
                "status": "done",
                "summary": f"Peer response {number}",
                "result": {"total": 24},
            }
            mid = f"message-{number}"
            self.messages[mid] = (
                {"state": "waiting_approval", "reason": "Human review"}
                if self.park
                else {
                    "state": "completed",
                    "output": output,
                }
            )
            return httpx.Response(202, json={"message_id": mid})
        if "/messages/" in path:
            return httpx.Response(200, json=self.messages[path.rsplit("/", 1)[1]])
        if path.endswith("/public-monitor"):
            return httpx.Response(200, json={"unresolved_requests": int(self.monitor_pending)})
        if aid not in self.agents:
            return httpx.Response(404, json={"error": "not found"})
        return httpx.Response(200, json=self.agents[aid])


@pytest.fixture
def environment(monkeypatch, tmp_path):
    monkeypatch.setenv("AGS_DEMO_STATE_DIR", str(tmp_path))
    monkeypatch.setenv("AGS_BASE", "https://ags.example.test")
    monkeypatch.setenv("AGS_IDENTITY_BASE", "https://id.example.test")
    monkeypatch.setenv("OPENROUTER_API_KEY", "fake-provider-secret")
    monkeypatch.delenv("AGS_TOKEN", raising=False)
    return tmp_path


def run_demo(monkeypatch, server, *arguments):
    monkeypatch.setattr(
        httpx,
        "Client",
        lambda **kwargs: HTTP_CLIENT(transport=httpx.MockTransport(server.response), **kwargs),
    )
    monkeypatch.setattr(
        demo, "session", lambda *_: ("fake-session", {"user_id": "user-1", "username": "teammate"})
    )
    monkeypatch.setattr(sys, "argv", ["ags_two_agents.py", *arguments])
    demo.main()


def test_peer_handoffs_and_original_inventories_restored(monkeypatch, environment, capsys):
    server = FakeAGS()
    run_demo(monkeypatch, server)
    assert server.created == 2
    assert [aid for aid, _ in server.prompts] == ["demo-agent-1", "demo-agent-2", "demo-agent-1"]
    assert "Peer response 1" in server.prompts[1][1]
    assert "Peer response 2" in server.prompts[2][1]
    assert (server.agents, server.keys) == server.before
    assert not list(environment.glob("*.json"))
    output = capsys.readouterr().out
    assert "COMBINED OUTPUT" in output and "Verified:" in output
    assert "fake-provider-secret" not in output and "fake-session" not in output


@pytest.mark.parametrize(
    "failure", ["fail_create", "lose_agent_receipt", "lose_key_receipt", "park"]
)
def test_failure_and_lost_receipts_still_clean_up(monkeypatch, environment, failure):
    server = FakeAGS()
    setattr(server, failure, 2 if failure == "fail_create" else True)
    with pytest.raises((httpx.HTTPError, RuntimeError)):
        run_demo(monkeypatch, server)
    assert (server.agents, server.keys) == server.before
    assert not list(environment.glob("*.json"))


def test_cleanup_failure_retains_journal_and_recovers(monkeypatch, environment):
    server = FakeAGS()
    server.fail_delete = True
    with pytest.raises(RuntimeError, match="Cleanup incomplete"):
        run_demo(monkeypatch, server)
    assert list(environment.glob("*.json"))
    assert "fake-provider-secret" not in next(environment.glob("*.json")).read_text()
    server.fail_delete = False
    with HTTP_CLIENT(
        base_url="https://ags.example.test", transport=httpx.MockTransport(server.response)
    ) as client:
        with resources.TemporaryRun(client, "user-1"):
            pass
    assert (server.agents, server.keys) == server.before
    assert not list(environment.glob("*.json"))


def test_billing_hold_preserves_temporary_key_until_reconciled(environment):
    server = FakeAGS()
    with httpx.Client(
        base_url="https://ags.example.test", transport=httpx.MockTransport(server.response)
    ) as client:
        with pytest.raises(RuntimeError, match="billing is unresolved"):
            with resources.TemporaryRun(client, "user-1") as run:
                run.start("fake-provider-secret")
                aid = run.create_agent("Planner")
                server.billing = [{"request_id": "request-1", "agent_id": aid}]
        assert server.agents == server.before[0]
        assert "demo-key" in server.keys and list(environment.glob("*.json"))
        server.billing = []
        with resources.TemporaryRun(client, "user-1"):
            pass
    assert (server.agents, server.keys) == server.before


def test_restart_recovers_after_process_dies_without_finally(environment):
    server = FakeAGS()
    with httpx.Client(
        base_url="https://ags.example.test", transport=httpx.MockTransport(server.response)
    ) as client:
        run = resources.TemporaryRun(client, "user-1").__enter__()
        run.start("fake-provider-secret")
        run.create_agent("Planner")
        run.lock.close()  # Model abrupt process death; do not call __exit__.
        with resources.TemporaryRun(client, "user-1"):
            pass
    assert (server.agents, server.keys) == server.before


def test_per_agent_pending_bill_is_detected_even_when_request_list_is_limited(environment):
    server = FakeAGS()
    # The owner billing endpoint has a bounded list; it may show other requests.
    server.billing = [{"request_id": "unrelated-request", "agent_id": "old-agent"}]
    with HTTP_CLIENT(
        base_url="https://ags.example.test", transport=httpx.MockTransport(server.response)
    ) as client:
        with pytest.raises(RuntimeError, match="billing is unresolved"):
            with resources.TemporaryRun(client, "user-1") as run:
                run.start("fake-provider-secret")
                aid = run.create_agent("Planner")
                server.monitor_pending = True
        assert aid in server.agents and "demo-key" in server.keys
        server.monitor_pending = False
        with resources.TemporaryRun(client, "user-1"):
            pass
    assert (server.agents, server.keys) == server.before


def test_ctrl_c_still_restores_original_active_resources(monkeypatch, environment):
    server = FakeAGS()
    server.interrupt = True
    with pytest.raises(KeyboardInterrupt):
        run_demo(monkeypatch, server)
    assert (server.agents, server.keys) == server.before
    assert not list(environment.glob("*.json"))


def test_overlapping_local_runs_are_refused(environment):
    server = FakeAGS()
    with HTTP_CLIENT(
        base_url="https://ags.example.test", transport=httpx.MockTransport(server.response)
    ) as client:
        with resources.TemporaryRun(client, "user-1"):
            with pytest.raises(OSError):
                with resources.TemporaryRun(client, "user-1"):
                    pytest.fail("The second run acquired an already-held local lock")
    assert (server.agents, server.keys) == server.before


def test_does_not_delete_another_clients_new_agent(environment):
    server = FakeAGS()
    with httpx.Client(
        base_url="https://ags.example.test", transport=httpx.MockTransport(server.response)
    ) as client:
        with pytest.raises(RuntimeError, match="inventories changed elsewhere"):
            with resources.TemporaryRun(client, "user-1") as run:
                run.start("fake-provider-secret")
                run.create_agent("Planner")
                server.agents["other-new-agent"] = {
                    "agent_id": "other-new-agent",
                    "display_name": "Unrelated work",
                    "owner": {"user_id": "user-1"},
                    "namespace": "hosted:user-1",
                }
    assert set(server.agents) == {"old-agent", "other-new-agent"}
    assert server.keys == server.before[1]


class MemoryStore:
    def __init__(self):
        self.values = {}

    def get_password(self, service, user):
        return self.values.get((service, user))

    def set_password(self, service, user, secret):
        self.values[service, user] = secret

    def delete_password(self, service, user):
        del self.values[service, user]


def test_session_persists_reuses_and_reauthenticates_on_revocation(
    monkeypatch, environment, capsys
):
    store = MemoryStore()
    valid = {"session-1", "session-2"}
    original = httpx.Client

    def identity(request):
        token = request.headers["authorization"].split(" ", 1)[1]
        return (
            httpx.Response(200, json={"user_id": "user-1", "username": "teammate"})
            if token in valid
            else httpx.Response(401)
        )

    monkeypatch.setattr(auth, "credential_store", lambda: store)
    monkeypatch.setattr(
        httpx,
        "Client",
        lambda **kwargs: original(transport=httpx.MockTransport(identity), **kwargs),
    )
    browser = Mock(side_effect=["session-1", "session-2"])
    monkeypatch.setattr(auth, "login", browser)
    origins = ("https://ags.example.test", "https://id.example.test")
    assert auth.session(*origins)[0] == "session-1"
    assert auth.session(*origins)[0] == "session-1"
    assert browser.call_count == 1
    valid.remove("session-1")
    assert auth.session(*origins)[0] == "session-2"
    assert browser.call_count == 2 and len(store.values) == 1
    assert "session-1" not in capsys.readouterr().out
    assert auth.cache_name(*origins) != auth.cache_name("https://another.example", origins[1])


def test_transient_identity_error_does_not_discard_cached_session(monkeypatch, environment):
    store = MemoryStore()
    origins = ("https://ags.example.test", "https://id.example.test")
    store.set_password(auth.cache_name(*origins), "session", "keep-this-session")
    original = httpx.Client
    monkeypatch.setattr(auth, "credential_store", lambda: store)
    monkeypatch.setattr(
        httpx,
        "Client",
        lambda **kwargs: original(
            transport=httpx.MockTransport(lambda _: httpx.Response(503)), **kwargs
        ),
    )
    with pytest.raises(httpx.HTTPStatusError):
        auth.session(*origins)
    assert store.get_password(auth.cache_name(*origins), "session") == "keep-this-session"


def test_plaintext_keyring_is_rejected(monkeypatch):
    unsafe = type("Plaintext", (), {"__module__": "keyrings.alt.file", "priority": 1})()
    monkeypatch.setitem(sys.modules, "keyring", SimpleNamespace(get_keyring=lambda: unsafe))
    with pytest.raises(RuntimeError, match="native credential store"):
        auth.credential_store()


def test_native_store_selected_without_plaintext_chainer_fallback(monkeypatch):
    native = type(
        "WinVaultKeyring", (), {"__module__": "keyring.backends.Windows", "priority": 5}
    )()
    unsafe = type("Plaintext", (), {"__module__": "keyrings.alt.file", "priority": 1})()
    chain = type(
        "Chain", (), {"__module__": "keyring.backends.chainer", "backends": [unsafe, native]}
    )()
    monkeypatch.setitem(sys.modules, "keyring", SimpleNamespace(get_keyring=lambda: chain))
    assert auth.credential_store() is native


def test_logout_revokes_only_the_cached_demo_session(monkeypatch, environment):
    store = MemoryStore()
    origins = ("https://ags.example.test", "https://id.example.test")
    store.set_password(auth.cache_name(*origins), "session", "my-demo-session")
    seen = []

    def revoke(request):
        seen.append((request.method, request.url.path, request.headers["authorization"]))
        return httpx.Response(200, json={"status": "ok"})

    monkeypatch.setattr(auth, "credential_store", lambda: store)
    monkeypatch.setattr(
        httpx,
        "Client",
        lambda **kwargs: HTTP_CLIENT(transport=httpx.MockTransport(revoke), **kwargs),
    )
    auth.logout(*origins)
    assert seen == [("POST", "/api/v1/auth/logout", "Bearer my-demo-session")]
    assert not store.values
