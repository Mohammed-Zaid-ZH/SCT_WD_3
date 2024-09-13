const cells = document.querySelectorAll('.cell');
const messageElement = document.getElementById('message');
const restartBtn = document.getElementById('restart-btn');


let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;


const winningConditions = [
    [0, 1, 2], 
    [3, 4, 5], 
    [6, 7, 8], 
    [0, 3, 6], 
    [1, 4, 7], 
    [2, 5, 8], 
    [0, 4, 8], 
    [2, 4, 6]  
];

const handleCellClick = (event) => {
    const clickedCell = event.target; 
    const clickedIndex = parseInt(clickedCell.getAttribute('data-index')); 


    if (gameState[clickedIndex] !== '' || !gameActive) {
        return;
    }


    gameState[clickedIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;


    checkForWinner();
};

const checkForWinner = () => {
    let roundWon = false;
    let winningLine = [];

    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }

        if (a === b && b === c) {
            roundWon = true;
            winningLine = winCondition; 
            break;
        }
    }

    
    if (roundWon) {
        messageElement.textContent = `Player ${currentPlayer} Wins!`;
        gameActive = false;


        winningLine.forEach(index => {
            cells[index].classList.add('winning-cell');
        });

        return;
    }


    const roundDraw = !gameState.includes('');
    if (roundDraw) {
        messageElement.textContent = `It's a Draw!`;
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    messageElement.textContent = `It's ${currentPlayer}'s turn`;
};


const restartGame = () => {
    gameActive = true;
    currentPlayer = 'X';
    gameState = ['', '', '', '', '', '', '', '', ''];
    messageElement.textContent = `It's ${currentPlayer}'s turn`;

    
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('winning-cell');
    });
};


cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', restartGame);


messageElement.textContent = `It's ${currentPlayer}'s turn`;
