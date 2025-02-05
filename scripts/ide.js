// ide.js

require.config({ paths: { vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.34.0/min/vs' } });

let editor = null;
let lessonID = null;

document.addEventListener('DOMContentLoaded', () => {
  // Grab lessonID from query param
  const queryParams = new URLSearchParams(window.location.search);
  lessonID = queryParams.get('lessonID') || 'M1L1';

  // Load Monaco
  require(['vs/editor/editor.main'], function() {
    editor = monaco.editor.create(document.getElementById('code-editor'), {
      value: getInitialCode(lessonID),
      language: 'cpp',
      theme: 'vs-dark',
      automaticLayout: true,
      fontSize: 15,
      minimap: { enabled: true }
    });
  });

  document.getElementById('run-code-btn').addEventListener('click', runCode);
  document.getElementById('check-solution-btn').addEventListener('click', checkSolution);
});

// Basic stored code
function getInitialCode(lessonID) {
  return `#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << \"Lesson: ${lessonID}\" << endl;\n    // Write your code here...\n    return 0;\n}\n`;
}

function runCode() {
  const outputArea = document.getElementById('output-area');
  outputArea.innerText = "Compiling and running code...\n";

  // Fake compile
  setTimeout(() => {
    const code = editor.getValue();
    outputArea.innerText += "Output:\n" + getFakeOutput(code);
  }, 1000);
}

function checkSolution() {
  const outputArea = document.getElementById('output-area');
  outputArea.innerText += "\n\nChecking solution...\n";
  const code = editor.getValue();

  // Very simplistic check logic:
  let pass = false;
  switch (lessonID) {
    case 'M1L1':
      // Expect to see 'FileWrapper' or 'RAII' as a naive check
      if (code.includes("FileWrapper") || code.includes("RAII")) {
        pass = true;
      }
      break;
    case 'M2L1':
      // Linked list? Expect "LinkedList" or "Node"
      if (code.includes("LinkedList") && code.includes("Node")) {
        pass = true;
      }
      break;
    // Add more checks for each lesson:
    default:
      // if code has "Hello" let it pass
      if (code.includes("Hello")) {
        pass = true;
      }
      break;
  }

  setTimeout(() => {
    if (pass) {
      outputArea.innerText += "Tests passed! Marking lesson completed.\n";
      if (typeof markLessonCompleted === 'function') {
        markLessonCompleted(lessonID);
      }
    } else {
      outputArea.innerText += "Tests failed: certain keywords not found or logic mismatch.\n";
    }
  }, 800);
}

// Just a mock output
function getFakeOutput(code) {
  // If user typed "cout", pretend we show that
  if (code.includes("cout")) {
    return "Lesson: " + lessonID + "\nYour code ran successfully (mocked)!\n";
  } else {
    return "No output.\n";
  }
}
