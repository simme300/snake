import { Snake } from './Snake.js';
import { Food } from './Food.js';
export class Board {
	constructor(canvas, context, canvasWidth, canvasHeight, lineWidth, cellSize) {
		this.canvas = canvas;
		this.context = context;
		this.canvasWidth = canvasWidth;
		this.canvasHeight = canvasHeight;
		this.lineWidth = lineWidth;
		this.cellSize = cellSize;

		this.scoreCount = 0;
		this.gameOverText = document.querySelector('.game-over-text');
		this.score = document.querySelector('.score');

		this.snake = this.initializeSnake();
		this.snake.body.push([this.snake.x, this.snake.y]);
		this.food = this.initializeFood();
	}

	updateScore() {
		this.scoreCount += 1;
		return (this.score.textContent = this.score.textContent.replace(
			/\d+$/,
			this.scoreCount
		));
	}

	draw() {
		this.context.beginPath();
		this.context.strokeStyle = 'white';
		this.context.lineWidth = this.lineWidth;

		for (let i = 0; i < this.canvasWidth; i += this.cellSize) {
			this.context.moveTo(i, 0);
			this.context.lineTo(i, this.canvasHeight);
		}

		for (let index = 0; index < this.canvasHeight; index += this.cellSize) {
			this.context.moveTo(0, index);
			this.context.lineTo(this.canvasWidth, index);
		}

		this.context.stroke();
	}

	update() {
		this.clearBoard();
		this.gameOver();
		this.food.update();
		this.snake.update();
		this.eatFood();
		this.draw();
	}

	initializeFood() {
		const startX =
			this.getRandomInt(0, this.canvasWidth / this.cellSize) * this.cellSize;
		const startY =
			this.getRandomInt(0, this.canvasHeight / this.cellSize) * this.cellSize;
		const food = new Food(
			this.canvas,
			this.context,
			startX,
			startY,
			'red',
			this.cellSize,
			this.cellSize
		);
		return food;
	}

	initializeSnake() {
		const snake = new Snake(
			this.canvas,
			this.context,
			this.canvasWidth / 2,
			this.canvasHeight / 2,
			'yellow',
			this.cellSize,
			this.cellSize
		);
		return snake;
	}

	getRandomInt(min, max) {
		const minCeiled = Math.ceil(min);
		const maxFloored = Math.floor(max);
		return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
	}

	getRandomFoodposition() {
		this.food.x =
			this.getRandomInt(0, this.canvasWidth / this.cellSize) * this.cellSize;
		this.food.y =
			this.getRandomInt(0, this.canvasHeight / this.cellSize) * this.cellSize;
	}

	clearBoard() {
		this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
	}

	eatFood() {
		if (this.snake.x === this.food.x && this.snake.y === this.food.y) {
			this.snake.body.push([this.food.x, this.food.y]);
			this.updateScore();
			this.handleFoodSpawn();
		}
	}

	handleFoodSpawn() {
		let foodOnSnake = true;

		while (foodOnSnake) {
			this.getRandomFoodposition();
			foodOnSnake = this.snake.body.some(
				(pos) => this.food.x === pos[0] && this.food.y === pos[1]
			);
		}
	}

	gameOver() {
		if (!this.snake.running) {
			this.gameOverText.style.display = 'block';
		}
	}
}
