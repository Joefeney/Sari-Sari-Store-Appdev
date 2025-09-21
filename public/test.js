// test.js
import { auth, db } from "./firebase.js";
import { 
  GoogleAuthProvider, 
  signInWithPopup, 
  onAuthStateChanged, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut 
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

// ============================
// CUSTOMER: GOOGLE SIGN-IN
// ============================
const googleProvider = new GoogleAuthProvider();

window.handleGoogleSignIn = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    // Save or update user in Firestore
    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      role: "customer",
      lastLogin: new Date()
    }, { merge: true });

    // Show success modal
    document.getElementById("userWelcome").innerText = `Welcome, ${user.displayName || user.email}!`;
    openModal("successModal");
  } catch (error) {
    console.error("Google sign-in error:", error);
    alert(error.message);
  }
};

// ============================
// ADMIN AUTH (Email/Password)
// ============================
window.adminRegister = async (email, password, fullName) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, "admins", user.uid), {
      fullName,
      email: user.email,
      role: "admin",
      createdAt: new Date()
    });

    alert("Admin account created!");
  } catch (error) {
    alert(error.message);
  }
};

window.adminLogin = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("Admin logged in!");
  } catch (error) {
    alert(error.message);
  }
};

window.adminLogout = async () => {
  await signOut(auth);
  alert("Logged out!");
};

// ============================
// TRACK LOGIN STATE
// ============================
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User logged in:", user.email);
  } else {
    console.log("No user logged in");
  }
});

// ============================
// FIRESTORE TEST (optional)
// ============================
async function addTestProduct() {
  try {
    const docRef = await setDoc(doc(db, "products", "sampleProduct"), {
      name: "Test Product",
      price: 99,
      stock: 10
    });
    console.log("Test product added!");
  } catch (e) {
    console.error("Error adding product:", e);
  }
}
// Uncomment if you want to test:
// addTestProduct();

