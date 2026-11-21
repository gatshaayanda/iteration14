# BACKPACK OS — Category-specific Space engagement inputs

**Checkpoint:** 21 November 2026  
**Repository:** `gatshaayanda/iteration14`  
**Purpose:** Product specification and QA contract for making the customer account experience match the Space category and owner-selected participation settings.

## 1. Product rule

A Space category is not merely a label or a different placeholder. It selects an interaction template. The customer account must render the useful inputs and actions for that Space, while preserving the common account identity, access checks, permissions, and owner Inbox handoff.

Do not show every possible field to every customer. Show only the controls relevant to the active Space and the selected activity. The owner configures the Space; customers contribute to it. A published item may provide context, but the account is for the Space, not a separate account per post.

The existing generic Comment and Contribution textareas are insufficient as the complete interaction model. They may remain as optional discussion where enabled, but must not substitute for category-specific actions.

## 2. Research basis and design deductions

Research reviewed on 21 November 2026:

- YouTube channel layout supports distinct shelves for uploads, Shorts, playlists, live streams, posts and featured channels; YouTube Studio separately manages videos, Shorts, live content, playlists and community comments. This supports a creator Space organised around media formats and collections, not a generic text request. Sources: [YouTube channel layout](https://support.google.com/youtube/answer/3219384), [YouTube Studio on Android](https://support.google.com/youtubecreatorstudio/answer/7548152?co=GENIE.Platform%3DAndroid&hl=en), [Upload videos](https://support.google.com/youtubecreatorstudio/answer/57407).
- Netflix separates profiles, watchlists and viewing activity; a watchlist is an explicit save-for-later action, not a free-text message. BACKPACK should borrow the interaction pattern, not imply it provides Netflix licensing, catalogues or streaming. Sources: [Netflix My List](https://help.netflix.com/en/node/10523), [Netflix profiles](https://help.netflix.com/en/node/10421).
- Vimeo Showcases organise videos into shareable collections with privacy controls. This supports creator playlists/series as first-class collections. Source: [Vimeo Showcases](https://help.vimeo.com/hc/en-us/articles/12426259177105-How-to-create-a-showcase/).
- AnyList's official guide supports autocomplete, shared lists, per-list categories, item quantities, notes and category organisation. This supports structured grocery entries and list-level organisation. Sources: [AnyList getting started](https://help.anylist.com/articles/getting-started/), [AnyList per-list categories](https://help.anylist.com/articles/release-notes-anylist-v5-9/).
- Shared grocery-list research and product patterns emphasise quantity/unit, brand/pack size, store/aisle, notes, household collaboration and a clear purchased/remaining state. Sources: [Shared grocery list requirements](https://dash.harvard.edu/bitstreams/620a30a3-ecb6-4b18-a5c3-6619fb5c5e6d/download), [grocery list comparison](https://cookbookmanager.com/post/best-grocery-list-apps).
- Structured project forms are useful when a submission should become a trackable work item rather than remain an unstructured message. Source: [Teamwork project forms](https://support.teamwork.com/projects/forms/creating-forms-on-your-projects).

These references inform interaction patterns; they do not establish that BACKPACK already has cloud sync, third-party catalogue rights, streaming infrastructure, reminders or production authentication.

## 3. Shared interaction contract

Every category-specific submission must carry:
- stable Space/workspace ID and category;
- customer identity/name and role;
- selected published item ID when the journey began from an item (optional for general Space actions);
- submission type and structured payload;
- created/updated timestamps and a visible status;
- owner-visible source context in that Space's Inbox.

The customer should see a clear confirmation, retain entered values on validation failure, and be able to recognise whether a contribution is pending, accepted, completed or declined when that status is relevant.

Owner controls remain per Space:
- visibility and access;
- who can comment;
- who can contribute/request;
- role permissions and any approval requirement.

Viewer remains read-only. Do not bypass owner permissions by exposing a form simply because the category supports it.

## 4. Category interaction templates

### A. Projects & Ideas
Customer actions:
- add a task/milestone/idea;
- task title, details, optional due date, optional link/file;
- volunteer/offer help or ask for help;
- task status where participant permission allows it (not owner-only destructive actions).
Owner Inbox groups submissions as task/idea/help offer. Avoid adding assignments or due dates to the current prototype unless the matching fields and state are implemented end-to-end.

### B. Learning & Growth
Customer actions:
- ask a lesson question;
- submit a practice reflection or learning update;
- share a resource link/file;
- mark a published lesson/practice step complete where allowed.
Useful fields: lesson/module reference, contribution type, question/reflection, resource URL, optional attachment. Do not claim grading, certificates or course hosting.

### C. Home & Everyday Life — Grocery / household list
Customer actions:
- add a grocery/household item using structured fields: item name, quantity, unit, optional brand/variant, optional store/aisle, optional note, optional who it is for;
- confirm an existing requested item (with an explicit confirmation action);
- mark an item picked up/purchased only if the role permits it;
- report unavailable/substitute suggestion;
- optionally add a household task/chore with assignee and due date when that template is selected.

Owner setup controls for a recurring shopping cycle:
- cycle interval (for example every 7, 14 or 30 days, or a custom number);
- last completed shopping date or next planned shopping date;
- cycle label and optional preferred shop day.
Customer view should show next shop date and a readable countdown (for example “Next shop in 4 days”), plus the live list state. A cycle countdown is a date calculation, not proof that shopping happened; owner must explicitly mark a cycle complete to advance it. Never silently reset the list or mark items bought when the countdown reaches zero.

The list needs visible states such as Needed, Confirmed, In cart, Purchased, Unavailable, and optional Substitute suggested. Do not conflate “confirmed by family” with “purchased by shopper”.

### D. Travel & Experiences
Customer actions:
- suggest a destination/place;
- add itinerary entry with date/time, place/address or link, optional note;
- add packing item with quantity and optional owner;
- respond to a specific plan/event with Going / Not going / Maybe only when the owner has enabled attendance responses.
Do not imply reservations or live booking are made by BACKPACK.

### E. Communities & Causes
Customer actions:
- respond to an event (Going / Not going / Maybe) when enabled;
- volunteer for a role/shift;
- propose an activity or community issue;
- add a resource/location link.
Useful fields: event reference, response, volunteer role, availability/time window, note. Capacity and waitlists are later work unless implemented.

### F. Shared Interests & Hobbies
Customer actions:
- suggest an activity/meetup;
- vote on a proposed option/time when a poll is configured;
- share a recommendation/resource;
- RSVP when a specific event has attendance enabled.
Keep a recommendation distinct from a confirmed event.

### G. People & Connections
Customer actions:
- RSVP to a named occasion;
- submit a greeting, memory or photo/link;
- respond to an invitation;
- optionally indicate guest count or dietary/accessibility note only when the host asks for it.
Avoid collecting sensitive personal data by default.

### H. Resources & Collections
Customer actions:
- submit a resource title and URL/file;
- select a resource type (link, document, recipe, reference, image);
- add a short description/tags;
- suggest a correction or report a broken link.
Validate URLs and retain the original source link.

### I. Creator / TV / Entertainment
This is a curated creator channel, not a generic contribution form and not a claim that BACKPACK itself is a licensed DSTV/e.tv/Netflix replacement or video-streaming host.

Owner publishing inputs:
- content type: full video/episode, reel/short clip, live stream, playlist/channel, free-TV playlist/source, external project/site;
- title, description, thumbnail/artwork;
- hosted source URL for full video/live/playlist/external sources;
- optional UploadThing short clip/reel within the documented size limit; do not upload full-length videos as reels;
- series/playlist name and episode/sequence label where relevant;
- publish status and access visibility.
For the Free-TV preset, the existing public Free-TV/IPTV M3U source remains an external playlist reference. Verify source rights and regional availability; do not ingest, rehost or rebroadcast streams. A playlist URL is not a player or a guarantee that every channel works.

Customer account actions:
- browse by Videos / Reels / Live / Playlists / Free TV / External links;
- save an item to My Watchlist;
- suggest a programme/video/source using title, source URL (optional), type and why it should be added;
- report a broken/unavailable link;
- optionally comment on a specific item when comments are enabled.
Playback is provider-dependent. Preserve open-at-source fallback for unsupported or blocked embeds. Do not claim BACKPACK tracks actual watch progress unless that is separately built.

### J. Other / Something else
Owner must define a clear action label, prompt and a small set of fields before enabling structured contributions. Until configured, provide an optional general message only. Do not pretend an arbitrary category has a fully designed workflow.

## 5. Priority implementation sequence

1. Implement a typed, Space-scoped contribution record and Inbox rendering; preserve existing legacy comments/requests and migration compatibility.
2. Deliver the two reference templates first because they validate two fundamentally different engagement models:
   - Home & Everyday Life grocery list: structured items, family confirmation, purchased state, owner-controlled recurring cycle/countdown.
   - Creator / TV / Entertainment: media catalogue filters, watchlist, programme/source suggestions, broken-link reports, item-level comments; owner publishing metadata for full external media and short reels.
3. Add remaining category templates using the interaction definitions above, in focused increments with QA per template.
4. Only then consider cloud persistence, notifications, cross-device collaboration, background reminders or production-grade permission enforcement. Do not broaden Firestore rules or change PWA/offline foundations as part of this UI pass.

## 6. QA acceptance matrix

### Shared
- Each Space renders only its own category's customer actions.
- Switching Spaces clears selected item, customer identity and previous access verification as already specified.
- Viewer sees no contribution controls.
- Disabled comments/contributions stay hidden.
- Each submission is stored against the active Space, includes customer and item context, and appears in that Space's owner Inbox.
- Validation errors are next to fields; successful submissions show confirmation; failed saves do not clear entered values.
- Existing posts, people, invitations, circles, comments, requests and offline/PWA behaviour remain intact.

### Grocery
- Add item with quantity/unit, brand, store/aisle, note and intended household member.
- Add a minimal item with only its name.
- Confirm item as a family member; verify confirmer identity and status are visible.
- Mark as purchased as the shopper; verify this is distinct from confirmation.
- Test unavailable/substitute state.
- Configure a 7-day and custom cycle; verify countdown from the selected date.
- Mark cycle complete; verify next date advances correctly and no item is silently marked purchased.
- Test date boundary, overdue state and invalid/zero interval.

### Creator
- Publish a full video via external URL, a playlist, a live stream URL, a free-TV M3U source, and a short reel within the allowed UploadThing limit.
- Verify title/description/thumbnail, content-type shelves and series/playlist grouping.
- Verify embed preview where supported and open-at-source fallback when blocked.
- Customer saves/removes from Watchlist.
- Customer submits a programme suggestion with/without URL.
- Customer reports a broken link.
- Customer comments on an item only when enabled.
- Confirm creator Inbox shows submission type, source item, customer and URL.
- Verify no claim of full-video hosting, Netflix/DSTV/e.tv rights, cross-device watch history or guaranteed stream availability.

## 7. Prototype and release truth

Current BACKPACK engagement records and customer submissions are browser-local. This specification does not turn them into multi-device collaboration. UploadThing stores uploaded file bytes remotely, while references and most Space state remain local. Owner role/access controls are demo UI rules, not server-enforced security. Cross-device delivery, authenticated membership, real notifications and offline outbox semantics remain separate release gates.


## 8. Published-item engagement — additional implementation contract

The owner must control engagement at two distinct levels: Space defaults and individual published items. The published-item editor must expose independent switches for comments and reactions. Each item's values override the Space defaults without changing other items. The Space settings expose the default reaction enablement and the selected reaction vocabulary (Like, Love, Celebrate, Interesting, Helpful). General Space comments remain a separate Space-level setting.

Every participant-facing published item must render only its enabled interactions. Item comments must remain associated with the item title/ID in the local prototype; reactions must show counts and allow one active reaction per participant identity per item, with switching/removal. Creator / TV's comment action toggle and role eligibility must also gate item comments. Watchlist remains a private save-for-later action, separate from reactions and verified viewing.

Current prototype implementation is browser-local: per-item comment records are saved in the Space's local comment list and rendered against the matching item; reaction selections/counts are stored in localStorage per Space, item and participant identity. This is not cross-device shared engagement or server-enforced permission. Per-item audience/visibility overrides, moderation queue and shared authenticated records remain future database-dependent work.
