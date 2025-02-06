/*************************************************************
 * quiz.js
 * - Renders quiz questions from questionBank.
 * - Tracks quiz state, timer, and local leaderboard.
 * - Dynamically creates the quiz interface.
 *************************************************************/
(function () {
  let quizStarted = false;
  let quizStartTime = 0;
  let quizInterval = null;
  let scoreboard = JSON.parse(localStorage.getItem("wecodeQuizScoreboard")) || [];

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
    const quizContainer = document.getElementById("quiz-container");
    quizContainer.innerHTML = "";
    questionBank.forEach((q, index) => {
      const questionBlock = document.createElement("div");
      questionBlock.classList.add("question-block");
      questionBlock.style.marginBottom = "20px";
      const questionText = document.createElement("h4");
      questionText.textContent = `Q${index + 1}: ${q.text}`;
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
        label.append(" " + option);
        questionBlock.appendChild(label);
      });
      quizContainer.appendChild(questionBlock);
    });
  }

  function startQuiz() {
    if (quizStarted) return;
    quizStarted = true;
    displayQuiz();
    document.getElementById("start-quiz").style.display = "none";
    document.getElementById("submit-quiz").style.display = "inline-block";
    quizStartTime = Date.now();
    quizInterval = setInterval(updateTimer, 1000);
  }

  function updateTimer() {
    const elapsedMs = Date.now() - quizStartTime;
    const seconds = Math.floor(elapsedMs / 1000) % 60;
    const minutes = Math.floor(elapsedMs / 60000);
    document.getElementById("quiz-timer").textContent = `Time: ${pad(minutes)}:${pad(seconds)}`;
  }

  function pad(num) {
    return num < 10 ? "0" + num : num;
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
    const quizResult = document.getElementById("quiz-result");
    quizResult.textContent = `You scored ${score} out of ${questionBank.length}.`;
    const finalTime = document.getElementById("quiz-timer").textContent.replace("Time: ", "");
    let userName = prompt("Enter your name for the scoreboard:", "Anonymous") || "Anonymous";
    scoreboard.push({ name: userName, score, time: finalTime });
    localStorage.setItem("wecodeQuizScoreboard", JSON.stringify(scoreboard));
    showLeaderboard();
  }

  function showLeaderboard() {
    cons
