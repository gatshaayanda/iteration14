# Iteration 14 reset incident log

## Reset 02 — 18 November 2026

This is the second reset of Iteration 14 to its original Iteration 13 storefront foundation, following the third recorded implementation failure.

### What went wrong
- The storefront-first Iteration 13 experience was replaced with a standalone personal workspace home.
- The setup flow lost its established completion/upload percentage progress treatment.
- The owner entry point no longer presented the storefront with the Backpack in the former Briefcase position.
- A cloud-sync layer was introduced before the matching Firebase permissions were confirmed, resulting in “Missing or insufficient permissions” and a misleading local-only state.

### Reset decision
Restore the original Iteration 13 storefront application foundation in the Iteration 14 repository. Keep Iteration 14 identity and its protected PWA install experience, with the install card anchored at the bottom of the page. The owner workspace entry is to be presented as Backpack rather than Briefcase.

### Guardrails for the next iteration
1. Treat Iteration 13 storefront behavior and setup progress as the functional baseline.
2. Make visual/identity changes only where requested; do not replace the underlying application model.
3. Preserve the protected install lifecycle and bottom-anchored install card.
4. Do not enable cloud sync or change Firestore rules until the target project and access rules are verified.
5. Verify the actual production build and QA the setup/upload progress before claiming completion.

This entry records the third failure and second reset requested by the product owner. It is an incident record, not a claim that all subsequent QA has passed.
