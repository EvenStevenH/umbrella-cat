let snowFgX = [];
let snowFgY = [];
let snowBgX = [];
let snowBgY = [];

function setup() {
	createCanvas(600, 600);

	// initialize foreground snow
	for (let j = 0; j < 20; j++) {
		snowFgX[j] = random(0, width);
		snowFgY[j] = random(-600, 0);
	}

	// initialize background snow
	for (let k = 0; k < 60; k++) {
		snowBgX[k] = random(0, width);
		snowBgY[k] = random(-600, 0);
	}
}

function drawUmbrella() {
	fill("#855B2A"); // end tip
	ellipse(width / 2, height / 4, 40, 120);
	fill("#F5BC07"); // top
	ellipse(width / 2, 360, 700, 400);
	fill("#E89719"); // back
	ellipse(width / 2, 520, 800, 440);
}

function drawCat() {
	fill("#453823");
	rect(100, 350, 400, 500, 20); // base
	triangle(100, 250, 100, 400, 250, 350); // base earL
	triangle(500, 250, 500, 400, 350, 350); // base earR

	fill("#dec28a");
	triangle(300, 380, 150, 600, 450, 600); // inner face
	triangle(110, 280, 110, 350, 200, 350); // inner earL
	triangle(490, 280, 490, 350, 400, 350); // inner earR

	fill("#FEE8AF"); // sclera
	ellipse(200, 500, 130, 120);
	ellipse(400, 500, 130, 120);
	fill("#8E442D"); // pupils
	circle(215, 490, 80);
	circle(385, 490, 80);

	fill("#C58954"); // nose
	triangle(300, 580, 270, 550, 330, 550);
}

function draw() {
	background("#A7924A");
	fill("#AC9B54");
	ellipse(width / 2, -50, 1000, 500);
	fill("#AFA15A");
	ellipse(width / 2, -80, 1000, 400);

	// create background snow
	noStroke();
	fill("#C9C17C");
	for (let l = 0; l < snowBgX.length; l++) {
		ellipse(snowBgX[l], snowBgY[l], 10, 15);
		snowBgY[l] += 4;

		// restart snow
		if (snowBgY[l] > 650) {
			snowBgY[l] = 0;
			snowBgX[l] = Math.floor(random(0, 600));
		}
	}

	drawUmbrella();
	drawCat();

	// create foreground snow
	noStroke();
	fill("#f4efc8");
	for (let i = 0; i < snowFgX.length; i++) {
		ellipse(snowFgX[i], snowFgY[i], 20, 30);
		snowFgY[i] += 12;

		// restart snow
		if (snowFgY[i] > 650) {
			snowFgY[i] = 0;
			snowFgX[i] = Math.floor(random(0, 600));
		}
	}
}
