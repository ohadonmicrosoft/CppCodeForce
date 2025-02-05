// progress.js

// Suppose each module has 3 lessons => 7 modules * 3 = 21 total
const TOTAL_LESSONS = 21;

// Array of lesson IDs, e.g. "M1L1", "M1L2", ... "M7L3"
const allLessonIDs = [
  "M1L1","M1L2","M1L3",
  "M2L1","M2L2","M2L3","M2L4", // if you have 4 in module 2, adjust total
  "M3L1","M3L2","M3L3",
  "M4L1","M4L2","M4L3",
  "M5L1","M5L2","M5L3",
  "M6L1","M6L2","M6L3",
  "M7L1","M7L2","M7L3"
  // Adjust as needed to match your actual modules/lessons
];

// Load completed lessons from localStorage
let completedLessons = JSON.parse(localStorage.getItem('completedLessons')) || [];

// Update radial progress
function updateProgressDisplay() {
  const radialProgress = document.getElementById('radialProgress');
  const progressLabel = document.getElementById('progress-label');
  const progressText = document.getElementById('progress-text');

  let completedCount = completedLessons.length;
  if (completedCount > TOTAL_LESSONS) {
    completedCount = TOTAL_LESSONS;
  }

  let percentage = (completedCount / TOTAL_LESSONS) * 100;
  radialProgress.style.setProperty('--percent', percentage.toFixed(2));
  progressLabel.innerText = `${Math.round(percentage)}%`;
  progressText.innerText = `Completed ${completedCount} / ${TOTAL_LESSONS} Lessons`;
}

function markLessonCompleted(lessonID) {
  // Check if the lesson is in our official list
  if (!allLessonIDs.includes(lessonID)) return;

  if (!completedLessons.includes(lessonID)) {
    completedLessons.push(lessonID);
    localStorage.setItem('completedLessons', JSON.stringify(completedLessons));
    updateProgressDisplay();
  }
}

// On page load
document.addEventListener("DOMContentLoaded", () => {
  updateProgressDisplay();
});
