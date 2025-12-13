
const num1El = document.getElementById("num1");
const num2El = document.getElementById("num2");
const opEl = document.getElementById("op");
const calcBtn = document.getElementById("calcBtn");
const errorEl = document.getElementById("error");
const resultTextEl = document.getElementById("resultText");

calcBtn.addEventListener("click", calculate);

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  // Check the divisor
  if (b === 0) {
    return null;
  }
  return a / b;
}

function calculate() {
  errorEl.textContent = "";
  resultTextEl.textContent = "-";

  const aStr = num1El.value.trim();
  const bStr = num2El.value.trim();

  // Validate inputs
  if (aStr === "" || bStr === "") {
    errorEl.textContent = "Please enter both numbers.";
    return;
  }

  const a = Number(aStr);
  const b = Number(bStr);

  if (!Number.isFinite(a) || !Number.isFinite(b)) {
    errorEl.textContent = "Invalid input. Please enter numbers only.";
    return;
  }

  const op = opEl.value;

  let result;

  if (op === "+") result = add(a, b);
  else if (op === "-") result = subtract(a, b);
  else if (op === "*") result = multiply(a, b);
  else if (op === "/") result = divide(a, b);
  else {
    errorEl.textContent = "Unknown operator.";
    return;
  }

  if (result === null) {
    errorEl.textContent = "Error: Division by zero is not allowed.";
    return;
  }

  // Rounded to 2 decimal places
  resultTextEl.textContent = result.toFixed(2);
}