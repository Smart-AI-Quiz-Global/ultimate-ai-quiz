let correctAnswer = 2; // ہر سوال کے لیے correct answer
let countdown;
let timeLeft = 10;

function beginQuiz() {
  document.getElementById("questionBox").style.display = "block";

  let language = document.getElementById("language").value;
  let category = document.getElementById("category").value;

  document.getElementById("question").innerText =
    "Sample Question (" + language + " - " + category + ")";
  document.getElementById("result").innerText = "";

  // Timer reset
  timeLeft = 10;
  clearInterval(countdown);
  countdown = setInterval(timer, 1000);
}

function timer() {
  if (timeLeft <= 0) {
    clearInterval(countdown);
    showAnswer();
  } else {
    document.getElementById("result").innerText = "⏳ Time Left: " + timeLeft;
    playSound("sounds/tick.mp3");
    timeLeft--;
  }
}

function checkAnswer(selected) {
  clearInterval(countdown);

  if (selected === correctAnswer) {
    document.getElementById("result").innerText = "✅ Correct Answer!";
    playSound("sounds/clap.mp3");
  } else {
    document.getElementById("result").innerText = "❌ Wrong Answer!";
    playSound("sounds/wrong.mp3");
  }

  setTimeout(nextQuestion, 2000);
}

function showAnswer() {
  document.getElementById("result").innerText = "✅ Correct Answer: Option " + correctAnswer;
  playSound("sounds/clap.mp3");
  setTimeout(nextQuestion, 2000);
}

function nextQuestion() {
  // Future: AI سے اگلا سوال fetch کریں
  beginQuiz();
}

// Sound helper
function playSound(filename) {
  let audio = new Audio(filename);
  audio.play();
}
