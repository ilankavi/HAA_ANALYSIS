// Firebase Realtime Database Configuration & Initialization
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getDatabase, ref, onValue, set, push, serverTimestamp } from 'firebase/database';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || ''
};

// Check if valid database URL is provided
export const isFirebaseConfigured = Boolean(
  firebaseConfig.databaseURL && 
  firebaseConfig.databaseURL.length > 5 &&
  !firebaseConfig.databaseURL.includes('YOUR_')
);

let db = null;
let app = null;

if (isFirebaseConfigured) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    db = getDatabase(app);
    console.log('[AIRA Firebase] Realtime Database initialized successfully.');
  } catch (error) {
    console.warn('[AIRA Firebase] Initialization error:', error);
  }
} else {
  console.info('[AIRA Firebase] Credentials not set in env variables. Running in safe mode.');
}

export { db, ref, onValue, set, push, serverTimestamp };
