import {
	canvasWidth,
	canvasHeight,
	lineWidth,
	cellSize,
	canvas,
	ctx,
} from './constants.js';
import { Board } from './Board.js';
const b = new Board(
	canvas,
	ctx,
	canvasWidth,
	canvasHeight,
	lineWidth,
	cellSize
);

let timer;
function animate(dir) {
	clearTimeout(timer);
	b.snake.snakeDirection(dir);
	b.update();
	timer = setTimeout(() => {
		requestAnimationFrame(() => animate(dir));
	}, 1000 / 10);
}

window.addEventListener('load', (e) => {
	b.update();
});

document.addEventListener('keydown', (e) => {
	if (!b.snake.running) return;
	animate(e.key);
});

document.addEventListener('click', (e) => {
	if (!b.snake.running) {
		clearTimeout(timer);
		window.location.reload();
	}
});
