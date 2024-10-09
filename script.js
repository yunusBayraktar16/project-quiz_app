const questions = [
    {
        question: "Whic is larget animal in the world?",
        answers: [
            { text: "Shark", correct: "false" },
            { text: "Blue whale", correct: "True" },
            { text: "Elephant", correct: "false" },
            { text: "Giraffe", correct: "false" }
        ]
    },
    {
        question: "Whic is the smallest countery in the world?",
        answers: [
            { text: "Vatican City", correct: "True" },
            { text: "Bhutan", correct: "False" },
            { text: "Nepal", correct: "False" },
            { text: "Shri Lanka", correct: "false" }
        ]
    },
    {
        question: "Whic is the largest desert in the world",
        answers: [
            { text: "Kalahari", correct: "False" },
            { text: "Gobi", correct: "False" },
            { text: "Sahara", correct: "False" },
            { text: "Antarctica", correct: "True" }
        ]
    },
    {
        question: "Whic is the smallest continent in the world",
        answers: [
            { text: "Asia", correct: "False" },
            { text: "Australia", correct: "True" },
            { text: "Arctic", correct: "False" },
            { text: "Africa", correct: "False" }
        ]
    }
]
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const counter = document.getElementById("count");
let currentQuestionIndex = 0;
let score = 0;
resetState();
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";

    // (function count() {
    //     var timer;
    //     var sec = 0;
    //     timer = setInterval(()=> {
    //         counter.innerHTML = sec;
    //         sec++;
    //         if(sec==62) {
    //             alert("Time is done..");
    //             sec=0;
    //         }
    //     },1000)
    // })();

    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}
function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct;
    if (isCorrect == "True") {
        selectedBtn.classList.add("correct");
        score++;
    }
    else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct == "True") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}
function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of
    ${questions.length}! `;
    nextButton.style.display = "block";
    nextButton.innerHTML = "Play Again";
}
function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    }
    else {
        showScore();
    }
}
nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    }
    else {
        startQuiz();
    }
});
startQuiz();



