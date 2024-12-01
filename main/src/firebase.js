// src/firebase.js

// Import the necessary functions from the Firebase SDK
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLQebhW5BaV884I-NMgzN-G_KRIqkWjwA",
  authDomain: "dailygainz-7d599.firebaseapp.com",
  projectId: "dailygainz-7d599",
  storageBucket: "dailygainz-7d599.firebasestorage.app",
  messagingSenderId: "501285233082",
  appId: "1:501285233082:web:852b04847791e9018bbd83",
  measurementId: "G-Z3PBHJCKSN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Set up Firebase services
const auth = getAuth(app);  // Authentication service
const db = getFirestore(app);  // Firestore service

// Export auth and db to use them in your components
export { auth, db };
