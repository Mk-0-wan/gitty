function setDarkMode(enabled) {
    if (enabled) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'enabled');
    } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('darkMode', null);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    
    // Check if dark mode is enabled in localStorage
    if (localStorage.getItem('darkMode') === 'enabled') {
        setDarkMode(true);
        if (themeToggle) themeToggle.checked = true;
    }

    if (themeToggle) {
        themeToggle.addEventListener('change', () => {
            setDarkMode(themeToggle.checked);
        });
    }
});

// Apply dark mode immediately if it's enabled
if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
}

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const mobileBackdrop = document.createElement('div');
    mobileBackdrop.classList.add('mobile-backdrop');
    document.body.appendChild(mobileBackdrop);

    function toggleMobileMenu() {
        sidebar.classList.toggle('active');
        mobileBackdrop.classList.toggle('active');
        document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : '';
        
        // Toggle aria-expanded attribute
        mobileMenuToggle.setAttribute('aria-expanded', sidebar.classList.contains('active'));
    }

    if (mobileMenuToggle && sidebar) {
        mobileMenuToggle.addEventListener('click', toggleMobileMenu);
        mobileBackdrop.addEventListener('click', toggleMobileMenu);

        // Add keyboard support for closing the menu
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && sidebar.classList.contains('active')) {
                toggleMobileMenu();
            }
        });

        // Set initial ARIA attributes
        mobileMenuToggle.setAttribute('aria-controls', 'sidebar');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
    }
});
