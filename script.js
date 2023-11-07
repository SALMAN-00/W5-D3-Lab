const questions = [
  {
    questionTitle: "ماهي عاصمه السعوديه؟",
    options: ["الرياض", "جدة", "القصيم", "الكويت"],
    keyAnswer: "الرياض",
  },
  {
    questionTitle: "افضل نادي فالعالم",
    options: ["الاهلي", "النصر", "الهلال", "التعاون"],
    keyAnswer: "الهلال",
  },
  {
    questionTitle: "ماهو افضل لون",
    options: ["احمر", "اصفر", "ازرق", "وردي"],
    keyAnswer: "ازرق",
  },
  {
    questionTitle: "ماهو ناتج ضرب 5*13",
    options: ["70", "60", "65", "55"],
    keyAnswer: "65",
  },
  {
    questionTitle: "أهوى ولا شاي ؟",
    inputs: ["text"],
    keyAnswer: "شاي",
  },
  {
    questionTitle: " شاي ولا نعناعع ؟",
    inputs: ["text"],
    keyAnswer: "نعاع",
  },
];

const qustionsCont = document.getElementById("qustions-cont");
const qustionsText = document.getElementById("qustions-text");
const options = document.getElementById("options");
const inputs = document.getElementById("inputs");
const timeLeft = document.getElementById("time-left");
const resultCont = document.getElementById("result-cont");
const resultText = document.getElementById("result-text");

let currentIndex = 0;
let score = 0;
let timer = 10;
let countDown;

function showQuestion(index) {
  const question = questions[index];
  qustionsText.innerText = question.questionTitle;
  options.innerHTML = "";

  if (question.inputs) {
    // Add an input field for questions that require a text answer.
    inputs.innerHTML = `<input type="text" id="answer-${index}">`;
  } else {
    // Display the answer buttons for questions that have multiple choice answers.
    question.options.forEach((option, i) => {
      options.innerHTML += `<button type="button" onclick="checkAnswer(${i}, ${index})">${option}</button>`;
    });
  }
}

function showTimer() {
  countDown = setInterval(() => {
    timer--;
    timeLeft.textContent = timer;
    if (timer <= 0) {
      clearInterval(countDown);
      checkAnswer(null, currentIndex);
    }
  }, 1000);
}

showQuestion(currentIndex);
showTimer();

function checkAnswer(optionIndex, questionIndex) {
  clearInterval(countDown);

  const question = questions[questionIndex];
  const myAnswer =
    optionIndex === null
      ? document.getElementById(`answer-${questionIndex}`).value
      : question.options[optionIndex];

  if (myAnswer === question.keyAnswer) {
    score++;
  }

  currentIndex++;

  if (currentIndex < questions.length) {
    showQuestion(currentIndex);
    timer = 10;
    timeLeft.textContent = timer;
    showTimer();
  } else {
    showResult();
  }
}

function showResult() {
  qustionsCont.style.display = "none";
  resultCont.style.display = "flex";
  resultText.textContent = `Your Score is ${score} of ${questions.length}`;
}
