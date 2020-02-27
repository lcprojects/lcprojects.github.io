class Board {
    constructor(height, width) {
        this.height = height;
        this.width = width;
        this.generation = 0;
        this.board = Array(this.height).fill().map(el => Array(this.width).fill(false));
    }

    clearBoard() {
        this.board = Array(this.height).fill().map(el => Array(this.width).fill(false));
    }

    seedBoard(seeds) {
        let height = Math.ceil((this.height / 2));
        let width = Math.ceil((this.width / 2));

        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                if (seeds > 0) {
                    if (Math.floor((Math.random() * 2)) > 0) {
                        this.board[i][j] = true;
                        seeds--;
                    }
                } else {
                    break;
                }
            }
        }
    }

    reseed() {
        this.clearBoard();
        this.generation = 0;
        this.seedBoard(this.width * this.height);
    }

    hasNeighbors(type, row , col) {
        let neighbors = 0;
        if (col - 1 >= 0 && row - 1 > 0) {
            this.board[row-1][col-1] === true ? neighbors++ : neighbors;
        }
        if (row - 1 >= 0) {
            this.board[row-1][col] === true ? neighbors++ : neighbors;
        }
        if (row - 1 >= 0 && col + 1 < this.width) {
            this.board[row-1][col+1] === true ? neighbors++ : neighbors;
        }
        if (col + 1 < this.width) {
            this.board[row][col+1] === true ? neighbors++ : neighbors;
        }
        if (col + 1 < this.width && row + 1 < this.height) {
            this.board[row+1][col+1] === true ? neighbors++ : neighbors;
        }
        if(row + 1 < this.height) {
            this.board[row+1][col] === true ? neighbors++ : neighbors;
        }
        if(row + 1 < this.height && col - 1 >= 0) {
            this.board[row+1][col-1] === true ? neighbors++ : neighbors;
        }
        if(col - 1 >= 0) {
            this.board[row][col-1] === true ? neighbors++ : neighbors;
        }

        if (type == true) {
            return neighbors === 2 || neighbors === 3 ? true : false;
        } else {
            return neighbors === 3 ? true : false;
        }
    }

    stepSimulation() {
        let tempBoard = Array(this.height).fill().map(el => Array(this.width).fill(false));
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                tempBoard[i][j] = this.hasNeighbors(this.board[i][j], i, j) ? true : false;
            }
        }
        this.generation++;
        this.board = tempBoard.slice();
    }

}

const displayBoard = function (board) {
    boardElement = document.querySelector('.board');
    cell = document.querySelector('.cell');
    boardElement.style.width = (board.width * (cell.offsetWidth - 1)) + 'px';
    boardElement.style.height = (board.height * (cell.offsetHeight - 1)) + 'px';
    deleteBoard();
    for (let i = 0; i < board.height; i++) { 
        for (let j = 0; j < board.width; j++) {
            markup = `<div class="cell ${board.board[i][j] === true ? 'alive' : 'dead'}"></div>`;
            boardElement.insertAdjacentHTML('beforeend',markup);
        }
    }

}

const deleteBoard = function () {
    let board = document.querySelector('.board');
    board.innerHTML = '';

}

const displayGeneration = function (board) {
    document.querySelector('.generation').innerHTML = board.generation;
}

let btn = document.querySelector('.btn-step');
btn.addEventListener('click', function () {
    if (!state.running) {
        oneStep();
    }
});

const oneStep = function() {
    state.b.stepSimulation()
    displayBoard(state.b);
    displayGeneration(state.b);
}

document.querySelector('.btn-run').addEventListener('click', function () {
    if (state.running === false) {
        state.intervalCtrl = setInterval(oneStep, 200);
        state.running = true;
        document.querySelector('.btn-run').textContent = 'Pause';
    } else {
        clearInterval(state.intervalCtrl);
        state.running = false;
        document.querySelector('.btn-run').textContent = 'Resume';
    }
});

document.querySelector('.btn-restart').addEventListener('click', function () {
        clearInterval(state.intervalCtrl);
        state.running = false;
        document.querySelector('.btn-run').textContent = 'Run';
        document.querySelector('.generation').textContent = '';
        state.b.reseed();
        displayBoard(state.b);
});

 document.querySelector('.input-border').addEventListener('change', function (e) {
    var sheet = document.createElement('style')
    sheet.innerHTML = `.cell {border-radius:${e.target.value}px;}`;
    document.body.appendChild(sheet);
});

const state = {};

state.running = false;
state.intervalCtrl = undefined;

const init = function() {
    state.b = new Board(50, 50);
    state.b.seedBoard(state.b.width * state.b.height);
    displayBoard(state.b);
}

init();