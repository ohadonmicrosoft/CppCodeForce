document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.getElementById("carousel");
    const nextBtn = document.getElementById("nextBtn");
    const prevBtn = document.getElementById("prevBtn");
    const numTickets = carousel ? carousel.children.length : 0;
    const angleStep = 360 / numTickets;
    let currentAngle = 0;
  
    if (!carousel || numTickets === 0) return;
  
    nextBtn.addEventListener("click", () => {
      currentAngle -= angleStep;
      carousel.style.transform = `rotateY(${currentAngle}deg)`;
    });
  
    prevBtn.addEventListener("click", () => {
      currentAngle += angleStep;
      carousel.style.transform = `rotateY(${currentAngle}deg)`;
    });
  });
  