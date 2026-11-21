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
6. **Creator / TV / Entertainment:** the built-in category is link-first. Creators host full videos on their chosen provider and paste shareable links into BACKPACK. Supported YouTube, Vimeo, Google Drive and PeerTube links show an embedded preview when the provider permits it; unsupported or blocked embeds retain an open-at-source link. Direct public MP4/WebM links can play in the browser. M3U/M3U8 playlists, GitHub projects and websites remain external references. The optional Free-TV preset points to the upstream public playlist:
   `https://raw.githubusercontent.com/Free-TV/IPTV/master/playlist.m3u8`.
7. **Access roles:** invitations can be labelled Viewer, Participant, Contributor or Moderator; the owner is represented as Owner. The owner can change invite roles or revoke invitations. Role changes update existing local account records, and revoking an invitation preserves access granted independently by a VIP circle. Viewer accounts do not receive comment/request forms; signed-in non-viewer participants can update structured checklist items in the current browser profile. These are prototype UI rules only, not server-enforced security.

## Input ownership and customer engagement handoff — 21 November 2026

Keep each input with the record it describes; do not duplicate parent Backpack identity fields inside an individual Space editor.

- **Backpack identity (shared by sibling Spaces):** Backpack / OS name, owner name and the optional connected i13 B.O.S. address. Save these together and propagate the shared identity across that Backpack's Spaces. The B.O.S. address is a local shortcut only, not data sync.
- **Space identity (one engagement):** category, Space name, description and optional welcome resource. The category is selected in setup or Space details, not independently reselected on every published update.
- **Publishing (one Channel item):** title, message, category-specific line items, optional source link and optional UploadThing attachment. New updates inherit the Space category. Existing legacy posts retain their saved category when edited. The public Channel shows published items only.
- **People and access (one Space):** visibility, Access word, invitations, roles and VIP circles. These settings do not belong to the Backpack parent.
- **Participation settings (one Space):** comment and contribution/request permissions remain owner-controlled. The customer Account exposes separate comment and contribution fields; contribution wording and examples follow the Space category and submissions remain in that Space's Inbox.
- **Customer handoff:** Channel item → “Select for My account” → applicable Space access checks → name-only account entry → selected item's full context/resources and permitted participation controls. Keep this Space-specific; switching Spaces clears prior identity and access verification.

This is a placement and handoff pass over the existing browser-local model. It does not add typed quantities, due dates, assignments, RSVPs, payment, cloud sync or server-enforced permissions. Those remain separate future capabilities requiring their own schema and verification.

## Customer Channel selection and account access

The visitor enters a Space's Channel first, selects a published item/resource/activity, completes the applicable access checks, and then enters **My account** for that item's Space. The account is the participation area for the selected Space, not a separate account for every post.

1. In the Channel, each published item has a **Select for My account** action.
2. Selecting an item triggers the Space's access check.
3. A Public Space with no Access word continues directly. A Public Space with a configured Access word asks for it. VIP and Access only Spaces require the owner's configured Access word.
4. After the Access word, the visitor enters their assigned name; existing VIP/invitation eligibility rules still apply.
5. The visitor participates within the selected Space's account. Switching Spaces clears the selected item, visitor identity and previous Access-word verification.

The Access word is configured per Space under **People → Who can enter?** and applies only to that Space. Visitor identity remains name-only. Access words and name matching are browser-local demo controls, not production security or cross-device authentication. The owner header's SELECT SPACE dropdown remains a separate owner/navigation control, not the customer item-selection affordance.

## Creator source and media responsibility

- BACKPACK is the creator's distribution and organisation layer, not a video host. It does not upload, transcode, store or stream full-length creator videos.
- UploadThing remains optional for channel artwork, thumbnails, PDFs and short clips/reels. The limits are 4 MB for images, 16 MB for short video clips and 4 MB for PDFs. The 16 MB limit is not a full-video allowance; creators should paste a hosted video link instead.
- Creator posts already have title, description, source link and optional uploaded image asset fields. The image asset can serve as channel artwork or a thumbnail; the provider-hosted video remains external.
- Link validation accepts HTTP(S). Known YouTube, Vimeo, Google Drive and PeerTube URL patterns get embedded previews; direct public MP4/WebM links use the browser video element. Provider privacy settings, CORS, geo restrictions, account permissions and embed policies may prevent playback, so the original link remains available as fallback.
- No third-party creator hosting subscription is mandated by BACKPACK. Creators choose their own host and its terms/limits.

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
10. Create a Creator / TV / Entertainment engagement. Test YouTube, Vimeo, Google Drive and PeerTube links for embedded previews and visible original-link fallbacks; test a direct public MP4/WebM URL, GitHub project and M3U playlist separately. Add an image thumbnail and optional short clip. Confirm full-length video is linked, not uploaded, and the 16 MB UploadThing video cap is described only for short clips/reels.
11. Invite test names with Viewer, Participant, Contributor and Moderator roles. Confirm roles are shown and viewer accounts do not see comment/request forms. Remember this is a same-browser demo, not a real security test.
12. Test refresh and offline reload. Confirm the new shell is installed after the user-approved Refresh flow and existing local records remain intact.

## Current implementation limits / next work

- Category-specific list entries are currently simple text + done state. Household quantity/unit, brand, store/aisle, priority, purchase cycles and member attribution remain future work.
- Projects need task assignment/due dates; learning needs modules/submissions; travel needs dated itinerary/packing/voting; communities need event/RSVP/volunteer capacity; creator needs programme/series/season catalogue, thumbnail metadata, player, EPG and moderation workflows.
- Contributor submissions, approval queues, reactions, notifications, follow/subscription delivery, scheduling and multi-user collaboration are not yet implemented.
- UploadThing supports optional 4 MB images, 16 MB short clips/reels and 4 MB PDFs. Full-length creator videos are hosted externally and linked into BACKPACK; there is no BACKPACK full-video hosting or streaming pipeline.
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
