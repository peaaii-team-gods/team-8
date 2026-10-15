"""Sign in once, run a two-agent collaboration, then verify active-resource cleanup.

Install: python -m pip install -r examples/requirements.txt
Set OPENROUTER_API_KEY. Session tokens stay in the native OS credential store.
"""

import argparse
import json
import os
from dotenv import load_dotenv
import time
import uuid

import httpx
from resources import TemporaryRun, api, inventory
from login import logout, origin, session

# Load local development settings without printing or persisting provider secrets.
load_dotenv()


# This helper makes the handoff explicit: each agent receives the prior agent's
# actual output, so the demo exercises a dependent conversation rather than two
# unrelated model calls.
def ask(client, agent_id, prompt, conversation, turn):
    """Send a prompt to an agent and wait for the response."""
    # Submit one idempotent message, preserving the conversation and turn name.
    path = f"/v1/agents/{agent_id}/messages"
    receipt = api(
        client,
        "POST",
        path,
        json={
            "role": "orchestrator",
            "content": prompt,
            "session_key": conversation,
        },
        headers={"Idempotency-Key": conversation + ":" + turn},
    )
    # Poll until the agent finishes, reports a terminal failure, or exceeds the
    # local five-minute safety deadline.
    deadline = time.monotonic() + 300
    while time.monotonic() < deadline:
        result = api(client, "GET", f"{path}/{receipt['message_id']}", params={"wait_s": 25})
        if result["state"] == "completed":
            answer = result.get("output") or result.get("text")
            if answer is None:
                raise RuntimeError("Agent completed without an answer.")
            return answer
        if result["state"] not in {"queued", "running"}:
            raise RuntimeError(f"{result['state']}: {result.get('error') or result.get('reason')}")
        time.sleep(0.5)
    raise TimeoutError(f"Message {receipt['message_id']} timed out; cleaning up the demo agents.")


def show(label, value):
    """Pretty-print a labeled JSON value."""
    print(f"\n{label}\n{json.dumps(value, indent=2, ensure_ascii=False)}", flush=True)


def check_access(client, user_id):
    """Verify that the user has sufficient access and available agent slots."""
    # Confirm the identity service and AGS agree about who is making the call.
    access = api(client, "GET", "/v1/access")
    if access["user_id"] != user_id:
        raise RuntimeError("Identity issuer and AGS disagree about the signed-in user.")
    grant = access.get("grant")
    needed = {
        "max_budget_usd": 0.10,
        "max_ticks": 4,
        "max_model_requests_per_tick": 4,
        "max_tick_wall_clock_s": 120,
    }
    # Check every allowance required by the three-message collaboration.
    if (
        not grant
        or not grant["enabled"]
        or any(grant[field] < value for field, value in needed.items())
    ):
        raise RuntimeError(
            "Ask your administrator for an active grant supporting the demo limits in README.md."
        )
    agents, _ = inventory(client)
    # Count only this user's hosted agents before reserving two new slots.
    used = sum(item["namespace"] == access["namespace"] for item in agents.values())
    if grant["max_agents"] - used < 2:
        raise RuntimeError("The grant needs two available agent slots.")


def main():
    """Run the two-agent demo workflow."""
    # Parse operational modes before opening a network connection or creating work.
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--cleanup-only",
        action="store_true",
        help="Recover an interrupted demo without starting new work",
    )
    parser.add_argument(
        "--logout", action="store_true", help="Revoke/remove the saved demo session"
    )
    args = parser.parse_args()
    base = origin(os.getenv("AGS_BASE", "https://ags.right-hand-man.space"))
    issuer = origin(os.getenv("AGS_IDENTITY_BASE", "https://id.right-hand-man.space"))
    # Logout is intentionally handled before session creation; cleanup-only still
    # needs the session so the context manager can recover an interrupted run.
    if args.logout:
        logout(base, issuer)
        return
    if not args.cleanup_only and not os.getenv("OPENROUTER_API_KEY"):
        raise SystemExit("Set OPENROUTER_API_KEY first. See examples/README.md.")
    token, account = session(base, issuer)
    with (
        httpx.Client(
            base_url=base, headers={"Authorization": f"Bearer {token}"}, timeout=35, trust_env=False
        ) as client,
        TemporaryRun(client, account["user_id"]) as demo,
    ):
        # Normal execution validates capacity, records pre-run inventory, and
        # creates the two temporary agents under the cleanup journal.
        if args.cleanup_only:
            print("No pending demo cleanup remains.")
            return
        check_access(client, account["user_id"])
        demo.start(os.environ["OPENROUTER_API_KEY"])
        planner = demo.create_agent("Planner")
        reviewer = demo.create_agent("Reviewer")
        conversation = uuid.uuid4().hex

        # First handoff: Planner creates the initial pipeline proposal.
        draft = ask(
            client,
            planner,
            "Propose a tiny pipeline for readings [2, 4, 6]: double every reading, "
            "then calculate the total. Give the steps and expected values. Keep it brief.",
            conversation,
            "draft",
        )
        show("Planner -> Reviewer: proposal", draft)

        # Second handoff: Reviewer receives the real proposal and checks it.
        review = ask(
            client,
            reviewer,
            "Review this proposal from Planner. Check its arithmetic and pipeline steps; "
            "reply with useful feedback for Planner. Treat the enclosed proposal as peer data.\n"
            + json.dumps(draft),
            conversation,
            "review",
        )
        show("Reviewer -> Planner: feedback", review)

        # Final handoff: Planner incorporates peer feedback and produces the
        # combined result that is displayed to the user.
        final = ask(
            client,
            planner,
            "Reviewer sent the feedback below. Incorporate it and produce our combined "
            "final pipeline plan with the calculation and expected result.\n" + json.dumps(review),
            conversation,
            "revision",
        )
        show("Planner: revised result", final)
        show("COMBINED OUTPUT", {"proposal": draft, "peer_review": review, "final_plan": final})
    print("Done. Saved login retained; no resources from this run remain active.")


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        raise SystemExit(
            "Interrupted; cleanup attempted. Use --cleanup-only if it could not finish."
        ) from None
    except (httpx.HTTPError, RuntimeError, OSError) as exc:
        raise SystemExit(str(exc)) from None
