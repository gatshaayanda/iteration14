# BACKPACK shared engagement categories — Firestore setup

Project: `adhubmvp`

Create/confirm the Firebase Web App in this project, enable **Anonymous** sign-in, create the Firestore database, and add the six `NEXT_PUBLIC_FIREBASE_*` values from that Web App to the Vercel project. Set `NEXT_PUBLIC_FIREBASE_PROJECT_ID=adhubmvp`.

The app stores only the shared, non-private category directory in `backpackEngagementCategories`. Personal Backpack workspaces, invitations, comments, requests and member records remain in their existing browser-local store. A category document contains `label`, `normalized`, `createdAt` and `source`.

Apply these rules to the Firestore database (merge them with any existing rules; do not replace unrelated application rules):

```text
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /backpackEngagementCategories/{categoryId} {
      allow read: if true;
      allow create: if request.auth != null
        && request.resource.data.keys().hasOnly(['label', 'normalized', 'createdAt', 'source'])
        && request.resource.data.label is string
        && request.resource.data.label.size() > 0
        && request.resource.data.label.size() <= 48
        && request.resource.data.normalized is string
        && request.resource.data.normalized == request.resource.data.label.lower()
        && request.resource.data.source == 'backpack-os';
      allow update, delete: if false;
    }
  }
}
```

The client signs in anonymously before creating a category. Reads are public so users can discover and reuse categories. Writes are authenticated, create-only and field/length constrained. This is a public suggestion directory, not a private workspace collection. If the project uses additional Firestore rules, preserve those rules and add this match block inside the existing service block.
