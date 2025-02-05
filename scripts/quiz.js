// quiz.js

document.addEventListener("DOMContentLoaded", () => {
  // For demonstration, use query param: quiz.html?lesson=XX
  const queryParams = new URLSearchParams(window.location.search);
  const lessonID = queryParams.get('lesson') || 'default';

  const quizIntro = document.getElementById('quiz-intro');
  quizIntro.innerText = `Quiz for lesson: ${lessonID}`;

  // A sample question bank
  const questionBank = {
    'M2L2': {
      questions: [
        {
          text: "Which sorting algorithm has the worst-case O(n^2)?",
          options: ["QuickSort", "MergeSort", "HeapSort", "BubbleSort"],
          correctIndex: 3
        },
        {
          text: "Binary Search requires the list to be...",
          options: ["Non-empty", "In ascending order", "In descending order", "Doubly Linked"],
          correctIndex: 1
        }
      ]
    },
    'default': {
      questions: [
        {
          text: "Default question: Which language are we learning?",
          options: ["Python", "C++", "Rust", "Java"],
          correctIndex: 1
        }
      ]
    }
  };

  const quizData = questionBank[lessonID] || questionBank['default'];
  const quizContainer = document.getElementById('quiz-container');
  quizContainer.innerHTML = "";

  // Build quiz
  quizData.questions.forEach((q, index) => {
    const questionBlock = document.createElement("div");
    questionBlock.classList.add("question-block");
    questionBlock.style.marginBottom = "20px";

    const questionText = document.createElement("h4");
    questionText.innerText = `Q${index + 1}: ${q.text}`;
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

  const submitBtn = document.getElementById('submit-quiz');
  const resultDiv = document.getElementById('quiz-result');

  submitBtn.addEventListener('click', () => {
    let score = 0;
    quizData.questions.forEach((q, index) => {
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

    const totalQs = quizData.questions.length;
    const percentage = (score / totalQs) * 100;
    resultDiv.innerText = `You scored ${score} out of ${totalQs} (${Math.round(percentage)}%).`;

    // Optional: Mark quiz as completed
    // markExerciseCompleted(`quiz-${lessonID}`);
  });
});
