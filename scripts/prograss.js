// progress.js

const progressBar = document.querySelector('.progress');
const progressText = document.querySelector('#progress-text');
let completedExercises = JSON.parse(localStorage.getItem('completedExercises')) || [];

// Let's assume we have 20 total lessons/quizzes
const totalLessons = 20;

// Update the progress bar & text
function updateProgress() {
  let completed = completedExercises.length;
  let percentage = (completed / totalLessons) * 100;
  progressBar.style.width = `${percentage}%`;
  progressText.innerText = `Progress: ${Math.round(percentage)}% (${completed}/${totalLessons} Lessons)`;
  localStorage.setItem('progress', percentage);
}

// Mark a lesson as completed
function markExerciseCompleted(lessonID) {
  if (!completedExercises.includes(lessonID)) {
    completedExercises.push(lessonID);
    localStorage.setItem('completedExercises', JSON.stringify(completedExercises));
    updateProgress();
    checkAchievements();
  }
}

// Simple achievements
function checkAchievements() {
  if (completedExercises.length === 5) {
    alert("🎉 Halfway to 10 completed lessons! Keep going!");
  } else if (completedExercises.length === 10) {
    alert("🏆 10 lessons done! Fantastic progress!");
  } else if (completedExercises.length === totalLessons) {
    alert("🏆 Master of C++! You've completed all lessons!");
  }
}

// On load, restore progress from localStorage
document.addEventListener("DOMContentLoaded", () => {
  let savedProgress = localStorage.getItem('progress');
  if (savedProgress) {
    progressBar.style.width = `${savedProgress}%`;
    let completed = completedExercises.length;
    progressText.innerText = `Progress: ${Math.round(savedProgress)}% (${completed}/${totalLessons} Lessons)`;
  }
});
