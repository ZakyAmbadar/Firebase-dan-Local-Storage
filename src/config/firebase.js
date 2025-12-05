import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

// Firebase configuration dari Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyClDeqBaBPLErHvYVUdZ2ZGUaR34e2YBDM",
  authDomain: "pbp-firebase-80265.firebaseapp.com",
  projectId: "pbp-firebase-80265",
  storageBucket: "pbp-firebase-80265.firebasestorage.app",
  messagingSenderId: "213910265912",
  appId: "1:213910265912:web:cbdfe014ade5831c81c6cd",
  measurementId: "G-5Z90N67K2Z"
};

// Contoh config dari google-services.json yang sudah Anda download:
// {
//   "project_info": {
//     "project_id": "pbp-firebase-80265",
//     ...
//   }
// }

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
