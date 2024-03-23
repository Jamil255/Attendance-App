import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
    apiKey: import.meta.env.VITE_REACT_API_URL,
    authDomain: import.meta.env.VITE_AUTH_ID,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_REACT_SENDER_ID_URL,
    appId: import.meta.env.VITE_REACT_API_ID_URL
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
export {
    app, auth, db, storage
}