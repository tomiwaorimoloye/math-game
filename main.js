import calc from './calculation.js'

const header = document.querySelector('header');
const introPage = document.getElementById('intro')
const gamePage = document.getElementById('game')
const resultsPage = document.getElementById('results')
const creditPage = document.getElementById('credits')

const startButton = document.getElementById('start')
const retryButton = document.getElementsByClassName('redo')
const creditButton = document.getElementById('view-results')

startButton.addEventListener('click', function () {
    introPage.style.display = 'none'
    gamePage.style.display = 'flex'
    // make time & counter visible
    header.style.visibility = 'visible'

    getQuestion()
})

for (let btn of retryButton) {
    btn.addEventListener('click', function () {
        // reset memory
        actualAnswers = []
        userAnswers = []

        // start again
        resultsPage.style.display = 'none'
        creditPage.style.display = 'none'
        gamePage.style.display = 'flex'

        // render question
        getQuestion()
    })
}
creditButton.addEventListener('click', function () {
    resultsPage.style.display = 'none'
    creditPage.style.display = 'flex'
    header.style.visibility = 'hidden'
    showCredits()
})

const questionDOM = document.getElementById('question');
const answer = document.getElementById('answer')
const correctCounter = document.getElementById('correct-counter')
const errorCounter = document.getElementById('error-counter')
let actualAnswers = [];
let userAnswers = [];

// make sure the user makes an input before proceeding to next question
document.body.addEventListener('keydown', function (e) {
    if (e.key == 'Enter' && answer.value) {
        if (userAnswers.length < 25) {
            // store user's answers
            userAnswers.push(Number(answer.value))
            console.log(userAnswers)
            // update amount of correct answers
            correctCounter.innerHTML = compareAnswers()
            if (actualAnswers.length < 25)
                getQuestion()
        }
    }
    // end the game once user has finished
    if (actualAnswers.length == 25 && e.key == 'Enter' && actualAnswers.length == 25 && userAnswers.length == 25) {
        showResults()
    }
})

function getQuestion() {
    // clear the input field
    answer.value = ''

    let questionArray = calc();
    let questionString = questionArray[0] + ' ' + questionArray[2] + ' ' + questionArray[1];
    questionDOM.innerHTML = questionString;

    // add the real answer to the list of correct answers
    actualAnswers.push(questionArray)
    console.log(actualAnswers)
    updateQuestionNumber()
}

function compareAnswers() {
    let counter = 0;
    for (let i = 0; i < userAnswers.length; i++) {
        if (userAnswers[i] === actualAnswers[i][3])
            counter++
    }

    return counter
}

function updateQuestionNumber() {
    let number = actualAnswers.length;
    let positions = document.querySelectorAll('.question-number')
    positions.forEach(pos => {
        pos.innerHTML = number + ''
    })
}

function showResults() {
    gamePage.style.display = 'none'
    resultsPage.style.display = 'flex'

    // show user amount of errors
    errorCounter.innerHTML = userAnswers.length - compareAnswers()
}

function showCredits() {
    for (let i = 0; i < actualAnswers.length; i++) {
        if (userAnswers[i] == actualAnswers[i][3]) {
            addCredit(userAnswers[i], i, true)
        } else addCredit(userAnswers[i], i, false)
    }
}

function addCredit(arr, index, correct) {
    let reference = actualAnswers[index]
    let equalSign = correct ? ' = ' : ' &#8800; '

    // create a new div element
    const newDiv = document.createElement("div");

    const questionHeading = document.createElement('h3')
    questionHeading.innerHTML = "Question " + (index + 1)

    const equation = document.createElement('p')
    equation.innerHTML = reference[0] + ' ' + reference[2] + ' ' + reference[1] + equalSign + arr

    const correction = document.createElement('p')
    if (!correct) {
        correction.innerHTML = 'Correct Answer: ' + reference[3]
    }

    newDiv.appendChild(questionHeading)
    newDiv.appendChild(equation)

    if (!correct) {
        newDiv.appendChild(correction)
        newDiv.classList.add('correction')
    }

    creditPage.appendChild(newDiv)
}