// ide.js
//
// This script sets up the Monaco Editor, loads initial code, and mocks a compilation process.
// Connect this to your real server or WASM compile for a functional environment.

require.config({ paths: { vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.34.0/min/vs' } });

let editor = null;
let lessonID = null;

document.addEventListener('DOMContentLoaded', () => {
  // Grab lessonID from the query param
  const queryParams = new URLSearchParams(window.location.search);
  lessonID = queryParams.get('lessonID') || 'M1L1';

  // Show which lesson's IDE this is
  const ideTitle = document.getElementById('ide-lesson-title');
  ideTitle.innerText = `IDE for Lesson: ${lessonID}`;

  // Initialize Monaco
  require(['vs/editor/editor.main'], function() {
    editor = monaco.editor.create(document.getElementById('code-editor'), {
      value: getInitialCode(lessonID),
      language: 'cpp',
      theme: 'vs-light',
      automaticLayout: true
    });
  });

  // Run Code
  document.getElementById('run-code-btn').addEventListener('click', () => {
    runCode();
  });

  // Check solution
  document.getElementById('check-solution-btn').addEventListener('click', () => {
    checkSolution();
  });
});

// Provide some default or stored code
function getInitialCode(lessonID) {
  // In a real system, fetch from server or localStorage
  // For now, just a stub:
  return `#include <iostream>
using namespace std;

int main() {
    cout << "Hello from " << "${lessonID}" << endl;
    return 0;
}
`;
}

// Mock compile + run
function runCode() {
  const outputArea = document.getElementById('output-area');
  outputArea.innerText = "Compiling and running code...";

  const code = editor.getValue();

  // Example: you might call your own API endpoint:
  // fetch('/compile', { method: 'POST', body: JSON.stringify({ code, language: 'cpp' }) })
  //   .then(res => res.json())
  //   .then(data => { outputArea.innerText = data.output; })
  //   .catch(err => { outputArea.innerText = `Error: ${err}`; });

  // For now, we mock with a setTimeout:
  setTimeout(() => {
    outputArea.innerText = "Output:\nHello from " + lessonID + "\n(Stubbed compilation)";
  }, 1000);
}

// Mock solution checking
function checkSolution() {
  const outputArea = document.getElementById('output-area');
  outputArea.innerText += "\n\nChecking solution against tests...\n";

  // Example test logic
  setTimeout(() => {
    // If the user typed "Hello" we pass, else fail
    const code = editor.getValue();
    if (code.includes("Hello")) {
      outputArea.innerText += "All tests passed! Marking lesson complete.\n";
      // Mark progress
      if (typeof markExerciseCompleted === 'function') {
        markExerciseCompleted(lessonID);
      }
    } else {
      outputArea.innerText += "Test failed: Did not find 'Hello' in output.\n";
    }
  }, 1500);
}
