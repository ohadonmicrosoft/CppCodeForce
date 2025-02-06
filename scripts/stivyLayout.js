/*************************************************************
 * stickyLayout.js
 * Ensures "sticky notes" in exercises.html don't overlap.
 * We'll place each card randomly & check collision. 
 *************************************************************/

document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("modulesGrid");
    if (!container) return;
  
    const notes = [...container.querySelectorAll(".course-module.card")];
    const containerRect = container.getBoundingClientRect();
  
    // We'll store placed positions in an array to check collisions
    const placed = [];
  
    notes.forEach(note => {
      const noteRect = { width: 220, height: note.offsetHeight || 120 };
      // attempt random positions up to 100 times
      let placedOk = false;
      for (let tries = 0; tries < 100; tries++) {
        // random x,y within container
        const x = randomInt(0, containerRect.width - noteRect.width);
        const y = randomInt(0, containerRect.height - noteRect.height);
  
        // check collision
        if (!collidesAny(x, y, noteRect, placed)) {
          // place
          note.style.left = x + "px";
          note.style.top = y + "px";
          placed.push({x, y, w: noteRect.width, h: noteRect.height});
          placedOk = true;
          break;
        }
      }
      if (!placedOk) {
        // fallback: place at top-left
        note.style.left = "0px";
        note.style.top = "0px";
      }
    });
  });
  
  /** randomInt(min, max) */
  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  /** Check collision of one rect with all placed rects */
  function collidesAny(x, y, rect, placedArr) {
    for (let p of placedArr) {
      if (isOverlap(x,y,rect.width,rect.height, p.x,p.y,p.w,p.h)) {
        return true;
      }
    }
    return false;
  }
  
  /** Basic AABB overlap check */
  function isOverlap(x1,y1,w1,h1, x2,y2,w2,h2) {
    return !(
      x1 + w1 < x2 ||
      x1 > x2 + w2 ||
      y1 + h1 < y2 ||
      y1 > y2 + h2
    );
  }
  