// admin-dashboard.js
import { auth } from "./firebase.js";
import { signOut, onAuthStateChanged } from "firebase/auth";

// Wait for page load
document.addEventListener("DOMContentLoaded", () => {
  const adminEmailEl = document.getElementById("adminEmail");
  const logoutBtn = document.getElementById("logoutBtn");

  // Track login state
  onAuthStateChanged(auth, (user) => {
    if (user) {
      adminEmailEl.textContent = user.email;
    } else {
      // If no user, redirect back to index
      window.location.href = "index.html";
    }
  });

  // Logout button
  logoutBtn.addEventListener("click", async () => {
    try {
      await signOut(auth);
      window.location.href = "index.html";
    } catch (err) {
      console.error("Logout error:", err);
    }
  });
});
