// create a random number between 0 & 20 including 20
function createRandomNumber() {
	return Math.floor(Math.random() * 21);
}

// return random mathematical symbol
function createRandomSymbol() {
	const symbols = ["-", "+", "/", "x"];
	let randomIndex = Math.floor(Math.random() * 4);
	let chosenSymbol = symbols[randomIndex];
	return chosenSymbol;
}

function getAnswer(...symbols) {
	let firstNumber = symbols[0];
	let secondNumber = symbols[1];
	let sign = symbols[2];

	let result;
	switch (sign) {
		case "+":
			result = firstNumber + secondNumber;
			break;
		case "-":
			result = firstNumber - secondNumber;
			break;
		case "x":
			result = firstNumber * secondNumber;
			break;
		case "/":
			result = firstNumber / secondNumber;
			break;
	}
	return result;
}

export default function printEquation() {
	let firstNumber = createRandomNumber();
	let secondNumber = createRandomNumber();
	let sign = createRandomSymbol();
	let answer;

	// make sure no answer contains a decimal / fraction
	if (sign === "/" && firstNumber % secondNumber !== 0) {
		return printEquation();
	} else {
		answer = getAnswer(firstNumber, secondNumber, sign);
		return { firstNumber, secondNumber, sign, answer };
	}
}
