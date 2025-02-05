// 🔥 Monaco Editor Setup with Dynamic Theme & Auto-Save Feature
require.config({ paths: { vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.40.0/min/vs' } });

require(['vs/editor/editor.main'], function () {
    const editor = monaco.editor.create(document.getElementById('code-editor'), {
        value: "// Write your C++ code here...",
        language: 'cpp',
        theme: localStorage.getItem('theme') === 'dark' ? 'vs-dark' : 'vs-light',
        fontSize: 14,
        automaticLayout: true
    });

    // Auto-save code every few seconds
    setInterval(() => {
        localStorage.setItem('savedCode', editor.getValue());
    }, 5000);

    // Load saved code on page load
    const savedCode = localStorage.getItem('savedCode');
    if (savedCode) {
        editor.setValue(savedCode);
    }

    document.getElementById('run-code').addEventListener('click', function () {
        const code = editor.getValue();
        compileAndRun(code);
    });

    document.getElementById('ai-improve').addEventListener('click', function () {
        const code = editor.getValue();
        improveCodeAI(code);
    });
});

// 🔥 Function to Compile & Run C++ Code
function compileAndRun(code) {
    document.getElementById('output').innerText = "Compiling... ⏳";
    
    fetch('https://some-api.com/compile', {  // Replace with actual API
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ language: 'cpp', code })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('output').innerText = data.output || "Compilation error.";
    })
    .catch(error => {
        console.error("Compilation Error:", error);
        document.getElementById('output').innerText = "Error: Unable to compile.";
    });
}

// 🔥 AI-Powered Code Improvement Suggestions
function improveCodeAI(code) {
    document.getElementById('ai-suggestions').innerText = "Analyzing code... 🧠";

    fetch('https://some-ai-api.com/analyze', {  // Replace with actual AI API
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ language: 'cpp', code })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('ai-suggestions').innerText = data.suggestions || "No suggestions found.";
    })
    .catch(error => {
        console.error("AI Analysis Error:", error);
        document.getElementById('ai-suggestions').innerText = "Error: Unable to analyze code.";
    });
}

// 🔥 Dynamic Theme Change for Editor
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const newTheme = body.classList.contains('dark-mode') ? 'vs-dark' : 'vs-light';
        monaco.editor.setTheme(newTheme);
    });
}
