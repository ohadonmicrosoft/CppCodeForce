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
      minimap: { enabled: window.innerWidth > 768 }
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
  const outputArea = document.getElementById('output-area');
  outputArea.innerText = "Compiling and running code...\n";
  setTimeout(() => {
    outputArea.innerText += "Output:\n(Mocked) Code ran successfully!\n";
  }, 1000);
}

function checkSolution() {
  const outputArea = document.getElementById('output-area');
  outputArea.innerText += "\nChecking solution...\n";
  
  const code = editor.getValue();
  let pass = false;

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
      outputArea.innerText += "Tests passed! Marking lesson completed.\n";
      if (typeof markLessonCompleted === 'function') {
        markLessonCompleted(lessonID);
      }
    } else {
      outputArea.innerText += "Test failed: missing expected keywords or logic.\n";
    }
  }, 800);
}
