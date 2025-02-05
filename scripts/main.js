// main.js

document.addEventListener("DOMContentLoaded", () => {
  // Theme load from localStorage
  const savedTheme = localStorage.getItem('theme') || 'warm-theme';
  document.body.classList.remove('warm-theme','dark-theme');
  document.body.classList.add(savedTheme);

  // Scroll to top button
  const scrollToTopBtn = document.getElementById("scrollToTopBtn");
  window.addEventListener("scroll", () => {
    if(window.scrollY>300){
      scrollToTopBtn.style.display="flex";
    } else {
      scrollToTopBtn.style.display="none";
    }
  });
  scrollToTopBtn.addEventListener("click", ()=>{
    window.scrollTo({top:0, behavior:"smooth"});
  });
});

// Hamburger
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
if(menuToggle){
  menuToggle.addEventListener('click', ()=>{
    navMenu.classList.toggle('active');
  });
}

// Theme toggle (home only)
const themeToggleBtn = document.getElementById('theme-toggle');
if(themeToggleBtn){
  themeToggleBtn.addEventListener('click', ()=>{
    const body=document.body;
    body.classList.add('theme-transition');
    if(body.classList.contains('warm-theme')){
      body.classList.replace('warm-theme','dark-theme');
      localStorage.setItem('theme','dark-theme');
    } else {
      body.classList.replace('dark-theme','warm-theme');
      localStorage.setItem('theme','warm-theme');
    }
    setTimeout(()=>{ body.classList.remove('theme-transition'); },500);
  });
}

/* MAPPING: lessonID => wandbox link (Placeholder links!) */
function getWandboxLink(lessonID){
  // בהמשך תוכל למלא קישורים אמיתיים שיצרת בWandbox
  const map = {
    "M1L1":"https://wandbox.org/permlink/AAAA1111",
    "M1L2":"https://wandbox.org/permlink/AAAA2222",
    "M1L3":"https://wandbox.org/permlink/AAAA3333",

    "M2L1":"https://wandbox.org/permlink/BBBB1111",
    "M2L2":"https://wandbox.org/permlink/BBBB2222",

    "M3L1":"https://wandbox.org/permlink/CCCC1111",
    "M3L2":"https://wandbox.org/permlink/CCCC2222",

    "M4L1":"https://wandbox.org/permlink/DDDD1111",
    "M4L2":"https://wandbox.org/permlink/DDDD2222",

    "M5L1":"https://wandbox.org/permlink/EEEE1111",
    "M5L2":"https://wandbox.org/permlink/EEEE2222",

    "M6L1":"https://wandbox.org/permlink/FFFF1111",
    "M6L2":"https://wandbox.org/permlink/FFFF2222",

    "M7L1":"https://wandbox.org/permlink/GGGG1111",
    "M7L2":"https://wandbox.org/permlink/GGGG2222"
  };
  return map[lessonID] || "https://wandbox.org/";
}
