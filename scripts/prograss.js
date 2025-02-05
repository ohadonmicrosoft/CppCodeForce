// 🔥 Load & Save User Progress with Local Storage & Analytics
const progressBar = document.querySelector('.progress');
const progressText = document.querySelector('#progress-text');
const completedExercises = JSON.parse(localStorage.getItem('completedExercises')) || [];
const totalExercises = 10; // Change this dynamically if needed

// 🏆 Update Progress with Gamification Elements
function updateProgress() {
    let completed = completedExercises.length;
    let percentage = (completed / totalExercises) * 100;

    progressBar.style.width = `${percentage}%`;
    progressText.innerText = `Progress: ${Math.round(percentage)}% (${completed}/${totalExercises} Exercises)`;
    
    // Save to local storage
    localStorage.setItem('progress', percentage);
}

// 🔥 Mark an Exercise as Completed
function markExerciseCompleted(exerciseID) {
    if (!completedExercises.includes(exerciseID)) {
        completedExercises.push(exerciseID);
        localStorage.setItem('completedExercises', JSON.stringify(completedExercises));
        updateProgress();
    }
}

// 🔥 Load Progress on Page Load
document.addEventListener("DOMContentLoaded", () => {
    let savedProgress = localStorage.getItem('progress');
    if (savedProgress) {
        progressBar.style.width = `${savedProgress}%`;
        progressText.innerText = `Progress: ${Math.round(savedProgress)}% (${completedExercises.length}/${totalExercises} Exercises)`;
    }
});

// 🏆 Gamification: Achievement System
function checkAchievements() {
    if (completedExercises.length === 5) {
        alert("🎉 Achievement Unlocked: Halfway There! Keep Going!");
    }
    if (completedExercises.length === totalExercises) {
        alert("🏆 Achievement Unlocked: Master of C++! You've completed all exercises!");
    }
}

// 🔥 Call this function when user completes an exercise
function completeExercise(exerciseID) {
    markExerciseCompleted(exerciseID);
    checkAchievements();
}
