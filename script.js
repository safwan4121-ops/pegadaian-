// script.js
// Data Konten: Penjelasan dan Soal
const content = {
    explanations: [
        {
            dialog: "Selamat datang di pegadaian! Saya adalah kasir virtual. Apa itu gadai? Gadai adalah pinjaman uang dengan jaminan barang berharga. Barang Anda akan ditaksir nilainya, dan Anda bisa pinjam hingga persentase tertentu dari nilai taksiran tersebut.",
            question: "Apa itu gadai?",
            options: ["Pinjaman tanpa jaminan", "Pinjaman dengan jaminan barang", "Investasi saham", "Tabungan bank"],
            correct: 1,
            explanation: "Benar! Gadai adalah pinjaman dengan jaminan barang berharga."
        },
        {
            dialog: "Selanjutnya, mari kita bahas bunga sederhana. Bunga sederhana dihitung dari pokok pinjaman saja, rumusnya: Bunga = Pokok × Tingkat Bunga × Waktu (dalam tahun atau bulan).",
            question: "Apa rumus bunga sederhana?",
            options: ["Pokok + Bunga", "Pokok × Tingkat Bunga × Waktu", "Pokok / Waktu", "Bunga × Waktu"],
            correct: 1,
            explanation: "Benar! Rumusnya Pokok × Tingkat Bunga × Waktu."
        },
        {
            dialog: "Nilai taksiran adalah estimasi nilai barang Anda oleh pegadaian. Biasanya, pinjaman diberikan 70-90% dari nilai taksiran untuk mengurangi risiko.",
            question: "Apa itu nilai taksiran?",
            options: ["Nilai jual barang", "Estimasi nilai barang oleh pegadaian", "Harga beli barang", "Nilai sentimental"],
            correct: 1,
            explanation: "Benar! Nilai taksiran adalah estimasi nilai barang oleh pegadaian."
        },
        {
            dialog: "Risiko gagal bayar: Jika Anda tidak menebus tepat waktu, barang bisa dilelang. Anda kehilangan barang dan mungkin masih ada biaya tambahan.",
            question: "Apa risiko utama gagal bayar di pegadaian?",
            options: ["Barang hilang", "Barang dilelang", "Pinjaman gratis", "Bunga berkurang"],
            correct: 1,
            explanation: "Benar! Barang bisa dilelang jika tidak ditebus."
        },
        {
            dialog: "Mini-Case 1: Anda menggadaikan barang senilai Rp1.000.000 dengan bunga 2% per bulan selama 3 bulan. Hitung total bunga.",
            question: "Berapa total bunga untuk pinjaman Rp1.000.000, 2% per bulan, 3 bulan?",
            options: ["Rp30.000", "Rp60.000", "Rp90.000", "Rp120.000"],
            correct: 1, // 1.000.000 * 0.02 * 3 = 60.000
            explanation: "Benar! Bunga = 1.000.000 × 2% × 3 = Rp60.000. Penjelasan: Studi kasus ini menunjukkan bagaimana bunga bertambah seiring waktu."
        },
        {
            dialog: "Mini-Case 2: Jika tidak menebus tepat waktu, barang dilelang. Dampak: Kehilangan barang, mungkin dapat uang sisa jika lelang lebih tinggi dari hutang, tapi risiko rugi besar.",
            question: "Apa dampak utama jika tidak menebus barang tepat waktu?",
            options: ["Barang dikembalikan otomatis", "Barang dilelang dan mungkin hilang", "Pinjaman dihapus", "Bunga berhenti"],
            correct: 1,
            explanation: "Benar! Barang dilelang, Anda bisa kehilangan barang sepenuhnya. Penjelasan: Ini menunjukkan pentingnya membayar tepat waktu untuk menghindari kerugian."
        }
    ],
    materials: [ // Untuk fitur Pelajari Lagi
        "Apa itu gadai: Pinjaman dengan jaminan barang berharga.",
        "Bunga sederhana: Pokok × Tingkat Bunga × Waktu.",
        "Nilai taksiran: Estimasi nilai barang.",
        "Risiko gagal bayar: Barang dilelang.",
        "Mini-Case 1: Hitung bunga Rp1.000.000, 2%/bulan, 3 bulan = Rp60.000.",
        "Mini-Case 2: Gagal bayar menyebabkan lelang barang."
    ]
};

// Variabel Global
let currentStep = 0;
let score = 0;
const totalSteps = content.explanations.length;
const maxScore = 100;
const pointsPerQuestion = maxScore / totalSteps; // ~16.67, tapi pakai 20 untuk simplifikasi, adjust jika perlu

// Elemen DOM
const introPage = document.getElementById('intro-page');
const simulationPage = document.getElementById('simulation-page');
const resultPage = document.getElementById('result-page');
const dialogText = document.getElementById('dialog-text');
const questionContainer = document.getElementById('question-container');
const questionTitle = document.getElementById('question-title');
const optionsDiv = document.getElementById('options');
const feedbackDiv = document.getElementById('feedback');
const nextBtn = document.getElementById('next-btn');
const learnAgainBtn = document.getElementById('learn-again-btn');
const progressBar = document.getElementById('progress-bar');
const scoreIndicator = document.getElementById('score-indicator');
const scoreText = document.getElementById('score-text');
const evaluationText = document.getElementById('evaluation-text');
const recommendationText = document.getElementById('recommendation-text');
const restartBtn = document.getElementById('restart-btn');
const learnAgainFinal = document.getElementById('learn-again-final');

// Event Listeners
document.getElementById('start-btn').addEventListener('click', startSimulation);
nextBtn.addEventListener('click', nextStep);
restartBtn.addEventListener('click', restartSimulation);
learnAgainBtn.addEventListener('click', showMaterials);
learnAgainFinal.addEventListener('click', showMaterials);

// Fungsi Utama
function startSimulation() {
    introPage.classList.remove('active');
    simulationPage.classList.add('active');
    loadStep();
    loadScoreFromLocalStorage();
}

function loadStep() {
    if (currentStep < totalSteps) {
        const step = content.explanations[currentStep];
        dialogText.textContent = step.dialog;
        questionContainer.style.display = 'none';
        nextBtn.style.display = 'none';
        learnAgainBtn.style.display = 'none';
        setTimeout(() => {
            showQuestion(step);
        }, 2000); // Delay untuk membaca dialog
    } else {
        endSimulation();
    }
    updateProgress();
}

function showQuestion(step) {
    questionContainer.style.display = 'block';
    questionTitle.textContent = step.question;
    optionsDiv.innerHTML = '';
    step.options.forEach((opt, index) => {
        const option = document.createElement('div');
        option.classList.add('option');
        option.textContent = opt;
        option.tabIndex = 0; // Keyboard accessible
        option.setAttribute('role', 'button');
        option.setAttribute('aria-label', opt);
        option.addEventListener('click', () => checkAnswer(index, step.correct, step.explanation));
        option.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') checkAnswer(index, step.correct, step.explanation);
        });
        optionsDiv.appendChild(option);
    });
}

function checkAnswer(selected, correct, explanation) {
    const options = optionsDiv.children;
    Array.from(options).forEach((opt, idx) => {
        opt.removeEventListener('click', checkAnswer); // Disable clicks
        if (idx === correct) {
            opt.classList.add('correct');
        }
        if (idx === selected && idx !== correct) {
            opt.classList.add('incorrect');
        }
    });
    if (selected === correct) {
        score += pointsPerQuestion;
        feedbackDiv.textContent = 'Benar! ' + explanation;
        feedbackDiv.style.color = '#28a745';
    } else {
        feedbackDiv.textContent = 'Salah. Jawaban benar adalah: ' + options[correct].textContent + '. ' + explanation;
        feedbackDiv.style.color = '#dc3545';
    }
    updateScoreIndicator();
    nextBtn.style.display = 'block';
    learnAgainBtn.style.display = 'block';
}

function nextStep() {
    currentStep++;
    feedbackDiv.textContent = '';
    loadStep();
}

function updateProgress() {
    const progress = (currentStep / totalSteps) * 100;
    progressBar.style.width = `${progress}%`;
    progressBar.setAttribute('aria-valuenow', progress);
}

function updateScoreIndicator() {
    scoreIndicator.textContent = `Skor: ${Math.round(score)}`;
}

function endSimulation() {
    simulationPage.classList.remove('active');
    resultPage.classList.add('active');
    saveScoreToLocalStorage();
    scoreText.textContent = `Skor Anda: ${Math.round(score)} / ${maxScore}`;
    let evaluation = '';
    if (score >= 80) {
        evaluation = 'Sangat Paham';
    } else if (score >= 60) {
        evaluation = 'Cukup Paham';
    } else {
        evaluation = 'Perlu Belajar Lagi';
    }
    evaluationText.textContent = `Evaluasi: ${evaluation}`;
    recommendationText.textContent = 'Rekomendasi: Terus pelajari literasi keuangan untuk pengelolaan keuangan yang lebih baik.';
}

function restartSimulation() {
    resultPage.classList.remove('active');
    currentStep = 0;
    score = 0;
    updateScoreIndicator();
    startSimulation();
}

function showMaterials() {
    // Tampilkan materi ulang dalam dialog
    dialogText.innerHTML = content.materials.map(m => `<p>${m}</p>`).join('');
    questionContainer.style.display = 'none';
    nextBtn.style.display = 'block'; // Kembali ke step
    nextBtn.textContent = 'Kembali ke Simulasi';
    nextBtn.addEventListener('click', loadStep, { once: true });
}

// LocalStorage
function saveScoreToLocalStorage() {
    localStorage.setItem('financeSimScore', score);
}

function loadScoreFromLocalStorage() {
    const savedScore = localStorage.getItem('financeSimScore');
    if (savedScore) {
        score = parseFloat(savedScore);
        updateScoreIndicator();
    }
}      "Rp120.000"
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
