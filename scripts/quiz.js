// quiz.js

let quizStarted = false;
let quizStartTime = 0;
let quizInterval = null;
let scoreboard = JSON.parse(localStorage.getItem('quizScoreboard')) || [];

document.addEventListener("DOMContentLoaded", () => {
  const quizContainer = document.getElementById('quiz-container');
  const startBtn = document.getElementById('start-quiz');
  const submitBtn = document.getElementById('submit-quiz');
  const quizTimer = document.getElementById('quiz-timer');
  const quizResult = document.getElementById('quiz-result');
  const leaderboardDiv = document.getElementById('leaderboard');
  const leaderboardEntries = document.getElementById('leaderboard-entries');

  const questionBank = [
    {
      text: "Which sorting algorithm has worst-case O(n^2)?",
      options: ["QuickSort", "MergeSort", "HeapSort", "BubbleSort"],
      correctIndex: 3
    },
    {
      text: "Binary Search requires the list to be...",
      options: ["Non-empty", "Sorted", "Unique", "Doubly Linked"],
      correctIndex: 1
    }
  ];

  function displayQuiz() {
    quizContainer.innerHTML = "";
    questionBank.forEach((q, index) => {
      const questionBlock = document.createElement("div");
      questionBlock.classList.add("question-block");
      questionBlock.style.marginBottom = "20px";

      const questionText = document.createElement("h4");
      questionText.innerText = `Q${index+1}: ${q.text}`;
      questionBlock.appendChild(questionText);

      q.options.forEach((option, optIndex) => {
        const label = document.createElement("label");
        label.style.display = "block";
        label.style.marginLeft = "20px";

        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = `question-${index}`;
        radio.value = optIndex;
        label.appendChild(radio);

        label.append(` ${option}`);
        questionBlock.appendChild(label);
      });

      quizContainer.appendChild(questionBlock);
    });
  }

  function startQuiz() {
    if (quizStarted) return;
    quizStarted = true;
    displayQuiz();
    startBtn.style.display = "none";
    submitBtn.style.display = "inline-block";

    // start timer
    quizStartTime = Date.now();
    quizInterval = setInterval(updateTimer, 1000);
  }

  function updateTimer() {
    const elapsedMs = Date.now() - quizStartTime;
    const seconds = Math.floor(elapsedMs / 1000) % 60;
    const minutes = Math.floor(elapsedMs / 1000 / 60);
    quizTimer.innerText = `Time: ${pad(minutes)}:${pad(seconds)}`;
  }

  function pad(num) {
    return num < 10 ? `0${num}` : num;
  }

  function submitQuiz() {
    if (!quizStarted) return;
    clearInterval(quizInterval);

    let score = 0;
    questionBank.forEach((q, index) => {
      const radios = document.getElementsByName(`question-${index}`);
      let selected = null;
      for (let r of radios) {
        if (r.checked) {
          selected = parseInt(r.value);
          break;
        }
      }
      if (selected === q.correctIndex) score++;
    });
    quizResult.innerText = `You scored ${score} out of ${questionBank.length}.`;

    // final time
    let finalTime = quizTimer.innerText.replace("Time: ","");

    // store to scoreboard
    let userName = prompt("Enter your name for the scoreboard:", "Anonymous");
    if (!userName) userName = "Anonymous";
    scoreboard.push({ name: userName, score, time: finalTime });
    localStorage.setItem('quizScoreboard', JSON.stringify(scoreboard));

    showLeaderboard();
  }

  function showLeaderboard() {
    leaderboardDiv.style.display = "block";
    scoreboard.sort((a,b) => b.score - a.score);
    leaderboardEntries.innerHTML = "";
    scoreboard.forEach((entry, idx) => {
      const row = document.createElement("div");
      row.classList.add("leaderboard-entry");
      row.innerHTML = `<span>${idx+1}. ${entry.name}</span><span>Score: ${entry.score} | Time: ${entry.time}</span>`;
      leaderboardEntries.appendChild(row);
    });
  }

  startBtn?.addEventListener('click', startQuiz);
  submitBtn?.addEventListener('click', submitQuiz);
});
