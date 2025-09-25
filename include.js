// Include Header and Footer
document.addEventListener('DOMContentLoaded', function() {
    // Include Header
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;
            
            // Set active navigation based on current page
            const currentPage = window.location.pathname.split('/').pop() || 'index.html';
            const navItems = {
                'index.html': 'nav-home',
                'shop.html': 'nav-shop', 
                'about.html': 'nav-about',
                'location.html': 'nav-location'
            };
            
            if (navItems[currentPage]) {
                const activeNav = document.getElementById(navItems[currentPage]);
                if (activeNav) {
                    activeNav.classList.remove('text-white');
                    activeNav.classList.add('text-yellow-400');
                }
            }
            
            // Fix sticky header after loading
            const header = document.querySelector('header');
            if (header) {
                header.style.position = 'sticky';
                header.style.top = '0';
                header.style.zIndex = '50';
            }
        })
        .catch(error => console.error('Error loading header:', error));

    // Include Footer
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        })
        .catch(error => console.error('Error loading footer:', error));
});
