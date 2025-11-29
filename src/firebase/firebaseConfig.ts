import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

function getEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    console.warn(`Missing env var ${name}`);
    return '';
  }
  return value;
}

const firebaseConfig = {
  apiKey: getEnv('REACT_APP_FIREBASE_API_KEY'),
  authDomain: getEnv('REACT_APP_FIREBASE_AUTH_DOMAIN'),
  databaseURL: getEnv('REACT_APP_FIREBASE_DATABASE_URL'),
  projectId: getEnv('REACT_APP_FIREBASE_PROJECT_ID'),
  storageBucket: getEnv('REACT_APP_FIREBASE_STORAGE_BUCKET'),
  messagingSenderId: getEnv('REACT_APP_FIREBASE_MESSAGING_SENDER_ID'),
  appId: getEnv('REACT_APP_FIREBASE_APP_ID'),
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
