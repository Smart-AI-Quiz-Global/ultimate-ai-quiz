// ==========================
// Variables
// ==========================
let correctAnswer = 2; // demo, AI replace later
let countdown;
let timeLeft = 10;
let questionNumber = 0;

// ==========================
// Ads Setup (10 Ads)
// ==========================
const ads = [
  "https://example.com/ad1.jpg",
  "https://example.com/ad2.jpg",
  "https://example.com/ad3.jpg",
  "https://example.com/ad4.jpg",
  "https://example.com/ad5.jpg",
  "https://example.com/ad6.jpg",
  "https://example.com/ad7.jpg",
  "https://example.com/ad8.jpg",
  "https://example.com/ad9.jpg",
  "https://example.com/ad10.jpg"
];

// Show Ad every 10 questions
function showAd(){
  const adIndex = questionNumber % ads.length;
  const adUrl = ads[adIndex];
  const adDiv = document.createElement("div");
  adDiv.style.margin = "20px auto";
  adDiv.style.textAlign = "center";
  adDiv.innerHTML = `<img src="${adUrl}" style="width:90%; max-width:500px; border-radius:10px;">`;
  document.body.insertBefore(adDiv, document.getElementById("questionBox"));
}

// ==========================
// Quiz Functions
// ==========================
async function beginQuiz(){
  questionNumber++;
  
  // Show ad every 10 questions
  if(questionNumber % 10 === 0){
    showAd();
  }

  const category = document.getElementById("category").value;
  const language = localStorage.getItem("selectedLanguage") || "English";

  document.getElementById("questionBox").style.display = "block";

  // AI Question Simulation (replace with real AI API)
  const questionText = await fetchAIQuestion(language, category);
  document.getElementById("question").innerText = questionText;
  document.getElementById("result").innerText = "";

  // Timer
  timeLeft = 10;
  clearInterval(countdown);
  countdown = setInterval(timer, 1000);
}

function timer(){
  if(timeLeft <=0){
    clearInterval(countdown);
    showAnswer();
  } else {
    document.getElementById("result").innerText = "⏳ Time Left: "+timeLeft;
    playSound("sounds/tick.mp3");
    timeLeft--;
  }
}

function checkAnswer(selected){
  clearInterval(countdown);
  if(selected === correctAnswer){
    document.getElementById("result").innerText = "✅ Correct Answer!";
    playSound("sounds/clap.mp3");
  } else {
    document.getElementById("result").innerText = "❌ Wrong Answer!";
    playSound("sounds/wrong.mp3");
  }
  setTimeout(nextQuestion,2000);
}

function showAnswer(){
  document.getElementById("result").innerText = "✅ Correct Answer: Option "+correctAnswer;
  playSound("sounds/clap.mp3");
  setTimeout(nextQuestion,2000);
}

function nextQuestion(){ beginQuiz(); }

function playSound(filename){
  let audio = new Audio(filename);
  audio.play();
}

// ==========================
// AI Question Simulation
// ==========================
async function fetchAIQuestion(language, category){
  // Replace with real AI API for selected language and category
  return `Sample AI Question (#${questionNumber}) (${language} - ${category})`;
}

// ==========================
// Donation / Gift
// ==========================
function openDonation(){
  window.open("https://www.easypaisa.com.pk/","_blank");
}

// ==========================
// Hidden Admin Eye
// ==========================
let adminClicks = 0;
document.getElementById("adminEye").addEventListener("click", function(){
  adminClicks++;
  if(adminClicks >=10){
    const code = prompt("Enter Code:");
    if(code==="7866_Zaigham_5121472"){
      const phone = prompt("Enter Phone Number:");
      if(phone==="03219379597"){
        alert("✅ Admin Panel Opened!");
        window.open("admin.html","_blank");
      } else { alert("❌ Wrong Phone Number!"); }
    } else { alert("❌ Wrong Code!"); }
    adminClicks = 0;
  }
});
