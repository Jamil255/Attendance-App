import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyChL5yLmXs297o0lNk1SEol68bhefntjaY",
    authDomain: "reactapp-df53f.firebaseapp.com",
    projectId: "reactapp-df53f",
    storageBucket: "reactapp-df53f.appspot.com",
    messagingSenderId: "709383805385",
    appId: "1:709383805385:web:a188dce82514ad17d37018"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export {
    app, auth
}