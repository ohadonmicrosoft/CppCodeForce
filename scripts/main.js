// main.js

// On DOMContentLoaded, apply the saved theme from localStorage (default to dark-theme)
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem('theme') || 'dark-theme';
  document.body.classList.remove('dark-theme', 'light-theme');
  document.body.classList.add(savedTheme);
});

// Hamburger menu functionality
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });
}

// Theme toggle (exists only on the index page)
const themeToggleBtn = document.getElementById('theme-toggle');
if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    const body = document.body;
    body.classList.add('theme-transition');
    if (body.classList.contains('dark-theme')) {
      body.classList.replace('dark-theme', 'light-theme');
      localStorage.setItem('theme', 'light-theme');
    } else {
      body.classList.replace('light-theme', 'dark-theme');
      localStorage.setItem('theme', 'dark-theme');
    }
    setTimeout(() => {
      body.classList.remove('theme-transition');
    }, 500);
  });
}

// Auto‑hide header on scroll for desktops
let header = document.querySelector("header");
let scrollTimeout = null;
let lastScrollTop = window.scrollY;
if (header) {
  window.addEventListener("scroll", () => {
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
