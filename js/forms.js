// Form validation and handling
function initializeForms() {
    // Contact form validation
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
    
    // Newsletter form
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterForm);
    }
    
    // Real-time validation
    const formInputs = document.querySelectorAll('.form-control');
    formInputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });
}

function handleContactForm(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Validate form
    if (validateContactForm(data)) {
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span class="spinner"></span> Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
            form.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }
}

function handleNewsletterForm(e) {
    e.preventDefault();
    
    const form = e.target;
    const email = form.querySelector('input[type="email"]').value;
    
    if (validateEmail(email)) {
        showNotification('Successfully subscribed to newsletter!', 'success');
        form.reset();
    } else {
        showNotification('Please enter a valid email address.', 'error');
    }
}

function validateContactForm(data) {
    let isValid = true;
    
    // Validate name
    if (!data.name || data.name.trim().length < 2) {
        showFieldError('name', 'Name must be at least 2 characters long');
        isValid = false;
    }
    
    // Validate email
    if (!data.email || !validateEmail(data.email)) {
        showFieldError('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate subject
    if (!data.subject || data.subject.trim().length < 5) {
        showFieldError('subject', 'Subject must be at least 5 characters long');
        isValid = false;
    }
    
    // Validate message
    if (!data.message || data.message.trim().length < 10) {
        showFieldError('message', 'Message must be at least 10 characters long');
        isValid = false;
    }
    
    return isValid;
}

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    const fieldName = field.name;
    
    clearFieldError(e);
    
    switch (fieldName) {
        case 'name':
            if (value.length < 2) {
                showFieldError(fieldName, 'Name must be at least 2 characters long');
            }
            break;
        case 'email':
            if (!validateEmail(value)) {
                showFieldError(fieldName, 'Please enter a valid email address');
            }
            break;
        case 'subject':
            if (value.length < 5) {
                showFieldError(fieldName, 'Subject must be at least 5 characters long');
            }
            break;
        case 'message':
            if (value.length < 10) {
                showFieldError(fieldName, 'Message must be at least 10 characters long');
            }
            break;
    }
}

function clearFieldError(e) {
    const field = e.target;
    const fieldName = field.name;
    const errorElement = document.getElementById(`${fieldName}-error`);
    
    if (errorElement) {
        errorElement.remove();
    }
    
    field.classList.remove('is-invalid');
}

function showFieldError(fieldName, message) {
    const field = document.querySelector(`[name="${fieldName}"]`);
    if (field) {
        field.classList.add('is-invalid');
        
        // Remove existing error message
        const existingError = document.getElementById(`${fieldName}-error`);
        if (existingError) {
            existingError.remove();
        }
        
        // Add new error message
        const errorDiv = document.createElement('div');
        errorDiv.id = `${fieldName}-error`;
        errorDiv.className = 'invalid-feedback';
        errorDiv.textContent = message;
        
        field.parentNode.appendChild(errorDiv);
    }
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Search functionality
function initializeSearch() {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    
    if (searchInput) {
        let searchTimeout;
        
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            const query = this.value.trim();
            
            if (query.length >= 2) {
                searchTimeout = setTimeout(() => {
                    performSearch(query);
                }, 300);
            } else {
                hideSearchResults();
            }
        });
        
        // Hide search results when clicking outside
        document.addEventListener('click', function(e) {
            if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
                hideSearchResults();
            }
        });
    }
}

function performSearch(query) {
    // This would typically make an API call
    // For now, we'll simulate search results
    const mockResults = [
        { name: 'Nike Air Max 270', category: 'Men\'s Shoes', price: 150 },
        { name: 'Adidas Ultraboost 22', category: 'Sports Shoes', price: 180 },
        { name: 'Jordan 1 Retro', category: 'Men\'s Shoes', price: 170 },
        { name: 'Converse Chuck Taylor', category: 'Women\'s Shoes', price: 65 }
    ];
    
    const results = mockResults.filter(item => 
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
    );
    
    displaySearchResults(results);
}

function displaySearchResults(results) {
    const searchResults = document.getElementById('search-results');
    if (!searchResults) return;
    
    if (results.length === 0) {
        searchResults.innerHTML = '<div class="p-3 text-muted">No products found</div>';
    } else {
        searchResults.innerHTML = results.map(result => `
            <div class="search-result-item p-3 border-bottom">
                <h6 class="mb-1">${result.name}</h6>
                <small class="text-muted">${result.category}</small>
                <div class="text-primary-custom fw-bold">$${result.price}</div>
            </div>
        `).join('');
    }
    
    searchResults.style.display = 'block';
}

function hideSearchResults() {
    const searchResults = document.getElementById('search-results');
    if (searchResults) {
        searchResults.style.display = 'none';
    }
}

// Initialize search on page load
document.addEventListener('DOMContentLoaded', initializeSearch);
