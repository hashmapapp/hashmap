import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/firebase-storage';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

export const loadFirebaseStore = () => {
  try {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  } catch (msg) {
    console.error('Error Firebase Store Initializer\n', msg);
  }
  return firebase.firestore;
};

export const loadFirebaseStorage = () => {
  try {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  } catch (msg) {
    console.error('Error Firebase Storage Initializer\n', msg);
  }
  return firebase.storage();
};
