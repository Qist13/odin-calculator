const btnZero = document.getElementById("btn-0");
const btnOne = document.getElementById("btn-1");
const btnTwo = document.getElementById("btn-2");
const btnThree = document.getElementById("btn-3");
const btnFour = document.getElementById("btn-4");
const btnFive = document.getElementById("btn-5");
const btnSix = document.getElementById("btn-6");
const btnSeven = document.getElementById("btn-7");
const btnEight = document.getElementById("btn-8");
const btnNine = document.getElementById("btn-9");
const btnAdd = document.getElementById("btn-add");
const btnSubtract = document.getElementById("btn-subtract");
const btnMultiply = document.getElementById("btn-multiply");
const btnDivide = document.getElementById("btn-divide");
const btnClear = document.getElementById("btn-clear");
const btnEquals = document.getElementById("btn-equals");
const btnDecimal = document.getElementById("btn-decimal");
const btnDel = document.getElementById("btn-del");
const btnExpo = document.getElementById("btn-expo");
const displayPanel = document.getElementsByClassName("display")[0];
const themeToggle = document.getElementById("theme-toggle");

btnZero.addEventListener("click", () => addToExpression(0));
btnOne.addEventListener("click", () => addToExpression(1));
btnTwo.addEventListener("click", () => addToExpression(2));
btnThree.addEventListener("click", () => addToExpression(3));
btnFour.addEventListener("click", () => addToExpression(4));
btnFive.addEventListener("click", () => addToExpression(5));
btnSix.addEventListener("click", () => addToExpression(6));
btnSeven.addEventListener("click", () => addToExpression(7));
btnEight.addEventListener("click", () => addToExpression(8));
btnNine.addEventListener("click", () => addToExpression(9));
btnDecimal.addEventListener("click", () => addToExpression("."));
btnAdd.addEventListener("click", () => addToExpression("+"));
btnSubtract.addEventListener("click", () => addToExpression("-"));
btnMultiply.addEventListener("click", () => addToExpression("x"));
btnDivide.addEventListener("click", () => addToExpression("/"));
btnClear.addEventListener("click", () => {
  displayPanel.textContent = "";
  expression = "";
});
btnExpo.addEventListener("click", () => addToExpression("^"));
btnDel.addEventListener("click", () => {
  if (expression.length > 0) {
    expression = expression.substring(0, expression.length - 1);
  }
  display(expression);
});
btnEquals.addEventListener("click", () => calculate(expression));
themeToggle.addEventListener("click", () => toggleTheme());

let expression = "";

function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num, denom) {
  if (denom == 0) return "CANNOT DIVIDE BY 0!";

  return num / denom;
}

function exponentiate(base, power) {
  if (power < 0) {
    display("");
    return;
  }

  return base ** power;
}

function operate(op, num1, num2) {
  let func = undefined;

  if (op == "+") {
    func = add;
  } else if (op == "-") {
    func = subtract;
  } else if (op == "x") {
    func = multiply;
  } else if (op == "/") {
    func = divide;
  } else if (op == "^") {
    func = exponentiate;
  } else {
    console.log("ERROR operater cannot be found");
  }

  display(func(num1, num2));
}

function calculate(eq) {
  let num1 = undefined;
  let num2 = undefined;
  let op = undefined;
  let index = -1;
  eq = eq.replaceAll(" ", "");

  console.log(eq);
  if (eq.slice(1).indexOf("+") != -1) {
    index = eq.slice(1).indexOf("+") + 1;
  } else if (eq.slice(1).indexOf("-") != -1) {
    index = eq.slice(1).indexOf("-") + 1;
  } else if (eq.slice(1).indexOf("x") != -1) {
    index = eq.slice(1).indexOf("x") + 1;
  } else if (eq.slice(1).indexOf("/") != -1) {
    index = eq.slice(1).indexOf("/") + 1;
  } else if (eq.slice(1).indexOf("^") != -1) {
    index = eq.slice(1).indexOf("^") + 1;
  }

  if (index != -1) {
    num1 = Number(eq.substring(0, index));
    num2 = Number(eq.substring(index + 1, eq.length));

    op = eq.charAt(index);
  } else {
    console.log("Syntax Error!");
  }

  expression = "";
  console.log(op, num1, num2);
  return operate(op, num1, num2);
}

function addToExpression(symbol) {
  console.log(expression);
  if (isExpressionExtra(symbol)) {
    calculate(expression);
  }

  if (isOperator(symbol)) {
    symbol = " " + symbol + " ";
  }

  expression += symbol;

  display(expression);
}

function display(content) {
  expression = content;
  displayPanel.textContent = content;
}

function isOperator(symbol) {
  if (
    symbol === "/" ||
    symbol === "x" ||
    symbol === "^" ||
    symbol === "-" ||
    symbol === "+"
  ) {
    return true;
  }
  return false;
}

function isExpressionExtra(symbol) {
  if (isOperator(symbol)) {
    if (
      expression.toString().indexOf("/") != -1 ||
      expression.toString().indexOf("x") != -1 ||
      expression.toString().indexOf("^") != -1 ||
      expression.toString().indexOf(" - ") != -1 ||
      expression.toString().indexOf("+") != -1
    ) {
      return true;
    }
  }
}

function toggleTheme() {
  const root = document.documentElement;
  const newTheme = root.className === "dark" ? "light" : "dark";
  root.className = newTheme;
}
