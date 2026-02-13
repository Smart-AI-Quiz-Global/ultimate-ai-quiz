// Smart-AI-Quiz-Global: Heavy AI Engine
const API_KEYS = {
    gemini: "YOUR_GEMINI_API_KEY", // یہاں اپنی گوگل جیمنی کی API کی لگانی ہے
    chatgpt: "YOUR_CHATGPT_API_KEY" // بیک اپ کے لیے
};

async function loadNextQuestion(category = "Mixed") {
    const questionBox = document.getElementById('question-text');
    questionBox.innerText = "AI is thinking and generating a new question...";

    // 1. Prompt تیار کرنا (جس زبان اور کیٹیگری میں یوزر کو چاہیے)
    const prompt = `Generate a high-quality MCQ for a YouTube video. 
    Category: ${category}. 
    Language: ${currentLanguage}. 
    Provide 1 question, 3 options, and the correct answer index (0, 1, or 2).
    Format it as JSON.`;

    try {
        // 2. پہلا انجن: Google Gemini کو کال کرنا
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEYS.gemini}`, {
            method: "POST",
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        });

        const data = await response.json();
        const aiResponse = JSON.parse(data.candidates[0].content.parts[0].text);
        
        displayQuestion(aiResponse);

    } catch (error) {
        console.log("Gemini failed, trying backup engine...");
        // یہاں ہم بیک اپ انجن یا پہلے سے محفوظ شدہ (Pre-saved) سوالات کا لاجک چلا سکتے ہیں
        loadBackupQuestion();
    }
}

// 3. سوال کو اسکرین پر دکھانا اور AI کی آواز چلانا
function displayQuestion(data) {
    const questionBox = document.getElementById('question-text');
    const opt1 = document.getElementById('opt-1');
    const opt2 = document.getElementById('opt-2');
    const opt3 = document.getElementById('opt-3');

    questionBox.innerText = data.question;
    opt1.innerText = data.options[0];
    opt2.innerText = data.options[1];
    opt3.innerText = data.options[2];

    // AI کی آواز میں سوال اور آپشنز پڑھنا
    const fullText = `Question: ${data.question}. Option A: ${data.options[0]}. Option B: ${data.options[1]}. Option C: ${data.options[2]}. You have 10 seconds.`;
    speakText(fullText);

    // آپشنز پر کلک کرنے کا فنکشن سیٹ کرنا
    opt1.onclick = () => checkAnswer(0, data.correctIndex);
    opt2.onclick = () => checkAnswer(1, data.correctIndex);
    opt3.onclick = () => checkAnswer(2, data.correctIndex);

    // آواز مکمل ہونے کے بعد 10 سیکنڈ کا ٹائمر شروع کرنا
    setTimeout(() => {
        startTimer();
    }, 5000); // 5 سیکنڈ کا وقفہ آواز کے لیے
}

function loadBackupQuestion() {
    // اگر انٹرنیٹ یا API کا مسئلہ ہو تو یہ "آف لائن" سوال دکھائے گا تاکہ ویب سائٹ ہیک یا بند نہ لگے
    const offlineData = {
        question: "What is the capital of Pakistan?",
        options: ["Karachi", "Islamabad", "Lahore"],
        correctIndex: 1
    };
    displayQuestion(offlineData);
}

