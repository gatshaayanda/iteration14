# BACKPACK OS — Engagement Input Master

**Purpose:** Single working reference for the owner-configurable actions and participant inputs in every Space category. Update this document whenever an action, field, permission, or submission contract changes.

**Implementation status:** This master describes the current browser prototype. It is not a claim that cross-device collaboration, secure server authorization, database persistence, file storage, or third-party media hosting is complete.

## 1. Shared owner configuration

Every Space stores an engagement configuration alongside its category:

- Enabled participant actions: owner selects which actions appear.
- Role eligibility per action: viewer, participant, contributor, moderator. Viewer is read-only by default for contributions; Creator watchlist saving is a personal viewer action.
- Owner review: optional. New contributions can be marked Pending for owner review. This is a local workflow marker, not a server-enforced approval gate.
- Confirmation text: custom confirmation for Custom actions.
- Optional general Space comments: separate from the category's structured actions.
- Category request: Custom / Something else includes a structured request for a new standard category.

The participant sees only actions enabled for their role. Category-specific controls are not replaced by a generic comment/request box.

## 2. Category input catalogue

### Projects & Ideas

| Participant action | Inputs |
|---|---|
| Submit an idea | Idea title (required); details (required); expected benefit (optional); reference link (optional) |
| Suggest a task | Task title (required); task details (required); suggested due date (optional) |
| Offer help | Help area (required); offer details (required); availability (optional) |
| Ask for help | Help request (required); details (required) |

### Learning & Growth

| Participant action | Inputs |
|---|---|
| Ask a lesson question | Lesson/topic (optional); question (required) |
| Submit a reflection | Lesson/topic (optional); reflection (required) |
| Submit practice | Practice activity (required); response/evidence (required) |
| Share a learning resource | Resource title (required); URL/file link (required) |
| Mark lesson complete | Lesson/activity (required) |

### Home & Everyday Life

**Grocery item:** item name (required), quantity (default 1), unit, brand, store/aisle, who it is for, note.

**Grocery lifecycle:** Needed → Confirmed → In cart → Purchased, with Unavailable and Substitute suggested states. Confirmation and purchase identities are tracked separately. A substitute captures the suggested replacement.

**Household chore:** chore title (required), details, assignee, due date. Chores can be marked complete with the completing identity.

**Recurring shop cycle (owner):** cycle label, interval in days, next scheduled date. Countdown/overdue state is shown. Explicit cycle completion advances from the scheduled date to the next future interval and does not clear the list.

### Travel & Experiences

| Participant action | Inputs |
|---|---|
| Suggest destination | Destination/activity (required); reason (required); useful URL (optional) |
| Add itinerary entry | Place/activity (required); date (required); time (optional); address/map link (optional) |
| Add packing item | Item (required); quantity (optional); traveller responsible (optional) |
| Vote in a poll | Poll/question (required); choice (required) |
| RSVP to an event | Event (required); response: Going / Not going / Maybe |

### Communities & Causes

| Participant action | Inputs |
|---|---|
| RSVP to an event | Event (required); response: Going / Not going / Maybe |
| Volunteer for a shift | Role/shift (required); availability (required) |
| Propose an activity | Activity title (required); description (required); suggested date (optional) |
| Report a community issue | Issue (required); details (required) |
| Share a resource | Resource title (required); URL/file link (required) |

### Shared Interests & Hobbies

| Participant action | Inputs |
|---|---|
| Recommend something | Recommendation (required); reason (required); link (optional) |
| Suggest an activity | Activity (required); suggested date (optional); place (optional) |
| Vote in a poll | Poll/question (required); choice (required) |
| RSVP to a meetup | Meetup (required); response: Going / Not going / Maybe |

### People & Connections

| Participant action | Inputs |
|---|---|
| Respond to an invitation | Invitation (required); response: Accept / Decline / Maybe |
| RSVP to an occasion | Occasion (required); response: Going / Not going / Maybe; guest count (optional) |
| Send a greeting | Greeting message (required) |
| Share a memory | Memory title (optional); memory (required) |
| Suggest an arrangement | Suggestion (required); date (optional) |

### Resources & Collections

| Participant action | Inputs |
|---|---|
| Submit a resource | Resource title (required); URL/file link (required); resource type (required); description (optional); tags (optional) |
| Suggest a correction | Resource title/reference (required); correction (required) |
| Report a broken link | Resource title/reference (required); issue (required) |
| Recommend a collection item | Item title (required); reason (required); link (optional) |

### Creator / TV / Entertainment

**Owner publishing metadata:** title, description, source type, external source URL, optional artwork/thumbnail or supported short-clip attachment. Source types include full video/episode, reel/short clip, live stream, playlist/channel, M3U/M3U8 playlist, GitHub project, and website/portfolio.

**Participant actions:**
- Save to My Watchlist (personal account action).
- Suggest something to add: title, type, source URL, reason.
- Report a broken link: select published item, issue.
- Comment on a media item: select published item, comment (when general comments are enabled).

**Presentation:** published content is grouped into shelves based on its type. Free-TV playlist URLs remain external source references. BACKPACK does not claim to host or license third-party channels, re-broadcast streams, or guarantee third-party availability. Full videos remain on their chosen platform; optional short clips are subject to the existing upload size/type limits.

### Other / Something else (Custom)

Owner defines:
- Participant action label.
- One or more fields, each with label, type, and required/optional setting.
- Supported field types: short text, long text, number, date, time, URL, single choice, multiple choice, yes/no, and file link (URL).
- Choice options for single/multiple choice.
- Confirmation message.
- Enabled roles and owner-review preference.

The participant receives a form built from those fields.

**Request a new standard category:** proposed category name, purpose, participant actions needed, and why existing categories do not fit. Requests are marked Pending and saved locally in this prototype until the shared database is connected. They are not yet globally searchable or automatically promoted into the category catalogue.

## 3. Shared submission record contract for the database

Each participant action should eventually write a normalized record with:

- `submissionId`, `spaceId`, `backpackId`
- `categoryKey`, `actionKey`, `schemaVersion`
- `actorUserId`, `actorRole`, display identity snapshot
- Optional `targetItemId` / `targetPostId`
- Typed `payload` matching the action's field schema
- `createdAt`, `updatedAt`
- `reviewStatus`: received / pending / approved / declined
- `completionStatus` where the action has a lifecycle
- Audit metadata for status changes and the user who made them

The database must validate the actor's membership, role, Space visibility and action permission on the server. Local browser state is not an authorization boundary. Do not treat a hidden button or local role value as security.

## 4. Database-ready category request record

A submitted category request should eventually include:

- `requestId`, `requestedByUserId`, `backpackId`, `spaceId`
- `proposedCategoryName`, normalized `categoryKey`
- `purpose`, `participantActions`, `gapAgainstExistingCategories`
- `status`: pending / reviewing / accepted / declined / needs-clarification
- `createdAt`, `reviewedAt`, `reviewedBy`, `decisionNotes`

Accepted requests should be reviewed and added to the shared category registry with a versioned action/field schema before they become selectable standard categories.

## 5. Current prototype boundaries and remaining work

- Space configuration and structured submissions currently persist in browser-local storage.
- Category requests are local to the browser and are visible in that Backpack owner's local Inbox only.
- No cross-device sync or production server-enforced membership/role authorization yet.
- Custom file fields currently collect a file URL/link; they are not a new upload pipeline.
- Owner review is a status workflow marker, not a secure moderation gate.
- Participant edit/withdrawal, server audit history, shared category registry, database schema migrations, and server-side validation remain database-phase work.

## 6. Change-control checklist

When changing a category:
1. Update this master document.
2. Update the category action definitions and default role map.
3. Update the participant input schema and validation.
4. Update the owner configuration UI if a new setting is required.
5. Update owner Inbox rendering and lifecycle/status handling.
6. Update `scripts/verify-identity.mjs` and `scripts/verify-offline.mjs`.
7. Test owner setup, participant permissions, private/VIP access, mobile layout and offline reload.
8. Confirm local prototype boundaries are still accurately described.
