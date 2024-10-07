function renderBoard(context, board) {
    context.clearRect(0, 0, canvas.width, canvas.height);
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

function renderTetromino(context, tetromino) {
    let shape = tetromino.shape;
    for (let row = 0; row < shape.length; row++) {
        for (let col = 0; col < shape[row].length; col++) {
            if (shape[row][col]) {
                context.fillStyle = 'red';
                context.fillRect((tetromino.col + col) * CELL_SIZE, (tetromino.row + row) * CELL_SIZE, CELL_SIZE, CELL_SIZE);
                context.strokeRect((tetromino.col + col) * CELL_SIZE, (tetromino.row + row) * CELL_SIZE, CELL_SIZE, CELL_SIZE);
            }
        }
    }
}
