document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.getElementById("carousel");
    const nextBtn = document.getElementById("nextBtn");
    const prevBtn = document.getElementById("prevBtn");
    
    // Number of tickets in the carousel
    const numTickets = carousel ? carousel.children.length : 0;
    if (numTickets === 0) return;
    
    // Calculate the rotation step (in degrees)
    const angleStep = 360 / numTickets;
    let currentAngle = 0;
    
    nextBtn.addEventListener("click", () => {
      currentAngle -= angleStep;
      carousel.style.transform = `rotateY(${currentAngle}deg)`;
    });
    
    prevBtn.addEventListener("click", () => {
      currentAngle += angleStep;
      carousel.style.transform = `rotateY(${currentAngle}deg)`;
    });
  });
  