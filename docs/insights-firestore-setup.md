# Insights section: Firestore setup (Option 1 – client-only)

Insights data can be stored in Firestore. When Firebase is configured, the app uses Firestore for all insights CRUD; when not configured, it falls back to in-memory data.

## 1. Firebase project

1. Go to [Firebase Console](https://console.firebase.google.com/) and create a project (or use an existing one).
2. Enable **Firestore Database** (Create database → Start in test mode or production with rules below).
3. Enable **Authentication** → Sign-in method → **Email/Password** (enable).
4. In Project settings → General → Your apps, add a **Web** app and copy the config.

## 2. Environment variables

Copy `.env.example` to `.env` and set:

- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`

## 3. Firestore rules

Use the rules in `firestore.rules` (read: public; write: authenticated only). Deploy with:

```bash
firebase deploy --only firestore:rules
```

(Requires `firebase` CLI and `firebase init` in the project.)

## 4. Admin user

Create at least one user in Firebase Console → Authentication → Users → Add user (email + password). Use this to sign in at `/admin/insights`.

## 5. Seed data (one-time)

1. Sign in at `/admin/insights`.
2. Click **Seed from backup** to copy the built-in backup posts into Firestore.
3. After that, the public Insights page and single-post pages will read from Firestore.

## 6. Install dependency

```bash
npm install
```

(`firebase` is listed in `package.json`; run `npm install` if you haven’t.)

## Behaviour summary

| Firebase configured | `/insights` (public) | `/admin/insights` |
|--------------------|----------------------|--------------------|
| No                | In-memory fallback   | Manager (no login) |
| Yes               | Firestore            | Login → Manager; **Seed from backup** available |
