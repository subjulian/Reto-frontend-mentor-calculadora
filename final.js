const toggle = document.getElementById("toggle");
const thumb = document.getElementById("thumb");

let theme = 1;

toggle.addEventListener("click", () => {
  theme++;
  if (theme > 3) theme = 1;

  if (theme === 1){
    thumb.style.left = "4px";
    document.documentElement.setAttribute("data-theme", 1);
  } 
  if (theme === 2){
    thumb.style.left = "22px";
    document.documentElement.setAttribute("data-theme", 2);
  }
  if (theme === 3){
    thumb.style.left = "40px";
    document.documentElement.setAttribute("data-theme", 3);
  } 

});

const screen = document.getElementById("screen");

let currentNumber = "";
let previousNumber = "";
let operator = null;

document.querySelectorAll(".btn-number").forEach(btn => {
  btn.addEventListener("click", () => {
    if (btn.dataset.number === "." && currentNumber.includes(".")) return;

    currentNumber += btn.dataset.number;
    screen.value = currentNumber;
  });
});

document.querySelectorAll(".operator").forEach(btn => {
  btn.addEventListener("click", () => {
    if (currentNumber === "") return;

    previousNumber = currentNumber;
    currentNumber = "";
    operator = btn.dataset.operator;
  });
});

document.querySelector(".equal").addEventListener("click", () => {
  if (!operator || currentNumber === "" || previousNumber === "") return;

  let result;

  const prev = parseFloat(previousNumber);
  const curr = parseFloat(currentNumber);

  switch (operator) {
    case "+":
      result = prev + curr;
      break;
    case "-":
      result = prev - curr;
      break;
    case "*":
      result = prev * curr;
      break;
    case "/":
      result = curr === 0 ? "Error" : prev / curr;
      break;
  }

  screen.value = result;
  currentNumber = result.toString();
  previousNumber = "";
  operator = null;
});

document.querySelector(".del").addEventListener("click", () => {
  currentNumber = currentNumber.slice(0, -1);
  screen.value = currentNumber || "0";
});

document.querySelector(".reset").addEventListener("click", () => {
  currentNumber = "";
  previousNumber = "";
  operator = null;
  screen.value = "0";
});



