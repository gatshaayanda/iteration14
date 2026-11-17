# iB Product Architecture

## 1. Product definition

**iB — Iteration B** is one connected operating system for business and everyday life.

**Positioning:** Business and everyday life. Connected.

**Product line:** A Briefcase for business. A Backpack for life. One connected system.

The B in iB represents both:
- **Briefcase:** the business environment, implemented by Iteration 13 as B.OS.
- **Backpack:** the personal environment, implemented by Iteration 14.

The public packaging, product identity and marketing present iB as one product. The two environments may be entered independently and remain useful independently, but share a coherent identity and connection layer.

## 2. Product hierarchy

- **iB:** unified product identity and connected experience.
- **Briefcase / B.OS:** business operations, customer relationships, services, transactions, records and business publishing.
- **Backpack:** personal organisation, publishing, household coordination, projects, records and selected sharing.
- **Personal profile:** the person's identity and switchboard between their authorised spaces.
- **Admin Hub:** product creator and infrastructure steward.

Iteration 13 and Iteration 14 remain separate deployable repositories/entry points during this stage. The customer-facing brand can package their links together as iB. Do not rename the repositories or collapse them into one codebase as a prerequisite.

## 3. One person, one identity, two spaces

The user signs in once through the shared identity provider. The canonical relationship is the Firebase Authentication UID.

The profile offers:
- My Briefcase — open the business space, or create/connect one.
- My Backpack — open the personal space, or create one.
- Profile and sign-in/security settings.
- Clear connection state and account recovery guidance.

A person may have only a Backpack, only a Briefcase, or both. The absence of one must not block the other.

**Shared identity does not mean shared records.** Each space owns its data, memberships, permissions and settings. Explicit sharing or a cross-space workflow is required before data becomes visible across the boundary.

## 4. Backpack information architecture

The Backpack contains a clear two-mode switch:

### Publish — My Channel

- Custom-designed viewing page.
- Episodes, videos and announcements.
- Private audience access.
- Comments and audience contributions.
- Organised content library, drafts and publication states.
- Optional embedded video sources and uploaded media.
- Audience moderation and per-content visibility.

Positioning: a personal television-style channel without needing to build a YouTube following. This is a publishing space, not a promise of custom live-streaming infrastructure.

### Organise — My Life

- Personal lists and plans.
- Notes and records.
- Projects and goals.
- Private documents.
- Selected sharing with household members, collaborators or invited people.
- Household coordination (for example, grocery suggestions, votes and a final shopper-approved list).

The owner can use Publish and Organise together. A public channel can coexist with a completely private personal workspace.

## 5. Publishing and access model

Page-level access options:
1. **Public:** discoverable and viewable by anyone.
2. **Unlisted:** not promoted/discoverable; accessible by link, subject to the chosen link policy.
3. **Password protected:** viewer must pass a server-validated password check.
4. **Invite only:** authenticated and authorised invited accounts.
5. **Private:** owner only.

Content and sections may have stricter access than their parent page. A public page must never make a private episode, note, document or audience record public by inheritance.

Password protection must be enforced by a trusted server/API boundary. Do not store plaintext passwords. Use secure password hashing, rate limiting and revocable access sessions/tokens. Avoid exposing protected content metadata before authorisation.

Invitations should be revocable and scoped to the intended page, section, content or activity. Comments/contributions require owner moderation controls, spam protection and a clear audience identity model.

## 6. Cross-space connections

Examples:
- A person publishes a public business announcement in the Briefcase and separately shares a personal update from the Backpack.
- A household plan in the Backpack may link to a business service in the Briefcase without granting the household access to business records.
- A creator can publish from the Backpack and operate a separate paid business from the Briefcase.
- A business owner can navigate between their own two spaces using a consistent profile/switcher.

Cross-space actions must be explicit, auditable where consequential, and permission-checked on both sides. Avoid silent copying or automatic data sharing.

## 7. Product principles

1. **Person first:** people are not required to be business owners to use iB.
2. **Owner control:** each person decides what to organise, publish and share.
3. **Independent but connected:** each space works alone and becomes more useful when connected.
4. **Privacy by default:** no implied public access and no cross-space leakage.
5. **Cloud-backed continuity:** authorised data follows the person across devices.
6. **No platform dependency for identity:** the user's own space is not contingent on building followers on a third-party social platform.
7. **Useful participation:** invitations and contributions should help people coordinate, not create engagement pressure.
8. **Operational truth:** distinguish locally cached, queued, saved, uploaded, published and synced states.

## 8. Brand language

Primary: **Business and everyday life. Connected.**

Product explanation: **A Briefcase for business. A Backpack for life. One connected system.**

Campaign direction: **Carry your world differently.**

Avoid describing iB as merely two apps bundled together, a social network, a household-only organiser, or a YouTube competitor. It is a connected personal and business operating system with two distinct environments.
