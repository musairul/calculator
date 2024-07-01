let currentInput = ""; // Holds the current input
let previousInput = ""; // Holds the previous input
let operator = ""; // Holds the current operator

const screenBorder = document.querySelector(".screen-border");
const buttons = document.querySelectorAll("button");

buttons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const buttonText = event.target.textContent;

    if (event.target.classList.contains("number")) {
      handleNumber(buttonText);
    } else if (event.target.classList.contains("operation")) {
      handleOperation(buttonText);
    } else if (event.target.classList.contains("control")) {
      handleControl(buttonText);
    }

    updateDisplay();
  });
});

function handleNumber(number) {
  if (currentInput.length < 10) {
    // Limit input length
    if (number === "." && currentInput.includes(".")) return; // Prevent multiple decimals
    currentInput += number;
  }
}

function handleOperation(op) {
  if (previousInput !== "" && currentInput !== "") {
    currentInput = evaluateExpression(previousInput, operator, currentInput);
    previousInput = "";
  }

  if (op === "=") {
    operator = "";
  } else {
    operator = op.replace("X", "*"); // Convert display operator to actual operator
    previousInput = currentInput;
    currentInput = "";
  }
}

function handleControl(control) {
  if (control === "C") {
    currentInput = "";
    previousInput = "";
    operator = "";
  } else if (control === "+/-") {
    if (currentInput.startsWith("-")) {
      currentInput = currentInput.substring(1);
    } else if (currentInput !== "") {
      currentInput = "-" + currentInput;
    }
  } else if (control === "%") {
    if (currentInput !== "") {
      currentInput = (parseFloat(currentInput) / 100).toString();
    }
  }
}

function updateDisplay() {
  screenBorder.textContent = currentInput || previousInput || "0";
}

function evaluateExpression(num1, operator, num2) {
  const number1 = parseFloat(num1);
  const number2 = parseFloat(num2);

  if (isNaN(number1) || isNaN(number2)) return "Error";

  let result = 0;
  switch (operator) {
    case "+":
      result = number1 + number2;
      break;
    case "-":
      result = number1 - number2;
      break;
    case "*":
      result = number1 * number2;
      break;
    case "/":
      result = number1 / number2;
      break;
    default:
      return "Error";
  }

  return result.toString();
}
