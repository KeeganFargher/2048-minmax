let grid;
let score = 0;

const width = 1800;
const height = 800;

let highScore = 0;
let bestGrid = [];

function setup() {
	createCanvas(width, height);
	grid = blankGrid();

	addNumber(grid);
	addNumber(grid);
}

function draw() {
	background("#bbada0");

	if (!isGameOver(grid)) {
		const best = bestMove();
		keyPressed(best);

		// console.log(best);
	} else {
		if (score > highScore) {
			highScore = score;
			bestGrid = copyGrid(grid);
		}

		score = 0;
		grid = blankGrid();
		addNumber(grid);
		addNumber(grid);
	}
	bestGrid = copyGrid(grid);

	drawGrid();

	select("#score").html(score);
	select("#highscore").html(highScore);
}

function mini() {
	for (let i = 0; i < 10; i++) {
		const best = bestMove();
		keyPressed(best);
	}
}

// One "move"
function keyPressed(best) {
	let flipped = false;
	let rotated = false;
	let played = true;
	switch (keyCode || best) {
		case DOWN_ARROW:
			// do nothing
			break;
		case UP_ARROW:
			grid = flipGrid(grid);
			flipped = true;
			break;
		case RIGHT_ARROW:
			grid = transposeGrid(grid);
			rotated = true;
			break;
		case LEFT_ARROW:
			grid = transposeGrid(grid);
			grid = flipGrid(grid);
			rotated = true;
			flipped = true;
			break;
		default:
			played = false;
	}

	if (played) {
		let past = copyGrid(grid);
		for (let i = 0; i < 4; i++) {
			const { row, scoreVar } = operate(grid[i], score);
			grid[i] = row;
			score = scoreVar;
		}
		let changed = compare(past, grid);
		if (flipped) {
			grid = flipGrid(grid);
		}
		if (rotated) {
			grid = transposeGrid(grid);
		}
		if (changed) {
			addNumber(grid);
		}

		let gameover = isGameOver(grid);
		if (gameover) {
			console.log("GAME OVER -> ", { score, grid });
		}
	}
}

function updateCanvas() {
	background("#bbada0");
	drawGrid();
	select("#score").html(score);
	select("#highscore").html(highScore);
}

function drawGrid() {
	const w = width / 8;
	const h = height / 4;

	for (let i = 0; i < 4; i++) {
		for (let j = 0; j < 4; j++) {
			noFill();
			strokeWeight(1);
			const val = grid[i][j];
			const s = val.toString();

			strokeWeight(0);
			stroke(0);

			if (val !== 0) {
				fill(colorsSizes[s].color);
			} else {
				fill("#cdc1b4");
			}

			const x1 = i * w + 10;
			const y1 = j * h + 10;
			const x2 = w - 20;
			const y2 = h - 20;
			rect(x1, y1, x2, y2, 5);

			if (val !== 0) {
				textAlign(CENTER, CENTER);
				noStroke();
				fill(0);
				textSize(colorsSizes[s].size);
				text(val, i * w + w / 2, j * h + h / 2);
			}
		}
	}
}

function drawBest() {
	const w = width / 8;
	const h = height / 4;

	for (let i = 0; i < 4; i++) {
		for (let j = 0; j < 4; j++) {
			noFill();
			strokeWeight(1);
			const val = bestGrid[i][j];
			const s = val.toString();

			strokeWeight(0);
			stroke(0);

			if (val !== 0) {
				fill(colorsSizes[s].color);
			} else {
				fill("#cdc1b4");
			}

			const x1 = i * w + w + 400;
			const y1 = j * h + 10;
			const x2 = w + w - 20;
			const y2 = h - 20;
			rect(x1, y1, x2, y2, 5);

			// if (val !== 0) {
			// 	textAlign(CENTER, CENTER);
			// 	noStroke();
			// 	fill(0);
			// 	textSize(colorsSizes[s].size);
			// 	text(val, i * w + w + w / 2, j * h + h / 2);
			// }
		}
	}
}
