// scripts/embedded-ide.js

document.addEventListener("DOMContentLoaded", function() {
  // Configure the Monaco Editor loader with the CDN path.
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
      console.log("Monaco Editor created successfully");
    } else {
      console.error("IDE container not found.");
    }
  });

  // Function to run code via the Wandbox API.
  async function runCode() {
    if (!window.editor) {
      console.error("Editor not initialized.");
      return;
    }
    const code = window.editor.getValue();
    const outputDiv = document.getElementById('output');
    if (!outputDiv) {
      console.error("Output container not found.");
      return;
    }
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

  // Function to format code using Prettier.
  function formatCode() {
    if (!window.editor) {
      console.error("Editor not initialized.");
      return;
    }
    const code = window.editor.getValue();
    try {
      // For C++ formatting, Prettier does not have a dedicated parser.
      // If you have a custom C++ formatter or use a different parser, update accordingly.
      // Here, we use the Babel parser as a demonstration.
      const formatted = prettier.format(code, {
        parser: "babel",
        plugins: prettierPlugins
      });
      window.editor.setValue(formatted);
    } catch (e) {
      console.error("Formatting error:", e);
    }
  }

  // Attach event listeners for the Run and Format buttons.
  function attachIDEButtons() {
    const runBtn = document.getElementById('runCodeBtn');
    const formatBtn = document.getElementById('formatCodeBtn');
    if (runBtn) {
      runBtn.addEventListener('click', runCode);
    } else {
      console.error("Run Code button not found.");
    }
    if (formatBtn) {
      formatBtn.addEventListener('click', formatCode);
    } else {
      console.error("Format Code button not found.");
    }
  }

  // Attach our event listeners after DOM content is loaded.
  attachIDEButtons();
});
