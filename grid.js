function blankGrid() {
	return [
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0]
	];
}

function compare(a, b) {
	for (let i = 0; i < 4; i++) {
		for (let j = 0; j < 4; j++) {
			if (a[i][j] !== b[i][j]) {
				return true;
			}
		}
	}
	return false;
}

function copyGrid(grid) {
	return JSON.parse(JSON.stringify(grid));
}

function flipGrid(grid) {
	for (let i = 0; i < 4; i++) {
		grid[i].reverse();
	}
	return grid;
}

function transposeGrid(grid) {
	let newGrid = blankGrid();
	for (let i = 0; i < 4; i++) {
		for (let j = 0; j < 4; j++) {
			newGrid[i][j] = grid[j][i];
		}
	}
	return newGrid;
}

function addNumber(board) {
	let options = [];
	for (let i = 0; i < 4; i++) {
		for (let j = 0; j < 4; j++) {
			if (board[i][j] === 0) {
				options.push({
					x: i,
					y: j
				});
			}
		}
	}

	if (options.length > 0) {
		let spot = random(options);
		let r = random(1);
		board[spot.x][spot.y] = 4;
		// board[spot.x][spot.y] = r > 0.1 ? 2 : 4;
	}
}
