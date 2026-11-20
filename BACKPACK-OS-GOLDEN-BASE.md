# BACKPACK OS — Golden Base

## Product definition
BACKPACK OS is the personal operating system (P.O.S.) paired with Iteration 13's Business Operating System (B.O.S.). They are complementary experiences on a shared participation model, not separate unrelated products.

- **BACKPACK / P.O.S.**: one personal Backpack container can hold multiple independent engagements. Each engagement has its own category, public or restricted channel, published material, individual accounts, VIP circles and owner controls.
- **i13 / B.O.S.**: business channel, customer accounts and owner Briefcase operations. Canonical demo: https://iteration13.vercel.app/ . Source repository: https://github.com/gatshaayanda/iteration13 .
- **Admin Hub** builds, configures and sells these branded operating systems. Do not conflate Admin Hub's commercial website with either customer's daily workspace.

## Navigation contract
The Backpack 🎒 and i13 Briefcase 💼 destinations must be visibly paired in the fixed bottom dock, inside the device safe area. Open the canonical i13 B.O.S. in the same tab unless a customer-specific B.O.S. URL is configured. Never force a new tab or claim that Android automatically hands off to a separately installed PWA. The owner's configured B.O.S. address is a separate, browser-local setting; never imply data synchronization.

## Create or load a Backpack OS
- Every fresh BACKPACK launch opens the workspace chooser, not a previously active channel or owner dashboard.
- The chooser offers **Create new Backpack OS** and **Load an existing Backpack**.
- Creating a Backpack asks for its Backpack/OS identity and first engagement/channel. Adding an engagement from inside the owner workspace creates another child engagement under the same Backpack identity; it must not create a separate Backpack.\n- The chooser groups engagements beneath their parent Backpack. Separate Backpacks remain separate containers.
- Loading a Backpack/engagement restores that engagement’s channel, people, circles, invitations, posts, comments and requests. Switching engagements must not mix records. Provide a switch-back-to-workspaces action from inside the app.
- Existing single-workspace browser data must be migrated into the workspace list without clearing or overwriting it.
- This prototype stores the workspace index and content in browser-local storage; it is not cross-device account sync or production authentication.

## Setup experience
Setup creates an engagement and seeds its channel with an optional useful URL and/or uploaded image, video or PDF. Keep identity fields and resources visually grouped, use a styled accessible file picker rather than the browser's raw file-input presentation, show upload progress and the selected attachment clearly, and allow removal before creation. UploadThing limits remain image 4 MB, video 16 MB and PDF 4 MB. Links are validated as HTTP(S).

## Persistence and security truth
Current prototype data, accounts, circles, invitations, comments and requests are browser-local. The owner word is demo-only, not authentication. UploadThing file bytes are remote, while the channel record that references them remains local. Do not add Firebase/cloud sync or change Firebase rules without explicit approval.

## PWA contract
Keep the early beforeinstallprompt capture, one authoritative PWA controller, native prompt invoked directly by the explicit install click, iOS Safari Share guidance, embedded-browser handoff, fixed dismissible install card, service-worker update notice, foreground update checks, a single-reload Refresh handoff and offline shell. Do not invent a native prompt or generic Android/desktop install instructions when the browser has not supplied a prompt. BACKPACK uses its own seven-day dismissal key and isolated service-worker cache namespaces, separate from i13. Verify both generated and public manifest copies, icon assets, service-worker cache namespace and real eligibility separately. A browser may withhold beforeinstallprompt; code cannot force the browser to display it.

## Design direction
Dominant genre: **Quiet**, with **Data** reserved for the Backpack control centre. Use compact, calm, mobile-first layouts, clear typography, restrained blue accent, neutral surfaces, strong contrast, visible focus and useful empty/loading/success/error states. Prioritise direct use over marketing copy. The engagement setup should be short and scannable; upload controls are grouped resources, not another long-form section.

## QA acceptance
- Fresh launch always presents Create new Backpack OS / Load an existing Backpack.\n- Create one Backpack with two engagements; verify both engagements appear grouped under the same parent. Create a second Backpack and verify its records remain separate. Switch between engagements and confirm posts, people, circles, invitations, comments and requests do not mix.\n- In the owner workspace, verify the published-content library supports edit, unpublish, republish, archive and delete. Preview the public channel and confirm drafts/archives stay hidden.\n- Verify an existing single-workspace browser profile is migrated and remains loadable.\n- Create an engagement with a Backpack name, channel name and owner details; optional description/link/file remain optional.
- Add a valid HTTP(S) link and upload image/video/PDF; verify progress, filename, remove action and seeded channel post.
- Navigate Channel → Individual account → Backpack → i13 B.O.S. and back. Verify both 🎒 and 💼 are clearly discoverable.
- Verify public/restricted channel gates, invitations, VIP circle access and comment/request toggles in the same browser.
- Verify the install card can appear on eligible browsers, its dismissal is BACKPACK-specific, native prompt is called only by explicit click, and embedded-browser gate remains intact.
- Verify online load, offline app shell, update detection after foreground return, the explicit Refresh action and one-reload handoff, and installed/standalone suppression.
- Do not describe local prototype access controls as production security or claim cross-device sync.

## Golden checkpoint
The product owner approved the current Iteration 14 main experience as the new golden base on 18 November 2026. Preserve it and make focused, reviewed improvements. Do not reset to i13 or replace this architecture without explicit instruction. Record each accepted checkpoint here and in AGENTS.md.

## Channel publishing and offline refresh
- Publish an update mirrors the setup resource experience: optional HTTP(S) useful link plus optional image/video/PDF upload, styled accessible picker, explicit file limits, progress, selected filename and removal before publishing. A link or attachment alone is valid content.
- Whenever the app-shell layout changes, bump the BACKPACK shell and media cache versions together, and update the offline verifier. The next service-worker install must precache the new app shell while preserving all i13 cache namespaces.


## Demo-friendly access names
- Invite individuals by name using a plain text field; do not ask for an email address in the invitation form.
- VIP-circle member lists also use names, comma- or line-separated. Matching is case-insensitive and ignores repeated spaces.
- Individual account profile may retain an email identifier in this prototype, but access is matched by the person's name. Existing legacy email invitations remain accepted. This is demo convenience, not secure identity verification.


## Demo access names
- Use simple **Public** / **Invite-only** labels. Add individuals by display name through a plain text field and a short **Add** action; show a count of invited people, not invited emails.
- Match invited names and VIP-circle members case-insensitively after collapsing repeated spaces. Continue accepting existing email-based invitations as legacy compatibility. The account email remains a local account identifier; name matching is demo-only and not production authentication.


## Owner CRUD and engagement model — 20 November 2026

- A Backpack is the parent container; engagements are child workspaces with independent content and access records. The browser-local workspace index uses `backpackId` to group them. Legacy records receive their own parent ID from the existing workspace ID, preserving boundaries; newly added engagements inherit the selected parent ID.
- The owner Overview lists engagements, supports switching, adding an engagement and previewing the public channel.
- The Engagement section contains engagement details, publishing and a published-content library. Content actions: edit, publish, unpublish to draft, archive, republish and delete. The public channel renders published items only.
- Personal channels must not default to Service Storefront, Customer account, buyer/seller or other inherited commerce copy.
- Creator / TV / Entertainment is a built-in category. It accepts external video/stream, M3U/M3U8 playlist, GitHub project and website/portfolio references. The Free-TV preset is only an external playlist link; BACKPACK does not host streams or include a full IPTV player.
- Category-specific line-item inputs currently render as simple checklist items. Quantities, assignments, due dates, recurring tasks, RSVPs, programme catalogues and other advanced category workflows remain planned.
- Viewer / Participant / Contributor / Moderator labels are prototype-local only. The owner word and name matching are not secure authentication; no cross-device sync or server-enforced access exists.
- Do not add Firebase persistence or change rules as a shortcut. Production sync is gated on real authentication, a documented data model, per-engagement Firestore rules, rules tests, local-data migration and offline conflict handling.
- Full implementation status and the twelve-step owner QA journey: [docs/BACKPACK-OWNER-CRUD-AND-ENGAGEMENT-MODEL.md](./docs/BACKPACK-OWNER-CRUD-AND-ENGAGEMENT-MODEL.md).
