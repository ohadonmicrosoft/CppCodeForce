/*************************************************************
 * main.js
 * - Scroll-to-top button
 * - Dark/Light Mode toggle (only on main page)
 * - getWandboxLink for module lesson links
 *************************************************************/

// SCROLL TO TOP
document.addEventListener("DOMContentLoaded", () => {
  const scrollToTopBtn = document.getElementById("scrollToTopBtn");
  if (scrollToTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) scrollToTopBtn.style.display = "flex";
      else scrollToTopBtn.style.display = "none";
    });
    scrollToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ---------------------------
  // DARK/LIGHT MODE TOGGLE
  // ---------------------------
  // If 'darkMode' not set in localStorage, default to "false" (white theme)
  if (localStorage.getItem('darkMode') === null) {
    localStorage.setItem('darkMode', 'false');
  }

  // Check if we have a toggle button on this page (only on index/home)
  const darkToggleBtn = document.getElementById("darkModeToggle");
  if (darkToggleBtn) {
    // Initialize button text based on current stored mode
    const storedDark = localStorage.getItem('darkMode') === 'true';
    darkToggleBtn.textContent = storedDark ? "Light Mode" : "Dark Mode";

    // On click, invert the mode
    darkToggleBtn.addEventListener("click", () => {
      const isDark = localStorage.getItem('darkMode') === 'true';
      // Switch
      localStorage.setItem('darkMode', (!isDark).toString());
      applyDarkMode(!isDark);

      // Update button text
      darkToggleBtn.textContent = !isDark ? "Light Mode" : "Dark Mode";
    });
  }

  // On load, apply stored darkMode to entire site
  const isDark = localStorage.getItem('darkMode') === 'true';
  applyDarkMode(isDark);
});

/** applyDarkMode(enable) toggles .dark-mode class on <html>. 
 *  If enable=true => dark mode, else white (light) mode 
 */
function applyDarkMode(enable) {
  if (enable) {
    document.documentElement.classList.add('dark-mode');
  } else {
    document.documentElement.classList.remove('dark-mode');
  }
}

/*************************************************************
 * getWandboxLink(lessonID)
 *************************************************************/
function getWandboxLink(lessonID) {
  const map = {
    "M1L1": "https://wandbox.org/permlink/AAAA1111",
    "M1L2": "https://wandbox.org/permlink/AAAA2222",
    "M1L3": "https://wandbox.org/permlink/AAAA3333",
    "M2L1": "https://wandbox.org/permlink/BBBB1111",
    "M2L2": "https://wandbox.org/permlink/BBBB2222",
    "M3L1": "https://wandbox.org/permlink/CCCC1111",
    "M3L2": "https://wandbox.org/permlink/CCCC2222",
    "M4L1": "https://wandbox.org/permlink/DDDD1111",
    "M4L2": "https://wandbox.org/permlink/DDDD2222",
    "M5L1": "https://wandbox.org/permlink/EEEE1111",
    "M5L2": "https://wandbox.org/permlink/EEEE2222",
    "M6L1": "https://wandbox.org/permlink/FFFF1111",
    "M6L2": "https://wandbox.org/permlink/FFFF2222",
    "M7L1": "https://wandbox.org/permlink/GGGG1111",
    "M7L2": "https://wandbox.org/permlink/GGGG2222"
  };
  return map[lessonID] || "https://wandbox.org/";
}
