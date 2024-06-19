document.addEventListener('DOMContentLoaded', () => {
    const board = document.querySelector('#board');
    const casinhas = Array.from(document.querySelectorAll('.casinha'));
    const vencedorDisplay = document.querySelector('#vencedor');
    let currentPlayer = 'X';
    let boardState = Array(9).fill(null);

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

    function checkWinner() {
        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
                return boardState[a];
            }
        }
        return boardState.includes(null) ? null : 'Empate';
    }

    function handleClick(event) {
        const index = event.target.getAttribute('data-index');
        if (boardState[index] || checkWinner()) return;

        boardState[index] = currentPlayer;
        event.target.textContent = currentPlayer;

        const winner = checkWinner();
        if (winner) {
            vencedorDisplay.textContent = winner === 'Empate' ? 'Empate!' : `Jogador ${winner} venceu!`;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }

    casinhas.forEach(casinha => casinha.addEventListener('click', handleClick));
});
