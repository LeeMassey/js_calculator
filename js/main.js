const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const equalsButton = document.querySelector(".equals");
const deleteButton = document.querySelector(".backspace");
const clearButton = document.querySelector(".clear");
const previousResultDisplay = document.querySelector("#previous-result");
const currentOperationDisplay = document.querySelector("#current-operation");

let previousResult = "";
let currentOperation = "";
let a;
let b;
let operator;
let result;

for (let i=0; i<numberButtons.length; i++) {
	numberButtons[i].addEventListener("click", () => {
	//	if (currentOperation.length < 17) {
		append(numberButtons[i].textContent);
	//		updateDisplay();
	//	}
	});
}

for (let i=0; i<operatorButtons.length; i++) {
	operatorButtons[i].addEventListener("click", () => {
		selectOperator(operatorButtons[i].textContent);
	})
}

equalsButton.addEventListener("click", operate);

deleteButton.addEventListener("click", backspace);

clearButton.addEventListener("click", clear);



document.addEventListener("keydown", (e) => {
	if (e.key == "." || e.key >=0 && e.key <=9) {
		append(e.key);
	}
	else if (e.key == "+" || e.key == "-" || e.key == "*" || e.key == "/") {
		selectOperator(e.key);
	}
	else if (e.key == "Enter") {
		operate();
	}
	else if (e.key == "Backspace") {
		backspace();
	}
	else if (e.key == "Delete" || e.key == "Escape") {
		clear();
	}
})

function append(number) {
	if (previousResult.includes("=")) {
		currentOperation = ""
		previousResult = "";
	}
	if (currentOperation.length < 17) {
		if (number != "." || !currentOperation.includes(".")) {
			currentOperation += number;
		}
		updateDisplay();
	}
}

function selectOperator(op) {
	if (operator != undefined) {
		operate();
	}
	if (currentOperation != "") {
		a = Number(currentOperation);
		operator = op;
		previousResult = currentOperation + " " + operator + " ";
		currentOperation = "";
	}
	updateDisplay();
}

function backspace() {
	currentOperation = currentOperation.slice(0, currentOperation.length-1);
	updateDisplay();
}

function clear() {
	previousResult = "";
	currentOperation = "";
	a = undefined;
	b = undefined;
	operator = undefined;
	updateDisplay();
}

function updateDisplay() {
	currentOperationDisplay.textContent = currentOperation;
	previousResultDisplay.textContent = previousResult;
}

function operate() {
	if (!previousResult.includes("=") && a != undefined && currentOperation != "") {
		previousResult += currentOperation + " = ";
		b = Number(currentOperation);
		
		switch (operator) {
			case "+":
				result = add(a, b);
				break;
			case "-":
				result = subtract(a, b);
				break;
			case "*":
				result = multiply(a, b);
				break;
			case "/":
				if (b == 0) {
					alert("NOPE! No dividing by 0 !!!");
					clear();
					return;
				}
				result = divide(a, b);
		}

		currentOperation = result.toString();
		updateDisplay();
		a = undefined;
		b = undefined;
		operator = undefined;
		result = undefined;
	}
}

function add(x, y) {
	return x + y;
}

function subtract(x, y) {
	return x - y;
}

function multiply(x, y) {
	return x * y;
}

function divide(x, y) {
	return x / y;
}

//******DEBUG******//

/*

const buttons = document.querySelectorAll("button");

for (let i=0; i<buttons.length; i++) {
	buttons[i].addEventListener("click", () => {
		console.log("previousRes: " + previousResult + " | currentOp: " + currentOperation +
					" | a: " + a + " | b: " + b + " | operator: " + operator + " | result: " + result);
	})
}

*/

//******END DEBUG*****//