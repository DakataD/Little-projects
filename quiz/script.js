
const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const questionsContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonElement = document.getElementById('answer-buttons');
const score = document.getElementById('clicks');
const numQuestion = document.getElementById('question-num');
const countdown = document.getElementById('countdown');
const element = document.getElementById('errorBox')
const output = document.querySelector('span');


let questionCounter = 1;
let scoreCounter = 0;
let shuffledQuestions, currentQuestionIndex;

let startingMinutes = 15;
let time = startingMinutes * 60;


startBtn.addEventListener('click', startGame);
nextBtn.addEventListener('click', () => {
    numQuestion.innerText = `Question:${questionCounter}/5`
    currentQuestionIndex++;
    setNextQuestion();

})

function notify(msg) {
    output.textContent = msg;
    element.style.display = 'block';

    setTimeout(() => element.style.display = 'none', 3000)
}

function startGame() {
    notify('Let\'s test your knowledge');
    countdown.classList.remove('hide');
    score.classList.remove('hide');
    numQuestion.classList.remove('hide');
    startBtn.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    questionsContainerElement.classList.remove('hide');
    setNextQuestion();

    let timer = setInterval(updateCountdown, 1000);

    function updateCountdown() {
        const minutes = Math.floor(time / 60);
        let seconds = time % 60;

        seconds = seconds < 10 ? '0' + seconds : seconds;
        countdown.innerHTML = `${minutes}:${seconds}`
        time--
    }
}


function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    if (question.example) {
        questionElement.innerText = question.question + '\n' + '\n' + question.example;
    }
    question.answers.forEach(answers => {
        const button = document.createElement('button');
        button.innerText = answers.text
        button.classList.add('btn');
        if (answers.correct) {
            button.dataset.correct = answers.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonElement.appendChild(button);
    })
}

function resetState() {
    clearStatusClass(document.body)
    nextBtn.classList.add('hide');
    while (answerButtonElement.firstChild) {
        answerButtonElement.removeChild(answerButtonElement.firstChild);
    }

}
function selectAnswer(e) {
    questionCounter++;
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    if (selectedButton.details = 1 || !selectedButton.details) {
        Array.from(answerButtonElement.children).forEach(a => {
            a.disabled = true;
        })
    }
    if (correct) { onClick(); }

    setStatusClass(document.body, correct)
    Array.from(answerButtonElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })

    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextBtn.classList.remove('hide')
    } else {
        startBtn.innerText = 'Restart Quiz'
        startBtn.addEventListener('click', () => {
            window.location.reload()

        });
        startBtn.classList.remove('hide');

    }

}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');

    } else {
        element.classList.add('wrong');


    }
}
function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');

}
function onClick() {
    scoreCounter += 1;

    score.innerHTML = `Score:${scoreCounter}`
        ;
};



const questions = [
    {
        question: 'Which operator returns true if the two compared values are not equal?',
        answers: [
            { text: '<>', correct: false },
            { text: '~', correct: false },
            { text: '==!', correct: false },
            { text: '!==', correct: true }
        ]
    }, {
        question: ' How is a forEach statement different from a for statement?',
        answers: [
            { text: 'Only a for statement uses a callback function.', correct: false },
            { text: 'Only a forEach statement lets you specify your own iterator.', correct: false },
            { text: 'A forEach statement is generic, but a for statement can be used only with an array.', correct: false },
            { text: 'A for statement is generic, but a forEach statement can be used only with an array.', correct: true }
        ]
    }, {
        question: 'Review the code below. Which statement calls the addTax function and passes 50 as an argument? How would you use this function to find out how much tax should be paid on  \$50?',
        example: 'function addTax(total) \{\
            return total * 1.05\;\
          \}',
        answers: [
            { text: 'addTax = 50;', correct: false },
            { text: 'return addTax 50;', correct: false },
            { text: 'addTax 50', correct: false },
            { text: 'addTax(50);', correct: true }
        ]
    }, {
        question: 'Which statement is the correct way to create a variable called rate and assign it the value 100?',
        answers: [
            { text: 'let rate = 100;', correct: true },
            { text: 'let 100 = rate;', correct: false },
            { text: '100 = let rate;', correct: false },
            { text: 'rate = 100;', correct: false }
        ]
    },
    {
        question: 'Which statement creates a new object using the Person constructor? Which statement creates a new Person object called "student"?',
        answers: [
            { text: 'var student = construct Person;', correct: false },
            { text: 'var student = new Person();', correct: true },
            { text: 'var student = Person();', correct: false },
            { text: 'var student = construct Person();', correct: false }
        ]
    }
    /*{
        question: '',
        answers: [
            { text: '', correct: true },
            { text: '', correct: false },
            { text: '', correct: false },
            { text: '', correct: false }
        ]
    }*/

    /*{
        question: '',
        example: '';
        answers: [
            { text: '', correct: true },
            { text: '', correct: false },
            { text: '', correct: false },
            { text: '', correct: false }
        ]
    }*/
]

