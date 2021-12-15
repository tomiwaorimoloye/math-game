import calc from "./calculation.js";
import { startTimer, endTimer } from "./timer.js";

const header = document.querySelector("header");
const introPage = document.getElementById("intro");
const gamePage = document.getElementById("game");
const resultsPage = document.getElementById("results");
const creditPage = document.getElementById("credits");

const startButton = document.getElementById("start");
const retryButton = document.getElementsByClassName("redo");
const creditButton = document.getElementById("view-results");

startButton.addEventListener("click", function () {
	introPage.style.display = "none";
	gamePage.style.display = "flex";
	// make time & counter visible
	header.style.visibility = "visible";
	startTimer();

	getQuestion();
});

for (let btn of retryButton) {
	btn.addEventListener("click", function () {
		reset();

		// render question
		getQuestion();
	});
}

creditButton.addEventListener("click", function () {
	resultsPage.style.display = "none";
	creditPage.style.display = "flex";
	header.style.visibility = "hidden";
	showCredits();
});

const questionDOM = document.getElementById("question");
const answer = document.getElementById("answer");
const correctCounter = document.getElementById("correct-counter");
const errorCounter = document.getElementById("error-counter");
let actualAnswers = [];
let userAnswers = [];

// make sure the user makes an input before proceeding to next question
document.body.addEventListener("keydown", function (e) {
	if (e.key == "Enter" && checkAnswer()) {
		if (compareAnswers() < 20) {
			// store user's answers
			userAnswers.push(Number(answer.value));
			console.log(userAnswers);
			// update amount of correct answers
			correctCounter.innerHTML = compareAnswers();

			// check again since you just added another value above
			if (compareAnswers() < 20) getQuestion();
		}
	}
	// end the game once user has finished
	if (e.key == "Enter" && compareAnswers() == 20) {
		endTimer();
		showResults();
	}
});

function getQuestion() {
	// clear the input field
	answer.value = "";

	// autofocus on the input field
	answer.focus();

	let questionArray = calc();
	let questionString =
		questionArray[0] + " " + questionArray[2] + " " + questionArray[1];
	questionDOM.innerHTML = questionString;

	// add the real answer to the list of correct answers
	actualAnswers.push(questionArray);
	console.log(actualAnswers);
	updateQuestionNumber();
}

function compareAnswers() {
	let counter = 0;
	for (let i = 0; i < userAnswers.length; i++) {
		if (userAnswers[i] === actualAnswers[i][3]) counter++;
	}

	return counter;
}

function updateQuestionNumber() {
	let number = actualAnswers.length;
	let positions = document.querySelectorAll(".question-number");
	positions.forEach((pos) => {
		pos.innerHTML = number + "";
	});
}

function showResults() {
	gamePage.style.display = "none";
	resultsPage.style.display = "flex";
	header.style.visibility = "hidden";

	// show user amount of errors
	errorCounter.innerHTML = userAnswers.length - compareAnswers();
}

function showCredits() {
	// create all credits for each question
	for (let i = 0; i < actualAnswers.length; i++) {
		if (userAnswers[i] == actualAnswers[i][3]) {
			addCredit(userAnswers[i], i, true);
		} else addCredit(userAnswers[i], i, false);
	}
}

function reset() {
	// reset memory
	actualAnswers = [];
	userAnswers = [];
	correctCounter.innerHTML = compareAnswers();
	header.style.visibility = "visible";

	// delete artificially-added elements
	removeCredits();

	// go back to game page
	introPage.style.display = "none";
	resultsPage.style.display = "none";
	creditPage.style.display = "none";
	gamePage.style.display = "flex";

	// start timer
	startTimer();
}

function addCredit(arr, index, correct) {
	let reference = actualAnswers[index];
	let equalSign = correct ? " = " : " &#8800; ";

	// create a new div element
	const newDiv = document.createElement("div");

	const questionHeading = document.createElement("h3");
	questionHeading.innerHTML = "Question " + (index + 1);

	const equation = document.createElement("p");
	equation.innerHTML =
		reference[0] +
		" " +
		reference[2] +
		" " +
		reference[1] +
		equalSign +
		arr;

	const correction = document.createElement("p");
	if (!correct) {
		correction.innerHTML = "Correct Answer: " + reference[3];
	}

	newDiv.appendChild(questionHeading);
	newDiv.appendChild(equation);

	if (!correct) {
		newDiv.appendChild(correction);
		newDiv.classList.add("correction");
	}

	creditPage.appendChild(newDiv);
}

function removeCredits() {
	let divs = document.querySelectorAll("#credits > div");
	for (let i = 0; i < divs.length; i++) {
		// make sure you don't delete the retry button UI
		if (divs[i].nodeName.toLowerCase() === "div")
			// delete the div
			divs[i].remove();
	}
}

function checkAnswer() {
	if (answer.value) {
		for (let char of answer.value) {
			if (
				char
					.toLowerCase()
					.includes(
						"abcdefghijklmnopqrstuvwxyz!@#$%^&*()_=~`{}[]\"';:><,"
					)
			) {
				return false;
			}
		}
		return true;
	}
	return false;
}
