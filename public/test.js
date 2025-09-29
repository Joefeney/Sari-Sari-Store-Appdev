import { auth, db } from "./firebase.js";
import { 
  GoogleAuthProvider, 
  signInWithPopup, 
  onAuthStateChanged, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  connectAuthEmulator
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// ============================
// CONNECT TO AUTH EMULATOR (LOCAL ONLY)
// ============================
if (window.location.hostname === "localhost") {
  connectAuthEmulator(auth, "http://127.0.0.1:9099");
}

// ============================
// CUSTOMER: GOOGLE SIGN-IN
// ============================
const googleProvider = new GoogleAuthProvider();

async function handleGoogleSignIn() {
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

    window.location.href = "dashboard.html";

  } catch (error) {
    console.error("Google sign-in error:", error);
    alert(error.message);
  }
}

// ============================
// ADMIN AUTH (Email/Password)
// ============================
async function adminRegister(email, password, fullName, storeName, storeAddress, phoneNumber) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, "admins", user.uid), {
      fullName,
      email: user.email,
      storeName,
      storeAddress,
      phoneNumber,
      role: "admin",
      createdAt: new Date()
    });

    // ✅ Success flow
    alert("✅ Admin account created successfully!");

    // 🔹 Close register modal
    closeModal("adminRegisterForm");

    // 🔹 Open login modal
    openModal("adminLoginForm");

  } catch (error) {
    alert("❌ " + error.message);
  }
}

function handleAdminRegister() {
  alert("🔔 handleAdminRegister clicked!");
  
  const fullName = document.getElementById("adminFullName").value.trim();
  const email = document.getElementById("adminRegisterEmail").value.trim();
  const password = document.getElementById("adminRegisterPassword").value.trim();
  const confirmPassword = document.getElementById("adminRegisterConfirmPassword").value.trim();
  const storeName = document.getElementById("adminStoreName").value.trim();
  const storeAddress = document.getElementById("adminStoreAddress").value.trim();
  const phoneNumber = document.getElementById("adminPhone").value.trim();

  // ✅ Validation
  if (!fullName || !email || !password || !confirmPassword || !storeName || !storeAddress || !phoneNumber) {
    alert("⚠️ Please fill up all details.");
    return;
  }

  if (password !== confirmPassword) {
    alert("⚠️ Passwords do not match.");
    return;
  }

  if (password.length < 6) {
    alert("⚠️ Password must be at least 6 characters.");
    return;
  }

  // ✅ Call your Firebase function
  adminRegister(email, password, fullName, storeName, storeAddress, phoneNumber);

  console.log("🚀 handleAdminRegister triggered");
}

async function adminLogin(email, password) {
  try {
    await signInWithEmailAndPassword(auth, email, password);

    // 🔹 Redirect after login
    window.location.href = "admin-dashboard.html";
  } catch (error) {
    alert(error.message);
  }
}

async function adminLogout() {
  await signOut(auth);
  alert("Logged out!");
  window.location.href = "index.html"; // go back to homepage
}

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
    await setDoc(doc(db, "products", "sampleProduct"), {
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

// ============================
// MAKE FUNCTIONS AVAILABLE TO HTML
// ============================
window.handleAdminRegister = handleAdminRegister;
window.adminLogin = adminLogin;
window.adminLogout = adminLogout;
window.handleGoogleSignIn = handleGoogleSignIn;
