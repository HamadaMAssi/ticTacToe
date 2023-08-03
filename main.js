const CLASS_X = "x";
const CLASS_CIRCLE = "circle";

const cells = document.querySelectorAll(".cell");
const board = document.getElementById("board");
const winningMessage = document.getElementById("winningMessage");
const restart = document.getElementById("restart");
const winningText = document.getElementById("winningText");

const oddsOfWinning = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let circleTurn;

startGame();
restart.addEventListener("click", startGame);

function startGame() {
  circleTurn = false;
  cells.forEach((cell) => {
    cell.classList.remove(CLASS_X);
    cell.classList.remove(CLASS_CIRCLE);
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
  //   for hover
  setBoardClass();
  winningMessage.classList.remove("show");
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = circleTurn ? CLASS_CIRCLE : CLASS_X;
  writeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (checkDraw()) {
    endGame(true);
  } else {
    swapTurns();
    setBoardClass();
  }
}

function writeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function checkWin(currentClass) {
  return oddsOfWinning.some((c) => {
    return c.every((i) => {
      return cells[i].classList.contains(currentClass);
    });
  });
}

function endGame(draw) {
  if (draw) {
    winningText.innerText = "Draw!";
  } else {
    winningText.innerText = `${circleTurn ? "O's" : "X's"} Wins!`;
  }
  winningMessage.classList.add("show");
}

function checkDraw() {
  return [...cells].every((c) => {
    return c.classList.contains(CLASS_CIRCLE) || c.classList.contains(CLASS_X);
  });
}

function swapTurns() {
  circleTurn = !circleTurn;
}

function setBoardClass() {
  board.classList.remove(CLASS_CIRCLE);
  board.classList.remove(CLASS_X);
  if (circleTurn) {
    board.classList.add(CLASS_CIRCLE);
  } else {
    board.classList.add(CLASS_X);
  }
}
