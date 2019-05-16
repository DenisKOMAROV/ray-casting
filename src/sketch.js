let walls = [];

let particle;
let xOffset = 0;
let yOffset = 10000;


function setup() {
	createCanvas(400, 400);

	generateWalls();

	particle = new Particle();
}

function draw() {
	background(0);
	for (let wall of walls) {
		wall.show();
	}
	particle.update(noise(xOffset) * width, noise(yOffset) * height);
	particle.show();
	particle.look(walls);

	xOffset += 0.01;
	yOffset += 0.01;
}

function generateWalls() {
	// random walls count in range 5-10
	const minWallsCount = 5;
	const maxWallsCount = 10;
	const wallsCount = Math.floor(Math.random() * (maxWallsCount - minWallsCount)) + minWallsCount;

	for (let i = 0; i < wallsCount; i++) {
		let x1 = random(width);
		let y1 = random(height);
		let x2 = random(width);
		let y2 = random(height);
		walls[i] = new Boundary(x1, y1, x2, y2);
	}

	// adding edge walls
	walls.push(new Boundary(0, 0, width, 0));
	walls.push(new Boundary(width, 0, width, height));
	walls.push(new Boundary(width, height, 0, height));
	walls.push(new Boundary(0, 0, 0, height));
}
