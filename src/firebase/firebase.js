import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAIPC_oXCMldTGDmi9jUoo9jVDjDpf6KPw',
  authDomain: 'instaclone-ff936.firebaseapp.com',
  projectId: 'instaclone-ff936',
  storageBucket: 'instaclone-ff936.appspot.com',
  messagingSenderId: '284243691021',
  appId: '1:284243691021:web:bf83d302b521023859f744',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, auth, firestore, storage };
