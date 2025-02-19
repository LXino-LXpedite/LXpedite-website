// Theme Toggle
function initializeThemeToggle() {
    const themeCheckbox = document.getElementById('theme-checkbox');
    const mobileThemeCheckbox = document.getElementById('theme-checkbox-mobile');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeCheckbox.checked = savedTheme === 'dark';
    if (mobileThemeCheckbox) {
        mobileThemeCheckbox.checked = savedTheme === 'dark';
    }
    
    function updateTheme(checkbox) {
        const newTheme = checkbox.checked ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Sync checkboxes
        themeCheckbox.checked = checkbox.checked;
        if (mobileThemeCheckbox) {
            mobileThemeCheckbox.checked = checkbox.checked;
        }
    }
    
    themeCheckbox.addEventListener('change', () => updateTheme(themeCheckbox));
    if (mobileThemeCheckbox) {
        mobileThemeCheckbox.addEventListener('change', () => updateTheme(mobileThemeCheckbox));
    }
}

// Mobile Menu
function initializeMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const closeMenu = document.querySelector('.close-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav a');

    function toggleMobileMenu() {
        mobileMenu.classList.toggle('active');
        mobileMenuOverlay.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    }

    mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    closeMenu?.addEventListener('click', toggleMobileMenu);
    mobileMenuOverlay?.addEventListener('click', toggleMobileMenu);

    // Close menu when clicking nav links
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', toggleMobileMenu);
    });
}

// Smooth Scrolling
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Initialize all components
document.addEventListener('DOMContentLoaded', () => {
    initializeThemeToggle();
    initializeMobileMenu();
    initializeSmoothScrolling();
}); 