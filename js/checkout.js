// Checkout functionality
document.addEventListener('DOMContentLoaded', function() {
    // Load cart items on page load
    loadCartItems();
    
    // Initialize form handlers
    initializeCheckoutForms();
    
    // Initialize payment method handlers
    initializePaymentMethods();
    
    // Initialize same as shipping checkbox
    initializeSameAsShipping();
    
    // Initialize place order button
    initializePlaceOrderButton();
    
    // Initialize form validation
    initializeFormValidation();
});

// Load cart items from localStorage
function loadCartItems() {
    const cart = JSON.parse(localStorage.getItem('sneakhub_cart')) || [];
    const orderItemsContainer = document.getElementById('order-items');
    
    if (cart.length === 0) {
        orderItemsContainer.innerHTML = `
            <div class="text-center py-4">
                <i class="fas fa-shopping-cart fa-2x text-muted mb-3"></i>
                <h6 class="text-muted">Your cart is empty</h6>
                <a href="index.html" class="btn btn-primary btn-sm">Continue Shopping</a>
            </div>
        `;
        return;
    }
    
    orderItemsContainer.innerHTML = '';
    cart.forEach(item => {
        const orderItem = createOrderItemElement(item);
        orderItemsContainer.appendChild(orderItem);
    });
    
    updateOrderTotals();
}

// Create order item element
function createOrderItemElement(item) {
    const div = document.createElement('div');
    div.className = 'd-flex align-items-center mb-3 pb-3 border-bottom';
    div.innerHTML = `
        <div class="flex-shrink-0">
            <img src="${item.image}" alt="${item.name}" class="rounded" style="width: 60px; height: 60px; object-fit: cover;">
        </div>
        <div class="flex-grow-1 ms-3">
            <h6 class="mb-1">${item.name}</h6>
            <small class="text-muted">Size: ${item.size}</small>
            <div class="d-flex justify-content-between align-items-center mt-1">
                <span class="text-muted">Qty: ${item.quantity}</span>
                <span class="fw-bold text-primary-custom">$${(item.price * item.quantity).toFixed(2)}</span>
            </div>
        </div>
    `;
    return div;
}

// Update order totals
function updateOrderTotals() {
    const cart = JSON.parse(localStorage.getItem('sneakhub_cart')) || [];
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 100 ? 0 : 9.99;
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + shipping + tax;
    
    document.getElementById('order-subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('order-shipping').textContent = shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`;
    document.getElementById('order-tax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('order-total').textContent = `$${total.toFixed(2)}`;
}

// Initialize checkout forms
function initializeCheckoutForms() {
    // Shipping form validation
    const shippingForm = document.getElementById('shipping-form');
    if (shippingForm) {
        shippingForm.addEventListener('input', validateShippingForm);
    }
    
    // Billing form validation
    const billingForm = document.getElementById('billing-form');
    if (billingForm) {
        billingForm.addEventListener('input', validateBillingForm);
    }
    
    // Payment form validation
    const paymentForm = document.getElementById('payment-form');
    if (paymentForm) {
        paymentForm.addEventListener('input', validatePaymentForm);
    }
}

// Initialize payment method handlers
function initializePaymentMethods() {
    const paymentMethods = document.querySelectorAll('input[name="payment-method"]');
    const creditCardFields = document.getElementById('credit-card-fields');
    
    paymentMethods.forEach(method => {
        method.addEventListener('change', function() {
            if (this.value === 'credit-card') {
                creditCardFields.style.display = 'block';
                // Make credit card fields required
                const creditCardInputs = creditCardFields.querySelectorAll('input');
                creditCardInputs.forEach(input => input.required = true);
            } else {
                creditCardFields.style.display = 'none';
                // Remove required from credit card fields
                const creditCardInputs = creditCardFields.querySelectorAll('input');
                creditCardInputs.forEach(input => input.required = false);
            }
        });
    });
}

// Initialize same as shipping checkbox
function initializeSameAsShipping() {
    const sameAsShipping = document.getElementById('same-as-shipping');
    const billingForm = document.getElementById('billing-form');
    
    if (sameAsShipping && billingForm) {
        sameAsShipping.addEventListener('change', function() {
            if (this.checked) {
                billingForm.style.display = 'none';
                copyShippingToBilling();
            } else {
                billingForm.style.display = 'block';
            }
        });
    }
}

// Copy shipping information to billing
function copyShippingToBilling() {
    const shippingFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'state', 'zipCode'];
    
    shippingFields.forEach(field => {
        const shippingInput = document.querySelector(`#shipping-${field.replace(/([A-Z])/g, '-$1').toLowerCase()}`);
        const billingInput = document.querySelector(`#billing-${field.replace(/([A-Z])/g, '-$1').toLowerCase()}`);
        
        if (shippingInput && billingInput) {
            billingInput.value = shippingInput.value;
        }
    });
}

// Initialize place order button
function initializePlaceOrderButton() {
    const placeOrderBtn = document.getElementById('place-order-btn');
    const termsAgreement = document.getElementById('terms-agreement');
    
    if (placeOrderBtn && termsAgreement) {
        // Enable/disable button based on terms agreement
        termsAgreement.addEventListener('change', function() {
            placeOrderBtn.disabled = !this.checked;
        });
        
        // Handle place order click
        placeOrderBtn.addEventListener('click', handlePlaceOrder);
    }
}

// Initialize form validation
function initializeFormValidation() {
    // Card number formatting
    const cardNumber = document.getElementById('card-number');
    if (cardNumber) {
        cardNumber.addEventListener('input', function() {
            let value = this.value.replace(/\s/g, '').replace(/[^0-9]/gi, '');
            let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
            this.value = formattedValue;
        });
    }
    
    // Expiry date formatting
    const expiryDate = document.getElementById('expiry-date');
    if (expiryDate) {
        expiryDate.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4);
            }
            this.value = value;
        });
    }
    
    // CVV formatting
    const cvv = document.getElementById('cvv');
    if (cvv) {
        cvv.addEventListener('input', function() {
            this.value = this.value.replace(/\D/g, '');
        });
    }
}

// Validate shipping form
function validateShippingForm() {
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'state', 'zipCode'];
    let isValid = true;
    
    requiredFields.forEach(field => {
        const input = document.querySelector(`#shipping-${field.replace(/([A-Z])/g, '-$1').toLowerCase()}`);
        if (input && !input.value.trim()) {
            isValid = false;
        }
    });
    
    return isValid;
}

// Validate billing form
function validateBillingForm() {
    const sameAsShipping = document.getElementById('same-as-shipping');
    if (sameAsShipping && sameAsShipping.checked) {
        return true;
    }
    
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'state', 'zipCode'];
    let isValid = true;
    
    requiredFields.forEach(field => {
        const input = document.querySelector(`#billing-${field.replace(/([A-Z])/g, '-$1').toLowerCase()}`);
        if (input && !input.value.trim()) {
            isValid = false;
        }
    });
    
    return isValid;
}

// Validate payment form
function validatePaymentForm() {
    const selectedPaymentMethod = document.querySelector('input[name="payment-method"]:checked');
    
    if (!selectedPaymentMethod) {
        return false;
    }
    
    if (selectedPaymentMethod.value === 'credit-card') {
        const requiredFields = ['cardNumber', 'expiryDate', 'cvv', 'cardholderName'];
        let isValid = true;
        
        requiredFields.forEach(field => {
            const input = document.getElementById(field);
            if (input && !input.value.trim()) {
                isValid = false;
            }
        });
        
        // Additional credit card validation
        if (isValid) {
            const cardNumber = document.getElementById('card-number').value.replace(/\s/g, '');
            const expiryDate = document.getElementById('expiry-date').value;
            const cvv = document.getElementById('cvv').value;
            
            if (cardNumber.length < 13 || cardNumber.length > 19) {
                isValid = false;
            }
            
            if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
                isValid = false;
            }
            
            if (cvv.length < 3 || cvv.length > 4) {
                isValid = false;
            }
        }
        
        return isValid;
    }
    
    return true; // For non-credit card methods
}

// Handle place order
function handlePlaceOrder() {
    // Validate all forms
    if (!validateShippingForm()) {
        showNotification('Please fill in all required shipping information.', 'error');
        return;
    }
    
    if (!validateBillingForm()) {
        showNotification('Please fill in all required billing information.', 'error');
        return;
    }
    
    if (!validatePaymentForm()) {
        showNotification('Please fill in all required payment information.', 'error');
        return;
    }
    
    // Check if cart is empty
    const cart = JSON.parse(localStorage.getItem('sneakhub_cart')) || [];
    if (cart.length === 0) {
        showNotification('Your cart is empty!', 'warning');
        return;
    }
    
    // Show loading state
    const placeOrderBtn = document.getElementById('place-order-btn');
    const originalText = placeOrderBtn.innerHTML;
    placeOrderBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Processing...';
    placeOrderBtn.disabled = true;
    
    // Simulate order processing
    setTimeout(() => {
        processOrder();
        placeOrderBtn.innerHTML = originalText;
        placeOrderBtn.disabled = false;
    }, 2000);
}

// Process order
function processOrder() {
    const cart = JSON.parse(localStorage.getItem('sneakhub_cart')) || [];
    const orderData = collectOrderData();
    
    // Generate order number
    const orderNumber = 'SNK' + Date.now().toString().slice(-8);
    
    // Save order to localStorage (in a real app, this would be sent to a server)
    const order = {
        orderNumber: orderNumber,
        date: new Date().toISOString(),
        items: cart,
        shipping: orderData.shipping,
        billing: orderData.billing,
        payment: orderData.payment,
        total: calculateOrderTotal(),
        status: 'processing'
    };
    
    // Save order
    const orders = JSON.parse(localStorage.getItem('sneakhub_orders')) || [];
    orders.push(order);
    localStorage.setItem('sneakhub_orders', JSON.stringify(orders));
    
    // Clear cart
    localStorage.removeItem('sneakhub_cart');
    
    // Show confirmation modal
    showOrderConfirmation(order);
}

// Collect order data from forms
function collectOrderData() {
    const shippingData = collectFormData('shipping-form');
    const billingData = document.getElementById('same-as-shipping').checked ? 
        shippingData : collectFormData('billing-form');
    const paymentData = collectFormData('payment-form');
    
    return {
        shipping: shippingData,
        billing: billingData,
        payment: paymentData
    };
}

// Collect form data
function collectFormData(formId) {
    const form = document.getElementById(formId);
    const formData = new FormData(form);
    const data = {};
    
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    
    return data;
}

// Calculate order total
function calculateOrderTotal() {
    const cart = JSON.parse(localStorage.getItem('sneakhub_cart')) || [];
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 100 ? 0 : 9.99;
    const tax = subtotal * 0.08;
    return subtotal + shipping + tax;
}

// Show order confirmation
function showOrderConfirmation(order) {
    // Update modal content
    document.getElementById('order-number').textContent = order.orderNumber;
    document.getElementById('order-date').textContent = new Date(order.date).toLocaleDateString();
    document.getElementById('order-amount').textContent = `$${order.total.toFixed(2)}`;
    
    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('orderConfirmationModal'));
    modal.show();
    
    // Show success notification
    showNotification('Order placed successfully!', 'success');
}

// Show notification
function showNotification(message, type = 'info') {
    if (typeof Swal !== 'undefined') {
        Swal.fire({
            title: message,
            icon: type,
            timer: 3000,
            showConfirmButton: false,
            toast: true,
            position: 'top-end'
        });
    } else {
        alert(message);
    }
}

// Export functions for global use
window.loadCartItems = loadCartItems;
window.updateOrderTotals = updateOrderTotals;
