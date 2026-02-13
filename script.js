const startBtn = document.getElementById("startBtn");
const startScreen = document.getElementById("startScreen");
const gameScreen = document.getElementById("gameScreen");
const resultScreen = document.getElementById("resultScreen");
const dialogBox = document.getElementById("dialogBox");
const questionBox = document.getElementById("questionBox");
const feedback = document.getElementById("feedback");
const nextBtn = document.getElementById("nextBtn");
const scoreDisplay = document.getElementById("score");
const finalScore = document.getElementById("finalScore");
const evaluation = document.getElementById("evaluation");
const progressBar = document.getElementById("progressBar");

let currentQuestion = 0;
let score = 0;

const questions = [
  {
    dialog: "Kasir: Gadai adalah pinjaman dengan jaminan barang berharga.",
    question: "Apa fungsi utama barang dalam sistem gadai?",
    options: [
      "Sebagai hadiah",
      "Sebagai jaminan pinjaman",
      "Sebagai pajak",
      "Sebagai tabungan"
    ],
    answer: 1,
    explanation: "Barang berfungsi sebagai jaminan jika pinjaman tidak ditebus."
  },
  {
    dialog: "Kasir: Bunga sederhana dihitung dari pokok pinjaman.",
    question: "Jika pinjam Rp1.000.000 dengan bunga 2% per bulan selama 3 bulan, berapa total bunga?",
    options: [
      "Rp60.000",
      "Rp30.000",
      "Rp90.000",
      "Rp120.000"
    ],
    answer: 0,
    explanation: "2% x 1.000.000 = 20.000 per bulan. 20.000 x 3 = 60.000."
  },
  {
    dialog: "Kasir: Jika tidak ditebus tepat waktu, ada risiko.",
    question: "Apa risiko jika gagal menebus barang?",
    options: [
      "Barang dikembalikan gratis",
      "Barang dilelang",
      "Bunga dihapus",
      "Pinjaman hilang"
    ],
    answer: 1,
    explanation: "Barang bisa dilelang untuk menutup pinjaman."
  }
];

startBtn.addEventListener("click", () => {
  startScreen.classList.remove("active");
  gameScreen.classList.add("active");
  loadQuestion();
});

function loadQuestion() {
  feedback.textContent = "";
  nextBtn.style.display = "none";

  const q = questions[currentQuestion];
  dialogBox.textContent = q.dialog;
  questionBox.innerHTML = "<p>" + q.question + "</p>";

  q.options.forEach((opt, index) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.classList.add("option");
    btn.setAttribute("tabindex", "0");

    btn.onclick = () => checkAnswer(index);
    questionBox.appendChild(btn);
  });

  progressBar.style.width = ((currentQuestion) / questions.length) * 100 + "%";
}

function checkAnswer(selected) {
  const q = questions[currentQuestion];
  const options = document.querySelectorAll(".option");

  options.forEach(btn => btn.disabled = true);

  if (selected === q.answer) {
    score += 20;
    scoreDisplay.textContent = score;
    options[selected].classList.add("correct");
    feedback.textContent = "Benar! " + q.explanation;
  } else {
    options[selected].classList.add("wrong");
    options[q.answer].classList.add("correct");
    feedback.textContent = "Salah. " + q.explanation;
  }

  nextBtn.style.display = "inline-block";
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  gameScreen.classList.remove("active");
  resultScreen.classList.add("active");
  finalScore.textContent = "Skor kamu: " + score;

  if (score >= 80) {
    evaluation.textContent = "Sangat Paham";
  } else if (score >= 60) {
    evaluation.textContent = "Cukup Paham";
  } else {
    evaluation.textContent = "Perlu Belajar Lagi";
  }

  localStorage.setItem("literasiScore", score);
}