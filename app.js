let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGamebtn = document.querySelector("#new-game-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;
let xScore = 0;
let oScore = 0;
let drawScore = 0;

let xScoreEl = document.querySelector("#x-score");
let oScoreEl = document.querySelector("#o-score");
let drawScoreEl = document.querySelector("#draw-score");
let turnIndicator = document.querySelector("#turn-indicator");

const WinPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const updateTurnMessage = () => {
  turnIndicator.innerText = turnO ? "O's Turn" : "X's Turn";
};

const updateScore = (winner) => {
  if (winner === "X") {
    xScore++;
    xScoreEl.innerText = xScore;
  } else if (winner === "O") {
    oScore++;
    oScoreEl.innerText = oScore;
  } else if (winner === "Draw") {
    drawScore++;
    drawScoreEl.innerText = drawScore;
  }
};

const disableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = true;
  });
};

const EnableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerText = "";
  });
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations !!
  Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
  updateScore(winner);
};

const showDraw = () => {
  msg.innerText = "It's a Draw!";
  msgContainer.classList.remove("hide");
  disableBoxes();
  updateScore("Draw");
};

const checkWinner = () => {
  let winnerFound = false;

  for (let pattern of WinPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        winnerFound = true;
        return;
      }
    }
  }

  if (!winnerFound) {
    let isDraw = true;
    boxes.forEach((box) => {
      if (box.innerText === "") {
        isDraw = false;
      }
    });
    if (isDraw) {
      showDraw();
    }
  }
};

const resetGame = () => {
  turnO = true;
  EnableBoxes();
  msgContainer.classList.add("hide");
  updateTurnMessage();
};
updateTurnMessage();

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.innerText !== "") return;

    box.innerText = turnO ? "O" : "X";
    box.disabled = true;
    checkWinner();
    turnO = !turnO;
    updateTurnMessage();
  });
  box.addEventListener("mouseenter", () => {
    if (box.innerText === "") {
      box.classList.add(turnO ? "preview-o" : "preview-x");
      box.setAttribute("data-preview", turnO ? "O" : "X");
    }
  });

  box.addEventListener("mouseleave", () => {
    box.classList.remove("preview-o", "preview-x");
    box.removeAttribute("data-preview");
  });
});

newGamebtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
const themeToggleBtn = document.querySelector("#theme-toggle");
const themeIcon = themeToggleBtn.querySelector("i");

themeToggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
  if (document.body.classList.contains("dark-theme")) {
    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");
  } else {
    themeIcon.classList.remove("fa-sun");
    themeIcon.classList.add("fa-moon");
  }
});
