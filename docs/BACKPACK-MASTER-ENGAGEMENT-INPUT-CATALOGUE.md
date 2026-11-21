# BACKPACK OS — Master Engagement Input Catalogue & Owner UX Standard

**Status:** Product source of truth for category configuration and participant input design  
**Updated:** 21 November 2026  
**Repository:** `gatshaayanda/iteration14`  
**Companion:** `BACKPACK-CATEGORY-ENGAGEMENT-INPUT-SPEC.md`

This document is the canonical inventory of inputs, actions, permissions, validation and owner configuration for every BACKPACK Space category. Update this document whenever a field, action, permission or participant workflow changes. Implementation and QA must reference the same definitions.

## 1. Experience objective

Move BACKPACK from an exciting but disorienting prototype into a calm, guided personal operating environment. A first-time owner should understand:

1. What a Space is.
2. Who it is for.
3. What people will see.
4. What people can do.
5. What information they will be asked to provide.
6. Who can do each action.
7. What happens after they submit.

The owner configures the Space once. Participants should then encounter a focused, category-specific experience, not a generic request textarea.

## 2. Core information architecture

Keep these concepts separate and label them consistently:

- **Backpack:** the personal container and identity shared by its Spaces.
- **Space:** one engagement with its own category, audience, content and participation rules.
- **Channel:** the published, visitor-facing view of a Space.
- **My account:** the participant's Space-specific participation area.
- **Owner workspace:** private management for Spaces, people, settings and Inbox.
- **Published item:** a post, resource, programme, activity or announcement inside a Space.
- **Contribution:** a structured action submitted by a participant.
- **Category:** selects the default engagement template; it is not just a label.

Do not use ambiguous actions such as “Select for My account” without explaining that the person is opening the selected Space in their account. Do not create an account per published item.

## 3. Guided owner journey

Use a short, predictable sequence with a clear outcome at each step. Do not put every advanced setting on the first screen.

### Step 1 — Identify the Space
Required:
- Category.
- Space name.
- One-sentence purpose.

Optional:
- Welcome message.
- Welcome resource/link or artwork.

If this is the first Space in a new Backpack, also collect Backpack name and owner name. When adding a sibling Space, inherit the existing Backpack identity and do not ask again.

### Step 2 — Define the experience
Show a category-specific preview and the actions available for that category. The owner selects which actions to enable. Each action must explain what participants can do and what information they will submit.

### Step 3 — Configure the audience
- Public.
- Link/access-word protected.
- Invited people only.
- Selected VIP circles.

Explain the difference between viewing and participating. Never imply that a browser-local demo access word is production authentication.

### Step 4 — Configure participation
For each enabled action:
- Who can use it: owner, moderator, contributor, participant.
- Whether owner approval is required.
- Whether participants can edit or withdraw their own submission.
- Whether the action is open to all eligible members or selected roles.

Viewer is read-only. Do not expose contribution controls to viewers.

### Step 5 — Review and publish
Show a plain-language summary:
- Space name and category.
- Who can see it.
- Who can contribute.
- Enabled actions.
- Required participant fields.
- What happens after submission.

Offer “Preview as participant” and “Create Space”. Keep the existing channel/account/access journey intact.

## 4. Category catalogue — owner configuration and participant inputs

The lists below are the master inventory. Fields marked **required** must be present before that action can be submitted. Optional fields should stay optional unless the owner deliberately changes the requirement and the resulting form explains why.

### 4.1 Projects & Ideas

**Purpose:** Move a shared project, plan or idea forward.

Owner configuration:
- Project goal / brief.
- Enable ideas, tasks, milestones, help offers, comments.
- Optional target date.
- Optional approval for new ideas/tasks.
- Optional task assignment and due-date permissions.
- Choose whether contributors may update task status.

Participant actions and fields:
- **Submit an idea:** idea title (required), description (required), optional link/file, optional expected benefit.
- **Suggest a task:** task title (required), details, optional due date, optional reference link.
- **Offer help:** area/task (required), what help is offered (required), availability (optional).
- **Ask for help:** request title and details (required), optional deadline.
- **Comment:** comment text (required), linked to the selected item where applicable.

Owner/moderator controls: review, accept/decline, assign, update milestones, close. Do not expose destructive project controls to ordinary participants.

### 4.2 Learning & Growth

**Purpose:** Share learning material, practice and progress.

Owner configuration:
- Learning goal and optional timeframe.
- Modules/lessons or a simple resource library.
- Enable lesson questions, practice reflections, resource sharing and completion markers.
- Decide whether submissions need review.
- Decide whether progress is visible to other members or only the owner/learner.

Participant actions and fields:
- **Ask a lesson question:** lesson/module (required when lessons exist), question (required).
- **Submit reflection:** topic/lesson (optional), reflection (required).
- **Submit practice:** activity (required), response or evidence (required), optional file/link.
- **Share a resource:** title (required), URL or file (required), resource type, description.
- **Mark complete:** lesson/activity reference (required), completion confirmation.

Do not imply grading, accredited certificates or full course-hosting capabilities unless separately implemented.

### 4.3 Home & Everyday Life

**Purpose:** Coordinate household needs, shared shopping and everyday responsibilities.

Owner configuration:
- Household/Space purpose.
- Enable grocery list, household tasks/chores, shared notes.
- Who may add/edit items.
- Whether new items require approval.
- Who can mark items in-cart, purchased, unavailable or substitute.
- Recurring cycle interval and next planned date.
- Optional preferred shopping day, cycle label and archive policy.

Participant actions and fields:
- **Add grocery item:** item name (required), quantity, unit, brand/variant, pack size, store/aisle, priority, intended person, note.
- **Confirm need:** item reference (required), confirmation.
- **Mark purchased:** item reference (required), purchased confirmation; record actor and time.
- **Report unavailable:** item reference (required), reason, optional substitute.
- **Suggest substitute:** original item (required), replacement (required), optional note.
- **Add chore:** task name (required), details, optional assignee, due date and recurrence.
- **Complete chore:** task reference (required), completion note (optional).

Keep family confirmation separate from shopper purchase. Countdown reaching zero does not mean shopping happened. Only an explicit owner/authorised shopper completion action advances the cycle. Do not silently clear or mark items purchased.

### 4.4 Travel & Experiences

**Purpose:** Plan trips, outings and shared experiences.

Owner configuration:
- Destination(s), trip/event dates.
- Enable itinerary, destination suggestions, packing list, polls and RSVP.
- Decide who can edit itinerary entries.
- Decide whether cost estimates are enabled and who can see them.
- Optional traveller group and approval rules.

Participant actions and fields:
- **Suggest destination/activity:** name (required), place or URL (optional), reason/note.
- **Add itinerary entry:** activity/place (required), date (required if trip dates are configured), time, address/map link, note.
- **Add packing item:** item name (required), quantity, optional assigned traveller.
- **Vote:** poll/option reference (required), selected option (required).
- **RSVP:** event reference (required), Going / Not going / Maybe, optional guest count or note.

BACKPACK does not make reservations or guarantee live travel information through these inputs.

### 4.5 Communities & Causes

**Purpose:** Organise community participation, events and volunteer action.

Owner configuration:
- Community purpose and optional location.
- Enable announcements, events, attendance, volunteer shifts, proposals and resources.
- Define volunteer roles/shifts.
- Optional capacity and approval workflow; capacity/waitlists only if implemented.
- Decide who can create events and moderate submissions.

Participant actions and fields:
- **RSVP:** event reference (required), Going / Not going / Maybe, optional note.
- **Volunteer:** role/shift (required), availability (required), optional note.
- **Propose activity:** title (required), description (required), optional date/place.
- **Report community issue:** topic (required), details (required), optional location/photo.
- **Share resource:** title and URL/file (required), description.

### 4.6 Shared Interests & Hobbies

**Purpose:** Help a group discover, discuss and organise shared interests.

Owner configuration:
- Interest/topic.
- Enable recommendations, activity suggestions, meetups, polls and RSVP.
- Optional event calendar or recurring meetup settings.
- Decide whether members can create polls or only vote.

Participant actions and fields:
- **Recommend:** title (required), description, optional URL/image, category/tag.
- **Suggest activity:** activity (required), proposed date/time and place (optional), note.
- **Vote:** poll reference (required), option (required).
- **RSVP:** event reference (required), Going / Not going / Maybe.
- **Comment:** text (required), linked to an item/activity where possible.

A recommendation is not automatically a confirmed event.

### 4.7 People & Connections

**Purpose:** Coordinate invitations, celebrations and shared memories.

Owner configuration:
- Occasion or relationship context.
- Enable invitations, RSVP, greetings, memories and photo/link contributions.
- Decide who can view submitted memories.
- Optional guest-count and dietary/accessibility questions; never collect these by default.

Participant actions and fields:
- **RSVP:** occasion/event reference (required), response (required), optional guest count.
- **Greeting:** message (required), optional image.
- **Share memory:** title/caption (optional), memory text or media (required), optional date.
- **Respond to invitation:** invitation reference (required), response.
- **Suggest arrangement:** suggestion (required), optional date/time.

Avoid collecting sensitive personal details unless the host has a clear need and explains it.

### 4.8 Resources & Collections

**Purpose:** Build and maintain a shared library.

Owner configuration:
- Collection purpose and resource types.
- Enable submissions, corrections, tags, comments and broken-link reports.
- Choose allowed resource types and whether files are accepted.
- Decide whether new resources publish immediately or await approval.

Participant actions and fields:
- **Submit resource:** title (required), URL or file (required), resource type (required), description, tags.
- **Suggest correction:** resource reference (required), correction details (required).
- **Report broken link:** resource reference (required), issue type (required), optional note.
- **Recommend collection item:** title (required), reason, optional URL/file.
- **Comment:** text (required), linked to resource.

Validate URLs, preserve the original source and distinguish uploaded files from external links.

### 4.9 Creator / TV / Entertainment

**Purpose:** Curate a creator channel and its media catalogue. BACKPACK is an organisation/distribution layer, not a licensed TV service or full-video host.

Owner configuration:
- Channel name, description and artwork.
- Channel format: on-demand library, programme schedule or mixed.
- Enable Videos, Reels, Live, Playlists/Series, Free-TV source and External projects shelves as relevant.
- Enable watchlist, programme suggestions, broken-link reports, item comments.
- Decide who can submit suggestions and whether approval is required.
- Choose access visibility per Space; item-level restrictions are a later extension unless explicitly implemented.

Owner publishing fields:
- Content type (required): full video/episode, reel/short clip, live stream, playlist/channel, M3U/M3U8 source, GitHub project, website/portfolio.
- Title (required).
- Description.
- Thumbnail/artwork.
- External source URL (required for externally hosted media).
- Optional series/playlist, season/episode or sequence.
- Optional duration and audience note.
- Publish state.
- Optional short clip upload only within the configured UploadThing limit.

Participant actions and fields:
- **Browse:** category/shelf and item metadata.
- **Save to My Watchlist:** item reference (required); allow remove.
- **Suggest programme/source:** title (required), type (required), optional URL, reason.
- **Report broken link:** item reference (required), issue type (required), optional details.
- **Comment on item:** item reference (required), comment text (required).

Full videos remain hosted externally. M3U/M3U8 is a playlist reference, not a guaranteed built-in player. Do not ingest, rehost or rebroadcast third-party streams without rights. Preserve open-at-source fallback where embeds are blocked.

### 4.10 Custom / Something else

**Purpose:** Let an owner define a Space that does not fit a standard template, and request a new shared category.

Owner custom-builder inputs:
- Custom Space name and purpose.
- Participant action name (required).
- Prompt/instructions (required).
- One or more custom fields with: label, field type, required/optional, help text, choice options where applicable.
- Optional submission approval.
- Who can submit and whether participants can edit/withdraw.
- Optional confirmation text and owner Inbox label.

Supported field types for the eventual builder:
- Short text.
- Long text.
- Number.
- Date.
- Time.
- Single choice.
- Multiple choice.
- URL.
- File/image.
- Yes/no confirmation.

Custom category request inputs:
- Proposed category name (required).
- What it is for (required).
- Intended audience/users (optional).
- What participants should be able to do (required).
- Example fields/actions (optional).
- Why the existing categories do not fit (required).
- Optional example Space.

A category request is not an immediately published category. It enters a review queue with Pending / In review / Accepted / Declined status. After database integration, accepted categories can become centrally available to all Backpack owners. Keep owner-defined Custom Space schemas separate from globally shared category catalogue entries.

## 5. Shared participation settings

For every category and every enabled action, configure:
- Enabled / disabled.
- Eligible roles.
- Approval required / direct submission.
- Required fields.
- Participant edit/withdraw policy.
- Owner Inbox destination.
- Confirmation message.
- Status vocabulary, if the action has a lifecycle.

Common statuses should be meaningful to the workflow (for example Pending, Approved, In progress, Completed, Declined). Do not force one universal status set onto every category.

## 6. Canonical contribution data contract

Every submission should eventually be represented as a typed, Space-scoped record:

- `id`
- `backpackId`
- `spaceId`
- `categoryId`
- `actionId`
- `submissionType`
- `actorId` (stable authenticated identity; not a display name)
- `actorDisplayName`
- `actorRoleAtSubmission`
- `publishedItemId` (nullable)
- `payload` (typed fields)
- `status`
- `approvalRequired`
- `createdAt`
- `updatedAt`
- `reviewedBy` / `reviewedAt` (nullable)

Keep the browser-local prototype honest: localStorage is not cross-device sync or an authorisation boundary. Database migration requires real authentication, server-enforced membership/roles, rules tests, data migration and offline/outbox semantics.

## 7. Owner workspace information architecture

Reorganise the owner workspace around five predictable destinations:

1. **Overview** — what is happening, quick actions, setup completeness.
2. **Spaces** — create/switch/edit/publish/preview Spaces.
3. **People** — invitations, roles, VIP circles and access.
4. **Inbox** — typed contributions, comments, approvals and status.
5. **Settings** — Backpack identity and Space-level interaction configuration.

Within a Space's settings, group controls in this order:
- Experience (category-specific actions and fields).
- Audience (visibility/access).
- Participation (roles, approval, edit policy).
- Notifications (only when real delivery exists).
- Data & privacy (prototype truth, retention/export once supported).

Avoid placing the same setting in multiple tabs. Use one clear source of truth per setting.

## 8. Participant journey and feedback

Participant flow:
1. Open the Channel.
2. Understand the Space purpose and audience.
3. Select the relevant published item or Space action.
4. Complete access checks.
5. Enter the Space account.
6. See a short orientation explaining what they can do.
7. Complete one focused action.
8. Review and submit.
9. Receive a clear confirmation and status.
10. Return to the Space without losing context.

Do not use empty forms or silent buttons. If an action is disabled, explain why. Keep entered values after validation failures. Show field-level errors and a concise error summary when submission fails. Confirm successful local saves honestly as “Saved on this device” where that is the actual behaviour.

## 9. UX research principles translated into BACKPACK rules

- **Progressive disclosure:** show only the settings relevant to the selected category and current task; keep advanced controls behind clearly named sections.
- **Recognition over recall:** use concrete action names, examples and visible previews instead of expecting owners to remember what each setting does.
- **One decision at a time:** group Space identity, experience, audience, participation and review into distinct stages.
- **Clear information scent:** button labels must predict the next screen and outcome.
- **Prevent and recover from errors:** label fields, explain requirements, validate on submit, retain entered values and explain how to fix errors.
- **Mobile-first task focus:** short sections, readable labels, thumb-friendly controls and no long undifferentiated admin forms.
- **Preview before publish:** owners should be able to see the participant experience before inviting people.

Research references:
- Nielsen Norman Group, Progressive Disclosure: https://www.nngroup.com/articles/progressive-disclosure/
- Nielsen Norman Group, Reducing Cognitive Load in Forms: https://www.nngroup.com/articles/4-principles-reduce-cognitive-load/
- GOV.UK, Designing Good Questions: https://www.gov.uk/service-manual/design/designing-good-questions
- GOV.UK Design System, Checkboxes and conditional reveal: https://design-system.service.gov.uk/components/checkboxes/
- GOV.UK Design System, Error messages: https://design-system.service.gov.uk/components/error-message/
- UK Parliament Design System, Designing Forms: https://designsystem.parliament.uk/how-tos/designing-forms/

These are design principles and research references, not a claim that a particular design has already been usability-tested with BACKPACK users.

## 10. QA acceptance checklist

For each category:
- [ ] Owner sees a category-specific configuration panel.
- [ ] All supported actions can be enabled/disabled.
- [ ] Required fields are visible and clearly marked.
- [ ] Owner can configure eligible roles and approval.
- [ ] Preview matches the configured participant experience.
- [ ] Participant sees only enabled actions.
- [ ] Viewer sees no contribution controls.
- [ ] Submission is attached to the correct Space and published item.
- [ ] Owner Inbox identifies the action, actor and payload.
- [ ] Validation failure preserves entered values.
- [ ] Successful submission shows truthful confirmation.
- [ ] Access restrictions are preserved.
- [ ] Existing Spaces and legacy data remain readable.
- [ ] Offline/PWA shell and install behaviour remain unchanged.

Custom:
- [ ] Owner can define a custom action and typed fields.
- [ ] Required fields validate.
- [ ] Custom submissions appear in the correct Inbox.
- [ ] Owner can submit a new category request.
- [ ] Request has a review status and is not automatically published as a global category.

## 11. Implementation status discipline

This catalogue describes the intended complete system. It must not be used to imply every listed action is currently implemented. Track each action as:
- **Live:** implemented end-to-end in the current prototype.
- **Configured:** owner can set it and participant experience consumes that setting.
- **Designed:** specified here but not implemented.
- **Database-dependent:** requires authenticated shared persistence or server-side enforcement.

Update this status as implementation changes. Do not expose a control labelled as configured if it does not change the participant experience.


## 12. Implementation snapshot — guided engagement milestone

This snapshot describes the guided-engagement implementation branch and must be refreshed after merge/release:

| Capability | Current prototype state |
| --- | --- |
| Category-specific setup at Space creation | Implemented for the ten standard choices; selected category loads its action defaults |
| Owner action toggles and role eligibility | Implemented and stored with the Space |
| Owner approval setting | Implemented for typed contributions; pending contributions can be approved/declined in the local owner Inbox |
| Grocery participant experience | Existing dedicated grocery list, confirmations, purchase states, substitutes and cycle controls retained; major actions now respect owner configuration |
| Creator participant experience | Existing shelves, watchlist, suggestions, broken-link reports and item comments retained; configured actions and roles gate these tools |
| Other standard categories | Category-specific structured participant forms implemented for Projects, Learning, Travel, Communities, Interests, People and Resources |
| Custom Space builder | Custom action and typed fields implemented, including required flags and choice options |
| New category request | Structured request saved locally with Pending status and surfaced in owner Inbox |
| Participant edit/withdraw | Not implemented in this local prototype; requires stable identity and shared records |
| Cross-device collaboration and server-enforced privacy | Not implemented; requires database/authentication integration |
| Category request global publishing/review | Local capture only; central review and catalogue publication require database integration |

**Important:** Owner role controls and approval states are prototype UI/data behavior stored in the browser. They are not a security boundary. Do not use sensitive information or treat local approvals as server-enforced workflow. Participant edit/withdraw is explicitly deferred until authenticated shared persistence exists.
