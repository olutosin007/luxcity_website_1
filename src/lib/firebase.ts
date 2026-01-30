import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getAuth, type Auth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

function hasFirebaseConfig(): boolean {
  const has =
    !!(
      import.meta.env.VITE_FIREBASE_API_KEY &&
      import.meta.env.VITE_FIREBASE_PROJECT_ID
    );
  if (!has && import.meta.env.DEV) {
    console.warn(
      '[Firebase] Config missing. Add VITE_FIREBASE_API_KEY and VITE_FIREBASE_PROJECT_ID to .env in the project root (same folder as package.json) and restart the dev server (npm run dev).'
    );
  }
  return has;
}

let app: FirebaseApp | null = null;
let db: Firestore | null = null;
let auth: Auth | null = null;

export function getFirebaseApp(): FirebaseApp | null {
  if (!hasFirebaseConfig()) return null;
  if (!app) {
    app = initializeApp(firebaseConfig);
  }
  return app;
}

export function getFirebaseDb(): Firestore | null {
  if (!hasFirebaseConfig()) return null;
  if (!db) {
    const firebaseApp = getFirebaseApp();
    if (firebaseApp) db = getFirestore(firebaseApp);
  }
  return db;
}

export function getFirebaseAuth(): Auth | null {
  if (!hasFirebaseConfig()) return null;
  if (!auth) {
    const firebaseApp = getFirebaseApp();
    if (firebaseApp) auth = getAuth(firebaseApp);
  }
  return auth;
}

export const INSIGHTS_COLLECTION = 'insights';
