/**
 * InsightfulBlog - Posts Module
 * Handles all blog post functionality
 */

// Sample blog data for demo purposes
// In a real application, this would come from an API/database
const blogPosts = [
  {
    id: 1,
    title: "The Future of Web Development in 2025",
    excerpt: "Explore the emerging trends and technologies that will shape the future of web development in the coming years.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl vel nisl.",
    category: "Technology",
    date: "January 15, 2025",
    author: {
      name: "John Doe",
      image: "./assets/images/default-avatar.jpg"
    },
    thumbnail: "https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    views: 1286,
    comments: 32,
    featured: true
  },
  {
    id: 2,
    title: "10 Essential Tips for Creating a Perfect Morning Routine",
    excerpt: "Discover how to optimize your morning routine for increased productivity, better mental health, and improved overall wellbeing.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl vel nisl.",
    category: "Lifestyle",
    date: "January 13, 2025",
    author: {
      name: "Emily Johnson",
      image: "./assets/images/user1.jpg"
    },
    thumbnail: "https://images.pexels.com/photos/1051075/pexels-photo-1051075.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    views: 965,
    comments: 28,
    featured: true
  },
  {
    id: 3,
    title: "5 Delicious Plant-Based Recipes for Beginners",
    excerpt: "Easy, nutritious, and delicious plant-based recipes that anyone can make, regardless of cooking experience.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl vel nisl.",
    category: "Food",
    date: "January 10, 2025",
    author: {
      name: "Sarah Wilson",
      image: "./assets/images/user2.jpg"
    },
    thumbnail: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    views: 789,
    comments: 19,
    featured: true
  },
  {
    id: 4,
    title: "Understanding Cryptocurrency: A Beginner's Guide",
    excerpt: "Everything you need to know about cryptocurrency, blockchain technology, and how to safely invest in digital assets.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl vel nisl.",
    category: "Technology",
    date: "January 9, 2025",
    author: {
      name: "Michael Chen",
      image: "./assets/images/user3.jpg"
    },
    thumbnail: "https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    views: 1342,
    comments: 45,
    featured: false
  },
  {
    id: 5,
    title: "Hidden Gems: Underrated Travel Destinations for 2025",
    excerpt: "Discover lesser-known travel destinations that offer unique experiences, cultural immersion, and unforgettable memories.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl vel nisl.",
    category: "Travel",
    date: "January 7, 2025",
    author: {
      name: "Jessica Lee",
      image: "./assets/images/user4.jpg"
    },
    thumbnail: "https://images.pexels.com/photos/2325446/pexels-photo-2325446.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    views: 687,
    comments: 17,
    featured: false
  },
  {
    id: 6,
    title: "The Science of Productivity: How to Get More Done in Less Time",
    excerpt: "Research-backed strategies and techniques to boost your productivity, improve focus, and achieve your goals more efficiently.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl vel nisl.",
    category: "Lifestyle",
    date: "January 5, 2025",
    author: {
      name: "David Wilson",
      image: "./assets/images/user5.jpg"
    },
    thumbnail: "https://images.pexels.com/photos/3243/pen-calendar-to-do-checklist.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    views: 945,
    comments: 23,
    featured: false
  }
];

// DOM Elements
const featuredPostsContainer = document.getElementById('featured-posts-container');
const latestPostsContainer = document.getElementById('latest-posts-container');
const loadMoreBtn = document.getElementById('load-more-btn');

// Pagination variables
let currentPage = 1;
const postsPerPage = 6;

// Initialize posts
function initializePosts() {
  if (featuredPostsContainer) {
    loadFeaturedPosts();
  }
  
  if (latestPostsContainer) {
    loadLatestPosts();
  }
  
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', loadMorePosts);
  }
}

// Load featured posts
function loadFeaturedPosts() {
  // Clear skeleton loaders
  featuredPostsContainer.innerHTML = '';
  
  // Filter featured posts
  const featured = blogPosts.filter(post => post.featured);
  
  // Add each post to the container
  featured.forEach(post => {
    featuredPostsContainer.appendChild(createPostCard(post));
  });
  
  // Add animation classes
  addAnimationClasses(featuredPostsContainer.querySelectorAll('.post-card'));
}

// Load latest posts
function loadLatestPosts() {
  // Clear skeleton loaders only on first load
  if (currentPage === 1) {
    latestPostsContainer.innerHTML = '';
  }
  
  // Sort posts by date (newest first)
  const sortedPosts = [...blogPosts].sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });
  
  // Calculate pagination
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const paginatedPosts = sortedPosts.slice(startIndex, endIndex);
  
  // Add each post to the container
  paginatedPosts.forEach(post => {
    latestPostsContainer.appendChild(createPostCard(post));
  });
  
  // Add animation classes
  addAnimationClasses(latestPostsContainer.querySelectorAll('.post-card:not(.animated)'));
  
  // Handle "Load More" button visibility
  if (endIndex >= sortedPosts.length) {
    loadMoreBtn.style.display = 'none';
  } else {
    loadMoreBtn.style.display = 'block';
  }
}

// Load more posts (pagination)
function loadMorePosts() {
  currentPage++;
  loadLatestPosts();
  
  // Scroll slightly to show new content
  setTimeout(() => {
    window.scrollBy({
      top: 200,
      behavior: 'smooth'
    });
  }, 100);
}

// Create post card element
function createPostCard(post) {
  const cardElement = document.createElement('article');
  cardElement.className = 'post-card animate-on-scroll';
  
  cardElement.innerHTML = `
    <div class="post-thumbnail">
      <img src="${post.thumbnail}" alt="${post.title}" loading="lazy">
    </div>
    <div class="post-content">
      <a href="category.html?category=${post.category.toLowerCase()}" class="post-category">${post.category}</a>
      <h3 class="post-title">
        <a href="post.html?id=${post.id}">${post.title}</a>
      </h3>
      <p class="post-excerpt">${post.excerpt}</p>
      <div class="post-meta">
        <div class="post-author">
          <img src="${post.author.image}" alt="${post.author.name}" class="author-img" loading="lazy">
          <span>${post.author.name}</span>
        </div>
        <div class="post-date">${post.date}</div>
      </div>
    </div>
  `;
  
  return cardElement;
}

// Add staggered animation classes
function addAnimationClasses(elements) {
  elements.forEach((element, index) => {
    setTimeout(() => {
      element.classList.add('animated');
    }, 100 * index);
  });
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', initializePosts);