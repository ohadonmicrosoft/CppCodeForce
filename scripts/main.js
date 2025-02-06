/*************************************************************
 * main.js
 * Global functionality:
 *  - Scroll-to-top button
 *  - Dark/Light Mode toggle
 *  - Mobile menu toggle (hamburger)
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
    if (menuToggle && navMenu) {
      menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("show");
      });
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    initScrollToTop();
    initDarkModeToggle();
    initMobileMenuToggle();
  });
})();
