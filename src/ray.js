class Ray {
	constructor(x, y) {
		this.pos = createVector(x, y);
		this.dir = createVector(1, 0);
	}

	lookAt(x, y) {
		this.dir.x = x - this.pos.x;
		this.dir.y = y - this.pos.y;
		this.dir.normalize();

	}

	show() {
		stroke(255);
		push();
		translate(this.pos.x, this.pos.y);
		line(0, 0, this.dir.x * 15, this.dir.y * 15) // * 15 for better look
	}

	// line-in-line is already implemented in the p5 library, but who needs that
	// maths described here: https://en.wikipedia.org/wiki/Line–line_intersection
	cast(wall) {
		const x1 = wall.a.x;
		const y1 = wall.a.y;
		const x2 = wall.b.x;
		const y2 = wall.b.y;

		const x3 = this.pos.x;
		const y3 = this.pos.y;
		const x4 = this.pos.x + this.dir.x;
		const y4 = this.pos.y + this.dir.y;

		const denominator = (x1 - x2) * (y3 -y4) - (y1 - y2) * (x3 - x4);
		// in case there lines are parallel
		if (denominator === 0) {
			return null;
		}

		// t and u are just coordinates mentioned in wiki
		const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denominator
		const u = -1 * ((x1 - x3) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / denominator
		if (t > 0 && t < 1 && u > 0) {
			return true;
		} else {
			return undefined;
		}
	}
}