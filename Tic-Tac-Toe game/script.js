const cells = document.querySelectorAll('.cell');
        const status = document.getElementById('status');
        const resetButton = document.getElementById('reset');
        let currentPlayer = 'X';
        let gameActive = true;
        let gameState = ['', '', '', '', '', '', '', '', ''];

        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];

        function handleCellClick(e) {
            const cell = e.target;
            const index = cell.getAttribute('data-index');

            if (gameState[index] !== '' || !gameActive) return;

            gameState[index] = currentPlayer;
            cell.textContent = currentPlayer;
            cell.classList.add(currentPlayer.toLowerCase());

            if (checkWin()) {
                status.textContent = `Player ${currentPlayer} wins!`;
                gameActive = false;
                resetButton.style.display = 'block';
                return;
            }

            if (checkDraw()) {
                status.textContent = "Game ended in a draw!";
                gameActive = false;
                resetButton.style.display = 'block';
                return;
            }

            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            status.textContent = `Current player: ${currentPlayer}`;
        }

        function checkWin() {
            return winningCombinations.some(combination => {
                return combination.every(index => {
                    return gameState[index] === currentPlayer;
                });
            });
        }

        function checkDraw() {
            return gameState.every(cell => cell !== '');
        }

        function resetGame() {
            gameState = ['', '', '', '', '', '', '', '', ''];
            gameActive = true;
            currentPlayer = 'X';
            status.textContent = `Current player: ${currentPlayer}`;
            cells.forEach(cell => {
                cell.textContent = '';
                cell.classList.remove('x', 'o');
            });
            resetButton.style.display = 'none';
        }

        cells.forEach(cell => cell.addEventListener('click', handleCellClick));
        resetButton.addEventListener('click', resetGame);
        resetButton.style.display = 'none';