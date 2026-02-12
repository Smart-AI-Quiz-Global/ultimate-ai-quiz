let correctAnswer = 2;

function beginQuiz() {

  document.getElementById("questionBox").style.display = "block";

  let language = document.getElementById("language").value;
  let category = document.getElementById("category").value;

  document.getElementById("question").innerText =
    "Sample Question (" + language + " - " + category + ")";

}

function checkAnswer(selected) {

  if (selected === correctAnswer) {
    document.getElementById("result").innerText = "✅ Correct Answer!";
  } else {
    document.getElementById("result").innerText = "❌ Wrong Answer!";
  }

}
