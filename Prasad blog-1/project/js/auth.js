/**
 * InsightfulBlog - Authentication Module
 * Handles all user authentication functionality
 */

// DOM Elements
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const logoutBtn = document.getElementById('logout-btn');
const adminLogoutBtn = document.getElementById('admin-logout');
const passwordFields = document.querySelectorAll('input[type="password"]');
const togglePasswordButtons = document.querySelectorAll('.toggle-password');

// User state management
let currentUser = null;

// Initialize authentication state
function initAuth() {
  // Check if user is logged in (from localStorage in this demo)
  const savedUser = localStorage.getItem('currentUser');
  if (savedUser) {
    currentUser = JSON.parse(savedUser);
    updateAuthUI(true);
  } else {
    updateAuthUI(false);
  }
}

// Update UI based on authentication state
function updateAuthUI(isLoggedIn) {
  const authButtons = document.querySelector('.auth-buttons');
  const authProfile = document.querySelector('.auth-profile');
  const mobileAuthButtons = document.querySelector('.mobile-auth-buttons');
  
  if (!authButtons || !authProfile) return;
  
  if (isLoggedIn) {
    // Update profile information
    const profileImg = document.querySelector('.profile-img');
    if (profileImg && currentUser.profileImage) {
      profileImg.src = currentUser.profileImage;
    }
    
    // Show profile, hide buttons
    authButtons.classList.add('hidden');
    authProfile.classList.remove('hidden');
    
    // Update mobile menu if it exists
    if (mobileAuthButtons) {
      mobileAuthButtons.innerHTML = `
        <a href="profile.html" class="btn btn-primary">
          <i class="fas fa-user"></i>
          <span>My Profile</span>
        </a>
      `;
    }
  } else {
    // Show buttons, hide profile
    authButtons.classList.remove('hidden');
    authProfile.classList.add('hidden');
    
    // Reset mobile menu auth buttons
    if (mobileAuthButtons) {
      mobileAuthButtons.innerHTML = `
        <a href="login.html" class="btn btn-secondary">Log In</a>
        <a href="signup.html" class="btn btn-primary">Sign Up</a>
      `;
    }
  }
}

// Login form handler
function handleLogin(event) {
  event.preventDefault();
  
  // Demo: Validate fields
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const rememberMe = document.getElementById('remember')?.checked || false;
  
  if (!email || !password) {
    showNotification('Please fill in all fields', 'error');
    return;
  }
  
  // Demo: In a real app, this would be an API call
  // For this demo, we'll simulate successful login
  loginUser(email, password, rememberMe);
}

// Signup form handler
function handleSignup(event) {
  event.preventDefault();
  
  // Demo: Validate fields
  const fullname = document.getElementById('fullname').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm-password').value;
  const termsAccepted = document.getElementById('terms')?.checked || false;
  
  if (!fullname || !email || !password || !confirmPassword) {
    showNotification('Please fill in all fields', 'error');
    return;
  }
  
  if (password !== confirmPassword) {
    showNotification('Passwords do not match', 'error');
    return;
  }
  
  if (!termsAccepted) {
    showNotification('You must accept the Terms of Service', 'error');
    return;
  }
  
  // Demo: In a real app, this would be an API call
  // For this demo, we'll simulate successful registration
  registerUser(fullname, email, password);
}

// Demo: Simulate login (would be an API call in production)
function loginUser(email, password, rememberMe) {
  // Add loading state to button
  const submitButton = loginForm.querySelector('button[type="submit"]');
  submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing In...';
  submitButton.disabled = true;
  
  // Simulate API delay
  setTimeout(() => {
    // Demo user (in production this would come from backend)
    const user = {
      id: '12345',
      name: 'John Doe',
      email: email,
      profileImage: '../assets/images/default-avatar.jpg',
      role: email.includes('admin') ? 'admin' : 'user'
    };
    
    // Store user data
    currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    // Update UI
    showNotification('Login successful! Redirecting...', 'success');
    
    // Redirect based on user role
    setTimeout(() => {
      if (user.role === 'admin') {
        window.location.href = 'admin/dashboard.html';
      } else {
        window.location.href = 'index.html';
      }
    }, 1500);
    
  }, 1500);
}

// Demo: Simulate registration (would be an API call in production)
function registerUser(fullname, email, password) {
  // Add loading state to button
  const submitButton = signupForm.querySelector('button[type="submit"]');
  submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating Account...';
  submitButton.disabled = true;
  
  // Simulate API delay
  setTimeout(() => {
    // Demo user (in production this would come from backend)
    const user = {
      id: 'new' + Date.now(),
      name: fullname,
      email: email,
      profileImage: '../assets/images/default-avatar.jpg',
      role: 'user'
    };
    
    // Store user data
    currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    // Update UI
    showNotification('Account created successfully! Redirecting...', 'success');
    
    // Redirect to home page
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1500);
    
  }, 1500);
}

// Logout handler
function handleLogout(event) {
  event.preventDefault();
  
  // Clear user data
  currentUser = null;
  localStorage.removeItem('currentUser');
  
  // Show notification
  showNotification('Logout successful!', 'success');
  
  // Redirect to home page after short delay
  setTimeout(() => {
    window.location.href = 'index.html';
  }, 1000);
}

// Toggle password visibility
function togglePasswordVisibility() {
  const passwordField = this.parentElement.querySelector('input');
  const type = passwordField.getAttribute('type');
  
  if (type === 'password') {
    passwordField.setAttribute('type', 'text');
    this.classList.remove('fa-eye');
    this.classList.add('fa-eye-slash');
  } else {
    passwordField.setAttribute('type', 'password');
    this.classList.remove('fa-eye-slash');
    this.classList.add('fa-eye');
  }
}

// Password strength meter
function updatePasswordStrength() {
  const passwordField = document.getElementById('password');
  if (!passwordField) return;
  
  passwordField.addEventListener('input', function() {
    const password = this.value;
    const strengthMeter = document.querySelector('.strength-meter-fill');
    const strengthText = document.querySelector('.strength-text span');
    
    if (!strengthMeter || !strengthText) return;
    
    // Calculate password strength
    let strength = 0;
    
    if (password.length >= 8) strength += 1;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength += 1;
    if (password.match(/\d/)) strength += 1;
    if (password.match(/[^a-zA-Z\d]/)) strength += 1;
    
    // Adjust to 0-3 scale for the UI
    const displayStrength = Math.min(3, strength);
    
    // Update strength meter
    strengthMeter.setAttribute('data-strength', displayStrength);
    
    // Update text
    const strengthLabels = ['Weak', 'Fair', 'Good', 'Strong'];
    strengthText.textContent = strengthLabels[displayStrength];
  });
}

// Show notification
function showNotification(message, type = 'info') {
  // Check if notification container exists, create if not
  let notificationContainer = document.querySelector('.notification-container');
  
  if (!notificationContainer) {
    notificationContainer = document.createElement('div');
    notificationContainer.className = 'notification-container';
    document.body.appendChild(notificationContainer);
  }
  
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.innerHTML = `
    <div class="notification-icon">
      <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
    </div>
    <div class="notification-content">${message}</div>
    <div class="notification-close"><i class="fas fa-times"></i></div>
  `;
  
  // Add to container
  notificationContainer.appendChild(notification);
  
  // Add animation
  setTimeout(() => {
    notification.classList.add('show');
  }, 10);
  
  // Set up auto dismiss
  const dismissTimeout = setTimeout(() => {
    dismissNotification(notification);
  }, 5000);
  
  // Close button functionality
  const closeBtn = notification.querySelector('.notification-close');
  closeBtn.addEventListener('click', () => {
    clearTimeout(dismissTimeout);
    dismissNotification(notification);
  });
}

// Dismiss notification with animation
function dismissNotification(notification) {
  notification.classList.remove('show');
  notification.classList.add('hide');
  
  // Remove from DOM after animation
  setTimeout(() => {
    notification.remove();
  }, 300);
}

// Add notification styles if they don't exist
function addNotificationStyles() {
  if (!document.getElementById('notification-styles')) {
    const style = document.createElement('style');
    style.id = 'notification-styles';
    style.textContent = `
      .notification-container {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      
      .notification {
        display: flex;
        align-items: center;
        background-color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        padding: 15px;
        width: 300px;
        transform: translateX(120%);
        transition: transform 0.3s ease;
      }
      
      .notification.show {
        transform: translateX(0);
      }
      
      .notification.hide {
        transform: translateX(120%);
      }
      
      .notification-icon {
        margin-right: 15px;
        font-size: 1.5rem;
      }
      
      .notification.success .notification-icon {
        color: var(--success);
      }
      
      .notification.error .notification-icon {
        color: var(--danger);
      }
      
      .notification.info .notification-icon {
        color: var(--primary);
      }
      
      .notification-content {
        flex: 1;
      }
      
      .notification-close {
        cursor: pointer;
        opacity: 0.6;
        transition: opacity 0.2s;
      }
      
      .notification-close:hover {
        opacity: 1;
      }
      
      body.dark-theme .notification {
        background-color: #2a2a2a;
        color: #f8f9fa;
      }
    `;
    document.head.appendChild(style);
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
  // Add notification styles
  addNotificationStyles();
  
  // Initialize authentication
  initAuth();
  
  // Event listeners for forms
  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }
  
  if (signupForm) {
    signupForm.addEventListener('submit', handleSignup);
    
    // Initialize password strength meter
    updatePasswordStrength();
  }
  
  // Logout buttons
  if (logoutBtn) {
    logoutBtn.addEventListener('click', handleLogout);
  }
  
  if (adminLogoutBtn) {
    adminLogoutBtn.addEventListener('click', handleLogout);
  }
  
  // Toggle password visibility
  togglePasswordButtons.forEach(button => {
    button.addEventListener('click', togglePasswordVisibility);
  });
});