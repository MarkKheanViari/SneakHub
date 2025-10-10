// SneakHub Main Application
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all modules
    initializeNavigation();
    initializeCart();
    initializeForms();
    
    // Initialize sliders with a small delay to ensure DOM is ready
    setTimeout(() => {
        initializeSliders();
    }, 100);
    
    // Show loading state
    showLoading();
    
    // Initialize after a short delay to ensure DOM is ready
    setTimeout(() => {
        hideLoading();
    }, 500);
});

// Loading functions
function showLoading() {
    const loadingElements = document.querySelectorAll('.loading');
    loadingElements.forEach(el => el.classList.add('loading'));
}

function hideLoading() {
    const loadingElements = document.querySelectorAll('.loading');
    loadingElements.forEach(el => el.classList.remove('loading'));
}

// Cart management - functions are now in cart.js
// This file only contains initialization and other app-specific functions

// Initialize cart functionality
function initializeCart() {
    // Cart functions are handled in cart.js
    // This function ensures cart is properly initialized
    if (typeof updateCartDisplay === 'function') {
        updateCartDisplay();
    }
    if (typeof updateWishlistDisplay === 'function') {
        updateWishlistDisplay();
    }
}

// Notification system
function showNotification(message, type = 'info') {
    if (typeof Swal !== 'undefined') {
        Swal.fire({
            title: message,
            icon: type,
            timer: 2000,
            showConfirmButton: false,
            toast: true,
            position: 'top-end'
        });
    } else {
        // Fallback to alert if SweetAlert2 is not loaded
        alert(message);
    }
}

// Wishlist functionality
function toggleWishlist(productId) {
    let wishlist = JSON.parse(localStorage.getItem('sneakhub_wishlist')) || [];
    const index = wishlist.indexOf(productId);
    
    if (index > -1) {
        wishlist.splice(index, 1);
        showNotification('Removed from wishlist!', 'info');
    } else {
        wishlist.push(productId);
        showNotification('Added to wishlist!', 'success');
    }
    
    localStorage.setItem('sneakhub_wishlist', JSON.stringify(wishlist));
    updateWishlistDisplay();
}

function updateWishlistDisplay() {
    const wishlist = JSON.parse(localStorage.getItem('sneakhub_wishlist')) || [];
    const wishlistButtons = document.querySelectorAll('.wishlist-btn');
    
    wishlistButtons.forEach(btn => {
        const productId = btn.dataset.productId;
        if (wishlist.includes(productId)) {
            btn.classList.add('active');
            btn.innerHTML = '<i class="fas fa-heart"></i>';
        } else {
            btn.classList.remove('active');
            btn.innerHTML = '<i class="far fa-heart"></i>';
        }
    });
}

// Smooth scrolling for anchor links
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Video Showcase Functionality
function playVideo(button) {
    const videoContainer = button.closest('.video-container');
    const video = videoContainer.querySelector('.showcase-video');
    const overlay = videoContainer.querySelector('.video-overlay');
    
    // Hide overlay and play video
    overlay.style.opacity = '0';
    video.play();
    
    // Show controls
    video.controls = true;
    
    // When video ends, show overlay again
    video.addEventListener('ended', function() {
        overlay.style.opacity = '1';
        video.controls = false;
    });
}

// Initialize video showcase
function initializeVideoShowcase() {
    // Add click handlers for all video play buttons
    const playButtons = document.querySelectorAll('.play-btn');
    playButtons.forEach(button => {
        button.addEventListener('click', function() {
            playVideo(this);
        });
    });
    
    // Add video modal functionality
    const videos = document.querySelectorAll('.showcase-video');
    videos.forEach(video => {
        video.addEventListener('click', function() {
            openVideoModal(this);
        });
    });
}

// Open video in modal
function openVideoModal(video) {
    const videoSrc = video.querySelector('source').src;
    const videoTitle = video.closest('.video-showcase-card').querySelector('.video-title').textContent;
    
    // Create modal HTML
    const modalHTML = `
        <div class="modal fade video-modal" id="videoModal" tabindex="-1">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-body">
                        <video controls autoplay style="width: 100%; height: auto;">
                            <source src="${videoSrc}" type="video/mp4">
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Remove existing modal if any
    const existingModal = document.getElementById('videoModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('videoModal'));
    modal.show();
    
    // Clean up when modal is hidden
    document.getElementById('videoModal').addEventListener('hidden.bs.modal', function() {
        this.remove();
    });
}

// Play large video function
function playVideoLarge(button) {
    const videoContainer = button.closest('.video-container-large');
    const video = videoContainer.querySelector('.showcase-video-large');
    const overlay = videoContainer.querySelector('.video-overlay-large');
    
    // Hide overlay and play video
    overlay.style.opacity = '0';
    video.play();
    
    // Show controls
    video.controls = true;
    
    // When video ends, show overlay again
    video.addEventListener('ended', function() {
        overlay.style.opacity = '1';
        video.controls = false;
    });
}

// Initialize video showcase when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeVideoShowcase();
});

// Cart and wishlist initialization is handled by initializeCart() function
