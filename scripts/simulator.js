/*************************************************************
 * simulator.js
 * Timed Q&A approach for interview simulation
 *************************************************************/

document.addEventListener("DOMContentLoaded", () => {
    const questions = [
      { text: "Explain RAII in C++ and its importance." },
      { text: "How do you implement BFS on an adjacency list graph?" },
      { text: "Describe how you'd debug a memory leak with Valgrind." },
    ];
  
    let currentQ = 0;
    let timeLeft = 30;
    let timerInterval = null;
  
    const startBtn = document.getElementById("startInterviewBtn");
    const questionBlock = document.getElementById("questionBlock");
    const questionText = document.getElementById("questionText");
    const questionTimer = document.getElementById("questionTimer");
    const nextQuestionBtn = document.getElementById("nextQuestionBtn");
    const answerBox = document.getElementById("answerBox");
  
    if (!startBtn || !questionBlock || !questionText || !questionTimer || !nextQuestionBtn) return;
  
    startBtn.addEventListener('click', startInterview);
    nextQuestionBtn.addEventListener('click', nextQuestion);
  
    function startInterview() {
      startBtn.style.display = "none";
      questionBlock.style.display = "block";
      currentQ = 0;
      loadQuestion();
    }
  
    function loadQuestion() {
      if (currentQ >= questions.length) {
        endInterview();
        return;
      }
      questionText.textContent = questions[currentQ].text;
      timeLeft = 30;
      questionTimer.textContent = timeLeft;
      nextQuestionBtn.style.display = "none";
      answerBox.value = "";
  
      clearInterval(timerInterval);
      timerInterval = setInterval(() => {
        timeLeft--;
        questionTimer.textContent = timeLeft;
        if (timeLeft <= 0) {
          nextQuestion();
        }
      }, 1000);
    }
  
    function nextQuestion() {
      clearInterval(timerInterval);
      currentQ++;
      loadQuestion();
    }
  
    function endInterview() {
      questionBlock.innerHTML = `
        <h2>Interview Finished!</h2>
        <p>You tackled ${questions.length} questions! Good job!</p>
      `;
    }
  });
  