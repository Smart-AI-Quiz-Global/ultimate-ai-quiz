// script.js
// Smart-AI-Quiz-Global - Main Quiz & UI Logic
// Author: Smart-AI-Quiz-Global Team
// Description: Handles quiz functionality, timer, feedback, recorder integration, and future AI features.

const startBtn = document.getElementById('start-quiz');
const quizContainer = document.getElementById('quiz');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const countdownText = document.getElementById('countdown-text');
const feedbackText = document.getElementById('feedback-text');
const giftBtn = document.getElementById('send-gift');
const giftInfo = document.getElementById('gift-info');
const adminEye = document.getElementById('admin-eye');

let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let countdownTimer;
let countdownValue = 10;
let selectedLanguage = document.getElementById('lang').value;
let selectedCategory = document.getElementById('category').value;

// -----------------------------
// Load Questions (Simulated / Placeholder)
// -----------------------------
function loadQuestions(category, language) {
    // Placeholder: In future, fetch from server or AI-powered question generator
    questions = [
        { question: "What is AI?", options: ["Artificial Intelligence", "Apple Inc.", "Android", "Amazon"], answer: 0 },
        { question: "Which planet is known as Red Planet?", options: ["Earth", "Mars", "Jupiter", "Venus"], answer: 1 },
        { question: "2 + 2 = ?", options: ["3", "4", "5", "22"], answer: 1 },
        // Future: 100+ AI-generated questions per category/language
    ];
}

// -----------------------------
// Initialize Quiz
// -----------------------------
function initializeQuiz() {
    loadQuestions(selectedCategory, selectedLanguage);
    currentQuestionIndex = 0;
    score = 0;
    showQuestion(currentQuestionIndex);

    // Auto start screen recording if enabled
    if (window.recorder) {
        window.recorder.autoStartRecording(true);
    }
}

// -----------------------------
// Show Question
// -----------------------------
function showQuestion(index) {
    if (index >= questions.length) {
        endQuiz();
        return;
    }

    const q = questions[index];
    questionText.textContent = q.question;
    optionsContainer.innerHTML = "";

    q.options.forEach((option, i) => {
        const btn = document.createElement('button');
        btn.textContent = option;
        btn.classList.add('option-btn');
        btn.addEventListener('click', () => selectOption(i));
        optionsContainer.appendChild(btn);
    });

    startCountdown();
}

// -----------------------------
// Select Option
// -----------------------------
function selectOption(selectedIndex) {
    const currentQ = questions[currentQuestionIndex];
    stopCountdown();

    if (selectedIndex === currentQ.answer) {
        feedbackText.textContent = "Correct ✅";
        score++;
        playCorrectSound();
    } else {
        feedbackText.textContent = `Wrong ❌. Correct answer: ${currentQ.options[currentQ.answer]}`;
        playWrongSound();
    }

    setTimeout(() => {
        feedbackText.textContent = "";
        currentQuestionIndex++;
        showQuestion(currentQuestionIndex);
    }, 1500);
}

// -----------------------------
// Countdown Timer
// -----------------------------
function startCountdown() {
    countdownValue = 10;
    countdownText.textContent = countdownValue;
    const countdownAudio = document.getElementById('countdown-audio');

    countdownTimer = setInterval(() => {
        countdownValue--;
        countdownText.textContent = countdownValue;
        if (countdownValue <= 3 && countdownValue > 0) countdownAudio.play();

        if (countdownValue <= 0) {
            clearInterval(countdownTimer);
            feedbackText.textContent = "Time's up!";
            currentQuestionIndex++;
            setTimeout(() => {
                feedbackText.textContent = "";
                showQuestion(currentQuestionIndex);
            }, 1500);
        }
    }, 1000);
}

function stopCountdown() {
    clearInterval(countdownTimer);
}

// -----------------------------
// End Quiz
// -----------------------------
function endQuiz() {
    quizContainer.innerHTML = `
        <h2>Quiz Finished!</h2>
        <p>Your Score: ${score} / ${questions.length}</p>
        <button id="restart-quiz">Restart Quiz</button>
    `;
    const restartBtn = document.getElementById('restart-quiz');
    restartBtn.addEventListener('click', () => {
        location.reload();
    });

    // Optional: stop screen recording automatically
    if (window.recorder && window.recorder.isRecordingScreen) {
        window.recorder.stopScreenRecording();
    }
}

// -----------------------------
// Sounds
// -----------------------------
function playCorrectSound() {
    const correctAudio = document.getElementById('correct-sound');
    correctAudio.play();
}

function playWrongSound() {
    const wrongAudio = document.getElementById('wrong-sound');
    wrongAudio.play();
}

// -----------------------------
// Event Listeners
// -----------------------------
startBtn.addEventListener('click', () => {
    quizContainer.classList.remove('hidden');
    startBtn.classList.add('hidden');
    initializeQuiz();
});

// Gift / Donation Toggle
giftBtn.addEventListener('click', () => giftInfo.classList.toggle('hidden'));

// Language & Category Selectors
document.getElementById('lang').addEventListener('change', (e) => selectedLanguage = e.target.value);
document.getElementById('category').addEventListener('change', (e) => selectedCategory = e.target.value);

// -----------------------------
// Admin Unlock Logic
// -----------------------------
let adminClickCount = 0;
adminEye.addEventListener('click', () => {
    adminClickCount++;
    if (adminClickCount >= 10) {
        const code = prompt("Enter Secret Code:");
        const number = prompt("Enter Secret Number:");
        if (code === "7866_Zaigham_5121472" && number === "03219379597") {
            window.location.href = "admin-panel.html";
        } else {
            alert("Wrong credentials");
            adminClickCount = 0;
        }
    }
});

// -----------------------------
// Future AI Features Placeholder
// -----------------------------
async function suggestNextQuestion() {
    console.log("AI Suggestion for next question coming soon...");
    // Future: AI will generate personalized next question based on performance
}

async function adaptiveDifficulty() {
    console.log("Adaptive difficulty feature coming soon...");
    // Future: AI adjusts question difficulty automatically
}
