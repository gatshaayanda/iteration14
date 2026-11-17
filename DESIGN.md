# iB Backpack — Design Direction

## Decision

**Dominant genre: DATA. Secondary influence: QUIET.**

This is the approved visual direction for iB / BACKPACK OS.

- **DATA** supplies the product's structure: organised workspaces, compact controls, clear information hierarchy, useful operational summaries, visible status and dependable navigation.
- **QUIET** refines the experience: clean typography, restrained colour, purposeful whitespace, subtle dividers, calm surfaces and polished interactions.

The result should feel like a professional personal operating system: functional, organised, lightweight and premium. It is neither a loud marketing website nor a conventional CRM dashboard.

## Product expression

iB is the connected identity. The Backpack is the personal environment; the Briefcase is the separate business environment. A person may use either independently or connect both. Shared identity must never imply shared records or permissions.

- **My Backpack** — personal space for life, plans, projects, notes and records.
- **Organise / My Life** — the private, structured working mode.
- **Publish / My Channel** — the intentional publishing and audience mode.
- **My Briefcase** — a separate business workspace, reached through the profile/space switcher.

Do not require a business name, pricing currency, product/service offer or customer announcement to create a personal Backpack.

## Visual system

### Colour and surfaces
- Primary canvas: cool, very light neutral (#F3F5F9).
- Main text: deep blue-grey (#24324A).
- Primary action/accent: cobalt (#355CDB), used sparingly.
- Secondary text: muted slate (#667085).
- Dividers: soft blue-grey (#D8DFEA).
- White surfaces with subtle borders; avoid stacked cards, heavy shadows, neon accents and full-screen dark panels.
- Personal content can carry user-selected expression, but shared controls and navigation retain the iB system.

### Typography and hierarchy
- Use the existing project font stack; prioritise legibility and clear size/weight contrast.
- Small uppercase labels are metadata, never the primary wayfinding.
- Use concise titles, descriptive labels and compact supporting text.
- Numbers, dates and status should align consistently and scan quickly.

### Composition
- Mobile-first and compact, with a clear primary action.
- Prefer structured rows, grouped sections and useful empty states over oversized marketing heroes.
- Keep essential information visible; progressive disclosure is for secondary settings, not core actions.
- Maintain comfortable touch targets and WCAG 2.2 AA contrast/focus expectations.

### Interaction and motion
- Every control has a visible purpose and truthful state: idle, selected, saving, saved, syncing, offline, failed or disabled where relevant.
- Use restrained transitions; respect reduced-motion preferences.
- Do not imply cloud sync when data is only saved in the current browser.
- Publishing and sharing must state audience/access clearly and enforce it at the data/API boundary.

## Screen-level expression

| Surface | Direction |
| --- | --- |
| Backpack home / overview | DATA structure with QUIET spacing and a calm personal welcome |
| Organise / My Life | QUIET-first details within DATA grouping and status patterns |
| Publish / My Channel | DATA library and publishing states; QUIET editor; expressive media belongs to the user's content |
| Profile / space switcher | QUIET, with explicit Backpack and Briefcase separation |
| Briefcase link | Clearly labelled connection, never mixed into personal records |
| Install experience | Compact, branded, bottom-fixed, dismissible/collapsible; preserve native browser prompt lifecycle |
| Empty, offline and error states | Calm, specific, actionable and honest |

## Brand mark and installation

Use the iB Backpack mark in public/icon.svg as the canonical scalable app symbol. The installation card, manifest, metadata, notification badge and service-worker shell must use the same identity. Keep installation mechanics protected: branding/assets/copy may change, not the native prompt lifecycle, embedded-browser gate, iOS Safari guidance or offline/update behavior.

## Current implementation boundary

This direction is approved and recorded. The current application still contains inherited Business OS/storefront flows and browser-local demo data. Those workflows are not evidence that the personal Backpack architecture is implemented. Convert them deliberately into Backpack modes and profile flows; do not merely relabel business forms as personal setup. Cloud sync, account identity, private sharing and cross-device recovery must remain unclaimed until implemented and verified.