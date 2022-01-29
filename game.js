// let score = 0;

function operate(row, scoreParam) {
	row = slide(row);
	const { newRow, scoreVar } = combine(row, scoreParam);
	row = slide(newRow);
	return { row, scoreVar };
}

function operate2(row, scoreParam) {
	row = slide(row);
	const { newRow, scoreVar } = combine2(row, scoreParam);
	row = slide(newRow);
	return { row, scoreVar };
}

// making new array
function slide(row) {
	let arr = row.filter(val => val);
	let missing = 4 - arr.length;
	let zeros = Array(missing).fill(0);
	arr = zeros.concat(arr);
	return arr;
}

function getOpenSpaces(board) {
	let openSpaces = 0;
	for (let i = 0; i < 4; i++) {
		for (let j = 0; j < 4; j++) {
			if (board[i][j] == 0) {
				// console.log(board[i][j]);
				openSpaces++;
			}
		}
	}
	return openSpaces;
}

// operating on array itself
function combine(row, scoreVar) {
	for (let i = 3; i >= 1; i--) {
		let a = row[i];
		let b = row[i - 1];
		if (a == b) {
			row[i] = a + b;
			scoreVar += row[i];
			row[i - 1] = 0;
		}
	}
	return { newRow: row, scoreVar };
}

function combine2(row, scoreVar) {
	for (let i = 3; i >= 1; i--) {
		let a = row[i];
		let b = row[i - 1];
		if (a == b) {
			row[i] = a + b;
			row[i - 1] = 0;
		}
		scoreVar[i] += row[i];
	}
	return { newRow: row, scoreVar };
}

// function isGameWon(board) {
// 	for (let i = 0; i < 4; i++) {
// 		for (let j = 0; j < 4; j++) {
// 			if (board[i][j] == 2048) {
// 				return true;
// 			}
// 		}
// 	}
// 	return false;
// }

function isGameOver(board) {
	for (let i = 0; i < 4; i++) {
		for (let j = 0; j < 4; j++) {
			if (board[i][j] == 0) {
				return false;
			}
			if (i !== 3 && board[i][j] === board[i + 1][j]) {
				return false;
			}
			if (j !== 3 && board[i][j] === board[i][j + 1]) {
				return false;
			}
		}
	}
	return true;
}

function calculateScore() {
	let score = 0;
}
