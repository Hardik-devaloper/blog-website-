/**
 * InsightfulBlog - Admin Panel JavaScript
 * Handles admin panel functionality
 */

// DOM Elements
const adminSidebar = document.querySelector('.admin-sidebar');
const menuToggle = document.querySelector('.menu-toggle');
const adminWrapper = document.querySelector('.admin-wrapper');
const sidebarClose = document.querySelector('.sidebar-close');
const adminLogoutBtn = document.getElementById('admin-logout');

// Initialize Admin Panel
function initAdminPanel() {
  // Check if user is authorized (in a real app, this would be more secure)
  checkAdminAuth();
  
  // Event Listeners
  if (menuToggle) {
    menuToggle.addEventListener('click', toggleSidebar);
  }
  
  if (sidebarClose) {
    sidebarClose.addEventListener('click', closeSidebar);
  }
  
  // Initialize components based on current page
  initCharts();
  initDataTables();
  initEditors();
}

// Check admin authentication
function checkAdminAuth() {
  // In a real app, this would be a proper auth check
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  
  if (!currentUser.id || currentUser.role !== 'admin') {
    // Not authorized - redirect to login
    if (!window.location.pathname.includes('login.html')) {
      window.location.href = '../login.html?redirect=admin';
    }
  }
}

// Toggle sidebar
function toggleSidebar() {
  adminWrapper.classList.toggle('collapsed');
  
  // Save preference
  localStorage.setItem('sidebarCollapsed', adminWrapper.classList.contains('collapsed'));
}

// Close sidebar (mobile)
function closeSidebar() {
  adminSidebar.classList.remove('active');
}

// Initialize charts (placeholder for actual chart implementation)
function initCharts() {
  // Traffic chart (in a real app, would use a charting library like Chart.js)
  const trafficChart = document.getElementById('traffic-chart');
  if (trafficChart) {
    console.log('Traffic chart would be initialized here');
  }
  
  // Categories chart
  const categoriesChart = document.getElementById('categories-chart');
  if (categoriesChart) {
    console.log('Categories chart would be initialized here');
  }
}

// Initialize data tables (placeholder for actual datatable implementation)
function initDataTables() {
  // Posts table
  const postsTable = document.querySelector('.admin-table');
  if (postsTable) {
    // Add event listeners for action buttons
    const editButtons = document.querySelectorAll('.action-btn.edit');
    const deleteButtons = document.querySelectorAll('.action-btn.delete');
    
    editButtons.forEach(button => {
      button.addEventListener('click', function() {
        const row = this.closest('tr');
        const title = row.querySelector('.post-title').textContent;
        console.log('Edit clicked for: ' + title);
        // In a real app, redirect to edit page or open modal
      });
    });
    
    deleteButtons.forEach(button => {
      button.addEventListener('click', function() {
        const row = this.closest('tr');
        const title = row.querySelector('.post-title').textContent;
        
        // Confirm delete
        if (confirm('Are you sure you want to delete "' + title + '"?')) {
          console.log('Delete confirmed for: ' + title);
          // In a real app, send delete request to server
          // Animate row removal
          row.style.backgroundColor = 'rgba(220, 53, 69, 0.1)';
          setTimeout(() => {
            row.style.opacity = '0';
            setTimeout(() => {
              row.remove();
            }, 300);
          }, 300);
        }
      });
    });
  }
}

// Initialize rich text editors (placeholder for actual editor implementation)
function initEditors() {
  // Post editor
  const contentEditor = document.getElementById('content-editor');
  if (contentEditor) {
    console.log('Rich text editor would be initialized here');
    
    // Form submission
    const postForm = document.getElementById('post-form');
    if (postForm) {
      postForm.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('Post form submitted');
        
        // Show success notification
        showAdminNotification('Post saved successfully!', 'success');
      });
    }
  }
}

// Show admin notification
function showAdminNotification(message, type = 'info') {
  // Check if notification container exists, create if not
  let notificationContainer = document.querySelector('.admin-notification-container');
  
  if (!notificationContainer) {
    notificationContainer = document.createElement('div');
    notificationContainer.className = 'admin-notification-container';
    document.body.appendChild(notificationContainer);
  }
  
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `admin-notification ${type}`;
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
function addAdminNotificationStyles() {
  if (!document.getElementById('admin-notification-styles')) {
    const style = document.createElement('style');
    style.id = 'admin-notification-styles';
    style.textContent = `
      .admin-notification-container {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      
      .admin-notification {
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
      
      .admin-notification.show {
        transform: translateX(0);
      }
      
      .admin-notification.hide {
        transform: translateX(120%);
      }
      
      .notification-icon {
        margin-right: 15px;
        font-size: 1.5rem;
      }
      
      .admin-notification.success .notification-icon {
        color: var(--success);
      }
      
      .admin-notification.error .notification-icon {
        color: var(--danger);
      }
      
      .admin-notification.info .notification-icon {
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
      
      body.dark-theme .admin-notification {
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
  addAdminNotificationStyles();
  
  // Initialize admin panel
  initAdminPanel();
  
  // Apply saved sidebar state
  const savedSidebarState = localStorage.getItem('sidebarCollapsed');
  if (savedSidebarState === 'true' && adminWrapper) {
    adminWrapper.classList.add('collapsed');
  }
  
  // Handle mobile sidebar
  const mql = window.matchMedia('(max-width: 991px)');
  
  function handleScreenChange(e) {
    if (e.matches && adminSidebar) {
      adminSidebar.classList.remove('active');
      document.body.classList.remove('sidebar-open');
    }
  }
  
  // Call the function initially
  handleScreenChange(mql);
  
  // Add listener for changes
  mql.addEventListener('change', handleScreenChange);
  
  // Mobile sidebar toggle
  if (menuToggle && adminSidebar) {
    menuToggle.addEventListener('click', function() {
      if (window.innerWidth <= 991) {
        adminSidebar.classList.add('active');
        document.body.classList.add('sidebar-open');
      }
    });
  }
});