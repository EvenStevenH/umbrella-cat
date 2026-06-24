let snowFg = [];
let snowBg = [];
let eyes = true;
let eyeDirection = "front";
let lastEyeMove = 0;
let lastBlink = 0;
let blinkStartTime = 0;

function setup() {
	createCanvas(600, 600);
	frameRate(60);

	// initialize snow
	for (let j = 0; j < 20; j++) {
		snowFg[j] = {
			x: random(0, width),
			y: random(-600, 0),
			speed: random(8, 12),
		};
	}
	for (let k = 0; k < 60; k++) {
		snowBg[k] = {
			x: random(0, width),
			y: random(-600, 0),
			speed: random(4, 6),
		};
	}
}

function drawBackground() {
	background("#A7924A");
	fill("#AC9B54");
	ellipse(width / 2, -50, 1000, 500);
	fill("#AFA15A");
	ellipse(width / 2, -80, 1000, 400);

	noStroke();
	fill("#C9C17C");
	for (let i = 0; i < snowBg.length; i++) {
		const snow = snowBg[i];
		ellipse(snow.x, snow.y, 10, 15);
		snow.y += snow.speed;

		if (snow.y > 650) {
			snow.y = 0;
			snow.x = random(0, width);
			snow.speed = random(4, 6);
		}
	}
}

function drawForeground() {
	noStroke();
	fill("#f4efc8");
	for (let i = 0; i < snowFg.length; i++) {
		const snow = snowFg[i];
		ellipse(snow.x, snow.y, 20, 30);
		snow.y += snow.speed;

		if (snow.y > 650) {
			snow.y = 0;
			snow.x = random(0, width);
			snow.speed = random(8, 12);
		}
	}
}

function drawUmbrella() {
	fill("#855B2A");
	ellipse(width / 2, height / 4, 40, 120); // end tip
	fill("#F5BC07");
	ellipse(width / 2, 360, 700, 400); // top
	fill("#E89719");
	ellipse(width / 2, 520, 800, 440); // back
}

function drawCat() {
	fill("#453823");
	rect(100, 350, 400, 500, 20); // base
	triangle(100, 250, 100, 400, 250, 350); // base ear L
	triangle(500, 250, 500, 400, 350, 350); // base ear R

	fill("#dec28a");
	triangle(300, 380, 150, 600, 450, 600); // inner face
	triangle(110, 280, 110, 350, 200, 350); // inner ear L
	triangle(490, 280, 490, 350, 400, 350); // inner ear R

	fill("#C58954"); // nose
	triangle(300, 580, 270, 550, 330, 550);

	if (eyes) {
		fill("#FEE8AF");
		ellipse(200, 500, 130, 120); // sclera L
		ellipse(400, 500, 130, 120); // sclera L

		fill("#8E442D"); // pupils L R
		switch (eyeDirection) {
			case "front":
				circle(215, 490, 80);
				circle(385, 490, 80);
				break;
			case "right":
				circle(217, 491, 80);
				circle(387, 491, 80);
				break;
			case "left":
				circle(214, 492, 80);
				circle(384, 492, 80);
				break;
			case "down":
				circle(216, 493, 80);
				circle(386, 493, 80);
				break;
		}
	} else {
		stroke("#282116");
		strokeWeight(24);
		line(150, 500, 250, 510); // closed eye L
		line(450, 500, 350, 510); // closed eye R
	}

	// eye movement
	if (millis() - lastEyeMove > random(1000, 2000)) {
		let eyeChance = random();
		lastEyeMove = millis();
		switch (true) {
			case eyeChance < 0.6:
				eyeDirection = "front";
				break;
			case eyeChance >= 0.6 && eyeChance <= 0.7:
				eyeDirection = "right";
				break;
			case eyeChance >= 0.7 && eyeChance <= 0.8:
				eyeDirection = "left";
				break;
			default:
				eyeDirection = "down";
		}
	}

	// blink
	if (millis() - lastBlink > random(4000, 10000)) {
		eyes = !eyes;
		blinkStartTime = millis(); // start blink timer when eyes change state
		lastBlink = millis();
	}
	if (!eyes && millis() - blinkStartTime > 400) {
		eyes = true; // open eyes
	}
}

function draw() {
	drawBackground();
	drawUmbrella();
	drawCat();
	drawForeground();
}
