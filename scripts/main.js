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
