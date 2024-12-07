// This file only contains demo API keys for security purposes

// src/firebase.js
// Import the necessary functions from the Firebase SDK
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD8vx4RR-fhmJodogC-5Dk7V1GaYj4-R3w",
  authDomain: "dailygainz-bf092.firebaseapp.com",
  projectId: "dailygainz-bf092",
  storageBucket: "dailygainz-bf092.appspot.com",
  messagingSenderId: "4978893132",
  appId: "1:4978893132:web:8219a7c2222f888914afe9",
  measurementId: "G-5SY2ZVFKWR"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Set up Firebase services
const auth = getAuth(app);  // Authentication service
const db = getFirestore(app);  // Firestore service
// Export auth and db to use them in your components
export { auth, db };
