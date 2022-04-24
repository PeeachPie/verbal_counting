const settings = JSON.parse(localStorage.settings);
let $task = document.querySelector(".task");
let $equation = document.querySelector(".equation");
let $problem = document.querySelector(".problem");
let $answer = document.querySelector("#answer");
let $new = document.querySelector(".new");
let $check = document.querySelector(".check");
let $result = document.querySelector(".result");
let $counter = document.querySelector(".counter");

let counter = 0;
let tasks = JSON.parse(localStorage.tasks);

function getRandom(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}
function randomChoice(choice) {
  return choice[getRandom(0, choice.length - 1)];
}

// создает новое задание
function createNewTask(tasks) {
  counter += 1;
  if (counter > settings.questions) {
    localStorage.tasks = JSON.stringify(tasks);
    window.location.href = "result.html";
  }
  $counter.style.color = 'rgba(90, 90, 90, 0.8)';
  $counter.textContent = `${counter} задание из ${settings.questions}`;
  $result.style.display = "none";
  $new.style.display = "none";
  $equation.style.display = "block";
  $check.style.display = "block";
  $answer.value = "";
  $task.style.background = "rgba(255, 255, 255,0.3)";
  $problem.textContent = tasks[`task${counter}`].eq;
}

// проверяет является ли данный пользователем ответ правильным
function checkAns() {
  let task = `task${counter}`;
  tasks[task].given = Number.parseInt($answer.value);
  tasks[task].right = tasks[task].ans === tasks[task].given ? true : false;
  return tasks[task].right;
}

// показывает результат ответа
function showAns() {
  $result.style.display = "block";
  $new.style.display = "block";
  $check.style.display = "none";
  $equation.style.display = "none";
  $counter.style.color = "rgba(255, 255, 255, 0.7)";
  if (checkAns()) {
    rightAns();
  } else {
    wrongAns();
  }
}

// отображается в случае правильного ответа
function rightAns() {
  $task.style.background = "rgba(80, 255, 80,0.5)";
  $result.textContent = randomChoice([
    "Ты молодец!!!",
    "Так держать!",
    "Отлично!",
    "Правильно!",
  ]);
}

// отображается в случае неправильного ответа
function wrongAns() {
  $task.style.background = "rgba(255, 55, 55,0.5)";
  $result.textContent = randomChoice([
    "Ой...",
    "Ошибка!",
    "Внимательнее!",
    "Неправильно!",
  ]);
}

$check.addEventListener("click", showAns);
$new.addEventListener("click", createNewTask.bind(null, tasks));
createNewTask(tasks);
