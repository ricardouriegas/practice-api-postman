// audio tag
const audio = document.getElementById("audio");

// Definir la función para reproducir el audio
function playAudio() {
    audio.play().then(() => {
        console.log("Audio is playing");
    }).catch(error => {
        console.error("Error playing audio:", error);
    });

    // Eliminar el event listener después del primer clic
    document.removeEventListener("click", playAudio);
}

// Añadir el event listener para hacer clic en cualquier parte de la página
document.addEventListener("click", playAudio);

// Reproducción en cadena de las siguientes pistas
audio.addEventListener("ended", playNext);

window.onload = function() {
    displayBestTimes();
};

function playNext() {
    if (audio.src.includes("bb-lean-interlude.mp3")) {
        audio.src = "audios/drake.mp3";
        audio.play();
    } else if (audio.src.includes("drake.mp3")) {
        audio.src = "audios/trabis.mp3";
        audio.play();
        audio.removeEventListener("ended", playNext); // Opcional si no hay más audios
    }
}

// vairables
let board = ["", "", "", "", "", "", "", "", ""];
let playerTurn = "X"; // X goes first
let isGameActive = true; // game is active
let startTime = null; // start time
let timerInterval; // timer interval

// combinations for winning
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const cells = document.querySelectorAll(".cell");
const statusDisplay = document.getElementById("status");
const resetBtn = document.getElementById("reset-btn");
const bestTimesList = document.getElementById("best-times");

resetGame();
displayBestTimes();

// cell click event listener
cells.forEach(cell => {
    cell.addEventListener("click", () => {
        const index = cell.getAttribute("data-index");
        if (isGameActive && board[index] === "") {
            handlePlayerMove(index);
        }
    });
});

// reset button event listener
resetBtn.addEventListener("click", resetGame);

// handle player's move
function handlePlayerMove(index) {
    playerTurn = "X";
    board[index] = playerTurn;
    renderBoard();
    if (startTime === null) {
        startTime = new Date();
        timerInterval = setInterval(updateTimer, 1);
    }
    if (checkWin()) {
        endGame("Player");
    } else if (board.includes("")) {
        handleComputerMove();
    } else {
        endGame("Draw");
    }
}

// handle computer's random move
function handleComputerMove() {
    let availableIndexes = board
        .map((cell, index) => (cell === "" ? index : null))
        .filter(index => index !== null);
    let randomIndex = availableIndexes[Math.floor(Math.random() * availableIndexes.length)];
    board[randomIndex] = "O";
    playerTurn = "O";
    renderBoard();
    if (checkWin()) {
        endGame("Computer");
    } else if (!board.includes("")) {
        endGame("Draw");
    }
}

// render the board
function renderBoard() {
    cells.forEach((cell, index) => {
        cell.textContent = board[index];
    });
}

// check if there's a winner
function checkWin() {
    return winningCombinations.some(combination =>
        combination.every(index => board[index] === playerTurn)
    );
}

// end the game
function endGame(winner) {
    isGameActive = false;
    clearInterval(timerInterval);
    if (winner === "Player") {
        const timeElapsed = new Date() - startTime; // Tiempo en milisegundos
        statusDisplay.textContent = "¡Ganaste!";
        saveBestTime(timeElapsed);
    } else if (winner === "Computer") {
        statusDisplay.textContent = "¡La computadora ganó!";
    } else {
        statusDisplay.textContent = "¡Es un empate!";
    }
}

// save the best time to localStorage
function saveBestTime(time) {
    let playerName = prompt("¡Ganaste! Ingresa tu nombre:");
    if (playerName) {
        const data = new URLSearchParams();
        data.append('score', time);
        data.append('player', playerName);
        data.append('game', 'Tic-Tac-Toe'); // Nombre único de tu juego

        fetch('save-score.php', {
            method: 'POST',
            body: data
        })
        .then(response => response.text())
        .then(result => {
            console.log('Resultado de guardar el score:', result);
            // Actualizar la lista de mejores tiempos
            displayBestTimes();
        })
        .catch(error => {
            console.error('Error al guardar el score:', error);
        });
    }
}

function displayBestTimes() {
    fetch('get-best-times.php')
        .then(response => response.json())
        .then(scores => {
            bestTimesList.innerHTML = '';
            scores.slice(0, 10).forEach(score => {
                const li = document.createElement('li');
                li.textContent = `${score.player} - ${(score.score / 1000).toFixed(2)}s`;
                bestTimesList.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Error al obtener los mejores tiempos:', error);
        });
}

// reset the game
function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    playerTurn = "X";
    isGameActive = true;
    startTime = null;
    clearInterval(timerInterval);
    statusDisplay.textContent = "Player's Turn";
    renderBoard();
}

// update the timer
function updateTimer() {
    const timeElapsed = ((new Date() - startTime) / 1000).toFixed(2);
    statusDisplay.textContent = `Jugador - Tiempo: ${timeElapsed}s`;
}