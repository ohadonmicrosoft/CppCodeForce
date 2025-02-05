// main.js

const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });
}

// Accessibility & Keyboard Navigation
document.addEventListener("keydown", (event) => {
  if (event.key === "Tab") {
    document.body.classList.add("keyboard-nav");
  }
});
document.addEventListener("mousedown", () => {
  document.body.classList.remove("keyboard-nav");
});

// Delayed Auto-hide Header on Scroll
let header = document.querySelector("header");
let scrollTimeout = null;
let lastScrollTop = window.scrollY;

if (header) {
  window.addEventListener("scroll", () => {
    // Clear any existing timer
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }

    // If scrolling down, hide instantly
    let currentScrollTop = window.scrollY;
    if (currentScrollTop > lastScrollTop) {
      header.style.top = "-80px"; // Hide header quickly
    } else {
      header.style.top = "0";     // Show header
    }
    lastScrollTop = currentScrollTop;

    // After user stops scrolling for 1 second, re-check
    scrollTimeout = setTimeout(() => {
      // Optionally bring header back
      header.style.top = "0";
    }, 1000);
  });
}
