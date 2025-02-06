window.addEventListener("load", () => {
  const container = document.getElementById("modulesGrid");
  if (!container) return;

  const containerRect = container.getBoundingClientRect();
  const notes = Array.from(container.querySelectorAll(".course-module.card"));
  const placed = [];
  const margin = 10; // מרווח מינימלי בין הקלפים

  notes.forEach(note => {
    // נניח רוחב קבוע (220) וגובה מהקלף או ברירת מחדל של 120
    const noteRect = { width: 220, height: note.offsetHeight || 120 };

    let placedOk = false;
    for (let tries = 0; tries < 100; tries++) {
      // מיקום אקראי בתוך הקונטיינר עם מרווח
      const x = randomInt(margin, containerRect.width - noteRect.width - margin);
      const y = randomInt(margin, containerRect.height - noteRect.height - margin);

      if (!collidesAny(x, y, noteRect, placed)) {
        note.style.left = x + "px";
        note.style.top = y + "px";
        // שומרים את המיקום עם מרווח
        placed.push({ x, y, w: noteRect.width + margin, h: noteRect.height + margin });
        placedOk = true;
        break;
      }
    }
    if (!placedOk) {
      note.style.left = margin + "px";
      note.style.top = margin + "px";
    }
  });
});

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function collidesAny(x, y, rect, placedArr) {
  for (let p of placedArr) {
    if (isOverlap(x, y, rect.width, rect.height, p.x, p.y, p.w, p.h)) {
      return true;
    }
  }
  return false;
}

function isOverlap(x1, y1, w1, h1, x2, y2, w2, h2) {
  return !(
    x1 + w1 < x2 ||
    x1 > x2 + w2 ||
    y1 + h1 < y2 ||
    y1 > y2 + h2
  );
}
