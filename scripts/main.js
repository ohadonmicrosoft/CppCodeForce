/*************************************************************
 * main.js
 * Global functionality:
 *  - Scroll‑to‑top button
 *  - Dark/Light Mode toggle
 *  - Mobile menu toggle (hamburger) with auto-fold after timeout
 *************************************************************/
(function () {
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
  
  function initMobileMenuToggle() {
    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");
    let autoFoldTimer; // Timer variable for auto-fold
    
    if (menuToggle && navMenu) {
      menuToggle.addEventListener("click", () => {
        // Toggle the nav menu visibility
        navMenu.classList.toggle("show");
  
        // If the menu is now visible, set a timer to auto-fold after 5 seconds
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
  
  document.addEventListener("DOMContentLoaded", () => {
    initScrollToTop();
    initDarkModeToggle();
    initMobileMenuToggle();
  });
})();
