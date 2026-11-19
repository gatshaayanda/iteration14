# BACKPACK OS

**BACKPACK OS is a personal operating system** for organizing engagements, running a personal channel, managing individual accounts and VIP circles, and keeping a private owner workspace in one installable app.

It pairs with the separate Iteration 13 Business Operating System. The bottom dock keeps the two destinations distinct: 🎒 Backpack for personal operations and 💼 B.O.S. for business operations.

## Current product

- Create and manage multiple named Backpacks.
- Give each Backpack its own channel and optional starting resources.
- Publish updates with links, images, video or PDF attachments.
- Choose a public or invite-only audience.
- Create VIP circles and invite people by name.
- Let individual accounts view permitted updates, comment and send requests.
- Manage the Backpack identity and audience from its private owner workspace.
- Install as a PWA and use the cached application shell offline.

## First QA pass

1. Create a Backpack with a name, channel name and owner details.
2. Add an optional useful link and/or image, video or PDF.
3. Publish an update and confirm it appears in the channel.
4. Create an individual account; test comments and requests.
5. Switch the channel to Invite-only, invite a name and create a VIP circle.
6. Open the private Backpack workspace and edit the identity.
7. Use the bottom dock to open the paired i13 B.O.S.
8. Test installation in an eligible browser and test offline behavior separately.

## Data and integration boundaries

This is a browser-local prototype. Workspace records, people, circles, invitations, comments and requests are stored in the current browser profile; they do not sync across devices or browsers and are not production authentication or authorization. UploadThing stores uploaded file bytes remotely, but the records that reference those files remain local. Uploads and external links require a connection.

## Development

```bash
npm ci
npm run verify:identity
npm run verify:offline
npm run lint
npm run build
```

The PWA installation behavior is protected by [docs/PWA-INSTALLATION-LOCK.md](docs/PWA-INSTALLATION-LOCK.md). The accepted product definition and navigation contract are in [BACKPACK-OS-GOLDEN-BASE.md](BACKPACK-OS-GOLDEN-BASE.md).
