const [$plus, $minus, $multiply, $division] = document.querySelectorAll(".operators .choose > *");
const [$m10, $m20, $m50, $m100] = document.querySelectorAll(".max .choose > *");
const [$q5, $q10, $q15, $q20] = document.querySelectorAll(".questions .choose > *");

const $start = document.querySelector(".start");
const q = [$q5, $q10, $q15, $q20];
const max = [$m10, $m20, $m50, $m100];

let settings = {
  operators: [],
  max: 10,
  questions: 5,
};

// устанавливает оператор 
function setOperator(operator, button) {
  index = settings.operators.indexOf(operator);
  if (index !== -1) {
    settings.operators.splice(index, 1);
    button.style.background = "rgba(255, 255, 255, 0.5)";
  } else {
    settings.operators.push(operator);
    button.style.background = "rgba(255, 255, 255, 0.2)";
  }
}

// устанавливает значение в настройки 
function setValue(value, selector, button) {
  for (let i of selector === "questions" ? q : max) {
    i.style.background = "rgba(255, 255, 255, 0.5)";
  }
  button.style.background = "rgba(255, 255, 255, 0.2)";
  settings[selector] = value;
}

function getRandom(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}
function randomChoice(choice) {
  return choice[getRandom(0, choice.length - 1)];
}

// создает пример
function createEquation(operator, max) {
  switch (operator) {
    case "+":
      a = getRandom(0, max / 2);
      b = getRandom(0, max / 2);
      return [`${a} + ${b} = `, a + b];
    case "-":
      a = getRandom(0, max);
      b = getRandom(0, a);
      return [`${a} - ${b} = `, a - b];
    case "/":
      a = getRandom(1, 10);
      b = getRandom(0, 10);
      return [`${a * b} ÷ ${a} = `, b];
    case "*":
      a = getRandom(0, 10);
      b = getRandom(0, 10);
      return [`${a} × ${b} = `, a * b];
  }
}

// создает примеры
function createEquations(number) {
  let tasks = {};
  for (let i = 1; i <= number; i++) {
    equation = createEquation(randomChoice(settings.operators), settings.max);
    tasks[`task${i}`] = {
      eq: equation[0],
      ans: equation[1],
      given: null,
      right: false,
    };
  }
  return tasks;
}

$plus.addEventListener("click", setOperator.bind(null, "+", $plus));
$minus.addEventListener("click", setOperator.bind(null, "-", $minus));
$multiply.addEventListener("click", setOperator.bind(null, "*", $multiply));
$division.addEventListener("click", setOperator.bind(null, "/", $division));

$q5.addEventListener("click", setValue.bind(null, 5, "questions", $q5));
$q10.addEventListener("click", setValue.bind(null, 10, "questions", $q10));
$q15.addEventListener("click", setValue.bind(null, 15, "questions", $q15));
$q20.addEventListener("click", setValue.bind(null, 20, "questions", $q20));

$m10.addEventListener("click", setValue.bind(null, 10, "max", $m10));
$m20.addEventListener("click", setValue.bind(null, 20, "max", $m20));
$m50.addEventListener("click", setValue.bind(null, 50, "max", $m50));
$m100.addEventListener("click", setValue.bind(null, 100, "max", $m100));

$start.addEventListener("click", () => {
  if (settings.operators.length == 0) {
    settings.operators.push("+", "-", "/", "*");
  }
  localStorage.tasks = JSON.stringify(createEquations(settings.questions));
  localStorage.settings = JSON.stringify(settings);
});
