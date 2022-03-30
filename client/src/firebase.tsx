// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCi0yuNr-iQby-lzIEqgxzyGs5LRurcZC8",
  authDomain: "here-bouldering.firebaseapp.com",
  projectId: "here-bouldering",
  storageBucket: "here-bouldering.appspot.com",
  messagingSenderId: "324624947251",
  appId: "1:324624947251:web:7e150656e1b0673a6dab46",
  measurementId: "G-84L9L81DGE",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
