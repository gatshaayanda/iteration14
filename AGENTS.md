# Iteration 14 — Product and Engineering Contract

## Repository identity
- Work only in `gatshaayanda/iteration14`, default branch `main`.
- This repository implements BACKPACK OS — the personal operating system (P.O.S.) in Iteration 14. Preserve the BACKPACK OS identity. B.O.S. is the separate business operating system; do not merge the two environments or rename this product as iB.
- Iteration 13 is a source/reference repository only. Do not change it while working on Iteration 14.
- Do not mistake copied Iteration 13 implementation or inherited labels for approved Iteration 14 product decisions.
- Preserve existing working features unless the product owner explicitly asks to remove or replace them. Never force-push.

## Product direction
- The product is a personal operating system with two connected modes:
  - **Publish / My Channel** — the existing personal publishing space for episodes, videos, announcements, links, useful resources, drafts, audience access and moderated contributions.
  - **Organise / My Life** — the existing personal workspace for lists, plans, notes, projects, goals, personal records, private documents and selected sharing, extended with purchasing, vendors, savings objectives, household stock, replenishment, bills, personal money and longer-term aspirations.
- These are modes in one personal space, not separate accounts.
- A person's personal records remain private by default. Sharing is intentional and permission-scoped.
- BACKPACK OS must remain independently useful without a business. The Briefcase / B.O.S. is a separate business operating environment and may be reached through the supporting profile/space switcher, not mixed into My Life or My Channel records.
- The primary modes remain Publish and Organise. Do not add a new top-level toggle for every capability; integrate new capabilities into the existing modes and connect shared records instead of duplicating them.
- Financial philosophy: B.O.S. explains how money is earned through business activity; P.O.S. explains how money is spent through living. The P.O.S. must show what expenditure does for life, distinguish essential/lifestyle/obligation/development/unexpected spending, and keep savings transfers distinct from expenditure and asset acquisition.
- Purchasing horizons must support this week, next 1–3 months, next 3–12 months, and next 1–5+ years. A purchase should connect its objective, budget, supplier, savings progress, actual expenditure and receipt/warranty record.
- Product discovery, deals, new releases and useful web links belong inside the existing personal library/channel workflows. Media links must point to authorised sources; do not host or redistribute unlicensed streams.
- These are approved product extensions, not a claim that every capability is already implemented. Label local-only prototypes and unconnected integrations honestly.

## Visual direction — mandatory
The selected design genre is **DATA × QUIET**:
- **DATA is dominant:** structured workspace, compact controls, clear information hierarchy, useful summaries, organised records, dense-but-readable data surfaces and operational dashboards.
- **QUIET is secondary:** restrained colour, clean typography, generous but disciplined spacing, subtle borders, calm surfaces and polished interactions.
- The result must feel like a professional personal operating system: functional, organised, lightweight and premium.
- It must not look like a loud marketing website, a generic landing page or a conventional CRM/business dashboard.
- Make real interface changes when applying this direction: page composition, navigation, layout, hierarchy, component treatment, typography, colour system, responsive behaviour and interaction states. Do not satisfy a design task with copy, logo, icon or metadata changes alone.
- Use a neutral light workspace canvas, clear surface layers, strong readable ink, muted secondary text and one restrained functional accent. Avoid neon, glow, heavy gradients, oversized display typography and decorative colour blocks.
- Prefer compact information panels, aligned metrics, meaningful empty states, concise labels, consistent control sizes and useful progressive disclosure.
- Mobile is a first-class layout: keep key actions and essential information visible without oversized hero sections or long decorative content.
- Every control must have a working action, accessible focus state and truthful feedback. Respect reduced-motion preferences.

## Source and design standards
Before substantial changes, inspect applicable source docs and existing behaviour:
- `START-HERE.md`, `CLONING.md`, `GOLDEN-BASELINE.md`.
- `docs/VISUAL-DIRECTION-STANDARD.md`.
- `docs/OPERATIONAL-TRANSPARENCY-STANDARD.md`.
- `docs/OBJECTIVE-TO-SYSTEM-DESIGN-STANDARD.md`.
- `docs/DESIGN-INTELLIGENCE-AND-EXPERIENCE-QUALITY-STANDARD.md`.
- `docs/INTERACTION-CLARITY-AND-FEEDBACK-STANDARD.md`.
- `docs/PWA-INSTALLATION-LOCK.md` before any install/PWA changes.
Adapt useful standards to a personal product; do not copy business-only concepts or seed business demo data.

## Engineering, data and privacy
- Google sign-in is the preferred first provider through Firebase Authentication.
- Use Firebase Auth UID as the stable identity key, never email as the primary relationship key.
- Link providers with Firebase's secure account-linking flow and preserve the canonical UID.
- Firestore is the source of truth for cloud records and metadata. Use the approved UploadThing architecture for binary media; Firestore stores metadata and secure references, not video bytes.
- Use server-enforced access checks and restrictive Firestore rules. Hiding UI is not authorization.
- Public, unlisted, password-protected, invite-only and private publishing access must be enforced at the data/API boundary, including section/content-level restrictions.
- Never expose personal notes, private files, household records or private audience data through public endpoints.
- Do not deploy inherited Firestore rules without reviewing collections and tests.
- Do not introduce Firebase Storage rules or migrate UploadThing uploads to Firebase Storage by assumption.
- Do not claim cloud sync, cross-device recovery, private access enforcement or delivery integrations until implemented and verified. Clearly label local-preview behaviour.

## Protected boundaries
- Treat inherited PWA installation, service worker and offline behaviour as protected. Inspect `docs/PWA-INSTALLATION-LOCK.md` before changing them.
- Do not casually replace the inherited install prompt, iOS install guidance, embedded-browser gate or offline shell.
- Keep Iteration 14 storage/cache namespaces and app identity separate from Iteration 13.
- Do not copy Iteration 13 business records, credentials, rules or deployment configuration into this repository.

## Verification and release
- Check the target branch and current file versions before writes. Make changes only in this repository.
- Run lint, TypeScript, production build and the relevant identity/offline/typography checks after code changes. Update checks to validate Iteration 14 without weakening PWA invariants.
- Test both personal modes, identity, space linking, privacy boundaries, media, comments, offline/reconnect and responsive behaviour as the corresponding features are implemented.
- The product owner performs final device QA. Report commit/push, automated checks, deployment and physical-device QA separately.
- When explicitly asked, commit and push directly to `main`; never claim deployment or tests that were not verified.

## Current implementation checkpoint
- The root route is the Iteration 14 personal workspace, with My Life and My Channel modes.
- The inherited business workspace is retained in `src/app/LegacyBusinessWorkspace.tsx` only as migration/reference material; it is not the home experience.
- Personal records currently persist in browser local storage on this device only. Do not describe this as authenticated cloud sync, backup or cross-device recovery.
- Channel publishing currently updates the local channel preview only. Public hosting, audience permissions, password access, invitations, moderation and secure media delivery remain unimplemented.
- The current visual target is DATA × QUIET. Apply it to the actual interface, not only text or brand assets.
