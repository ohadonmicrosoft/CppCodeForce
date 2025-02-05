// progress.js

const TOTAL_LESSONS = 21;
const allLessonIDs = [
  "M1L1","M1L2","M1L3",
  "M2L1","M2L2","M2L3","M2L4",
  "M3L1","M3L2","M3L3",
  "M4L1","M4L2","M4L3",
  "M5L1","M5L2","M5L3",
  "M6L1","M6L2","M6L3",
  "M7L1","M7L2","M7L3"
];

let completedLessons = JSON.parse(localStorage.getItem('completedLessons')) || [];

function updateProgressDisplay() {
  const radialProgress = document.getElementById('radialProgress');
  const progressLabel = document.getElementById('progress-label');
  const progressText = document.getElementById('progress-text');

  if (!radialProgress) return; // if we're not on progress.html

  let completed = completedLessons.length;
  if (completed > TOTAL_LESSONS) completed = TOTAL_LESSONS;
  let pct = (completed / TOTAL_LESSONS) * 100;

  radialProgress.style.setProperty('--percent', pct.toFixed(2));
  if (progressLabel) progressLabel.innerText = `${Math.round(pct)}%`;
  if (progressText) {
    progressText.innerText = `Completed ${completed} / ${TOTAL_LESSONS} Lessons`;
  }
}

function markLessonCompleted(lessonID) {
  if (!allLessonIDs.includes(lessonID)) return;
  if (!completedLessons.includes(lessonID)) {
    completedLessons.push(lessonID);
    localStorage.setItem('completedLessons', JSON.stringify(completedLessons));
    updateProgressDisplay();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  updateProgressDisplay();
});
