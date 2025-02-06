/*************************************************************
 * main.js
 * Global functionality:
 *  - Scroll-to-top button
 *  - Dark/Light Mode toggle
 *  - Mobile menu toggle (hamburger)
 *************************************************************/

// Wrap global code in an IIFE to avoid polluting the global namespace.
(function () {
  // Initialize Scroll-To-Top button functionality.
  function initScrollToTop() {
    const scrollToTopBtn = document.getElementById("scrollToTopBtn");
    if (!scrollToTopBtn) return;

    window.addEventListener("scroll", () => {
      scrollToTopBtn.style.display = window.scrollY > 300 ? "flex" : "none";
    });

    scrollToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Initialize Dark/Light Mode toggle functionality.
  function initDarkModeToggle() {
    if (localStorage.getItem('darkMode') === null) {
      localStorage.setItem('darkMode', 'false');
    }

    const darkToggleBtn = document.getElementById("darkModeToggle");
    if (!darkToggleBtn) return;

    // Set initial button text based on stored theme.
    const storedDark = localStorage.getItem('darkMode') === 'true';
    darkToggleBtn.textContent = storedDark ? "☀ Light Mode" : "🌙 Dark Mode";

    darkToggleBtn.addEventListener("click", () => {
      const isDark = localStorage.getItem('darkMode') === 'true';
      localStorage.setItem('darkMode', (!isDark).toString());
      applyDarkMode(!isDark);
      darkToggleBtn.textContent = !isDark ? "🌙 Dark Mode" : "☀ Light Mode";
    });

    // Apply the stored mode on load.
    applyDarkMode(storedDark);
  }

  function applyDarkMode(enable) {
    if (enable) {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
  }

  // Initialize Mobile Menu Toggle functionality.
  function initMobileMenuToggle() {
    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");

    if (menuToggle && navMenu) {
      menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("show");
      });
    }
  }

  // DOMContentLoaded: Initialize all global features.
  document.addEventListener("DOMContentLoaded", () => {
    initScrollToTop();
    initDarkModeToggle();
    initMobileMenuToggle();
  });
})();
