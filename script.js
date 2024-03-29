function gameBoard() {
	let board = ['', '', '', '', '', '', '', '', ''];
	let currentPlayerIndex = 0;
	const players = [{
			name: 'player1',
			key: 'X'
		},
		{
			name: 'player2',
			key: 'O'
		}
	];

	const winnerLines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6]
	];

	const createBoard = () => {
		const gameArea = document.querySelector('.container');
		for (let i = 0; i < board.length; i++) {
			const box = document.createElement("div");
			box.classList.add('box');
			box.dataset.index = i;
			box.addEventListener('click', handleBoxClick);
			gameArea.appendChild(box);
		}
	};


	const handleBoxClick = (event) => {
		const clickedBox = parseInt(event.target.dataset.index);

		if (board[clickedBox] === '') {
			currentPlayer = players[currentPlayerIndex];
			board[clickedBox] = currentPlayer.key;
			event.target.innerText = currentPlayer.key
			if (checkWinner(currentPlayer.key)) {
				openPopup(currentPlayer.key, 'Wins')
			} else if (drawChecker()) {
				openPopup(currentPlayer.key, 'draw')
			} else {
				currentPlayerIndex = (currentPlayerIndex === 0) ? 1 : 0
			}
		}

	};

	const checkWinner = (playerKey) => {
		return winnerLines.some(line =>
			line.every(index =>
				board[index] === playerKey
			)
		)
	}

	const drawChecker = () => {
		return board.every(box => box !== '')
	}

	const resetGame = (player, message) => {
		board = ['', '', '', '', '', '', '', '', ''];
		let boxes = document.querySelectorAll('.box')
		boxes.forEach(box => box.innerText = '')
		currentPlayerIndex = 0
        const popUp = document.getElementById("popup")
        popUp.innerText=''
	}

	const openPopup = (player, message) => {
		const popUp = document.getElementById("popup")
        popUp.innerText=''
		const h1 = document.createElement('h1')
		const p = document.createElement('p')
		const div = document.createElement('div')
		const button = document.createElement('button')
		button.innerText = 'Close'
		button.classList.add('button-27')
		button.addEventListener('click', closePopup)
		div.classList.add('popupDiv')
		p.innerText = 'Close the pop up, to reset the game and continue.'
		h1.innerText = (message === 'Wins') ? `${player} Wins!` : `It's a Draw!`
		div.appendChild(h1)
		div.appendChild(p)
		div.appendChild(button)
		popUp.appendChild(div)
		popUp.style.display = "block";
	}

	const closePopup = () => {
		document.getElementById("popup").style.display = "none";
		resetGame()
	}

	document.getElementById('reset').addEventListener('click', function() {
		resetGame();
	});

	return {
		createBoard,
		resetGame
	};
}

const board = gameBoard();
board.createBoard()