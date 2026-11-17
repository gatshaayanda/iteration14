# iB Technical Foundation

## 1. Repository and deployment shape

- `gatshaayanda/iteration13` remains the Briefcase/B.OS application and standards reference.
- `gatshaayanda/iteration14` is the Backpack application.
- Admin Hub Global is a separate public platform and should not become an accidental source of application data or access rules.
- Each app may retain its own deployment and URL. iB's profile/switcher and shared identity connect them.

## 2. Shared identity requirement

For a genuinely seamless identity, both applications must authenticate against the same Firebase Authentication project. A Firebase UID is stable within one Firebase Auth project, not across unrelated Firebase projects.

Recommended initial model:
- One approved iB Firebase project as the shared identity authority.
- Both i13 and i14 use its Auth project and shared profile/space registry.
- The canonical profile key is `users/{uid}`.
- Account linking uses Firebase Auth provider linking; email is an attribute, not the identity key.
- Existing users/data in other Firebase projects are not automatically merged. Migration must be explicit, verified and reversible.

Google is the preferred first sign-in provider. Anonymous/guest sessions may be supported for low-friction participation only if later linked securely to a permanent identity; do not silently create duplicate profiles when upgrading sign-in.

## 3. Project/database selection — unresolved gate

Repository inspection found:
- Iteration 13's client Firebase config is environment-injected. Its source enables Firebase Auth, Firestore persistent local cache and Firebase Storage, but the documented Iteration 13 demo's main service/request data is browser-local and is not proof of a production Firestore schema.
- Iteration 13 has `firebase.json` pointing at `firestore.rules` and `firestore.indexes.json`, but no committed `.firebaserc` was found.
- Admin Hub Global's `.firebaserc` currently names Firebase project `adhubmvp`. Its checked-in Firestore rules include unauthenticated read/write allowances for some collections. Those rules are not suitable as iB's security baseline and must not be deployed for iB.
- The product owner reports an empty Admin Hub Global database and an existing Iteration 13 database. The exact Firebase project IDs, database IDs, regions and whether the Admin Hub Global database is the intended shared identity authority must be verified in Firebase Console before wiring either app.

Decision rule: do not guess or silently point i14 at an existing production database. Prefer one dedicated shared iB Firebase Auth/Firestore authority for both applications. If the existing empty Admin Hub Global Firebase project is selected, first verify the project and Firestore database, then replace/review its rules for iB's data model before connecting apps. Keep any legacy i13 database separate until a deliberate migration is planned.

## 4. Suggested Firestore model

The following is a starting schema, not deployed rules or a claim of existing collections:

- `users/{uid}`
  - displayName, photoURL, primaryEmail, provider metadata, createdAt, updatedAt, lastActiveSpaceId.
- `users/{uid}/spaceLinks/{spaceId}`
  - spaceId, spaceType (briefcase/backpack), role, status, createdAt.
- `spaces/{spaceId}`
  - ownerUid, type, title, slug, status, createdAt, updatedAt.
- `spaces/{spaceId}/members/{uid}`
  - role, invitation status, permissions, joinedAt.
- `spaces/{spaceId}/pages/{pageId}`
  - title, slug, page-level visibility, theme, publishedAt, ownerUid.
- `spaces/{spaceId}/content/{contentId}`
  - type (episode/video/announcement/post/document/resource), title, body, media metadata, status, visibility, createdBy, timestamps.
- `spaces/{spaceId}/audiences/{audienceId}`
  - membership/segment metadata and owner-controlled access.
- `spaces/{spaceId}/invitations/{invitationId}`
  - scoped invitation, expiry, revocation and intended recipient.
- `spaces/{spaceId}/contributions/{contributionId}`
  - comments, submissions, moderation state and author identity.
- `spaces/{spaceId}/lists/{listId}`, `projects/{projectId}`, `notes/{noteId}`, `records/{recordId}`
  - private Organise-mode data with explicit sharing metadata.
- `auditEvents/{eventId}` or per-space activity records for consequential permission, publishing and ownership changes.

Avoid putting every user's content in one public collection. Keep public read models separate from private owner data and generate public responses through a trusted access layer.

## 5. Security boundaries

- Default deny. Rules must validate UID ownership, space membership, role and permitted fields.
- Users can read/update their own profile fields, but cannot self-assign owner/admin roles or write arbitrary membership records.
- Space creation atomically creates the space and owner membership/space link.
- Invitations are created and redeemed through trusted server-side logic or tightly constrained transactions.
- Public content is readable only when published and visibility rules allow it.
- Unlisted content is served only through its intended link policy; high-sensitivity content should still require authentication.
- Password-protected content requires server-side verification, hashed secrets, rate limits and short-lived/revocable access grants.
- Comments/contributions are validated, rate-limited and moderated.
- Private Organise records are owner-only until explicitly shared.
- Cross-space actions check permissions on both source and destination.
- Do not trust client-supplied ownerUid, role, visibility, payment state or audit actor.
- Add emulator-based rules tests before production data is introduced.

## 6. Media and uploads

- Continue the approved UploadThing upload pattern; inspect its current configuration before adapting.
- Firestore stores media metadata, owner, space, content association, media type, file size, processing status and access policy.
- Do not store video bytes in Firestore.
- Validate file type, size and ownership; private media must not become publicly retrievable merely because a URL is known.
- Use secure delivery/access strategy for private media and support deletion/revocation.
- MVP: uploads and supported embeds; defer custom transcoding/live streaming until justified.

## 7. Cross-device and offline behavior

- Firestore persistent local cache can improve continuity on supported clients, but it is not a backup and does not prove every mutation has synced.
- Show distinct states: saved locally, queued, syncing, synced, failed and conflict needs review.
- Keep local cache/device data private to the authenticated user and handle sign-out/device sharing safely.
- Test second-device recovery by signing into the same Firebase Auth project and loading the same UID-owned spaces.
- Define conflict handling for edits from multiple devices. Never silently overwrite newer private records.
- Upload completion and Firestore metadata completion are separate states; handle partial failure and retry.
- Export/backup and account deletion/retention policies must be designed before public launch.

## 8. Required configuration (do not invent values)

Expected web configuration follows the existing Next.js Firebase environment pattern:
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` (only if the inherited code still requires it; confirm actual usage)
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` (optional)

Server-only credentials must never use `NEXT_PUBLIC_` names. Never commit credentials or service-account JSON. Use the minimum server capabilities needed.

## 9. Migration and compatibility

Do not assume the current Iteration 13 demo data should be migrated; its documented primary customer/admin flow is localStorage demo data. First classify any actual Firestore records in the user's existing i13 database. If real records exist, define a mapping and explicit owner-approved migration. Do not merge projects by matching email alone.

## 10. Acceptance checks

- Same Firebase Auth UID signs into i13 and i14.
- Profile shows only spaces the UID is authorised to access.
- A person can create a Backpack without creating a Briefcase.
- A person can create/connect a Briefcase without exposing Backpack records.
- Second device restores authorised cloud data after sign-in.
- Public, unlisted, password, invite-only and private access each pass positive and negative tests.
- Private files and content are not readable by unauthorised users even when URLs/IDs are known.
- Offline edits show accurate local/queued/synced states and conflict handling.
