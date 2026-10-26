# STATUS — Crucible Cast

## Inference batch 01 (2026-10-26)

Source implements catalog model selection with Auto first, four saved routing
tiers, explicit manual pins for account connections, and host-model Auto only.
The Settings catalog shows Free/Paid prices and handles loading, unavailable,
empty and stale-pin states. The old model/helper form is replaced with a
collapsed provider connection editor. Existing compatibility model ids survive
credential replacement; fresh credentials use an Auto compatibility marker,
while Crucible always sends an explicit run selection.

Own-key runs require an explicit consent tick and a positive per-run cap,
including free pins. Selecting a different model or tier clears consent.
Hospital runs accept configured account providers and retain the labeled
recorded fallback. Keys remain write-only; shared-account replacement and
legacy helper removal require the displayed confirmation.

Validation: final frontend suite 273 tests passed; docs check and production
build passed. Existing build-size warning remains. Source and local checks do
not establish deployment or live model acceptance. Owner Catalog setup,
Identity grants, deployment and the batch live gate remain open. No deployment
or paid inference was performed by this batch.


## Inference fix 01: host Auto (2026-10-26)

Accounts without inference connections use the existing host-model path
without an explicit inference selection. Accounts with a connection retain
Auto tiers and manual pins. Failed or malformed connections reads block run
creation.

Validation: frontend suite 279 tests passed; docs check and production build
passed. Deployment and live acceptance remain open. No deployment or paid
inference was performed by this batch.
