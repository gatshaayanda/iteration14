# BACKPACK OS — Engagement input examples

This is the product design source for category-specific BACKPACK OS engagements. The 20 November 2026 implementation now includes a built-in Creator / TV / Entertainment category, source-type selection, a Free-TV M3U playlist preset, a published-content library with edit/unpublish/archive/delete, and category-labelled structured line-item checklists. These are a useful first layer, not the complete template experiences described below.

**Implementation boundary:** the current checklist stores plain text items with a done state. It does not yet provide quantities/units, due dates, assignments, recurring schedules, RSVP workflows, programme catalogues, native M3U/HLS playback, EPG, or role-enforced multi-user collaboration. The current app stores engagement and access records in browser-local storage. Treat the remaining detailed inputs and actions below as the intended product design, not shipped functionality.

The setup should ask for the minimum needed to create an engagement, then reveal the relevant inputs for the selected template. Do not show one giant generic form for every category.

## Shared setup inputs

Every engagement starts with:

- **Backpack name** — e.g. Family Backpack, Creator Backpack, Travel Backpack.
- **Engagement name** — e.g. Weekly shopping, The Kopano Channel, December Cape Town trip.
- **Category / template** — select a built-in category or a reusable shared custom category.
- **Short description** — what this space is for.
- **Owner** — the person responsible for the Backpack.
- **Audience** — public, anyone with the link, invited people, or selected circles.
- **Participation** — view only, contribute with approval, or contribute directly.

The template then adds its own inputs and default actions.

## 1. Creator / TV / Entertainment channel

**Example:** “Kopano TV” — a creator-owned channel people can open from a shared link.

### Creator setup inputs
- Optional source preset: **Free-TV public M3U playlist** (`https://raw.githubusercontent.com/Free-TV/IPTV/master/playlist.m3u8`). The preset is an external playlist reference, not hosted video or an embedded player. It must be opened with a compatible IPTV player; stream availability and geographic restrictions can change.
- GitHub project / repository URL for source code, static creator pages, documentation or project assets. GitHub is not the video-streaming backend.
- Channel title and short description.
- Channel artwork / logo.
- Featured programme or trailer (video upload or external video URL).
- Channel format: on-demand library, scheduled programme guide, or mixed.
- Content source: upload MP4, paste an embeddable video URL, or add an external link.
- Programme title, description, thumbnail, duration (optional), and content rating / audience note.
- Series name and season (optional).
- Publish state: draft, publish now, or schedule.
- Comments and viewer suggestions: on/off.
- Download permission: off by default.
- Public, link-only, invited, or VIP access.

### Viewer experience
- Open channel and browse featured content.
- Browse programmes, series, seasons and playlists.
- Play an uploaded or embedded video.
- Follow / receive channel announcements (opt-in).
- React or comment if enabled.
- Suggest a programme or submit a video link if enabled.

### Creator / moderator controls
- Owner: upload, publish, schedule, edit, remove, manage access and appoint moderators.
- Moderator: review viewer submissions, moderate comments and manage programme metadata; no ownership or billing changes.
- Contributor: submit programme ideas or media for approval.
- Viewer: watch and interact only where enabled.

**Important delivery note:** the optional Free-TV source points to a community-maintained M3U playlist whose README describes it as a playlist for compatible IPTV players and says it includes only channels officially provided free to the public. It does not guarantee each stream will remain available or work in every country. Review source terms, broadcaster rights and geographic restrictions before publishing. GitHub is suitable for application source, small static assets and repository links, not as the video streaming/CDN backend. MP4 uploads need a proper video host that handles storage, encoding, playback and delivery, or use supported third-party embeds. Live broadcast, rights management and large-scale streaming are separate capabilities from a link-based VOD channel.

## 2. Household / shared shopping list

**Example:** “Gatsha Family Shopping” — members add needs before the next shopping run.

### Owner setup inputs
- List name.
- Shopping cycle start / next shopping date.
- Optional countdown label (e.g. “Next big shop”).
- Currency.
- Who can view the list: household, selected members, or link holders.
- Who can add items: all members or selected members.
- Whether new items publish immediately or need approval.
- Whether members can see who added each item.

### Member item inputs
- Item name (required).
- Quantity (e.g. 2).
- Unit (e.g. kg, packet, bottle).
- Preferred brand / size (optional).
- Store or aisle (optional).
- Priority: essential / useful / optional.
- Notes or substitute suggestion (optional).
- Added by and added time (automatic).

### Member actions
- Add an item.
- Edit their own item.
- Suggest a replacement.
- Mark an item as purchased (if allowed).
- Mark an item as unavailable / skipped.
- View the next shopping countdown.

### Owner controls
- Edit or remove any item.
- Approve pending suggestions.
- Close the current shopping cycle.
- Archive the completed list and start the next cycle.
- Change member access and permissions.

**Default permission preset:** members can view and add items, edit their own entries, and mark items purchased. Only the owner (or a nominated household manager) can remove other people's entries, close the cycle, reset the list or change permissions.

## 3. Projects & ideas

**Example:** “Kitchen Renovation”.

Inputs:
- Project goal and short brief.
- Target date / milestones.
- Tasks: title, owner, due date, status and notes.
- Links, photos, documents and reference material.
- Budget fields only if the owner chooses to enable them.

Participant actions:
- View progress.
- Claim or accept assigned tasks if enabled.
- Add suggestions or comments.
- Upload reference material for approval.

Owner controls:
- Assign tasks, approve contributions, change milestones and close the project.

## 4. Learning & growth

**Example:** “30-Day Design Learning”.

Inputs:
- Learning goal.
- Start date and target date.
- Topics / modules.
- Resource links, videos or documents.
- Activities or assignments.
- Optional progress measure.

Participant actions:
- Open learning resources.
- Mark a lesson complete.
- Submit an answer, reflection or assignment.
- Ask a question or request help.

Owner / mentor controls:
- Add or reorder modules.
- Review submissions.
- Give feedback.
- Set who can view individual progress.

## 5. Home & everyday life

**Example:** “Household Responsibilities”.

Inputs:
- Household / space name.
- Recurring tasks and frequency.
- Task owner or eligible members.
- Due date / time.
- Optional reminders and completion notes.

Participant actions:
- Claim a task.
- Mark it done.
- Report a problem or request a swap.

Owner controls:
- Create recurring schedules, reassign tasks and review completion.

## 6. Travel & experiences

**Example:** “December Cape Town Trip”.

Inputs:
- Destination and dates.
- Travellers and access group.
- Itinerary items: date, time, place and notes.
- Booking / map / transport links.
- Shared packing list.
- Optional estimated costs and cost visibility.

Participant actions:
- Suggest a place or activity.
- Vote on options.
- Add packing items.
- Upload trip photos or shared documents.

Owner controls:
- Confirm itinerary, manage private booking details and control who sees cost information.

## 7. Communities & causes

**Example:** “Neighbourhood Clean-up”.

Inputs:
- Purpose and location.
- Date / time.
- Organiser contacts.
- Agenda or activity list.
- Volunteer roles and capacity.
- Public information and private organiser notes.

Participant actions:
- RSVP.
- Choose a volunteer role.
- Suggest an agenda item.
- Submit an announcement or resource for approval.

Organiser controls:
- Approve submissions, manage volunteers and publish updates.

## 8. Shared interests & hobbies

**Example:** “Weekend Cycling Crew”.

Inputs:
- Interest / activity.
- Group description.
- Meet-up schedule or upcoming sessions.
- Skill / equipment notes (optional).
- Shared links and media.

Participant actions:
- RSVP to a session.
- Suggest routes or activities.
- Share photos, tips and resources.
- Comment if enabled.

Owner controls:
- Publish meet-ups, moderate submissions and manage member access.

## 9. People & connections

**Example:** “Family Reunion”.

Inputs:
- Occasion and date.
- Invitees / circles.
- RSVP deadline.
- Shared memories or photo collection.
- Optional dietary / accessibility notes with restricted visibility.

Participant actions:
- RSVP.
- Share a memory or photo.
- Suggest reunion activities.
- Update their own attendance details.

Owner controls:
- Manage invitations, publish updates and control sensitive information.

## 10. Resources & collections

**Example:** “Our Useful Links & Documents”.

Inputs:
- Collection title and purpose.
- Resource title, type, link or upload.
- Tags / topic.
- Short description.
- Optional expiry / review date.

Participant actions:
- Browse and search.
- Suggest a resource.
- Add notes or tags if permitted.

Owner controls:
- Approve, organise, remove and set download / redistribution rules.

## 11. Other / custom category

A custom category should not create a blank, confusing experience.

Inputs:
- Custom category name.
- Short explanation of what people will do together.
- Choose the closest participation pattern: watch / browse, list / collect, plan / coordinate, learn / complete, discuss / contribute, or organise an event.
- The selected pattern supplies a sensible starting form; the owner can adjust it.

Custom category names can be shared in the discoverable category directory, but private engagement data must not be placed in that public directory.

## Permission model shared across templates

Use understandable presets rather than exposing dozens of switches first:

1. **Owner** — full control.
2. **Moderator / manager** — manage members and submissions within assigned scope.
3. **Contributor** — add content or suggestions; approval may be required.
4. **Participant** — use the template's interactive actions (add list items, RSVP, complete tasks, comment, etc.).
5. **Viewer** — view / watch only.

Audience and action permissions are separate. A public channel can still be read-only; an invite-only shopping list can still allow every invited member to add items.

Permission controls should cover:
- Who can discover the engagement and open its link.
- Which content / fields each role can see.
- Who can add, edit or delete their own contributions.
- Who can edit or delete other people's contributions.
- Whether submissions publish immediately or wait for approval.
- Who can comment, react, download or share.
- Whether member names and activity are visible.
- When access expires.

These rules must be enforced by authenticated backend security rules and server-side checks, not only by hiding buttons in the interface. The current prototype stores most workspace, member, comment and request data in browser local storage; its present public/VIP/invited access controls are a prototype and are not yet secure multi-user permissions.

## Build recommendation

Implement the shared template and permission model first, then ship the first two differentiated experiences:

1. **Shopping list** — proves that a link can become a useful, collaborative, recurring household tool.
2. **Creator channel** — proves that the same engagement framework can become a media destination with a catalogue, player and creator controls.

Do not force Creator TV into the generic post form, and do not force shopping lists into comments and requests. Each template needs its own structured inputs and actions.
