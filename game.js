const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const scoreText = document.getElementById("score");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let questions = [
  {
    question: "Can coronavirus be transmitted from person to person?",
    choice1: "no",
    choice2: "yes",
    choice3: "well, maybe",
    answer: 2,
  },
  {
    question:
      "What can I do to protect myself from contracting the novel coronavirus?",
    choice1: "maintaining basic hand hygiene and avoiding close contact",
    choice2: "going to parties and not obeying the government orders",
    choice3: "visiting friends and loved ones during lockdown",
    answer: 1,
  },
  {
    question: "Is there a vaccine for the novel coronavirus?",
    choice1: "yes: A vaccine has been announced by WHO",
    choice2: "no: None yet",
    choice3: "well, maybe",
    answer: 2,
  },
  {
    question: "The following are symptoms of coronavirus except?",
    choice1: "fever",
    choice2: "difficulty in breathing",
    choice3: "skin rashes",
    answer: 3,
  },
  {
    question: "Where Can I Get Updated Information on Coronavirus (COVID-19)?",
    choice1: "NCDC and WHO",
    choice2: "OAU and NAFDAC",
    choice3: "NYSC and FRSC",
    answer: 1,
  },
];

const correctAnswer = 1;
const maximumQuestions = 5;

startQuiz = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter >= maximumQuestions) {
    return window.location.assign("end.html");
  }

  questionCounter++;

  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });
  availableQuestions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];
    let classToApply = "incorrect";
    if (selectedAnswer == currentQuestion.answer) {
      classToApply = "correct";
    }

    if (classToApply === "correct") {
      incrementScore(correctAnswer);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);

    //getNewQuestion();
  });
});

incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

startQuiz();
