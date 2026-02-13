// Global Variables
let clickCount = 0;
const secretCode = "7866_Zaigham_5121472";
const adminPhone = "03219379597";
let currentLanguage = 'en';
let isRecordingEnabled = false;

// 1. Secret Eye Logic (10 Clicks System)
function handleEyeClick() {
    clickCount++;
    
    // پہلے 2 کلکس پر صفحہ کے ٹاپ پر جمپ کریں
    if (clickCount <= 2) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // 10ویں کلک پر ایڈمن لاگ ان باکس کھولیں
    if (clickCount === 10) {
        document.getElementById('admin-modal').classList.remove('hidden');
        clickCount = 0; // ری سیٹ کریں
    }
}

// 2. Verify Admin Credentials
function verifyAdmin() {
    const passInput = document.getElementById('admin-pass').value;
    const numInput = document.getElementById('admin-num').value;

    if (passInput === secretCode && numInput === adminPhone) {
        alert("Access Granted! Opening Admin Panel...");
        window.location.href = 'admin-panel.html';
    } else {
        alert("Wrong Code or Number! Try again.");
        closeModal();
    }
}

function closeModal() {
    document.getElementById('admin-modal').classList.add('hidden');
    clickCount = 0;
}

// 3. Language & Category Selection
function toggleMenu() {
    document.getElementById("language-menu").classList.toggle("show");
}

function setLanguage(lang) {
    currentLanguage = lang;
    alert("Language set to: " + lang);
    document.getElementById("language-menu").classList.remove("show");
}

function toggleRecording(status) {
    isRecordingEnabled = status;
    alert(status ? "Screen Recording Mode ON" : "Recording Mode OFF");
}

// 4. Start Quiz Function
function startQuiz(category) {
    document.getElementById('setup-screen').classList.add('hidden');
    document.getElementById('game-screen').classList.remove('hidden');
    
    // AI Engine کو کال کریں (یہ اگلی فائل میں ہوگا)
    loadNextQuestion(category);
}
// 5. Quiz Logic & Timer
let timerInterval;
let timeLeft = 10;

function startTimer() {
    timeLeft = 10;
    document.getElementById('countdown').innerText = timeLeft;
    
    // ٹون ٹون آواز کے لیے بیپ (Beep) کا فنکشن
    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('countdown').innerText = timeLeft;
        
        if (timeLeft > 0) {
            playTickSound(); // ہر سیکنڈ پر 'ٹون' کی آواز
        }

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            handleTimeout(); // وقت ختم ہونے پر خودکار جواب
        }
    }, 1000);
}

// 6. AI Voice (Text to Speech)
function speakText(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    // یوزر کی منتخب کردہ زبان کے حساب سے آواز سیٹ کریں
    utterance.lang = currentLanguage; 
    utterance.rate = 0.9; // تھوڑا پروفیشنل اور آرام دہ لہجہ
    window.speechSynthesis.speak(utterance);
}

// 7. Play Professional Sounds
function playTickSound() {
    const beep = new Audio('https://www.soundjay.com/buttons/button-4.mp3'); 
    beep.play();
}

function playCorrectSound() {
    const clap = new Audio('https://www.soundjay.com/human/applause-01.mp3');
    clap.play();
    alert("Correct! 👏 (Fake Reward: 🏆)");
}

function playWrongSound() {
    const wrong = new Audio('https://www.soundjay.com/buttons/button-10.mp3');
    wrong.play();
}

// 8. Answer Checking Logic
function checkAnswer(selected, correct) {
    clearInterval(timerInterval); // ٹائمر روک دیں
    
    if (selected === correct) {
        playCorrectSound();
    } else {
        playWrongSound();
        alert("Wrong Answer! Better luck next time.");
    }

    // "Next" بٹن دکھائیں تاکہ یوزر اپنی مرضی سے اگلے سوال پر جائے
    showNextButton();
}

function showNextButton() {
    const nextBtn = document.createElement("button");
    nextBtn.innerText = "Next Question";
    nextBtn.id = "next-btn";
    nextBtn.onclick = () => {
        nextBtn.remove();
        loadNextQuestion(); // اگلا سوال لوڈ کریں
    };
    document.getElementById('game-screen').appendChild(nextBtn);
}

function handleTimeout() {
    speakText("Time is up! The correct answer is displayed.");
    playWrongSound();
    showNextButton();
}

