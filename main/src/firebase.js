// This file only contains demo API keys for security purposes

// src/firebase.js
// Import the necessary functions from the Firebase SDK
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Set up Firebase services
const auth = getAuth(app);  // Authentication service
const db = getFirestore(app);  // Firestore service
// Export auth and db to use them in your components
export { auth, db };
