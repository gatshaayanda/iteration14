# BACKPACK OS — Golden Base

## Product definition
BACKPACK OS is the personal operating system (P.O.S.) paired with Iteration 13's Business Operating System (B.O.S.). They are complementary experiences on a shared participation model, not separate unrelated products.

- **BACKPACK / P.O.S.**: personal engagements, a public or restricted channel, individual accounts, VIP circles and the private Backpack owner workspace.
- **i13 / B.O.S.**: business channel, customer accounts and owner Briefcase operations. Canonical demo: https://iteration13.vercel.app/ . Source repository: https://github.com/gatshaayanda/iteration13 .
- **Admin Hub** builds, configures and sells these branded operating systems. Do not conflate Admin Hub's commercial website with either customer's daily workspace.

## Navigation contract
The Backpack 🎒 and i13 Briefcase 💼 destinations must be visibly paired wherever the customer/owner can move between systems. The i13 link opens the canonical Iteration 13 demo in a new tab until a customer-specific B.O.S. URL is configured. The owner's configured B.O.S. address is a separate, browser-local setting; never imply data synchronization.

## Setup experience
Setup creates an engagement and seeds its channel with an optional useful URL and/or uploaded image, video or PDF. Keep identity fields and resources visually grouped, use a styled accessible file picker rather than the browser's raw file-input presentation, show upload progress and the selected attachment clearly, and allow removal before creation. UploadThing limits remain image 4 MB, video 16 MB and PDF 4 MB. Links are validated as HTTP(S).

## Persistence and security truth
Current prototype data, accounts, circles, invitations, comments and requests are browser-local. The owner word is demo-only, not authentication. UploadThing file bytes are remote, while the channel record that references them remains local. Do not add Firebase/cloud sync or change Firebase rules without explicit approval.

## PWA contract
Keep the early beforeinstallprompt capture, one authoritative PWA controller, native prompt invoked directly by the explicit install click, iOS Safari Share guidance, embedded-browser handoff, fixed dismissible install card, service-worker update notice, foreground update checks, a single-reload Refresh handoff and offline shell. Do not invent a native prompt or generic Android/desktop install instructions when the browser has not supplied a prompt. BACKPACK uses its own seven-day dismissal key and isolated service-worker cache namespaces, separate from i13. Verify both generated and public manifest copies, icon assets, service-worker cache namespace and real eligibility separately. A browser may withhold beforeinstallprompt; code cannot force the browser to display it.

## Design direction
Dominant genre: **Quiet**, with **Data** reserved for the Backpack control centre. Use compact, calm, mobile-first layouts, clear typography, restrained blue accent, neutral surfaces, strong contrast, visible focus and useful empty/loading/success/error states. Prioritise direct use over marketing copy. The engagement setup should be short and scannable; upload controls are grouped resources, not another long-form section.

## QA acceptance
- Create an engagement with only a name and owner details; optional description/link/file remain optional.
- Add a valid HTTP(S) link and upload image/video/PDF; verify progress, filename, remove action and seeded channel post.
- Navigate Channel → Individual account → Backpack → i13 B.O.S. and back. Verify both 🎒 and 💼 are clearly discoverable.
- Verify public/restricted channel gates, invitations, VIP circle access and comment/request toggles in the same browser.
- Verify the install card can appear on eligible browsers, its dismissal is BACKPACK-specific, native prompt is called only by explicit click, and embedded-browser gate remains intact.
- Verify online load, offline app shell, update detection after foreground return, the explicit Refresh action and one-reload handoff, and installed/standalone suppression.
- Do not describe local prototype access controls as production security or claim cross-device sync.

## Golden checkpoint
The product owner approved the current Iteration 14 main experience as the new golden base on 18 November 2026. Preserve it and make focused, reviewed improvements. Do not reset to i13 or replace this architecture without explicit instruction. Record each accepted checkpoint here and in AGENTS.md.