const MAX_DEPTH = 6;

const moves = [37, 38, 39, 40];

function bestMove() {
	let bestScore = -Infinity;
	let keyCode = 0;

	const availableMoves = [];
	for (let i = 0; i < moves.length; i++) {
		const gridCopy = copyGrid(grid);

		const { changed } = keyPressedMiniMax(moves[i], gridCopy, 0);

		if (changed) {
			availableMoves.push(moves[i]);
		}
	}

	for (let i = 0; i < availableMoves.length; i++) {
		const newScore = minimax(copyGrid(grid), 0, availableMoves[i], 0);

		if (newScore > bestScore) {
			bestScore = newScore;
			keyCode = availableMoves[i];
		}
	}

	return keyCode;
}

function minimax(board, depth, keyCode, scoreParam) {
	if (depth === MAX_DEPTH || isGameOver(board)) {
		return scoreParam;
	}

	let bestScore = -Infinity;

	const { newScore, newBoard } = keyPressedMiniMax(keyCode, board, scoreParam);

	for (let i = 0; i < moves.length; i++) {
		const score = minimax(copyGrid(newBoard), depth + 1, moves[i], newScore + 0);

		bestScore = Math.max(score, bestScore);
	}

	return bestScore;
}

function keyPressedMiniMax(keyCode, board, scoreParam) {
	let flipped = false;
	let rotated = false;
	switch (keyCode) {
		case DOWN_ARROW:
			// do nothing
			break;
		case UP_ARROW:
			board = flipGrid(board);
			flipped = true;
			break;
		case RIGHT_ARROW:
			board = transposeGrid(board);
			rotated = true;
			break;
		case LEFT_ARROW:
			board = transposeGrid(board);
			board = flipGrid(board);
			rotated = true;
			flipped = true;
			break;
	}

	let past = copyGrid(board);

	for (let i = 0; i < 4; i++) {
		const { row, scoreVar } = operate(board[i], scoreParam);
		board[i] = row;
		scoreParam = scoreVar;
	}

	let changed = compare(past, board);

	if (flipped) {
		board = flipGrid(board);
	}

	if (rotated) {
		board = transposeGrid(board);
	}

	if (changed) {
		addNumber(board);
	}

	if (isGameOver(board)) {
		scoreParam = 0;
	}

	// reward for having more open space
	scoreParam += getOpenSpaces(board) * 100;

	//try get all the big values in the corner
	scoreParam += board[0][0] * 2 + board[0][1] / 2 + board[1][0] / 2 + board[1][1] / 3;

	return { newScore: scoreParam, newBoard: board, changed };
}
