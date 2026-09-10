const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartButton = document.getElementById("restart");

let currentPlayer = "X";
let gameActive = true;

let gameState = ["", "", "", "", "", "", "", ""];

const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(event) {

    const clickedCell = event.target;
    const index = clickedCell.getAttribute("data-index");

    // Don't allow clicking an already filled cell
    if (gameState[index] !== "" || !gameActive) {
        return;
    }

    gameState[index] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    if (currentPlayer === "X") {
        clickedCell.classList.add("x");
    } else {
        clickedCell.classList.add("o");
    }

    checkWinner();
}

function checkWinner() {

    let winner = false;

    for (let pattern of winningPatterns) {

        const a = pattern[0];
        const b = pattern[1];
        const c = pattern[2];

        if (
            gameState[a] !== "" &&
            gameState[a] === gameState[b] &&
            gameState[a] === gameState[c]
        ) {
            winner = true;
            break;
        }
    }

    if (winner) {
        statusText.textContent = `🎉 Player ${currentPlayer} Wins!`;
        gameActive = false;
        return;
    }

    // Check draw
    if (!gameState.includes("")) {
        statusText.textContent = "🤝 Game Draw!";
        gameActive = false;
        return;
    }

    // Change player
    currentPlayer = currentPlayer === "X" ? "O" : "X";

    statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

function restartGame() {

    currentPlayer = "X";
    gameActive = true;
    gameState = ["", "", "", "", "", "", "", ""];

    statusText.textContent = "Player X's Turn";

    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("x", "o");
    });
}

cells.forEach(cell => {
    cell.addEventListener("click", handleCellClick);
});

restartButton.addEventListener("click", restartGame);