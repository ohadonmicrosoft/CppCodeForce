/*************************************************************
 * progress.js - Final
 * -----------------------------------------------------------
 * - Tracks completed lessons in localStorage: "wecodeCompletedLessons"
 * - Updates radial progress in #radialProgress
 *************************************************************/

const TOTAL_LESSONS = 21;
const allLessonIDs = [
  "M1L1","M1L2","M1L3",
  "M2L1","M2L2",
  "M3L1","M3L2",
  "M4L1","M4L2",
  "M5L1","M5L2",
  "M6L1","M6L2",
  "M7L1","M7L2"
];
let completedLessons = JSON.parse(localStorage.getItem("wecodeCompletedLessons")) || [];

function updateProgressDisplay() {
  const radialProgress = document.getElementById("radialProgress");
  const progressLabel = document.getElementById("progress-label");
  const progressText = document.getElementById("progress-text");
  if (!radialProgress) return;

  let completedCount = completedLessons.length;
  if (completedCount > TOTAL_LESSONS) completedCount = TOTAL_LESSONS;

  const pct = (completedCount / TOTAL_LESSONS) * 100;
  radialProgress.style.setProperty("--percent", pct.toFixed(2));

  if (progressLabel) {
    progressLabel.textContent = `${Math.round(pct)}%`;
  }
  if (progressText) {
    progressText.textContent = `Completed ${completedCount} / ${TOTAL_LESSONS} Lessons`;
  }
}

function markLessonCompleted(lessonID) {
  if (!allLessonIDs.includes(lessonID)) return;
  if (!completedLessons.includes(lessonID)) {
    completedLessons.push(lessonID);
    localStorage.setItem("wecodeCompletedLessons", JSON.stringify(completedLessons));
    updateProgressDisplay();
  }
}

document.addEventListener("DOMContentLoaded", updateProgressDisplay);
