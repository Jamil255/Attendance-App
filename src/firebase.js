import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
    apiKey: import.meta.env.VITE_REACT_API_URL,
    authDomain: "reactapp-df53f.firebaseapp.com",
    projectId: "reactapp-df53f",
    storageBucket: "reactapp-df53f.appspot.com",
    messagingSenderId:import.meta.env.VITE_REACT_SENDER_ID_URL,
    appId:import.meta.env.VITE_REACT_API_ID_URL
}
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export {
    app, auth
}