const tasks = JSON.parse(localStorage.tasks);
const settings = JSON.parse(localStorage.settings);
let $answers = document.querySelector(".answers");
let $right = document.querySelector(".right");
let $correct = document.querySelector(".correct");
let $home = document.querySelector(".home");

// подсчитывает поличество правильных ответов 
function countRight(tasks, number) {
  let counter = 0;
  for (let i = 1; i <= number; i++) {
    if (tasks[`task${i}`].right === true) {
      counter += 1;
    }
  }
  return counter;
}

// показывает результаты ответов
function showAnswers(tasks, number) {
  for (let i = 1; i <= number; i++) {
    let task = `task${i}`;
    let el = document.createElement("div");
    el.className = `el${i}`;
    el.textContent = `${tasks[task].eq}${tasks[task].given == null ? "" : tasks[task].given}`;
    el.style.color = "rgba(255, 255, 255, 0.7)";
    el.style.background = tasks[task].right
      ? "rgba(80, 255, 80,0.5)"
      : "rgba(255, 55, 55,0.5)";
    $answers.append(el);
  }
}

// выбирает и устанавливает неправильно решенные примеры
function correctionOfMistakes(tasks, number){
  let uncorrect = {}
  counter = 0;
  for (let i = 1; i <= number; i++) {
    let task = `task${i}`;
    if (!tasks[task].right) {
      counter += 1;
      uncorrect[`task${counter}`] = tasks[task]
    }
  }
  localStorage.tasks = JSON.stringify(uncorrect);
  settings.questions = counter;
  localStorage.settings = JSON.stringify(settings);
}

// демонстрирует результат тестирования
function showResult(tasks, number){
  $right.textContent = `Результат: ${countRight(tasks, number)} из ${number}`
  showAnswers(tasks, number)
}

showResult(tasks, settings.questions)

if (settings.questions == countRight(tasks, settings.questions)) {
  $correct.style.display = 'none';
}

$correct.addEventListener('click', () => {
  correctionOfMistakes(tasks, settings.questions)
  window.location.href = "test.html";
})

$home.addEventListener('click', () => {
  window.location.href = "index.html";
})
