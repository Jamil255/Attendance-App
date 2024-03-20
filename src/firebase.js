import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyAjnrHNU_ukZmcxTU0JcENVFNplfzbkeUY",
    authDomain: "attendance-app-281d9.firebaseapp.com",
    projectId: "attendance-app-281d9",
    storageBucket: "attendance-app-281d9.appspot.com",
    messagingSenderId: "972273260512",
    appId: "1:972273260512:web:9415b90b3b87aebe467d85"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
export {
    app, auth, db, storage
}