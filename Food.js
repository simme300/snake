export class Food {
	constructor(canvas, context, x, y, color, width, height) {
		this.canvas = canvas;
		this.context = context;
		this.x = x;
		this.y = y;
		this.color = color;
		this.width = width;
		this.height = height;
	}

	draw() {
		this.context.fillStyle = this.color;
		this.context.fillRect(this.x, this.y, this.height, this.width);
	}

	update() {
		this.draw();
	}
}
