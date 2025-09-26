// Yuelight Tea - Complete Interactive System
// Giả lập hệ thống hoàn chỉnh như website thật

// ===== GLOBAL VARIABLES =====
let currentUser = null;
let cartItems = JSON.parse(localStorage.getItem('yuelight_cart')) || [];
let userBookings = JSON.parse(localStorage.getItem('yuelight_bookings')) || [];
let isLoggedIn = localStorage.getItem('yuelight_logged_in') === 'true';
let eventListenersSetup = false;

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    updateUI();
    setupAnimations();
});

// ===== AUTHENTICATION SYSTEM =====
function initializeApp() {
    // Check if user is logged in
    if (isLoggedIn) {
        currentUser = JSON.parse(localStorage.getItem('yuelight_user'));
        updateLoginStatus();
    }
    
    // Load cart items from localStorage
    cartItems = JSON.parse(localStorage.getItem('yuelight_cart')) || [];
    
    // Update cart count
    updateCartCount();
    
    // Initialize loading screen
    showLoadingScreen();
}

function updateLoginStatus() {
    const loginLinks = document.querySelectorAll('a[href="login.html"]');
    
    if (isLoggedIn && currentUser) {
        loginLinks.forEach(link => {
            link.innerHTML = `<i class="fas fa-user mr-2"></i>${currentUser.name}`;
            link.href = '#';
            link.onclick = showUserMenu;
        });
    }
}

function showUserMenu(e) {
            e.preventDefault();
    const menu = document.createElement('div');
    menu.className = 'absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50';
    menu.innerHTML = `
        <div class="p-4 border-b border-gray-200">
            <p class="font-semibold text-gray-800">${currentUser.name}</p>
            <p class="text-sm text-gray-600">${currentUser.email}</p>
        </div>
        <div class="py-2">
            <a href="booking.html" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">Đặt chỗ của tôi</a>
            <a href="contact.html" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">Hỗ trợ</a>
            <a href="#" onclick="logout()" class="block px-4 py-2 text-red-600 hover:bg-red-50">Đăng xuất</a>
        </div>
    `;
    
    // Remove existing menu
    const existingMenu = document.querySelector('.user-menu');
    if (existingMenu) existingMenu.remove();
    
    menu.className += ' user-menu';
    e.target.closest('nav').appendChild(menu);
    
    // Close menu when clicking outside
    setTimeout(() => {
        document.addEventListener('click', function closeMenu(event) {
            if (!menu.contains(event.target)) {
                menu.remove();
                document.removeEventListener('click', closeMenu);
            }
        });
    }, 100);
}

// ===== LOGIN/REGISTER SYSTEM =====
function setupEventListeners() {
    // Prevent duplicate event listeners
    if (eventListenersSetup) return;
    eventListenersSetup = true;
    
    // Login form
    const loginForm = document.querySelector('form');
    if (loginForm && window.location.pathname.includes('login.html')) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Add to cart buttons - Only for buttons without onclick attribute
    document.addEventListener('click', function(e) {
        // Only handle buttons that don't have onclick attribute
        if (e.target.textContent.includes('Thêm vào giỏ') && !e.target.hasAttribute('onclick')) {
            e.preventDefault();
            addToCart(e.target);
        }
        
        if (e.target.textContent.includes('Đặt chỗ ngay') && !e.target.hasAttribute('onclick')) {
            e.preventDefault();
            handleBooking(e.target);
        }
        
        if (e.target.textContent.includes('Thanh toán ngay') && !e.target.hasAttribute('onclick')) {
            e.preventDefault();
            handleCheckout(e.target);
        }
        
        if (e.target.textContent.includes('Thuê trang phục') && !e.target.hasAttribute('onclick')) {
            e.preventDefault();
            handleCostumeRental(e.target);
        }
    });
    
    // Cart quantity controls
    document.addEventListener('click', function(e) {
        if (e.target.closest('.fa-plus')) {
            updateCartQuantity(e.target, 1);
        }
        if (e.target.closest('.fa-minus')) {
            updateCartQuantity(e.target, -1);
        }
        if (e.target.closest('.fa-trash')) {
            removeFromCart(e.target);
        }
    });
    
    // Newsletter forms
    const newsletterForms = document.querySelectorAll('form');
    newsletterForms.forEach(form => {
        if (form.querySelector('input[type="email"]') && !form.querySelector('textarea')) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
                handleNewsletter(e.target);
            });
        }
    });
    
    // Contact forms
    const contactForms = document.querySelectorAll('form');
    contactForms.forEach(form => {
        if (form.querySelector('textarea')) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                handleContact(e.target);
            });
        }
    });
}

function handleLogin(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email') || e.target.querySelector('input[type="email"]').value;
    const password = formData.get('password') || e.target.querySelector('input[type="password"]').value;
    const name = formData.get('name') || e.target.querySelector('input[type="text"]')?.value;
    
    // Simulate login/register
    showLoading('Đang xử lý...');
    
    setTimeout(() => {
        hideLoading();
        
        if (email && password) {
            // Simulate successful login
            currentUser = {
                id: Date.now(),
                name: name || email.split('@')[0],
                email: email,
                phone: formData.get('phone') || '0909.123.456',
                joinDate: new Date().toISOString()
            };
            
            isLoggedIn = true;
            localStorage.setItem('yuelight_logged_in', 'true');
            localStorage.setItem('yuelight_user', JSON.stringify(currentUser));
            
            showNotification('Đăng nhập thành công! Chào mừng bạn đến với Yuelight Tea! 🍵', 'success');
            
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        } else {
            showNotification('Vui lòng nhập đầy đủ thông tin!', 'error');
        }
    }, 2000);
}

function logout() {
    currentUser = null;
    isLoggedIn = false;
    localStorage.removeItem('yuelight_logged_in');
    localStorage.removeItem('yuelight_user');
    
    showNotification('Đã đăng xuất thành công!', 'info');
    setTimeout(() => {
        window.location.reload();
    }, 1000);
}

// ===== CART SYSTEM =====
function addToCart(button) {
    // Prevent multiple calls
    if (button.disabled) return;
    
    // Disable button temporarily
    button.disabled = true;
    const originalText = button.textContent;
    button.textContent = 'Đang thêm...';
    
    const productCard = button.closest('.group, .bg-white');
    if (!productCard) {
        button.disabled = false;
        button.textContent = originalText;
        return;
    }
    
    const name = productCard.querySelector('h3')?.textContent || 'Sản phẩm';
    const priceText = productCard.querySelector('span[class*="text-2xl"], span[class*="text-xl"], span[class*="text-4xl"]')?.textContent || '0₫';
    const price = parseInt(priceText.replace(/[^\d]/g, '')) || 0;
    const image = productCard.querySelector('img')?.src || '';
    
    console.log('Adding to cart:', { name, price, priceText });
    
    const existingItem = cartItems.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartItems.push({
            id: Date.now(),
            name: name,
            price: price,
            quantity: 1,
            image: image
        });
    }
    
    localStorage.setItem('yuelight_cart', JSON.stringify(cartItems));
    updateCartCount();
    showNotification(`${name} đã được thêm vào giỏ hàng! 🛒`, 'success');
    
    console.log('Cart items:', cartItems);
    
    // Re-enable button after a short delay
    setTimeout(() => {
        button.disabled = false;
        button.textContent = originalText;
    }, 1000);
}

function updateCartQuantity(button, change) {
    const cartItem = button.closest('.flex.items-center.space-x-4');
    if (!cartItem) return;
    
    const name = cartItem.querySelector('h3')?.textContent;
    const quantitySpan = cartItem.querySelector('span[class*="text-center"]');
    
    if (!name || !quantitySpan) return;
    
    const item = cartItems.find(item => item.name === name);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            cartItems = cartItems.filter(cartItem => cartItem.name !== name);
            cartItem.remove();
        } else {
            quantitySpan.textContent = item.quantity;
            updateCartTotal();
        }
        
        localStorage.setItem('yuelight_cart', JSON.stringify(cartItems));
        updateCartCount();
    }
}

function removeFromCart(button) {
    const cartItem = button.closest('.flex.items-center.space-x-4');
    if (!cartItem) return;
    
    const name = cartItem.querySelector('h3')?.textContent;
    if (name) {
        cartItems = cartItems.filter(item => item.name !== name);
        localStorage.setItem('yuelight_cart', JSON.stringify(cartItems));
        cartItem.remove();
        updateCartCount();
        updateCartTotal();
        showNotification('Đã xóa sản phẩm khỏi giỏ hàng!', 'info');
    }
}

function updateCartCount() {
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

function updateCartTotal() {
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalElement = document.querySelector('.text-red-600:last-child');
    if (totalElement && totalElement.textContent.includes('₫')) {
        totalElement.textContent = `${total.toLocaleString()}₫`;
    }
}

// ===== BOOKING SYSTEM =====
function handleBooking(button) {
    if (!isLoggedIn) {
        showNotification('Vui lòng đăng nhập để đặt chỗ!', 'error');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1500);
        return;
    }
    
    const form = button.closest('form');
    if (!form) return;
    
    const formData = new FormData(form);
    const bookingData = {
        id: Date.now(),
        date: formData.get('date') || new Date().toISOString().split('T')[0],
        time: formData.get('time') || '12:00',
        guests: formData.get('guests') || '2',
        area: formData.get('area') || 'normal',
        specialRequests: formData.get('specialRequests') || '',
        status: 'confirmed',
        createdAt: new Date().toISOString()
    };
    
    showLoading('Đang xử lý đặt chỗ...');
    
    setTimeout(() => {
        hideLoading();
        userBookings.push(bookingData);
        localStorage.setItem('yuelight_bookings', JSON.stringify(userBookings));
        
        showNotification('Đặt chỗ thành công! Chúng tôi sẽ liên hệ lại để xác nhận. 📅', 'success');
        
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    }, 2500);
}

// ===== COSTUME RENTAL SYSTEM =====
function handleCostumeRental(button) {
    if (!isLoggedIn) {
        showNotification('Vui lòng đăng nhập để thuê trang phục!', 'error');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1500);
        return;
    }
    
    const form = button.closest('form');
    if (!form) return;
    
    const costumeType = form.querySelector('input[name="costume"]:checked')?.value;
    if (!costumeType) {
        showNotification('Vui lòng chọn trang phục!', 'error');
        return;
    }
    
    showLoading('Đang xử lý thuê trang phục...');
    
    setTimeout(() => {
        hideLoading();
        showNotification('Đặt thuê trang phục thành công! Chúng tôi sẽ chuẩn bị sẵn cho bạn. 👘', 'success');
        
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    }, 2500);
}

// ===== CHECKOUT SYSTEM =====
function handleCheckout(button) {
    if (cartItems.length === 0) {
        showNotification('Giỏ hàng trống! Vui lòng thêm sản phẩm.', 'error');
        return;
    }
    
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
        cartItems = [];
        localStorage.setItem('yuelight_cart', JSON.stringify(cartItems));
        updateCartCount();
        
        showNotification(`Thanh toán thành công! Mã đơn hàng: ${orderId} 💳`, 'success');
        
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    }, 3000);
}

// ===== CONTACT SYSTEM =====
function handleContact(form) {
    const formData = new FormData(form);
    const contactData = {
        name: formData.get('name') || form.querySelector('input[type="text"]')?.value,
        email: formData.get('email') || form.querySelector('input[type="email"]')?.value,
        phone: formData.get('phone') || form.querySelector('input[type="tel"]')?.value,
        subject: formData.get('subject') || form.querySelector('select')?.value,
        message: formData.get('message') || form.querySelector('textarea')?.value
    };
    
    if (!contactData.name || !contactData.email || !contactData.message) {
        showNotification('Vui lòng điền đầy đủ thông tin!', 'error');
        return;
    }
    
    showLoading('Đang gửi tin nhắn...');
    
    setTimeout(() => {
        hideLoading();
        showNotification('Tin nhắn đã được gửi thành công! Chúng tôi sẽ phản hồi trong 24h. 📧', 'success');
        form.reset();
    }, 2000);
}

// ===== NEWSLETTER SYSTEM =====
function handleNewsletter(event) {
    event.preventDefault();
    const emailInput = event.target.querySelector('input[type="email"]');
    const email = emailInput?.value;
    
    if (!email) {
        showNotification('Vui lòng nhập email!', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Vui lòng nhập email hợp lệ!', 'error');
        return;
    }
    
    showLoading('Đang đăng ký...');
    
            setTimeout(() => {
        hideLoading();
        showNotification('Đăng ký nhận tin tức thành công! Cảm ơn bạn! 📰', 'success');
        emailInput.value = '';
    }, 1500);
}

// ===== UI UPDATES =====
function updateUI() {
    // Update cart display if on cart page
    if (window.location.pathname.includes('cart.html')) {
        displayCartItems();
    }
    
    // Update booking display if on booking page
    if (window.location.pathname.includes('booking.html')) {
        displayUserBookings();
    }
}

function displayCartItems() {
    const cartContainer = document.querySelector('.lg\\:col-span-2');
    if (!cartContainer || cartItems.length === 0) return;
    
    // This would be handled by the HTML structure
    // Just update quantities and totals
    updateCartTotal();
}

function displayUserBookings() {
    if (!isLoggedIn || userBookings.length === 0) return;
    
    // Add booking history section if not exists
    let bookingHistory = document.querySelector('.booking-history');
    if (!bookingHistory) {
        bookingHistory = document.createElement('div');
        bookingHistory.className = 'booking-history mt-8 bg-white rounded-2xl shadow-lg p-8';
        bookingHistory.innerHTML = `
            <h2 class="text-2xl font-bold text-gray-800 mb-6">Lịch sử đặt chỗ</h2>
            <div class="space-y-4" id="booking-list"></div>
        `;
        document.querySelector('.max-w-6xl').appendChild(bookingHistory);
    }
    
    const bookingList = document.getElementById('booking-list');
    if (bookingList) {
        bookingList.innerHTML = userBookings.map(booking => `
            <div class="p-4 border border-gray-200 rounded-lg">
                <div class="flex justify-between items-start">
                    <div>
                        <h3 class="font-semibold text-gray-800">Đặt chỗ #${booking.id}</h3>
                        <p class="text-sm text-gray-600">${booking.date} lúc ${booking.time}</p>
                        <p class="text-sm text-gray-600">${booking.guests} người - ${booking.area}</p>
                    </div>
                    <span class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                        ${booking.status}
                    </span>
                </div>
            </div>
        `).join('');
    }
}

// ===== UTILITY FUNCTIONS =====
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

function showLoadingScreen() {
    const loadingScreen = document.createElement('div');
    loadingScreen.id = 'initial-loading';
    loadingScreen.className = 'fixed inset-0 bg-red-800 flex items-center justify-center z-50 transition-opacity duration-500';
    loadingScreen.innerHTML = `
        <div class="text-center">
            <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 animate-spin p-2">
                <img src="logo.png" alt="Yuelight Tea Logo" class="w-full h-full object-contain border-0.5 border-white border-opacity-20 rounded-full">
            </div>
            <h2 class="text-2xl font-bold text-white mb-2">Yuelight Tea</h2>
            <p class="text-gray-300">Đang tải...</p>
        </div>
    `;
    document.body.appendChild(loadingScreen);
    
    // Hide loading screen after page loads
    window.addEventListener('load', function() {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.remove();
            }, 500);
        }, 1000);
    });
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

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ===== ANIMATIONS AND EFFECTS =====
function setupAnimations() {
    // Smooth scrolling
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('header');
    if (header) {
        let lastScrollTop = 0;
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
            lastScrollTop = scrollTop;
        });
        header.style.transition = 'transform 0.3s ease-in-out';
    }
    
    // Scroll to top button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'fixed bottom-6 right-6 w-12 h-12 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-lg transition-all duration-300 transform translate-y-20 opacity-0 z-50';
    scrollToTopBtn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
    document.body.appendChild(scrollToTopBtn);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.remove('translate-y-20', 'opacity-0');
        } else {
            scrollToTopBtn.classList.add('translate-y-20', 'opacity-0');
        }
    });
    
    // Ripple effect for buttons
    document.addEventListener('click', function(e) {
        if (e.target.matches('button, a[class*="bg-gradient"]')) {
            const ripple = document.createElement('span');
            const rect = e.target.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.6);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple-animation 0.6s linear;
                pointer-events: none;
            `;
            
            e.target.style.position = 'relative';
            e.target.style.overflow = 'hidden';
            e.target.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        }
    });
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

// ===== GLOBAL FUNCTIONS FOR HTML ONCLICK =====
window.addToCart = addToCart;
window.bookTable = handleBooking;
window.checkout = handleCheckout;
window.rentCostume = handleCostumeRental;
window.logout = logout;
window.showUserMenu = showUserMenu;


