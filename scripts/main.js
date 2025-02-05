// main.js

// 🔥 Smooth Scrolling (for internal anchors) with offset handling
// If you have internal anchors <a href="#someSection">, this logic offsets.
// Not used extensively in this layout, but provided if needed.
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

// 🔥 Accessibility & Keyboard Navigation
document.addEventListener("keydown", (event) => {
    if (event.key === "Tab") {
        document.body.classList.add("keyboard-nav");
    }
});

document.addEventListener("mousedown", () => {
    document.body.classList.remove("keyboard-nav");
});

// 🔥 Auto-hide Header on Scroll
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

// 🔥 Placeholder for Theme Toggle
// Potentially you can add a <button id="theme-toggle">Dark/Light</button> in HTML.
// Then use localStorage to store user preference.
const themeToggle = document.querySelector('#theme-toggle');
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
    });

    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
    }
}
