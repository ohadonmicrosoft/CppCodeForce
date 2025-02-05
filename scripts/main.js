/*************************************************************
 * main.js - Manages hamburger menu, scroll-to-top, and IDE links
 *************************************************************/

document.addEventListener("DOMContentLoaded", () => {
  // Scroll to top button logic
  const scrollToTopBtn = document.getElementById("scrollToTopBtn");
  if (scrollToTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        scrollToTopBtn.style.display = "flex";
      } else {
        scrollToTopBtn.style.display = "none";
      }
    });
    scrollToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});

// Hamburger menu
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });
  // Close menu if clicking outside
  document.addEventListener("click", (e) => {
    if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
      navMenu.classList.remove("active");
    }
  });
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
