// main.js

// Hamburger toggle
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

// Auto-hide Header on Scroll
let lastScrollTop = 0;
const header = document.querySelector("header");

if (header) {
  window.addEventListener("scroll", () => {
    let scrollTop = window.scrollY;
    if (scrollTop > lastScrollTop) {
      header.style.top = "-80px"; // Hide header
    } else {
      header.style.top = "0";     // Show header
    }
    lastScrollTop = scrollTop;
  });
}
