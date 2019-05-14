let wall;
let ray;

function setup() {
	createCanvas(400, 400);
	wall = new Boundary(300, 100 , 300, 300, );
	ray = new Ray(100, 200);
}

function draw() {
	background(0);
	wall.show();
	ray.show();
	ray.lookAt(mouseX, mouseY);

	const point = ray.cast(wall);
	console.log(point);
	if (point) {
		fill(255);
		ellipse(point.x, point.y, 8, 8);
	}
}
