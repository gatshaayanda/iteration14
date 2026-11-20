# BACKPACK OS

**BACKPACK OS is a personal operating system** for organizing engagements, running a personal channel, managing individual accounts and VIP circles, and keeping a private owner workspace in one installable app.

It pairs with the separate Iteration 13 Business Operating System. The bottom dock keeps the two destinations distinct: 🎒 Backpack for personal operations and 💼 B.O.S. for business operations.

## Current product

- One Backpack groups multiple engagements; each engagement has its own channel and independent content/access records.
- Switch between engagements, add another engagement and preview the public channel from the owner Overview.
- Manage published content with edit, unpublish-to-draft, archive, republish and delete actions.
- Publish updates with links, images, video or PDF attachments.
- Use category-labelled line-item checklists for projects, learning, household needs, travel, communities, hobbies, people, resources and creator programmes.
- Creator / TV / Entertainment supports video/stream, M3U/M3U8 playlist, GitHub project and website/portfolio source references. An optional Free-TV playlist preset is an external playlist, not a built-in streaming player.
- Choose a public, VIP-circle or invite-only audience; invite people with Viewer, Participant, Contributor or Moderator demo roles.
- Individual accounts can use enabled comments and requests; Viewer accounts are read-only in the demo.
- Install as a PWA and use the cached application shell offline.

## First owner QA pass

1. Load the existing Household Projects Backpack and confirm its two published updates remain intact.
2. Open owner Overview and confirm the engagement list, published count, engagement switcher and public preview.
3. Add a second engagement under the same Backpack; verify both are grouped together in the chooser.
4. Edit one published update and confirm the channel reflects the change.
5. Unpublish an item, confirm it disappears from the public channel but remains in the owner library, then republish it.
6. Archive and delete separate test items.
7. Create a household list and confirm its line items render as a checklist.
8. Create a Creator / TV / Entertainment example and test the optional Free-TV playlist, a GitHub repository and a video URL as distinct source types.
9. Invite test names with different demo roles; verify Viewer accounts do not receive comment/request forms; signed-in non-viewer participants can update structured checklist items in the current browser profile.
10. Confirm the channel contains no inherited Service Storefront or Customer account language.
11. Use the bottom dock to open the paired i13 B.O.S.
12. Test PWA installation and offline behavior separately.

## Data and integration boundaries

This is a browser-local prototype. Backpack containers, engagement records, published content, roles, people, circles, invitations, comments and requests are stored in the current browser profile; they do not sync across devices or browsers and are not production authentication or authorization. Role presets and audience controls are local UI rules, not server-enforced security. UploadThing stores uploaded file bytes remotely, but the records that reference those files remain local. Uploads and external links require a connection. Do not store sensitive information here.

## Development

```bash
npm ci
npm run verify:identity
npm run verify:offline
npm run lint
npm run build
```

The PWA installation behavior is protected by [docs/PWA-INSTALLATION-LOCK.md](docs/PWA-INSTALLATION-LOCK.md). The accepted product definition and navigation contract are in [BACKPACK-OS-GOLDEN-BASE.md](BACKPACK-OS-GOLDEN-BASE.md). The owner CRUD workflow and current implementation boundaries are in [docs/BACKPACK-OWNER-CRUD-AND-ENGAGEMENT-MODEL.md](docs/BACKPACK-OWNER-CRUD-AND-ENGAGEMENT-MODEL.md).
