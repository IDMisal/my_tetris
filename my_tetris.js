const COLS = 10;
const ROWS = 20;
const CELL_SIZE = 30;

let canvas = document.getElementById('gameCanvas');
let context = canvas.getContext('2d');

const scoreElement = document.getElementById('score');
const linesElement = document.getElementById('lines');

let score = 0;
let lines = 0;

const TETROMINOS = {
    I: [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ],
    O: [
        [1, 1],
        [1, 1],
    ],
    T: [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0],
    ],
    S: [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0],
    ],
    Z: [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0],
    ],
    J: [
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 0],
    ],
    L: [
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0],
    ]
};

let board = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
let currentTetromino = { shape: TETROMINOS.I, row: 0, col: 3 };
let dropStart = Date.now();
let gameOver = false;

function init() {
    document.getElementById('playButton').addEventListener('click', startGame);
}

function startGame() {
    gameOver = false;
    board = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
    score = 0;
    lines = 0;
    updateScore();
    updateLines();
    resetTetromino();
    gameLoop();
}

function gameLoop() {
    let now = Date.now();
    let delta = now - dropStart;
    if (delta > 1000) {
        moveDown();
        dropStart = Date.now();
    }
    if (!gameOver) {
        render();
        requestAnimationFrame(gameLoop);
    }
}

function moveDown() {
    currentTetromino.row++;
    if (collision()) {
        currentTetromino.row--;
        placeTetromino();
        resetTetromino();
    }
}

function collision() {
    let shape = currentTetromino.shape;
    for (let row = 0; row < shape.length; row++) {
        for (let col = 0; col < shape[row].length; col++) {
            if (shape[row][col] &&
                (board[currentTetromino.row + row] &&
                board[currentTetromino.row + row][currentTetromino.col + col]) !== 0) {
                return true;
            }
        }
    }
    return false;
}

function placeTetromino() {
    let shape = currentTetromino.shape;
    for (let row = 0; row < shape.length; row++) {
        for (let col = 0; col < shape[row].length; col++) {
            if (shape[row][col]) {
                board[currentTetromino.row + row][currentTetromino.col + col] = shape[row][col];
            }
        }
    }
    clearLines();
}

function clearLines() {
    let linesCleared = 0;
    for (let row = ROWS - 1; row >= 0; row--) {
        if (board[row].every(cell => cell !== 0)) {
            board.splice(row, 1);
            board.unshift(Array(COLS).fill(0));
            linesCleared++;
        }
    }
    if (linesCleared > 0) {
        lines += linesCleared;
        score += calculateScore(linesCleared);
        updateScore();
        updateLines();
    }
}

function calculateScore(linesCleared) {
    switch (linesCleared) {
        case 1: return 40;
        case 2: return 100;
        case 3: return 300;
        case 4: return 1200;
        default: return 0;
    }
}

function resetTetromino() {
    const shapes = Object.values(TETROMINOS);
    currentTetromino.shape = shapes[Math.floor(Math.random() * shapes.length)];
    currentTetromino.row = 0;
    currentTetromino.col = 3;

    if (collision()) {
        alert("Game Over");
        gameOver = true;
    }
}

function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawBoard();
    drawTetromino();
}

function drawBoard() {
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            if (board[row][col]) {
                context.fillStyle = 'blue';
                context.fillRect(col * CELL_SIZE, row * CELL_SIZE, CELL_SIZE, CELL_SIZE);
                context.strokeRect(col * CELL_SIZE, row * CELL_SIZE, CELL_SIZE, CELL_SIZE);
            }
        }
    }
}

function drawTetromino() {
    let shape = currentTetromino.shape;
    for (let row = 0; row < shape.length; row++) {
        for (let col = 0; col < shape[row].length; col++) {
            if (shape[row][col]) {
                context.fillStyle = 'red';
                context.fillRect((currentTetromino.col + col) * CELL_SIZE, (currentTetromino.row + row) * CELL_SIZE, CELL_SIZE, CELL_SIZE);
                context.strokeRect((currentTetromino.col + col) * CELL_SIZE, (currentTetromino.row + row) * CELL_SIZE, CELL_SIZE, CELL_SIZE);
            }
        }
    }
}

function updateScore() {
    scoreElement.textContent = score;
}

function updateLines() {
    linesElement.textContent = lines;
}

init();
