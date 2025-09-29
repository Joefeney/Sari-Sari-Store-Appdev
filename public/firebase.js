import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, connectAuthEmulator } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore, connectFirestoreEmulator } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyD5T9h60ihJSYhzu4Mu8LJgm8EKprjdY50",
  authDomain: "sari-sari-proj.firebaseapp.com",
  projectId: "sari-sari-proj",
  storageBucket: "sari-sari-proj.firebasestorage.app",
  messagingSenderId: "258137144022",
  appId: "1:258137144022:web:780af22fd2b2ef6c972777",
  measurementId: "G-EB5T3JPDS2"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Connect emulators only if running locally
if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
  connectAuthEmulator(auth, "http://127.0.0.1:9099");
  connectFirestoreEmulator(db, "127.0.0.1", 8080);
}