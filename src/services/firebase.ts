/**
 * Optional Firebase Configuration & Adapter for CareSync
 * 
 * If Firebase environment variables are provided in .env:
 * VITE_FIREBASE_API_KEY=...
 * VITE_FIREBASE_AUTH_DOMAIN=...
 * VITE_FIREBASE_PROJECT_ID=...
 * VITE_FIREBASE_STORAGE_BUCKET=...
 * VITE_FIREBASE_MESSAGING_SENDER_ID=...
 * VITE_FIREBASE_APP_ID=...
 * 
 * CareSync will initialize Firebase Auth & Firestore collections:
 * - users
 * - patients
 * - appointments
 * - ambulanceRequests
 * - bloodRequests
 * - bloodBanks
 * - healthcareFacilities
 * - notifications
 * 
 * If no Firebase credentials are configured, CareSync automatically uses its
 * built-in reactive, persistent LocalStorage data engine with pre-populated
 * Pune healthcare records so the application runs completely out-of-the-box.
 */

export interface FirebaseConfig {
  apiKey?: string;
  authDomain?: string;
  projectId?: string;
  storageBucket?: string;
  messagingSenderId?: string;
  appId?: string;
}

export const firebaseConfig: FirebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && 
  firebaseConfig.projectId && 
  firebaseConfig.apiKey !== 'your_api_key_here'
);

export const FIRESTORE_COLLECTIONS = {
  USERS: 'users',
  PATIENTS: 'patients',
  APPOINTMENTS: 'appointments',
  AMBULANCE_REQUESTS: 'ambulanceRequests',
  BLOOD_REQUESTS: 'bloodRequests',
  BLOOD_BANKS: 'bloodBanks',
  HEALTHCARE_FACILITIES: 'healthcareFacilities',
  NOTIFICATIONS: 'notifications',
} as const;
