# Iteration 14 — iB Backpack Operating Contract

## Product identity

- Public product identity: **iB — Iteration B**.
- Product promise: **Business and everyday life. Connected.**
- Brand line: **A Briefcase for business. A Backpack for life. One connected system.**
- This repository implements the **Backpack**, the personal environment of iB.
- Iteration 13 implements the **Briefcase / B.OS**, the business environment.
- Admin Hub is the product maker and shared infrastructure steward.

## Source lineage and repository boundaries

- Target: `gatshaayanda/iteration14`, default branch `main`.
- Selected source: `gatshaayanda/iteration13`, branch `main`, inspected source HEAD `6d0f5c79fb947d022e3be0c460bf60248f3733f9` (2026-11-16).
- Iteration 13 is selected explicitly by the product owner for this product; this is an approved exception to its general default-source rule.
- Iteration 13 is a protected reference. Never develop directly on its golden recovery branch or replace its working implementation wholesale.
- Preserve source history when cloning. Point the new working copy's origin to this repository. Never force-push or overwrite existing work.
- This repository was inspected as empty at setup (GitHub reported size 0, default branch main). Recheck before the first push.
- Admin Hub Global is a separate platform/repository. Do not copy its app-specific records, credentials, rules or deployment configuration into i14.

## Product architecture

Read `docs/IB-PRODUCT-ARCHITECTURE.md`, `docs/IB-TECHNICAL-FOUNDATION.md` and `docs/IB-IMPLEMENTATION-ROADMAP.md` before substantial work.

- One person has one canonical iB identity.
- The person may own a Briefcase, a Backpack, or both.
- Each space has its own records, members, roles, settings and privacy boundary.
- The profile links to the other space and offers create/connect when it does not yet exist.
- Cross-navigation is not cross-access. Never expose records merely because spaces share an owner.
- Backpack modes are **Publish / My Channel** and **Organise / My Life**. They are two modes within one personal space, not separate accounts.

## Authentication, data and privacy

- Google sign-in is the preferred first provider, through Firebase Authentication.
- Use Firebase Auth UID as the stable identity key. Never use email as the primary relationship key.
- Linking another provider must use Firebase's secure account-linking flow and preserve the canonical UID.
- Firestore is the source of truth for cloud records and metadata. Uploaded binary media uses the approved UploadThing architecture; Firestore stores metadata and secure references, not video bytes.
- Use server-enforced access checks and restrictive Firestore rules. UI hiding is not authorization.
- Public, unlisted, password-protected, invite-only and private publishing modes must be enforced by the data/API access boundary, not only by client-side page state.
- Section/content-level access may be narrower than the page-level setting.
- Do not expose personal notes, private files, household records or private audience data through public profile endpoints.
- Never deploy inherited Firestore rules without reviewing every collection and test case.
- Do not introduce Firebase Storage rules or migrate UploadThing uploads to Firebase Storage by assumption.

## Backpack experience

### Publish / My Channel
- Custom-designed public or restricted viewing page.
- Episodes, videos and announcements.
- Private audience access and invitations.
- Comments and audience contributions with owner moderation.
- Organised content library, drafts and publishing states.
- Start with uploaded/embedded media; do not build custom live-streaming infrastructure as an MVP assumption.

### Organise / My Life
- Personal lists and plans.
- Notes and records.
- Projects and goals.
- Private documents.
- Selected sharing with people the owner chooses.
- Household coordination can be a use case, not a limitation on the product's identity.

## Design and interaction standards

Carry forward the applicable Iteration 13 standards:
- `AGENTS.md`, `START-HERE.md`, `CLONING.md`, `GOLDEN-BASELINE.md`.
- `docs/VISUAL-DIRECTION-STANDARD.md` and inspect `docs/assets/washride-home-reference.jpeg` before visual work.
- `docs/OPERATIONAL-TRANSPARENCY-STANDARD.md` for saving, uploads, sync, invitations and publishing.
- `docs/OBJECTIVE-TO-SYSTEM-DESIGN-STANDARD.md`.
- `docs/DESIGN-INTELLIGENCE-AND-EXPERIENCE-QUALITY-STANDARD.md`.
- `docs/INTERACTION-CLARITY-AND-FEEDBACK-STANDARD.md`.
- `docs/PWA-INSTALLATION-LOCK.md` before any install/PWA changes.

Adapt the standards to a personal product. Do not copy business-only labels, customer concepts or seeded demo data. Keep the experience compact, mobile-first, readable and accessible. Every visible control must work and report truthful outcomes.

## Protected and reset boundaries

- Treat inherited PWA installation, service worker, offline behavior and install verification as protected until inspected and explicitly adapted.
- Reset inherited Iteration 13 identity, demo content, local-storage namespaces, cache namespace, metadata, app icons, manifest and domain identity for i14.
- Do not carry over Iteration 13's local-only demo data and claim it is cloud-synced.
- Do not claim cross-device sync, audience permissions, secure password pages or recovery until implemented and verified.

## Verification and release discipline

- Inspect the exact source and target branch/commit before cloning or pushing.
- Run the inherited identity/offline/typography checks, lint, TypeScript and production build after adaptation; update checks to validate i14 identity without weakening protected PWA invariants.
- Test owner identity, space creation/linking, account recovery on a second device, publishing access levels, section-level privacy, media upload, comments and offline/reconnect behavior.
- Report commit/push, automated checks, Vercel deployment and physical-device QA separately.
- The product owner is final reviewer and QA. Push to `main` when explicitly requested; Vercel configuration remains with the owner unless delegated.

## Current checkpoint

- Initial documentation foundation only.
- Source repository inspected: Iteration 13 main at `6d0f5c79fb947d022e3be0c460bf60248f3733f9`.
- Target repository observed empty at setup; first commit/push still to be verified.
- Firebase project/database selection and rules are not yet finalised.
- No application code has yet been cloned or adapted.
