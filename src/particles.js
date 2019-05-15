class Particle {
	constructor() {
		this.position = createVector(width/2, height/2);
		this.rays = [];

		const degree = 0.6; // change rays casting 0.6 seems good
		for (let angle = 0; angle < 360; angle += degree) {
			this.rays.push(new Ray(this.position, radians(angle)));
		}
	}

	show() {
		fill(255);
		ellipse(this.position.x, this.position.y, 4);
		for (let ray of this.rays) {
			ray.show();
		}
	}

	look(walls) {
		for (let ray of this.rays) {
			let closest = null;
			let record = Infinity;
			for (let wall of walls) {
				const point = ray.cast(wall);
				if (point) {
					const distance = p5.Vector.dist(this.position, point);
					if (distance < record) {
						record = distance;
						closest = point;
					}
				}
			}
			if (closest) {
				// transparency
				stroke(255, 50);
				line(this.position.x, this.position.y, closest.x, closest.y);
			}
		}
	}

	update(x, y) {
		this.position.set(x, y);
	}
}
