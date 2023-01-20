// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
import { getEnvironments } from "../helpers/getEnviroments";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const {
VITE_APIKEY,
VITE_AUTHDOMAIN,
VITE_PROJECTID,
VITE_STORAGEBUCKET,
VITE_MESSAGINGSENDERID,
VITE_APPID,
} = getEnvironments(); //muestra las variabls de entorno

// console.log(import.meta.env) //muestra las variables de entorno de la aplicación

// Your web app's Firebase configuration
// dev/product
// const firebaseConfig = {
//   apiKey: "AIzaSyBoUcQWdtTziHHmndwUGHKLus8Hkz2VO9s",
//   authDomain: "journal-app-96f4e.firebaseapp.com",
//   projectId: "journal-app-96f4e",
//   storageBucket: "journal-app-96f4e.appspot.com",
//   messagingSenderId: "1008031939487",
//   appId: "1:1008031939487:web:6287a1c60c42a44895dbaa",
// };

//testing
// const firebaseConfig = {
//   apiKey: "AIzaSyBynY6uJpLrrwak-GVKPTrjvE9-OILV1HI",
//   authDomain: "journal-test-feed7.firebaseapp.com",
//   projectId: "journal-test-feed7",
//   storageBucket: "journal-test-feed7.appspot.com",
//   messagingSenderId: "1096895199123",
//   appId: "1:1096895199123:web:6880728315ce66cbc8da66",
// };


const firebaseConfig = {
  apiKey: VITE_APIKEY,
  authDomain: VITE_AUTHDOMAIN,
  projectId: VITE_PROJECTID,
  storageBucket: VITE_STORAGEBUCKET,
  messagingSenderId: VITE_MESSAGINGSENDERID,
  appId: VITE_APPID,
};

// console.log(firebaseConfig)

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
