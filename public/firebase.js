// Import the functions you need
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration (copied from Console)
const firebaseConfig = {
  apiKey: "AIzaSyD5T9h60ihJSYhzu4Mu8LJgm8EKprjdY50",
  authDomain: "sari-sari-proj.firebaseapp.com",
  projectId: "sari-sari-proj",
  storageBucket: "sari-sari-proj.firebasestorage.app",
  messagingSenderId: "258137144022",
  appId: "1:258137144022:web:780af22fd2b2ef6c972777",
  measurementId: "G-EB5T3JPDS2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Set up the services you’ll use
export const auth = getAuth(app);      // for login/signup
export const db = getFirestore(app);  // for database

// 🔹 Connect to emulators (only when running locally)
if (location.hostname === "localhost") {
  connectAuthEmulator(auth, "http://localhost:9099");
  connectFirestoreEmulator(db, "localhost", 8080);
}