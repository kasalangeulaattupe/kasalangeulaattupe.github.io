// Navbar HTML template
const navbarHTML = `
<nav class="navbar">
    <div class="burger-menu-container">
        <button class="burger-menu" id="burgerBtn" aria-label="Toggle navigation">
            <span class="burger-line burger-line-1"></span>
            <span class="burger-line burger-line-2"></span>
            <span class="burger-line burger-line-3"></span>
        </button>
        <div class="nav-menu" id="navMenu">
            <ul class="nav-list">
                <li><a href="index.html">Home</a></li>
                <li><a href="detalye.html">Mga Detalye</a></li>
                <li><a href="gallery.html">Larawan</a></li>
                <li><a href="kasuotan.html">Mga Kasuotan</a></li>
                <li><a href="rsvp.html">RSVP</a></li>
                <li><a href="gift.html">Gift Registry</a></li>
                <li><a href="faq.html">FAQs</a></li>
            </ul>
        </div>
    </div>
</nav>
`;

// Insert navbar at the beginning of body
document.addEventListener('DOMContentLoaded', function() {
    const bodyStart = document.body.firstChild;
    const navContainer = document.createElement('div');
    navContainer.innerHTML = navbarHTML;
    document.body.insertBefore(navContainer.firstElementChild, bodyStart);
    
    // Handle Home link based on environment
    const homeLink = document.querySelector('.nav-list a[href="index.html"]');
    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    
    if (homeLink && !isLocalhost) {
        homeLink.setAttribute('href', 'https://kasalangeulaattupe.github.io');
    }
    
    // Remove .html extension from links on non-localhost only
    if (!isLocalhost) {
        const navLinks = document.querySelectorAll('.nav-list a');
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            // Skip home link (already handled above) and anchor links
            if (href && href.endsWith('.html') && href !== 'index.html') {
                link.setAttribute('href', href.replace('.html', ''));
            }
        });
    }
    
    // Initialize burger menu functionality
    initBurgerMenu();
});

// Burger Menu Functionality
function initBurgerMenu() {
    const burgerBtn = document.getElementById('burgerBtn');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-list a');

    if (!burgerBtn) return;

    burgerBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        burgerBtn.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            burgerBtn.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.burger-menu-container')) {
            navMenu.classList.remove('active');
            burgerBtn.classList.remove('active');
        }
    });
}
