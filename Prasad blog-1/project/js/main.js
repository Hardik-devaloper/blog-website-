/**
 * InsightfulBlog - Main JavaScript
 * Handles global functionality for the blog website
 */

// DOM Elements
const body = document.body;
const themeToggle = document.querySelector('.theme-toggle');
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileMenuClose = document.querySelector('.mobile-menu-close');
const mobileDropdownToggles = document.querySelectorAll('.mobile-dropdown-toggle');
const header = document.getElementById('header');

// Theme Management
function initializeTheme() {
  // Check for saved theme preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    body.classList.add('dark-theme');
    updateThemeIcon(true);
  }
}

function toggleTheme() {
  const isDarkTheme = body.classList.toggle('dark-theme');
  updateThemeIcon(isDarkTheme);
  
  // Save preference
  localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
}

function updateThemeIcon(isDarkTheme) {
  const icons = document.querySelectorAll('.theme-toggle i');
  
  icons.forEach(icon => {
    if (isDarkTheme) {
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
    } else {
      icon.classList.remove('fa-sun');
      icon.classList.add('fa-moon');
    }
  });
}

// Mobile Menu Management
function toggleMobileMenu() {
  mobileMenu.classList.toggle('active');
  
  // Create overlay if it doesn't exist
  let overlay = document.querySelector('.mobile-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'mobile-overlay';
    document.body.appendChild(overlay);
    
    // Add click event to close menu when overlay is clicked
    overlay.addEventListener('click', closeMobileMenu);
  }
  
  // Toggle overlay
  overlay.classList.toggle('active');
  
  // Prevent body scroll when menu is open
  if (mobileMenu.classList.contains('active')) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
}

function closeMobileMenu() {
  mobileMenu.classList.remove('active');
  const overlay = document.querySelector('.mobile-overlay');
  if (overlay) {
    overlay.classList.remove('active');
  }
  document.body.style.overflow = '';
}

// Handle Mobile Dropdown Menus
function toggleMobileDropdown(e) {
  e.preventDefault();
  const parent = this.parentElement;
  const dropdown = parent.querySelector('.mobile-dropdown-menu');
  dropdown.classList.toggle('active');
  
  // Toggle icon rotation
  const icon = this.querySelector('i.fa-chevron-down');
  if (icon) {
    icon.style.transform = dropdown.classList.contains('active') 
      ? 'rotate(180deg)' 
      : 'rotate(0)';
  }
}

// Scroll Effects
function handleScroll() {
  if (window.scrollY > 100) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}

// Animation on Scroll
function animateOnScroll() {
  const elements = document.querySelectorAll('.animate-on-scroll');
  
  elements.forEach(element => {
    const elementPosition = element.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.2;
    
    if (elementPosition < screenPosition) {
      element.classList.add('animated');
    }
  });
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
  // Initialize theme
  initializeTheme();
  
  // Event Listeners
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }
  
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', toggleMobileMenu);
  }
  
  if (mobileMenuClose) {
    mobileMenuClose.addEventListener('click', closeMobileMenu);
  }
  
  // Mobile dropdown toggles
  mobileDropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', toggleMobileDropdown);
  });
  
  // Scroll listeners
  window.addEventListener('scroll', handleScroll);
  window.addEventListener('scroll', animateOnScroll);
  
  // Initial animation check
  animateOnScroll();
});

// Utility Functions
function debounce(func, delay) {
  let timeout;
  return function() {
    const context = this;
    const args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), delay);
  };
}

// Handle resize events (debounced)
window.addEventListener('resize', debounce(function() {
  // Code to run on window resize
  if (window.innerWidth > 991 && mobileMenu.classList.contains('active')) {
    closeMobileMenu();
  }
}, 250));