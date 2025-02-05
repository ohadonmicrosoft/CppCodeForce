// quiz.js

document.addEventListener("DOMContentLoaded", () => {
    // Extract the lessonID from query params, e.g. quiz.html?lesson=m1-l1
    const queryParams = new URLSearchParams(window.location.search);
    const lessonID = queryParams.get('lesson') || 'default';
  
    // Display the lesson ID in the intro
    const quizIntro = document.getElementById('quiz-intro');
    quizIntro.innerText = `Quiz for lesson: ${lessonID}`;
  
    // Basic question sets. In real usage, load from server or JSON
    const questionBank = {
      'm1-l1': {
        questions: [
          {
            text: "Which is a valid way to print in C++?",
            options: [
              "System.out.println('Hello');",
              "cout << 'Hello';",
              "Console.WriteLine('Hello');",
              "print('Hello');"
            ],
            correctIndex: 1
          }
        ]
      },
      'm2-l3': {
        questions: [
          {
            text: "Which concurrency mechanism ensures thread-safety in C++?",
            options: ["mutex", "printf", "virtual methods", "namespace std"],
            correctIndex: 0
          }
        ]
      },
      'default': {
        questions: [
          {
            text: "This is a default question if no lesson is specified.",
            options: ["Option A", "Option B", "Option C", "Option D"],
            correctIndex: 0
          }
        ]
      }
    };
  
    const quizData = questionBank[lessonID] || questionBank['default'];
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = "";
  
    // Build quiz questions
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
  
    // On submit, evaluate
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
  
      // Optionally track completion in progress
      // markExerciseCompleted(`quiz-${lessonID}`);
    });
  });
  