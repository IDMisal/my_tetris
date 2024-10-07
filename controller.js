document.addEventListener('keydown', function(event) {
    if (gameOver) return; 

    switch(event.key) {
        case 'ArrowUp':
            rotateTetromino();
            break;
        case 'ArrowDown':
            moveDown();
            break;
        case 'ArrowLeft':
            moveLeft();
            break;
        case 'ArrowRight':
            moveRight();
            break;
        case ' ':
            hardDrop();
            break;
    }
});

function rotateTetromino() {
    let shape = currentTetromino.shape;
    let newShape = shape[0].map((_, index) => shape.map(row => row[index])).reverse();

    let originalCol = currentTetromino.col;
    let originalRow = currentTetromino.row;

    currentTetromino.shape = newShape;

    if (collision()) {
        currentTetromino.shape = shape;
        currentTetromino.col = originalCol;
        currentTetromino.row = originalRow;
    } else {
        render();
    }
}

function moveLeft() {
    currentTetromino.col--;
    if (collision()) {
        currentTetromino.col++;
    } else {
        render();
    }
}

function moveRight() {
    currentTetromino.col++;
    if (collision()) {
        currentTetromino.col--;
    } else {
        render();
    }
}

function hardDrop() {
    while (!collision()) {
        currentTetromino.row++;
    }
    currentTetromino.row--;
    placeTetromino();
    resetTetromino();
    render();
}
