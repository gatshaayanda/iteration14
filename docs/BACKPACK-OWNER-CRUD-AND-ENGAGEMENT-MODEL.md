# BACKPACK OS — Owner CRUD and engagement model

**Checkpoint:** 20 November 2026  
**Repository:** `gatshaayanda/iteration14`  
**Status:** owner-side first-pass implementation pushed to `main`; browser QA and CI/build verification remain required.

## Product model

A **Backpack** is the personal container and identity. It can contain multiple **engagements**. Each engagement has its own category, channel name, description, published material, people, circles, invitations, comments, requests and interaction settings.

The current browser-local registry represents this relationship with a stable `backpackId` on each saved engagement record. Existing records without a parent ID are assigned their own parent ID using the existing workspace ID and written back to the index. This preserves historical boundaries instead of accidentally merging two same-named Backpacks. New engagements inherit the selected parent ID. Each engagement retains its own content and access records. This is a migration-compatible first implementation; it is not yet a normalized cloud database.

## Owner workflow implemented

1. **Create / load:** the workspace chooser groups engagement records beneath their Backpack identity.
2. **Manage engagements:** the owner overview lists engagements in the active Backpack, switches between them, adds another engagement and previews the public channel.
3. **Published library:** each engagement has a library of its posts/resources. The owner can edit, publish, unpublish to draft, archive, republish or delete an item. Existing posts without a status are treated as published.
4. **Personal channel:** storefront and customer-account copy has been removed. The channel is a public or restricted personal engagement surface with a personal account entry.
5. **Structured category inputs:** the publishing form provides category-labelled line-item lists for projects, learning, household needs, travel, communities, hobbies, people, resources and creator programmes. Items render as a checklist; signed-in non-viewer participants can update completion from the channel in the current browser profile.
6. **Creator / TV / Entertainment:** the built-in category accepts video/stream URLs, M3U/M3U8 playlist links, GitHub project links and website/portfolio links. The optional Free-TV preset points to the upstream public playlist:
   `https://raw.githubusercontent.com/Free-TV/IPTV/master/playlist.m3u8`.
7. **Access roles:** invitations can be labelled Viewer, Participant, Contributor or Moderator; the owner is represented as Owner. The owner can change invite roles or revoke invitations. Role changes update existing local account records, and revoking an invitation preserves access granted independently by a VIP circle. Viewer accounts do not receive comment/request forms; signed-in non-viewer participants can update structured checklist items in the current browser profile. These are prototype UI rules only, not server-enforced security.

## Creator source facts

The [Free-TV/IPTV repository](https://github.com/Free-TV/IPTV) describes itself as an M3U playlist for free TV channels and instructs users to open the playlist in an IPTV player. It states that channels should be officially provided free to the public. BACKPACK therefore stores the playlist as an external source reference; it does **not** claim to host those streams or provide a built-in IPTV player.

- M3U/M3U8 is a playlist/source reference, not a video file.
- GitHub is useful for code, static assets, documentation and project links; it is not a streaming CDN.
- Browser playback of HLS/M3U streams needs a compatible playback layer and may be affected by CORS, codec support, geo-blocking and broadcaster terms.
- Do not automatically ingest, rehost or rebroadcast third-party streams. Verify the source and rights before publishing.
- The Free-TV preset is optional and is not pre-published into a creator's channel.

## Data and security truth

The app currently stores workspace and engagement records, posts, roles, invitations, circles, people, comments and requests in browser-local storage. UploadThing stores uploaded file bytes remotely; the records referring to those files remain local.

The role selector and public/VIP/invite-only controls improve the demo's organisation and visible behaviour, but the current owner word is demo-only and name matching is not identity verification. A different browser/device does not share the same records. Visitor actions are not delivered to the owner's device. Do not store sensitive information or represent the current controls as production permissions.

### Cloud persistence is a separate release gate

Do not turn on Firestore writes or broaden rules as a shortcut. Before shared multi-device persistence is enabled, implement and verify:

- Real user authentication and stable owner identity (not the demo word or anonymous browser identity).
- A documented Firestore schema for Backpacks, engagements, content, people, invitations, roles and participant contributions.
- Server-enforced owner/moderator/contributor/participant/viewer permissions, including per-engagement membership checks.
- Rules tests for cross-user reads/writes, invitation acceptance, role changes and owner-only destructive actions.
- A migration path from existing browser-local records with export/backup and conflict handling.
- Explicit offline/outbox semantics if participant actions should queue while offline.
- A data-retention and deletion story for uploaded media and records.

Until that work is complete, the browser-local prototype remains the source of truth for each browser profile.

## QA flow for the product owner

1. Open the workspace chooser and confirm existing workspaces are grouped under the same Backpack name.
2. Load the existing Household Projects engagement. Confirm the two existing published posts remain visible and unchanged.
3. Open owner control centre → Overview. Confirm engagement count, published count and engagement switcher.
4. Add a second engagement under the same Backpack. Return to the chooser and confirm it appears under the same Backpack group.
5. Switch between engagements and verify each retains its own posts, people, invitations, circles, comments and requests.
6. Open Engagement. Edit a published item, save it, and confirm the public channel reflects the edit.
7. Unpublish an item and confirm it disappears publicly but remains in the owner library as a draft. Republish it. Archive another item. Delete a test item and confirm the removal.
8. Use Preview public channel. Confirm it contains personal-channel language and no service storefront/customer-account sections.
9. Create a Home & Everyday Life update with several shopping items. Confirm they render as a checklist and owner completion state persists in the current browser.
10. Create a Creator / TV / Entertainment engagement. Try the Free-TV preset, a GitHub project URL and a video URL as separate examples. Confirm each source is labelled correctly and the playlist link is described as requiring a compatible player.
11. Invite test names with Viewer, Participant, Contributor and Moderator roles. Confirm roles are shown and viewer accounts do not see comment/request forms. Remember this is a same-browser demo, not a real security test.
12. Test refresh and offline reload. Confirm the new shell is installed after the user-approved Refresh flow and existing local records remain intact.

## Current implementation limits / next work

- Category-specific list entries are currently simple text + done state. Household quantity/unit, brand, store/aisle, priority, purchase cycles and member attribution remain future work.
- Projects need task assignment/due dates; learning needs modules/submissions; travel needs dated itinerary/packing/voting; communities need event/RSVP/volunteer capacity; creator needs programme/series/season catalogue, thumbnail metadata, player, EPG and moderation workflows.
- Contributor submissions, approval queues, reactions, notifications, follow/subscription delivery, scheduling and multi-user collaboration are not yet implemented.
- The current upload limits remain 4 MB images, 16 MB video and 4 MB PDF. This is not a streaming media pipeline.
- Keep the mobile owner experience compact. The published library must remain discoverable and must not be replaced by a count-only card.
- Do not change the protected BACKPACK PWA install journey or the paired 🎒 / 💼 dock while implementing these features.

## Verification commands

```bash
npm run verify:identity
npm run verify:offline
npm run verify:typography
npm run lint
npm run build
```

A commit or a pending Vercel deployment is not proof that these checks passed. Record actual CI/build results and device QA separately.
