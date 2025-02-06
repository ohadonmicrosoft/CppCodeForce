/*************************************************************
 * main.js
 * Global functionality:
 *  - Scroll‑to‑top button
 *  - Dark/Light Mode toggle
 *  - Mobile menu toggle (hamburger) with auto‑fold after timeout
 *  - Remove the fade‑in class after its animation ends to avoid re‑triggering the hidden state
 *************************************************************/
(function () {
  // Scroll‑to‑top button initialization
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
  
  // Dark/Light mode toggle initialization and application
  function initDarkModeToggle() {
    if (localStorage.getItem('darkMode') === null) {
      localStorage.setItem('darkMode', 'false');
    }
    const darkToggleBtn = document.getElementById("darkModeToggle");
    if (!darkToggleBtn) return;
    const storedDark = localStorage.getItem('darkMode') === 'true';
    darkToggleBtn.textContent = storedDark ? "☀ Light Mode" : "🌙 Dark Mode";
    darkToggleBtn.addEventListener("click", () => {
      const isDark = localStorage.getItem('darkMode') === 'true';
      localStorage.setItem('darkMode', (!isDark).toString());
      applyDarkMode(!isDark);
      darkToggleBtn.textContent = !isDark ? "🌙 Dark Mode" : "☀ Light Mode";
    });
    applyDarkMode(storedDark);
  }
  
  function applyDarkMode(enable) {
    if (enable) {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
  }
  
  // Mobile menu toggle initialization with auto‑fold feature
  function initMobileMenuToggle() {
    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");
    let autoFoldTimer; // Timer variable for auto‑fold
    
    if (menuToggle && navMenu) {
      menuToggle.addEventListener("click", () => {
        // Toggle the nav menu visibility
        navMenu.classList.toggle("show");
  
        // If the menu is now visible, set a timer to auto‑fold after 5 seconds
        if (navMenu.classList.contains("show")) {
          if (autoFoldTimer) clearTimeout(autoFoldTimer);
          autoFoldTimer = setTimeout(() => {
            navMenu.classList.remove("show");
          }, 5000); // 5000 milliseconds = 5 seconds
        } else {
          // If the menu is closed manually, clear any existing timer
          if (autoFoldTimer) clearTimeout(autoFoldTimer);
        }
      });
    }
  }
  
  // On DOMContentLoaded, initialize functionality and remove .fade-in after animation
  document.addEventListener("DOMContentLoaded", () => {
    initScrollToTop();
    initDarkModeToggle();
    initMobileMenuToggle();

    // Remove the "fade-in" class after its animation ends to avoid issues on hover
    const fadeInElements = document.querySelectorAll('.fade-in');
    fadeInElements.forEach((el) => {
      el.addEventListener('animationend', () => {
        el.classList.remove('fade-in');
      });
    });
  });
})();
