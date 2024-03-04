import { initializeApp } from "firebase/app";


const firebaseConfig = {
    apiKey: "AIzaSyDk9_RO5yKPOvp6wQPrciTMyzqlnccOfD0",
    authDomain: "react-firebase-b8192.firebaseapp.com",
    projectId: "react-firebase-b8192",
    storageBucket: "react-firebase-b8192.appspot.com",
    messagingSenderId: "475988873615",
    appId: "1:475988873615:web:091a36c066daff99b8bbfa"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
