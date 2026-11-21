# BACKPACK OS — Creator Studio QA Milestone

**Status:** Implemented on branch feat/creator-channel-studio-qa; browser-local prototype; awaiting automated verification and product-owner QA.

## Product objective

**Let creators design channels.**

A Creator / TV / Entertainment Space is not a fixed Backpack-branded television service. The Backpack owner/Creator defines the channel identity, visual treatment, programming arrangement, audience and participation rules. Backpack OS supplies the tools and preserves the normal Backpack, Space, account, access and owner-workspace model.

## Owner journey

1. Create or load a Backpack and create a Space in **Creator / TV / Entertainment**.
2. Open the private Backpack owner workspace.
3. Choose **Creator Studio** from the owner navigation.
4. Set the channel name and description. These update the Space's existing title and description fields.
5. Choose a starting arrangement: General entertainment, News & current affairs, Music & performance, Learning & knowledge, Community television or My own mix.
6. Choose accent, border and background colours. A live sample preview reflects the channel identity; readable foregrounds remain protected.
7. Enable/disable and reorder sections: Live now, Programme guide, Featured programmes, Videos, Reels, Free TV, Playlists and External projects.
8. Publish channel items in the existing content library. Full videos remain hosted by the Creator's chosen provider; UploadThing remains limited to artwork, short clips/reels and small documents under the existing size limits.
9. Schedule published items with start date/time, duration and an audience level (everyone who can enter the Space, signed-in participants and above, or moderators/owner).
10. Configure channel-wide exploration, watchlist, suggestions, broken-link reports, comments and reactions. Published-item comment/reaction controls continue to apply as item-level restrictions.
11. Preview the channel from Creator Studio. The preview uses the owner identity so private Spaces and restricted schedule entries can be inspected.

## Participant journey

- Creator Spaces render as a channel experience on the Channel screen, not the generic updates feed.
- Participants see the Creator's chosen section order, programme guide, scheduled items and enabled library browsing.
- Each published programme retains **Select for My account**.
- Supported existing video embeds/direct video previews and open-at-source fallbacks remain available in the general published channel path. Creator shelf cards retain the original-source link; they do not promise that every external source plays in-app.
- The programme guide shows Creator-authored scheduled entries, including time, duration, status and the configured audience. It is not a verified third-party EPG.
- Item comments and reactions remain separately gated by channel permissions, per-item settings and the existing participant-role checks.
- Watchlist, comments, reactions and channel records remain browser-local.

## Current controls

| Control | Behaviour |
|---|---|
| Channel name and description | Update the Space title and description |
| Accent, border, background | Apply to Creator Studio preview and participant channel surfaces |
| Preset arrangement | Applies a starting set/order of channel sections; Creator can change it |
| Section enablement/order | Controls visible channel shelves and programme guide order |
| Programme schedule | Adds published items with start time, duration and audience level |
| Explore shelves | When disabled, hides library browsing and leaves the configured programme guide |
| Watchlist | Shows/hides save-for-later action |
| Suggestions / broken-link reports | Shows/hides participant contribution forms, still subject to existing action-role settings |
| Comments / reactions | Channel-wide switches combine with published-item switches and existing participation checks |

## QA acceptance

### Owner setup and identity
- [ ] Create a new Creator Space and confirm the Creator Studio navigation appears only for this category.
- [ ] Change the channel name and description; save, leave and reload the Space; verify they persist in this browser.
- [ ] Change each colour and verify the live preview and participant channel use the selected values.
- [ ] Choose each preset and verify the section arrangement changes; manually enable, disable and reorder sections.
- [ ] Confirm the Creator's channel name is not hard-coded to a sample name such as Backpack TV.

### Programming
- [ ] Publish at least one video/episode, reel, live link, playlist, M3U playlist and external project.
- [ ] Add a schedule entry for a published item; reject missing items, missing times and past start times.
- [ ] Verify duration and audience settings persist.
- [ ] Verify the guide sorts by start time and correctly labels upcoming, currently scheduled and past entries.
- [ ] Sign in with Viewer, Participant and Moderator demo identities and verify audience-specific programme visibility.
- [ ] Remove a schedule entry and confirm the published content itself remains in the library.

### Participant permissions and journey
- [ ] Preview the channel as owner and confirm the configured sections, branding and guide.
- [ ] Enter through the normal Channel → select published item → access check → My account flow.
- [ ] Verify every published item offers **Select for My account**.
- [ ] Disable Explore and confirm library shelves are hidden while the permitted programme guide remains.
- [ ] Disable Watchlist and verify save actions disappear.
- [ ] Disable suggestions and broken-link reports separately and verify each corresponding form disappears.
- [ ] Disable comments and reactions separately; verify they disappear even when an individual item allows them.
- [ ] Enable channel comments/reactions but disable them on one published item; verify item-level restrictions win.
- [ ] Verify Viewer, Participant and Moderator role restrictions and that comments remain visible even when the viewer cannot submit.
- [ ] Verify comments, reactions and watchlist remain tied to the correct item and current browser profile.

### Regression
- [ ] Verify Grocery & Everyday Life still renders its existing specialised tools.
- [ ] Verify non-Creator categories still render their existing channel/feed and account experiences.
- [ ] Verify existing Creator Spaces without a creatorChannel record receive safe defaults when loaded; no existing posts are overwritten.
- [ ] Verify Create or Load → setup → Channel, owner access, owner navigation, i13 B.O.S. dock and published-content CRUD.
- [ ] Verify PWA install, offline shell and service-worker behaviour remain unchanged.

## Boundaries and known limitations

- This is a **browser-local QA prototype**, not production authentication or secure authorization. Channel settings, audience restrictions, roles, schedule, comments, reactions and watchlist are not server-enforced and do not sync across devices.
- No Firebase persistence or Firestore rules changes are included. Production sharing requires the documented authentication/schema/security migration gate.
- Full videos are link-first and remain hosted by the Creator's selected provider. UploadThing remains limited to existing artwork/short-clip/document constraints.
- M3U/M3U8 playlist links, GitHub projects and websites remain external sources. This milestone does **not** parse IPTV playlists into channel lineups, provide an IPTV/HLS player, fetch XMLTV/EPG data or rebroadcast third-party streams.
- The programme guide is a Creator-authored schedule using published Backpack items; it does not claim to reproduce a broadcaster's live EPG.
- DStv/e.tv and other third-party broadcasters may only be linked/embedded where their official terms and technical support permit it. No paid channel rebroadcast or content-rights claim is made.
- A successful GitHub merge is not proof of Vercel deployment. Deployment and real-device QA must be verified separately.

## Objective-to-screen-to-test trace

| Objective | Screen | Acceptance evidence |
|---|---|---|
| Define channel identity | Creator Studio → Channel identity | Name/description save and reappear |
| Make channel recognisable | Creator Studio → Appearance | Selected palette appears in preview and viewer surface |
| Curate viewing experience | Creator Studio → Arrangement | Section visibility and order match participant channel |
| Programme content | Creator Studio → Schedule | Scheduled items, times, durations and audience render correctly |
| Control participation | Creator Studio → Viewer permissions | Browse, watchlist, suggestions, reports, comments and reactions are independently gated |
| Preserve Backpack journeys | Channel / My account / owner workspace | Existing selection, access, roles and other categories remain intact |
