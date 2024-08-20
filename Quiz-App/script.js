const questions = [
    {
        question: " Which type of JavaScript language is ___",
        answers: [
            {text: "Object-Oriented", correct: false},
            {text: "Object-Based", correct: true},
            {text: "Assembly-language", correct: false},
            {text: "High-level", correct: false},
        ]
    },
    {
        question: " Which one of the following also known as Conditional Expression:",
        answers: [
            {text: "Alternative to if-else", correct: false},
            {text: "Switch statement", correct: false},
            {text: "If-then-else statement", correct: false},
            {text: "immediate if", correct: true},
        ]
    },
    {
        question: " In JavaScript, what is a block of statement?",
        answers: [
            {text: "Conditional block", correct: false},
            {text: "block that combines a number of statements into a single compound statement", correct: true},
            {text: "both conditional block and a single statement", correct: false},
            {text: "block that contains a single statement", correct: false},
        ]
    },
    {
        question: "When interpreter encounters an empty statements, what it will do:",
        answers: [
            {text: "Shows a warning", correct: false},
            {text: "Prompts to complete the statement", correct: false},
            {text: "Throws an error", correct: false},
            {text: "Ignores the statements", correct: true},
        ]
    },
    {
        question: " The 'function' and 'var' are known as:",
        answers: [
            {text: "Keywords", correct: false},
            {text: "Data types", correct: false},
            {text: "Declaration statements", correct: true},
            {text: "Prototypes", correct: false},
        ]
    },
    {
        question: "Which one of the following is the correct way for calling the JavaScript code?",
        answers: [
            {text: "Preprocessor", correct: false},
            {text: "Triggering Event", correct: false},
            {text: "RMI", correct: false},
            {text: "Function/Method", correct: true},
        ]
    },
    {
        question: "Which of the following type of a variable is volatile?",
        answers: [
            {text: "Mutable variable", correct: true},
            {text: "Dynamic variable", correct: false},
            {text: "Volatile variable", correct: false},
            {text: "Immutable variable", correct: false},
        ]
    },
    {
        question: "Which of the following option is used as hexadecimal literal beginning?",
        answers: [
            {text: "00", correct: false},
            {text: "0x", correct: false},
            {text: "0X", correct: false},
            {text: "Both 0x and 0X", correct: true},
        ]
    },
    {
        question: "When there is an indefinite or an infinite value during an arithmetic computation in a program, then JavaScript prints______.",
        answers: [
            {text: "Prints an exception error", correct: false},
            {text: "Prints an overflow error", correct: false},
            {text: "Displays 'Infinity' ", correct: true},
            {text: "Prints the value as such", correct: false},
        ]
    },
    {
        question: " In the JavaScript, which one of the following is not considered as an error:",
        answers: [
            {text: "Syntax error", correct: false},
            {text: "Missing of semicolons", correct: false},
            {text: "Division by zero", correct: true},
            {text: "Missing of Bracket", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");


let currQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currQuestionIndex =0;
    score =0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currQuestionIndex];
    let questionNo = currQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button"); // Answer 1 2 3 4 all are getting replaced by options.
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "None";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    // only select on button and display next button
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}
function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}
function handleNextButton(){
    currQuestionIndex++;
    if(currQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click",()=>{
    if(currQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})

startQuiz();