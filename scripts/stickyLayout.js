window.addEventListener("load", () => {
  const container = document.getElementById("modulesGrid");
  if (!container) return;

  const containerRect = container.getBoundingClientRect();
  const notes = Array.from(container.querySelectorAll(".course-module.card"));
  const placed = [];
  const margin = 10; // מרווח מינימלי

  notes.forEach(note => {
    const noteWidth = 220;
    const noteHeight = note.offsetHeight || 120;
    let placedOk = false;
    for (let tries = 0; tries < 100; tries++) {
      const x = randomInt(margin, containerRect.width - noteWidth - margin);
      const y = randomInt(margin, containerRect.height - noteHeight - margin);
      if (!collidesAny(x, y, noteWidth, noteHeight, placed, margin)) {
        note.style.position = "absolute";
        note.style.left = x + "px";
        note.style.top = y + "px";
        placed.push({ x, y, w: noteWidth, h: noteHeight });
        placedOk = true;
        break;
      }
    }
    if (!placedOk) {
      note.style.position = "absolute";
      note.style.left = margin + "px";
      note.style.top = margin + "px";
    }
    // אתחול ערכי data-x ו data-y לאחסון המיקום הזמני (לגרירה)
    note.setAttribute('data-x', 0);
    note.setAttribute('data-y', 0);
  });

  // הפיכת כל האלמנטים עם המחלקה ".course-module.card" לגרירים
  interact('.course-module.card').draggable({
    inertia: true,
    modifiers: [
      // הגבלת גרירה בתוך הקונטיינר
      interact.modifiers.restrictRect({
        restriction: 'parent',
        endOnly: true
      })
    ],
    autoScroll: true,
    listeners: {
      move: dragMoveListener
    }
  });
});

// פונקציות עזר:
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function collidesAny(x, y, width, height, placedArr, margin) {
  for (let p of placedArr) {
    if (isOverlap(x, y, width, height, p.x, p.y, p.w, p.h, margin)) {
      return true;
    }
  }
  return false;
}

function isOverlap(x1, y1, w1, h1, x2, y2, w2, h2, margin) {
  return !(
    x1 + w1 + margin <= x2 ||
    x1 >= x2 + w2 + margin ||
    y1 + h1 + margin <= y2 ||
    y1 >= y2 + h2 + margin
  );
}

// פונקציה לטיפול בתנועת הגרירה
function dragMoveListener(event) {
  let target = event.target;
  // קריאה למיקום הקיים שמאוחסן ב data attributes
  let x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
  let y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

  // עדכון מיקום האלמנט
  target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';

  // שמירת המיקום החדש ב data attributes
  target.setAttribute('data-x', x);
  target.setAttribute('data-y', y);
}
