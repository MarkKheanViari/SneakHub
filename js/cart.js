// Shopping cart functionality
let cart = JSON.parse(localStorage.getItem('sneakhub_cart')) || [];

// Cart modal management
function openCartModal() {
    const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
    updateCartDisplay();
    cartModal.show();
}

function closeCartModal() {
    const cartModal = bootstrap.Modal.getInstance(document.getElementById('cartModal'));
    if (cartModal) {
        cartModal.hide();
    }
}

// Add product to cart
function addToCart(productId, productName, productPrice, productImage, productSize = 'M') {
    const existingItem = cart.find(item => item.id === productId && item.size === productSize);
    
    if (existingItem) {
        existingItem.quantity += 1;
        showNotification(`${productName} quantity updated!`, 'info');
    } else {
        cart.push({
            id: productId,
            name: productName,
            price: parseFloat(productPrice),
            image: productImage,
            size: productSize,
            quantity: 1
        });
        showNotification(`${productName} added to cart!`, 'success');
    }
    
    updateCartDisplay();
    saveCart();
}

// Remove product from cart
function removeFromCart(productId, size = null) {
    if (size) {
        cart = cart.filter(item => !(item.id === productId && item.size === size));
    } else {
        cart = cart.filter(item => item.id !== productId);
    }
    
    updateCartDisplay();
    saveCart();
    showNotification('Product removed from cart!', 'info');
}

// Update product quantity in cart
function updateCartQuantity(productId, newQuantity, size = null) {
    const item = cart.find(item => {
        if (size) {
            return item.id === productId && item.size === size;
        }
        return item.id === productId;
    });
    
    if (item) {
        if (newQuantity <= 0) {
            removeFromCart(productId, size);
        } else {
            item.quantity = newQuantity;
            updateCartDisplay();
            saveCart();
        }
    }
}

// Update cart display
function updateCartDisplay() {
    updateCartCounter();
    updateCartItems();
    updateCartTotal();
}

// Update cart counter in navbar
function updateCartCounter() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'block' : 'none';
    }
}

// Update cart items in modal
function updateCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    if (!cartItemsContainer) return;
    
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="text-center py-5">
                <i class="fas fa-shopping-cart fa-3x text-muted mb-3"></i>
                <h5 class="text-muted">Your cart is empty</h5>
                <p class="text-muted">Add some products to get started!</p>
            </div>
        `;
        return;
    }
    
    cart.forEach(item => {
        const cartItem = createCartItemElement(item);
        cartItemsContainer.appendChild(cartItem);
    });
}

// Create cart item element
function createCartItemElement(item) {
    const div = document.createElement('div');
    div.className = 'cart-item d-flex align-items-center py-3 border-bottom';
    div.innerHTML = `
        <div class="flex-shrink-0">
            <img src="${item.image}" alt="${item.name}" class="cart-item-image" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px;">
        </div>
        <div class="flex-grow-1 ms-3">
            <h6 class="mb-1">${item.name}</h6>
            <small class="text-muted">Size: ${item.size}</small>
            <div class="d-flex align-items-center mt-2">
                <button class="btn btn-sm btn-outline-secondary" onclick="updateCartQuantity('${item.id}', ${item.quantity - 1}, '${item.size}')">
                    <i class="fas fa-minus"></i>
                </button>
                <span class="mx-3 fw-bold">${item.quantity}</span>
                <button class="btn btn-sm btn-outline-secondary" onclick="updateCartQuantity('${item.id}', ${item.quantity + 1}, '${item.size}')">
                    <i class="fas fa-plus"></i>
                </button>
            </div>
        </div>
        <div class="text-end">
            <div class="fw-bold text-primary-custom mb-2">$${(item.price * item.quantity).toFixed(2)}</div>
            <button class="btn btn-sm btn-outline-danger" onclick="removeFromCart('${item.id}', '${item.size}')">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;
    return div;
}

// Update cart total
function updateCartTotal() {
    const cartTotal = document.getElementById('cart-total');
    const cartSubtotal = document.getElementById('cart-subtotal');
    const cartTax = document.getElementById('cart-tax');
    const cartShipping = document.getElementById('cart-shipping');
    
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.08; // 8% tax
    const shipping = subtotal > 100 ? 0 : 10; // Free shipping over $100
    const total = subtotal + tax + shipping;
    
    if (cartSubtotal) cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
    if (cartTax) cartTax.textContent = `$${tax.toFixed(2)}`;
    if (cartShipping) cartShipping.textContent = shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`;
    if (cartTotal) cartTotal.textContent = `$${total.toFixed(2)}`;
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('sneakhub_cart', JSON.stringify(cart));
}

// Clear entire cart
function clearCart() {
    cart = [];
    updateCartDisplay();
    saveCart();
    showNotification('Cart cleared!', 'info');
}

// Proceed to checkout
function proceedToCheckout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!', 'warning');
        return;
    }
    
    // Redirect to checkout page
    window.location.href = 'checkout.html';
}

// Get cart item count
function getCartItemCount() {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
}

// Get cart total
function getCartTotal() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.08;
    const shipping = subtotal > 100 ? 0 : 10;
    return subtotal + tax + shipping;
}

// Initialize cart on page load
document.addEventListener('DOMContentLoaded', function() {
    updateCartDisplay();
    
    // Add event listeners for cart buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.dataset.productId;
            const productName = this.dataset.productName;
            const productPrice = this.dataset.productPrice;
            const productImage = this.dataset.productImage;
            const productSize = this.dataset.productSize || 'M';
            
            addToCart(productId, productName, productPrice, productImage, productSize);
        });
    });
    
    // Add event listeners for cart modal
    const cartModalTrigger = document.getElementById('cart-modal-trigger');
    if (cartModalTrigger) {
        cartModalTrigger.addEventListener('click', openCartModal);
    }
});

// Export functions for global use
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateCartQuantity = updateCartQuantity;
window.openCartModal = openCartModal;
window.closeCartModal = closeCartModal;
window.clearCart = clearCart;
window.proceedToCheckout = proceedToCheckout;
