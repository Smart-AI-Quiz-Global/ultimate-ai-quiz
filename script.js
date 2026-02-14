// script.js
// Smart-AI-Quiz-Global - Main Quiz & UI Controller
// Author: Smart-AI-Quiz-Global Team
// Description: Handles quiz engine, UI interactions, countdowns, feedback, and integrates audio/video recording.

// ----------------------------
// Global Variables
// ----------------------------
let currentQuestionIndex = 0;
let questions = [];
let score = 0;
let countdownInterval = null;
let countdownTime = 10; // seconds

const startBtn = document.getElementById('start-quiz');
const quizContainer = document.getElementById('quiz');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const countdownText = document.getElementById('countdown-text');
const feedbackText = document.getElementById('feedback-text');
const correctSound = document.getElementById('correct-sound');
const wrongSound = document.getElementById('wrong-sound');

const langSelector = document.getElementById('lang');
const categorySelector = document.getElementById('category');

const giftBtn = document.getElementById('send-gift');
const giftInfo = document.getElementById('gift-info');

// ----------------------------
// Quiz Initialization
// ----------------------------
async function initializeQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    feedbackText.textContent = "";
    countdownText.textContent = countdownTime;

    // Load questions based on selected category & language
    const category = categorySelector.value;
    const language = langSelector.value;

    questions = await fetchQuestions(category, language);

    if (!questions || !questions.length) {
        alert("No questions available for selected category & language.");
        return;
    }

    // Start recording automatically (if enabled in settings)
    if (window.recorder) recorder.startScreenRecording();

    showQuestion(currentQuestionIndex);
}

// ----------------------------
// Fetch Questions (Simulated API call)
// ----------------------------
async function fetchQuestions(category, language) {
    // Placeholder: In future, call backend API or AI-generated questions
    console.log(`Fetching questions for category: ${category}, language: ${language}`);

    // Example static questions for demo
    return [
        {
            question: "What is AI?",
            options: ["Artificial Intelligence", "Astronomy Info", "Art Inspiration", "Animal Index"],
            answer: 0
        },
        {
            question: "Which planet is known as Red Planet?",
            options: ["Earth", "Mars", "Venus", "Jupiter"],
            answer: 1
        },
        {
            question: "Who invented the World Wide Web?",
            options: ["Bill Gates", "Tim Berners-Lee", "Elon Musk", "Steve Jobs"],
            answer: 1
        }
    ];
}

// ----------------------------
// Display Question
// ----------------------------
function showQuestion(index) {
    clearInterval(countdownInterval);
    countdownTime = 10;
    countdownText.textContent = countdownTime;

    const q = questions[index];
    questionText.textContent = q.question;
    optionsContainer.innerHTML = "";

    q.options.forEach((option, i) => {
        const btn = document.createElement("button");
        btn.textContent = option;
        btn.classList.add("option-btn");
        btn.addEventListener("click", () => handleAnswer(i));
        optionsContainer.appendChild(btn);
    });

    startCountdown();
}

// ----------------------------
// Handle Answer
// ----------------------------
function handleAnswer(selectedIndex) {
    clearInterval(countdownInterval);
    const currentQ = questions[currentQuestionIndex];

    if (selectedIndex === currentQ.answer) {
        feedbackText.textContent = "Correct!";
        score++;
        correctSound.play();
    } else {
        feedbackText.textContent = `Wrong! Correct: ${currentQ.options[currentQ.answer]}`;
        wrongSound.play();
    }

    // Move to next question after short delay
    setTimeout(() => {
        feedbackText.textContent = "";
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion(currentQuestionIndex);
        } else {
            endQuiz();
        }
    }, 1500);
}

// ----------------------------
// Countdown Timer
// ----------------------------
function startCountdown() {
    countdownInterval = setInterval(() => {
        countdownTime--;
        countdownText.textContent = countdownTime;

        if (countdownTime <= 0) {
            clearInterval(countdownInterval);
            feedbackText.textContent = `Time's up! Correct: ${questions[currentQuestionIndex].options[questions[currentQuestionIndex].answer]}`;
            wrongSound.play();

            setTimeout(() => {
                feedbackText.textContent = "";
                currentQuestionIndex++;
                if (currentQuestionIndex < questions.length) {
                    showQuestion(currentQuestionIndex);
                } else {
                    endQuiz();
                }
            }, 1500);
        }
    }, 1000);
}

// ----------------------------
// End Quiz
// ----------------------------
function endQuiz() {
    alert(`Quiz Over! Your Score: ${score} / ${questions.length}`);

    // Stop screen recording if running
    if (window.recorder && window.recorder.isScreenRecording) {
        window.recorder.stopScreenRecording();
    }

    // Future: Upload quiz video/audio + score to server/AI analytics
}

// ----------------------------
// Event Listeners
// ----------------------------
startBtn.addEventListener("click", () => {
    quizContainer.classList.remove("hidden");
    startBtn.classList.add("hidden");
    initializeQuiz();
});

giftBtn.addEventListener("click", () => giftInfo.classList.toggle("hidden"));

// ----------------------------
// Admin Eye Unlock (Optional duplicate handling)
// ----------------------------
let eyeClickCount = 0;
const adminEye = document.getElementById('admin-eye');
if (adminEye) {
    adminEye.addEventListener('click', () => {
        eyeClickCount++;
        if (eyeClickCount >= 10) {
            const code = prompt("Enter Secret Code:");
            const number = prompt("Enter Secret Number:");
            if (code === "7866_Zaigham_5121472" && number === "03219379597") {
                window.location.href = "admin-panel.html";
            } else {
                alert("Wrong credentials");
                eyeClickCount = 0;
            }
        }
    });
}

// ----------------------------
// Future-Proof Hooks
// ----------------------------
async function analyzeUserVoice() {
    if (!window.recorder) return console.warn("Recorder not initialized.");
    await window.recorder.transcribeAudio();
    await window.recorder.detectLanguage();
    await window.recorder.noiseReduction();
}

async function saveQuizData(userId = null) {
    console.log("Saving quiz data and media... (future server/cloud integration)");
}

// ----------------------------
// Multi-Language Dynamic Update
// ----------------------------
langSelector.addEventListener("change", () => {
    console.log(`Language switched to ${langSelector.value}`);
    // Future: dynamically reload quiz questions in selected language
});

categorySelector.addEventListener("change", () => {
    console.log(`Category switched to ${categorySelector.value}`);
    // Future: fetch category-specific questions
});
