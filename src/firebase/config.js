// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBoUcQWdtTziHHmndwUGHKLus8Hkz2VO9s",
  authDomain: "journal-app-96f4e.firebaseapp.com",
  projectId: "journal-app-96f4e",
  storageBucket: "journal-app-96f4e.appspot.com",
  messagingSenderId: "1008031939487",
  appId: "1:1008031939487:web:6287a1c60c42a44895dbaa",
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
