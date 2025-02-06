// scripts/embedded-ide.js

document.addEventListener("DOMContentLoaded", function() {
  // Parse URL parameters to get module and lesson IDs
  const urlParams = new URLSearchParams(window.location.search);
  const moduleID = urlParams.get("module");
  const lessonID = urlParams.get("lesson");

  // Configure the Monaco Editor loader with the CDN path.
  require.config({ paths: { 'vs': 'https://cdn.jsdelivr.net/npm/monaco-editor@0.33.0/min/vs' }});

  // Initialize Monaco Editor once it's loaded.
  require(['vs/editor/editor.main'], function() {
    const container = document.getElementById('ideContainer');
    if (container) {
      window.editor = monaco.editor.create(container, {
        value: "// Your code will load here based on the selected exercise\n",
        language: 'cpp',
        theme: 'vs-light'
      });
      console.log("Monaco Editor created successfully");
      // After editor is initialized, load exercise data if provided
      if (moduleID && lessonID) {
        loadExerciseData();
      }
    } else {
      console.error("IDE container not found.");
    }
  });

  // Function to load exercise data from exercises.json
  async function loadExerciseData() {
    try {
      const response = await fetch("exercises.json");
      if (!response.ok) {
        throw new Error("Failed to load exercise data");
      }
      const data = await response.json();
      const lessonData = data.modules[moduleID]?.lessons[lessonID];
      if (!lessonData) {
        console.error("Exercise data not found for", moduleID, lessonID);
        return;
      }

      // Update lesson title and description
      const lessonTitleEl = document.getElementById("lessonTitle");
      const lessonDescEl = document.getElementById("lessonDescription");
      if (lessonTitleEl) lessonTitleEl.textContent = lessonData.title;
      if (lessonDescEl) lessonDescEl.textContent = lessonData.description;

      // Update Monaco Editor content with initial code from lesson data
      if (window.editor) {
        window.editor.setValue(lessonData.initialCode);
      }
    } catch (error) {
      console.error("Error loading exercise data:", error);
    }
  }

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
      // Using Babel parser as demonstration.
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

  attachIDEButtons();
});
