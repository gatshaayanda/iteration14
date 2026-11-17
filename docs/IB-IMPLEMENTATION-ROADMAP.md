# iB / Iteration 14 Implementation Roadmap

This roadmap begins with a verified foundation and advances in small, reviewable milestones. Do not build every feature before the identity and privacy model is proven.

## Phase 0 — Establish the repository baseline

- Clone the selected Iteration 13 source at the recorded main commit into an empty working directory.
- Change the working copy's origin to `gatshaayanda/iteration14`.
- Recheck the remote is empty and push the inherited baseline safely.
- Preserve source history and record the source commit and new baseline commit.
- Add i14 identity, this documentation, reset checklist and project-specific design direction.
- Reset app identity, metadata, PWA manifest/icons, service-worker cache namespace and local demo keys without weakening protected install/offline behavior.
- Run the inherited checks and build. Record the exact output.

**Acceptance:** i14 has a reproducible, buildable inherited foundation on main; source lineage is documented; no i13 identity or sample business claims remain in the public product identity.

## Phase 1 — Personal identity and Backpack shell

- Implement Firebase Google sign-in against the approved shared iB Auth project.
- Create/retrieve the canonical `users/{uid}` profile.
- Create a Personal Space (Backpack) and owner membership atomically.
- Add profile navigation to My Backpack and My Briefcase.
- Show a clear create/connect state when the other space does not exist.
- Keep the owner experience compact and usable on mobile.

**Acceptance:** owner signs in, creates Backpack, signs out, signs in again and sees the same space; no Briefcase is required.

## Phase 2 — Backpack modes

- Add a persistent Publish / Organise toggle within Backpack.
- Build the Publish content library and page editor.
- Build Organise lists, notes, projects, goals and private records.
- Use one shared owner shell and clear mode-specific navigation.
- Keep private Organise data out of public page queries.

**Acceptance:** the owner can move between both modes without losing context; each mode saves to the correct cloud-owned data path.

## Phase 3 — My Channel publishing

- Customise the viewing page (identity, theme, layout and sections).
- Create drafts and publish episodes, videos and announcements.
- Support approved UploadThing media and selected embeds.
- Add audience invitations, scoped access and revocation.
- Add comments/contributions, moderation and clear audience rules.
- Implement access levels: public, unlisted, password-protected, invite-only and private.
- Add per-section/per-content restrictions.

**Acceptance:** every access level is tested with owner, invited, uninvited, anonymous and wrong-password viewers. Private content never leaks through metadata, search, media URLs or client bundles.

## Phase 4 — My Life organisation and sharing

- Lists and plans, including household contribution/voting workflow.
- Notes and records.
- Projects and goals.
- Private document library.
- Selected sharing with invited people and clear revoke controls.

**Acceptance:** owner-only data stays private; shared records are visible only to intended participants; household workflows save and synchronise correctly.

## Phase 5 — Shared iB connection with Iteration 13

- Configure both apps against the same approved Firebase Auth identity authority.
- Implement consistent profile/space links and cross-navigation.
- Connect existing Briefcase ownership to the canonical user UID through a deliberate migration/linking process.
- Support explicit cross-space links/actions without implicit data sharing.
- Establish shared invitations and identity recovery patterns.
- Add cross-app regression tests.

**Acceptance:** the same person can switch between both environments; either space remains independently usable; access boundaries remain intact.

## Phase 6 — Recovery, offline and release readiness

- Test second-device recovery.
- Test offline cache and queued changes, reconnect, duplicate submissions and conflicts.
- Test upload/metadata partial failure and retry.
- Add rules tests, route tests and end-to-end owner/viewer journeys.
- Add export/deletion and account recovery policies.
- Complete narrow-phone and desktop visual QA, accessibility, install and offline QA.
- Verify Vercel deployment and real domain links separately from GitHub build checks.

**Acceptance:** documented evidence supports all production claims; known limitations are visible; no fake sync, upload, publication or delivery states.

## First working milestone

Do not begin with a full channel builder or every organiser feature. The first useful end-to-end milestone is:

1. Sign in with Google.
2. Create a Backpack.
3. See the profile with My Backpack and My Briefcase.
4. Switch Publish / Organise.
5. Create one announcement in Publish.
6. Create one private list in Organise.
7. Sign in on another device and recover both records.
8. Confirm the private list is not visible from the public viewing page.

This proves the product's core promise before adding complexity.
