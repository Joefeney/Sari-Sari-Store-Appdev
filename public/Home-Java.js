// Modal functions
function openCustomerModal() {
  document.getElementById('customerModal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function openAdminModal() {
  document.getElementById('adminModal').classList.add('active');
  document.body.style.overflow = 'hidden';
  document.getElementById('adminLoginForm').classList.remove('hidden');
  document.getElementById('adminRegisterForm').classList.add('hidden');
}

function closeModal(modalId) {
  document.getElementById(modalId).classList.remove('active');
  document.body.style.overflow = 'auto';
}

function switchToRegister() {
  document.getElementById('adminLoginForm').classList.add('hidden');
  document.getElementById('adminRegisterForm').classList.remove('hidden');
}

function switchToLogin() {
  document.getElementById('adminRegisterForm').classList.add('hidden');
  document.getElementById('adminLoginForm').classList.remove('hidden');
}

// Google Sign-In Handler
function handleGoogleSignInJWT(response) {
  console.log('Google Sign-In successful:', response);

  const decodedToken = parseJwt(response.credential);
  const welcomeMessage = `Welcome, ${decodedToken.name}! You have successfully signed in with Google.`;
  document.getElementById('userWelcome').textContent = welcomeMessage;

  closeModal('customerModal');
  document.getElementById('successModal').classList.add('active');
}
// Helper function to parse JWT token
function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64).split('').map(c =>
        '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      ).join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error parsing JWT:', error);
    return {};
  }
}

// Alternative: Redirect to Google Sign-In
function redirectToGoogleSignIn() {
  const clientId = '238946351047-i110lkfs5p8dhl6gg5k60ghtfanioufj.apps.googleusercontent.com';
  const redirectUri = encodeURIComponent(window.location.origin + '/auth/callback');
  const scope = encodeURIComponent('profile email');
  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&scope=${scope}`;
  window.location.href = authUrl;
}

// Close modals when clicking outside
document.addEventListener('click', function(event) {
  const modals = ['customerModal', 'adminModal', 'successModal'];
  modals.forEach(modalId => {
    const modal = document.getElementById(modalId);
    if (event.target === modal) {
      closeModal(modalId);
    }
  });
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    ['customerModal', 'adminModal', 'successModal'].forEach(closeModal);
  }
});

// Toggle password visibility
function togglePassword(inputId, button) {
  const input = document.getElementById(inputId);
  const icon = button.querySelector("i");

  if (input.type === "password") {
    input.type = "text";
    icon.classList.remove("fa-eye");
    icon.classList.add("fa-eye-slash");
  } else {
    input.type = "password";
    icon.classList.remove("fa-eye-slash");
    icon.classList.add("fa-eye");
  }
}