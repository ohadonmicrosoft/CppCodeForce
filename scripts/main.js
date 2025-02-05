// main.js

// 1) Hamburger menu
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });
}

// 2) Theme toggle
const themeToggleBtn = document.getElementById('theme-toggle');
if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    const body = document.body;
    if (body.classList.contains('dark-theme')) {
      body.classList.remove('dark-theme');
      body.classList.add('light-theme');
    } else {
      body.classList.remove('light-theme');
      body.classList.add('dark-theme');
    }
  });
}

// 3) Optional Delayed auto-hide on desktop
let header = document.querySelector("header");
let scrollTimeout = null;
let lastScrollTop = window.scrollY;

if (header) {
  window.addEventListener("scroll", () => {
    // If screen width < 768px, skip auto-hide
    if (window.innerWidth < 768) return;

    if (scrollTimeout) clearTimeout(scrollTimeout);

    let currentScrollTop = window.scrollY;
    if (currentScrollTop > lastScrollTop) {
      header.style.top = "-80px"; 
    } else {
      header.style.top = "0"; 
    }
    lastScrollTop = currentScrollTop;

    scrollTimeout = setTimeout(() => {
      header.style.top = "0";
    }, 1000);
  });
}
