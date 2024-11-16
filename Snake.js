export class Snake {
	constructor(canvas, context, x, y, color, width, height) {
		this.canvas = canvas;
		this.context = context;
		this.x = x;
		this.y = y;
		this.color = color;
		this.width = width;
		this.height = height;

		this.running = true;
		this.body = [];
		this.currentDirecton = '';
	}

	update() {
		this.collison();
		this.snakeDirection();
		this.moveBody();
		this.draw();
	}

	draw() {
		this.context.fillStyle = this.color;
		for (let i = 0; i < this.body.length; i++) {
			this.context.fillRect(
				this.body[i][0],
				this.body[i][1],
				this.width,
				this.height
			);
		}
	}

	snakeDirection(directionKey) {
		if (directionKey === 'ArrowUp' && this.currentDirecton !== 'ArrowDown') {
			this.currentDirecton = directionKey;
			this.y -= this.height;
		} else if (
			directionKey === 'ArrowDown' &&
			this.currentDirecton !== 'ArrowUp'
		) {
			this.currentDirecton = directionKey;
			this.y += this.height;
		} else if (
			directionKey === 'ArrowLeft' &&
			this.currentDirecton !== 'ArrowRight'
		) {
			this.currentDirecton = directionKey;
			this.x -= this.width;
		} else if (
			directionKey === 'ArrowRight' &&
			this.currentDirecton !== 'ArrowLeft'
		) {
			this.currentDirecton = directionKey;
			this.x += this.width;
		}
	}

	moveBody() {
		if (this.body && this.body.length >= 1 && this.running) {
			for (let i = this.body.length - 1; i > 0; i--) {
				this.body[i] = [...this.body[i - 1]];
			}
		}
		this.body[0] = [this.x, this.y];
	}

	gameOver() {
		this.running = false;
	}

	collison() {
		this.collisionX();
		this.collisionY();
		this.selfCollision();
	}

	collisionX() {
		if (this.x > this.canvas.width - this.width) {
			this.x = this.canvas.width - this.width;
			this.gameOver();
		} else if (this.x < 0) {
			this.x = this.x + this.width;
			this.gameOver();
		}
	}

	collisionY() {
		if (this.y > this.canvas.height - this.height) {
			this.y = this.canvas.height - this.height;
			this.gameOver();
		} else if (this.y < 0) {
			this.y = this.y + this.height;
			this.gameOver();
		}
	}

	selfCollision() {
		for (let i = 1; i < this.body.length; i++) {
			let [x, y] = this.body[i];
			if (x === this.x && y === this.y) {
				this.gameOver();
			}
		}
	}
}
