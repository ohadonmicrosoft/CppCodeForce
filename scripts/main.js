// 🔥 Smooth Scrolling with Adjustable Offset Handling (for Fixed Header)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = target.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({ top: offset, behavior: 'smooth' });
        }
    });
});

// 🔥 Intelligent Mobile Navigation Handling
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('open');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (event) => {
        if (!navMenu.contains(event.target) && !menuToggle.contains(event.target)) {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('open');
        }
    });
}

// 🔥 Advanced Theme Management with Local Storage (Dark & Light Mode)
const themeToggle = document.querySelector('#theme-toggle');
const body = document.body;

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
    });

    // Load user's preferred theme
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
    }
}

// 🔥 Accessibility Features: Keyboard Navigation
document.addEventListener("keydown", (event) => {
    if (event.key === "Tab") {
        document.body.classList.add("keyboard-nav");
    }
});

document.addEventListener("mousedown", () => {
    document.body.classList.remove("keyboard-nav");
});

// 🔥 Auto-hide Navigation on Scroll (for better UX)
let lastScrollTop = 0;
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
    let scrollTop = window.scrollY;
    if (scrollTop > lastScrollTop) {
        header.style.top = "-80px"; // Hide header
    } else {
        header.style.top = "0"; // Show header
    }
    lastScrollTop = scrollTop;
});
