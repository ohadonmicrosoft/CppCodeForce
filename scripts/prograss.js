// progress.js
// 🏆 Load & Save User Progress using Local Storage

const progressBar = document.querySelector('.progress');
const progressText = document.querySelector('#progress-text');
let completedExercises = JSON.parse(localStorage.getItem('completedExercises')) || [];

// Example total, can be updated if you add more lessons/quizzes
const totalExercises = 10;

function updateProgress() {
  let completed = completedExercises.length;
  let percentage = (completed / totalExercises) * 100;
  // Update CSS width & text
  progressBar.style.width = `${percentage}%`;
  progressText.innerText = `Progress: ${Math.round(percentage)}% (${completed}/${totalExercises} Exercises)`;
  localStorage.setItem('progress', percentage);
}

// Called when user completes an exercise or quiz
function markExerciseCompleted(exerciseID) {
  if (!completedExercises.includes(exerciseID)) {
    completedExercises.push(exerciseID);
    localStorage.setItem('completedExercises', JSON.stringify(completedExercises));
    updateProgress();
    checkAchievements();
  }
}

function checkAchievements() {
  // Example achievement notifications
  if (completedExercises.length === 5) {
    alert("🎉 Halfway There! Keep up the great work!");
  } else if (completedExercises.length === totalExercises) {
    alert("🏆 Master of C++! You've completed all exercises!");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  let savedProgress = localStorage.getItem('progress');
  if (savedProgress) {
    progressBar.style.width = `${savedProgress}%`;
    let completed = completedExercises.length;
    progressText.innerText = `Progress: ${Math.round(savedProgress)}% (${completed}/${totalExercises} Exercises)`;
  }
});
