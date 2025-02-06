// scripts/embedded-ide.js

// Ensure the DOM is fully loaded before initializing Monaco Editor.
document.addEventListener("DOMContentLoaded", function() {
    // Configure Monaco Editor loader with the CDN path.
    require.config({ paths: { 'vs': 'https://cdn.jsdelivr.net/npm/monaco-editor@0.33.0/min/vs' }});
  
    // Initialize Monaco Editor once it's loaded.
    require(['vs/editor/editor.main'], function() {
      const container = document.getElementById('ideContainer');
      if (container) {
        window.editor = monaco.editor.create(container, {
          value: [
            '#include <iostream>',
            '',
            'int main() {',
            '    std::cout << "Hello, WeCode!" << std::endl;',
            '    return 0;',
            '}'
          ].join('\n'),
          language: 'cpp',
          theme: 'vs-light'
        });
      } else {
        console.error("IDE container not found.");
      }
    });
  
    // Function to compile and run code via the Wandbox API.
    async function runCode() {
      const code = window.editor.getValue();
      const outputDiv = document.getElementById('output');
      outputDiv.textContent = "Compiling and running your code...";
  
      try {
        const response = await fetch('https://wandbox.org/api/compile.json', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            compiler: "gcc-head",
            code: code,
            options: "warning,gnu++14"
          })
        });
        const result = await response.json();
        let outputText = "";
        if (result.compiler_message) {
          outputText += "Compiler Message:\n" + result.compiler_message + "\n";
        }
        if (result.program_message) {
          outputText += "Program Output:\n" + result.program_message + "\n";
        }
        if (result.status !== 0) {
          outputText += "\nCompilation/Execution failed with status: " + result.status;
        }
        outputDiv.textContent = outputText;
      } catch (error) {
        console.error("Error running code:", error);
        outputDiv.textContent = "Error running code: " + error;
      }
    }
  
    // Attach the runCode function to the Run Code button.
    const runBtn = document.getElementById('runCodeBtn');
    if (runBtn) {
      runBtn.addEventListener('click', runCode);
    }
  });
  