let board = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
];

const cell = document.querySelectorAll(".cell");
const container = document.querySelector(".container");
const gameBoard = document.querySelector(".game-board");
const indicator = document.querySelector(".indicator");
const home = document.querySelector(".home");
const start = document.querySelector(".start-button");
const player1 = document.querySelector("#player1");
const player2 = document.querySelector("#player2");
const player1Name = document.querySelector(".player1-name");
const player2Name = document.querySelector(".player2-name");
const player1Turn = document.querySelector(".player1-turn");
const player2Turn = document.querySelector(".player2-turn");
const winScreen = document.querySelector(".win-screen");
const winMessage = document.querySelector(".win-message");
const homeButton = document.querySelector(".home-button");
const restartButton = document.querySelector(".restart-button");
const player1TimerElement = document.querySelector(".player1-timer");
const player2TimerElement = document.querySelector(".player2-timer");
const setTimer = document.querySelector(".set-timer");
const setTime = document.querySelector("#set-time");
const timerCheckbox = document.querySelector("#timer-checkbox");

let activePlayer = 1;
let lastPos = [];
let activeColor = () => {
  if (activePlayer == 1) {
    return "red";
  } else {
    return "yellow";
  }
};

const stacker = function (e, id) {
  let column = e.target.id % 7;
  if (board[0][column] != 0) {
    return;
  }

  for (let i = 0; i < 6; i++) {
    if (board[i][column] != 0) {
      board[i - 1][column] = id;
      lastPos = [i - 1, column];
      break;
    }
    if (i == 5 && board[i][column] == 0) {
      board[i][column] = id;
      lastPos = [i, column];
    }
  }

  let counter = 0;
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 7; j++) {
      if (board[i][j] == id) {
        cell[counter].style.background = activeColor();
      }
      counter++;
    }
  }
};

const arrayEqual = function (a, b) {
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
};

const checkWin = function (pos) {
  //check column
  let currentColumn = [];
  let toBeChecked = [0, 0, 0, 0];
  let win = [activePlayer, activePlayer, activePlayer, activePlayer];
  for (let i = 0; i < 6; i++) {
    currentColumn.push(board[0 + i][pos[1]]);
  }
  for (let i = 5; i >= 0; i--) {
    toBeChecked.unshift(currentColumn[i]);
    toBeChecked.pop();
    if (arrayEqual(toBeChecked, win)) {
      return activePlayer;
    }
  }
  //check row
  let currentRow = board[pos[0]];
  toBeChecked = [0, 0, 0, 0];
  for (let i = 6; i >= 0; i--) {
    toBeChecked.unshift(currentRow[i]);
    toBeChecked.pop();
    if (arrayEqual(toBeChecked, win)) {
      return activePlayer;
    }
  }
  //check diagonal left to right
  let diagonalStartL = [];
  let currentDiagonalLF = [];
  toBeChecked = [0, 0, 0, 0];
  for (let i = 0; i < 6; i++) {
    if (
      board[pos[0] - i] == undefined ||
      board[pos[0]][pos[1] - i] == undefined
    ) {
      null;
    } else {
      diagonalStartL = [pos[0] - i, pos[1] - i];
    }
  }
  let i = 0;
  while (diagonalStartL[0] + i <= 5 && diagonalStartL[1] + i <= 7) {
    currentDiagonalLF.push(board[diagonalStartL[0] + i][diagonalStartL[1] + i]);
    i++;
  }
  for (let i = 5; i >= 0; i--) {
    toBeChecked.unshift(currentDiagonalLF[i]);
    toBeChecked.pop();
    if (arrayEqual(toBeChecked, win)) {
      return activePlayer;
    }
  }
  //check diagonal right to left
  let diagonalStartR = [];
  let currentDiagonalRL = [];
  toBeChecked = [0, 0, 0, 0];
  for (let i = 0; i < 6; i++) {
    if (
      board[pos[0] - i] == undefined ||
      board[pos[0]][pos[1] + i] == undefined
    ) {
      null;
    } else {
      diagonalStartR = [pos[0] - i, pos[1] + i];
    }
  }
  let j = 0;
  while (diagonalStartR[0] + j <= 5 && diagonalStartR[1] - j >= 0) {
    currentDiagonalRL.push(board[diagonalStartR[0] + j][diagonalStartR[1] - j]);
    j++;
  }
  for (let i = 5; i >= 0; i--) {
    toBeChecked.unshift(currentDiagonalRL[i]);
    toBeChecked.pop();
    if (arrayEqual(toBeChecked, win)) {
      return activePlayer;
    }
  }
  //check draw
  if (board[0].includes(0)) {
    null;
  } else {
    return "draw";
  }
};

const switchScreen = function () {
  container.style.display = "none";
  home.style.display = "grid";
};
const gameStart = function () {
  board = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ];
  enableNewMove();
  player1.value === "" ? (player1.value = "1. játékos") : null;
  player2.value === "" ? (player2.value = "2. játékos") : null;
  activePlayer = 1;
  cell.forEach((element) => {
    element.style.background = "white";
  });
  home.style.display = "none";
  container.style.display = "flex";
  player1Name.textContent = player1.value;
  player2Name.textContent = player2.value;
  player2Turn.style.opacity = ".4";
  player1Turn.style.opacity = "1";
  winScreen.style.display = "none";
  clearInterval(timer1);
  clearInterval(timer2);
  player1Timer = setTime.value;
  player2Timer = setTime.value;
  player1TimerElement.textContent = player1Timer;
  player2TimerElement.textContent = player2Timer;
  timer();
};

const switchPlayer = () => {
  const indicator = document.querySelector(".indicator");
  if (activePlayer == 1) {
    indicator.style.background = "yellow";
    player1Turn.style.opacity = ".4";
    player2Turn.style.opacity = "1";
    activePlayer = 2;
  } else {
    indicator.style.background = "red";
    player2Turn.style.opacity = ".4";
    player1Turn.style.opacity = "1";
    activePlayer = 1;
  }
};

const onMouseOver = function (e) {
  const indicatorDel = document.querySelector(".indicator");
  if (indicatorDel) {
    indicatorDel.parentNode.removeChild(indicatorDel);
  }
  const indicator = document.createElement("div");
  indicator.classList.add("indicator");
  e.target.appendChild(indicator);
  indicator.style.width = cell[0].offsetWidth + "px";
  indicator.style.height = cell[0].offsetHeight + "px";
  activePlayer == 1
    ? (indicator.style.background = "red")
    : (indicator.style.background = "yellow");
};

const onMouseOut = function (e) {
  const indicator = document.querySelector(".indicator");
  e.target.removeChild(indicator);
};

const selectWithKey = function (e) {
  let currentPos;
  const indicatorDel = document.querySelector(".indicator");
  switch (e.which) {
    case 37:
      if (indicatorDel) {
        let id = parseInt(indicatorDel.parentNode.id);
        while (id < 35) {
          id = id + 7;
        }
        currentPos = id;
        if (currentPos > 35) {
          indicatorDel.parentNode.removeChild(indicatorDel);
          cell[currentPos - 1].appendChild(indicatorDel);
        }
      } else {
        currentPos = 38;
        const indicator = document.createElement("div");
        indicator.classList.add("indicator");
        cell[currentPos].appendChild(indicator);
        indicator.style.width = cell[0].offsetWidth + "px";
        indicator.style.height = cell[0].offsetHeight + "px";
        activePlayer == 1
          ? (indicator.style.background = "red")
          : (indicator.style.background = "yellow");
      }
      break;
    case 39:
      if (indicatorDel) {
        let id = parseInt(indicatorDel.parentNode.id);
        while (id < 35) {
          id = id + 7;
        }
        currentPos = id;
        if (currentPos < 41) {
          indicatorDel.parentNode.removeChild(indicatorDel);
          cell[currentPos + 1].appendChild(indicatorDel);
        }
      } else {
        currentPos = 38;
        const indicator = document.createElement("div");
        indicator.classList.add("indicator");
        cell[currentPos].appendChild(indicator);
        indicator.style.width = cell[0].offsetWidth + "px";
        indicator.style.height = cell[0].offsetHeight + "px";
        activePlayer == 1
          ? (indicator.style.background = "red")
          : (indicator.style.background = "yellow");
      }
      break;
    case 13:
    case 32:
      if (indicatorDel) {
        let id = parseInt(indicatorDel.parentNode.id);
        while (id < 35) {
          id = id + 7;
        }
        currentPos = id;
      }
      cell[currentPos].click();
      break;
  }
};

let enabled = true;
const disableNewMove = function () {
  enabled = false;
};

const enableNewMove = function () {
  enabled = true;
};

let timerEnabled = false;
const enableTimer = function () {
  timerEnabled = true;
};
const disableTimer = function () {
  timerEnabled = false;
};

const isTimer = function () {
  if (timerCheckbox.checked) {
    setTime.disabled = false;
    setTime.value = "120";
    setTimer.style.opacity = "1";
    enableTimer();
  }
  if (!timerCheckbox.checked) {
    setTime.disabled = true;
    setTime.value = "";
    setTimer.style.opacity = ".5";
    disableTimer();
  }
};

let player1Timer = setTime.value;
let player2Timer = setTime.value;

let timer1;
let timer2;

const timer = function () {
  if (timerEnabled) {
    if (activePlayer === 1) {
      clearInterval(timer2);
      timer1 = setInterval(() => {
        player1Timer > 0 ? player1Timer-- : null;
        player1TimerElement.textContent = player1Timer;
        if (player1Timer === 0) {
          disableNewMove();
          winMessage.textContent = `${player2.value} nyert, lejárt az idő!`;
          winScreen.style.display = "flex";
        }
      }, 1000);
    }
    if (activePlayer === 2) {
      clearInterval(timer1);
      timer2 = setInterval(() => {
        player2Timer > 0 ? player2Timer-- : null;
        player2TimerElement.textContent = player2Timer;
        if (player2Timer === 0) {
          disableNewMove();
          winMessage.textContent = `${player1.value} nyert, lejárt az idő!`;
          winScreen.style.display = "flex";
        }
      }, 1000);
    }
  }
};

const newMove = function (e) {
  if (enabled) {
    stacker(e, activePlayer);
    if (checkWin(lastPos) === 1) {
      setTimeout(() => {
        disableNewMove();
        winMessage.textContent = `${player1.value} nyert!`;
        winScreen.style.display = "flex";
        clearInterval(timer1);
        clearInterval(timer2);
      }, 1);
      return;
    }
    if (checkWin(lastPos) === 2) {
      setTimeout(() => {
        disableNewMove();
        winMessage.textContent = `${player2.value} nyert!`;
        winScreen.style.display = "flex";
        clearInterval(timer1);
        clearInterval(timer2);
      }, 1);
      return;
    }
    if (checkWin(lastPos) === "draw") {
      setTimeout(() => {
        disableNewMove();
        winMessage.textContent = "Döntetlen!";
        winScreen.style.display = "flex";
        clearInterval(timer1);
        clearInterval(timer2);
      }, 1);
      return;
    }
    switchPlayer();
    timer();
  }
};

for (let i = 0; i < cell.length; i++) {
  cell[i].addEventListener("click", newMove);
  cell[i].addEventListener("mouseover", onMouseOver);
  cell[i].addEventListener("mouseout", onMouseOut);
  cell[i].setAttribute("id", i);
}

start.addEventListener("click", gameStart);
restartButton.addEventListener("click", gameStart);
homeButton.addEventListener("click", switchScreen);
document.addEventListener("keydown", selectWithKey);
timerCheckbox.addEventListener("click", isTimer);
