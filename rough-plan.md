# From this pilot to a mini-orchestrator

This pilot proves a deliberately small slice: two logical model roles, a real
bounded artifact handoff, fixed deterministic data execution, explicit stage
contracts, one injected schema drift, and one repair or clear failure. It uses
synthetic sensor readings rather than large live hospital-price datasets.

The public backend owns identity-based authorization, immutable workflow/run
records, bounded model loops, cancellation and policy. This client coordinates
two sequential submissions and owns its sample-data acceptance rules. It does
not recreate service registries, persistent agents, provider keys, tool policy,
task/lease authority, private credentials or a second backend orchestrator.

The `pipeline.Executor` protocol is the execution seam. A future hosted adapter
must return physical results and provenance at least as explicit as the local
receipt, with execution isolation independently proven. It must never turn a model
reply or an approved-but-unexecuted action into a successful execution receipt.
The current code supplies only `LocalExecutor`.

Before hosted arbitrary code or project execution: register the execution scope
through Identity's owner-approved policy; prove gateway/shell/sandbox workspace
identity, owner forwarding and physical shared files; enforce per-job network and
filesystem isolation; protect acceptance checks; record post-clone base/SHA and
shell-modified outputs; prove teardown ownership and cleanup. Those are service
prerequisites, not features a public client can grant itself. Third-party packages
would additionally need pinned dependency preparation and an offline build path.
No such readiness or live proof is claimed here.

After that prerequisite slice, grow one step at a time:

1. Add a second bounded input fixture and version the adapter/contracts. Keep
   deterministic ingestion, schema checks and data-quality acceptance authoritative.
2. Introduce durable application job IDs and explicit user-approved retries. Keep
   immutable inputs, actual producer run IDs and bounded artifact lineage.
3. Add a reviewed hosted executor adapter with honest capability discovery, then
   prove timeout, outcome-unknown, cancellation and cleanup end to end.
4. Add a small work queue and richer approved task types when a real consumer
   needs them. Parallel work must respect backend policy and workspace leases.
5. Consider source discovery and realistic datasets only after limits, provenance
   and deterministic acceptance are established; a discovery model does not grant
   network or storage authority.

Scheduling, unattended monitoring, arbitrary script generation, large datasets,
cloud-provider funding and Tier-3 merge/spend actions are outside this pilot.
Changing these boundaries is an explicit next project, not a prompt tweak.
