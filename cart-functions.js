// Cart Functions - Bổ sung cho script.js
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('cart.html')) {
        // Wait a bit for the page to fully load
        setTimeout(() => {
            loadCartItems();
        }, 100);
    }
});

function loadCartItems() {
    const cartItems = JSON.parse(localStorage.getItem('yuelight_cart')) || [];
    const emptyCart = document.getElementById('empty-cart');
    const cartItemsContainer = document.getElementById('cart-items');
    
    console.log('Loading cart items:', cartItems);
    
    if (cartItems.length === 0) {
        // Show empty cart state
        if (emptyCart) {
            emptyCart.classList.remove('hidden');
        }
        if (cartItemsContainer) {
            cartItemsContainer.classList.add('hidden');
        }
        return;
    }
    
    // Hide empty cart state
    if (emptyCart) {
        emptyCart.classList.add('hidden');
    }
    
    // Show cart items
    if (cartItemsContainer) {
        cartItemsContainer.classList.remove('hidden');
        cartItemsContainer.innerHTML = cartItems.map(item => `
            <div class="flex items-center space-x-6 py-6 border-b border-gray-200">
                <div class="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
                    <img src="${item.image || 'img/photo-1585870531763-dad72a085631.jpeg'}" alt="${item.name}" class="w-full h-full object-cover">
                </div>
                <div class="flex-1">
                    <h3 class="text-xl font-bold text-gray-800">${item.name}</h3>
                    <p class="text-gray-600">Sản phẩm chất lượng cao</p>
                    <p class="text-red-600 font-bold text-lg">${item.price.toLocaleString()}₫</p>
                </div>
                <div class="flex items-center space-x-3">
                    <button onclick="updateCartQuantity(this, -1)" class="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors duration-300">
                        <i class="fas fa-minus text-sm"></i>
                    </button>
                    <span class="text-lg font-bold w-8 text-center">${item.quantity}</span>
                    <button onclick="updateCartQuantity(this, 1)" class="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors duration-300">
                        <i class="fas fa-plus text-sm"></i>
                    </button>
                </div>
                <button onclick="removeFromCart(this)" class="text-red-500 hover:text-red-700 transition-colors duration-300">
                    <i class="fas fa-trash text-lg"></i>
                </button>
            </div>
        `).join('');
    }
    
    updateCartTotal();
}

function updateCartQuantity(button, change) {
    const cartItem = button.closest('.flex.items-center.space-x-6');
    if (!cartItem) return;
    
    const name = cartItem.querySelector('h3')?.textContent;
    const quantitySpan = cartItem.querySelector('span[class*="text-center"]');
    
    if (!name || !quantitySpan) return;
    
    let cartItems = JSON.parse(localStorage.getItem('yuelight_cart')) || [];
    const item = cartItems.find(item => item.name === name);
    
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            cartItems = cartItems.filter(cartItem => cartItem.name !== name);
            cartItem.remove();
        } else {
            quantitySpan.textContent = item.quantity;
        }
        
        localStorage.setItem('yuelight_cart', JSON.stringify(cartItems));
        updateCartCount();
        updateCartTotal();
        
        // Reload cart items if we're on cart page
        if (window.location.pathname.includes('cart.html')) {
            loadCartItems();
        }
    }
}

function removeFromCart(button) {
    const cartItem = button.closest('.flex.items-center.space-x-6');
    if (!cartItem) return;
    
    const name = cartItem.querySelector('h3')?.textContent;
    if (name) {
        let cartItems = JSON.parse(localStorage.getItem('yuelight_cart')) || [];
        cartItems = cartItems.filter(item => item.name !== name);
        localStorage.setItem('yuelight_cart', JSON.stringify(cartItems));
        
        updateCartCount();
        updateCartTotal();
        showNotification('Đã xóa sản phẩm khỏi giỏ hàng!', 'info');
        
        // Reload cart items if we're on cart page
        if (window.location.pathname.includes('cart.html')) {
            loadCartItems();
        }
    }
}

function updateCartTotal() {
    const cartItems = JSON.parse(localStorage.getItem('yuelight_cart')) || [];
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Show/hide order summary based on cart items
    const orderSummary = document.getElementById('order-summary');
    if (orderSummary) {
        if (cartItems.length > 0) {
            orderSummary.style.display = 'block';
        } else {
            orderSummary.style.display = 'none';
        }
    }
    
    // Update total in order summary
    const totalElement = document.querySelector('#order-summary .text-red-600');
    if (totalElement) {
        totalElement.textContent = `${total.toLocaleString()}₫`;
    }
    
    // Update subtotal
    const subtotalElement = document.querySelector('#order-summary .space-y-4 .font-bold:first-child');
    if (subtotalElement) {
        subtotalElement.textContent = `${total.toLocaleString()}₫`;
    }
}

function updateCartCount() {
    const cartItems = JSON.parse(localStorage.getItem('yuelight_cart')) || [];
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    
    // Update cart count in header
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = totalItems;
    }
    
    // Update cart count in navigation links
    const cartCountElements = document.querySelectorAll('.fa-shopping-cart');
    cartCountElements.forEach(element => {
        const nextSibling = element.nextSibling;
        if (nextSibling && nextSibling.textContent.includes('Cart')) {
            nextSibling.textContent = `Cart (${totalItems})`;
        }
    });
}

function handleCheckout(button) {
    const cartItems = JSON.parse(localStorage.getItem('yuelight_cart')) || [];
    
    if (cartItems.length === 0) {
        showNotification('Giỏ hàng trống! Vui lòng thêm sản phẩm.', 'error');
        return;
    }
    
    const isLoggedIn = localStorage.getItem('yuelight_logged_in') === 'true';
    if (!isLoggedIn) {
        showNotification('Vui lòng đăng nhập để thanh toán!', 'error');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1500);
        return;
    }
    
    showLoading('Đang xử lý thanh toán...');
    
    setTimeout(() => {
        hideLoading();
        
        // Simulate payment processing
        const orderId = 'YL' + Date.now();
        const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        // Clear cart
        localStorage.removeItem('yuelight_cart');
        updateCartCount();
        
        showNotification(`Thanh toán thành công! Mã đơn hàng: ${orderId} - Tổng: ${total.toLocaleString()}₫`, 'success');
        
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    }, 3000);
}

// Utility functions
function showLoading(message = 'Đang tải...') {
    const loading = document.createElement('div');
    loading.id = 'loading-overlay';
    loading.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    loading.innerHTML = `
        <div class="bg-white rounded-lg p-8 text-center">
            <div class="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-spin">
                <i class="fas fa-spinner text-white"></i>
            </div>
            <p class="text-gray-700 font-semibold">${message}</p>
        </div>
    `;
    document.body.appendChild(loading);
}

function hideLoading() {
    const loading = document.getElementById('loading-overlay');
    if (loading) {
        loading.remove();
    }
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 transform translate-x-full max-w-sm`;
    
    const colors = {
        success: 'bg-green-500 text-white',
        error: 'bg-red-500 text-white',
        info: 'bg-blue-500 text-white',
        warning: 'bg-yellow-500 text-black'
    };
    
    notification.classList.add(...colors[type].split(' '));
    notification.innerHTML = `
        <div class="flex items-center">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'} mr-3"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}

// Make functions globally available
window.updateCartQuantity = updateCartQuantity;
window.removeFromCart = removeFromCart;
window.loadCartItems = loadCartItems;
window.handleCheckout = handleCheckout;
window.showLoading = showLoading;
window.hideLoading = hideLoading;
window.showNotification = showNotification;
