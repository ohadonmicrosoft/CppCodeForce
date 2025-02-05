// ide.js
require.config({ paths: { vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.34.0/min/vs' } });

let editor = null;
let lessonID = null;

document.addEventListener('DOMContentLoaded', () => {
  const queryParams = new URLSearchParams(window.location.search);
  lessonID = queryParams.get('lessonID') || 'M1L1';

  require(['vs/editor/editor.main'], function() {
    editor = monaco.editor.create(document.getElementById('code-editor'), {
      value: getInitialCode(lessonID),
      language: 'cpp',
      theme: 'vs-dark',
      automaticLayout: true,
      fontSize: 15,
      minimap: { enabled: window.innerWidth > 768 }  // disable minimap on mobile
    });
  });

  document.getElementById('run-code-btn').addEventListener('click', runCode);
  document.getElementById('check-solution-btn').addEventListener('click', checkSolution);
});

function getInitialCode(lessonID) {
  return `#include <iostream>
using namespace std;

int main() {
    cout << "Lesson: ${lessonID}" << endl;
    // Write your code here...
    return 0;
}
`;
}

function runCode() {
  const output = document.getElementById('output-area');
  output.innerText = "Compiling and running code...\n";
  setTimeout(() => {
    output.innerText += "Output:\n" + "Your code ran (mock compilation)!\n";
  }, 1000);
}

function checkSolution() {
  const output = document.getElementById('output-area');
  output.innerText += "\nChecking solution...\n";
  
  const code = editor.getValue();
  let pass = false;

  // Basic check: if user typed "RAII" for M1L1, etc...
  switch (lessonID) {
    case 'M1L1':
      if (code.includes("FileWrapper") || code.includes("RAII")) pass = true;
      break;
    case 'M2L1':
      if (code.includes("LinkedList") && code.includes("Node")) pass = true;
      break;
    default:
      if (code.includes("Hello")) pass = true;
      break;
  }

  setTimeout(() => {
    if (pass) {
      output.innerText += "Tests passed! Marking lesson completed.\n";
      if (typeof markLessonCompleted === 'function') {
        markLessonCompleted(lessonID);
      }
    } else {
      output.innerText += "Test failed: missing expected keywords or logic.\n";
    }
  }, 800);
}
