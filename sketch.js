let snowFg = [];
let snowBg = [];
let eyes = true;
let eyeDirection = "front";
let lastEyeMove = 0;
let lastBlink = 0;
let blinkStartTime = 0;
const hour = new Date().getHours();

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
	let bgCol1, bgCol2, bgCol3, snowCol;
	if (hour >= 6 && hour < 12) {
		// morning
		bgCol1 = "#EBD785";
		bgCol2 = "#E1D17C";
		bgCol3 = "#DCC973";
		snowCol = "#F6EDA5";
	} else if (hour >= 12 && hour < 18) {
		// afternoon
		bgCol1 = "#A7924A";
		bgCol2 = "#AC9B54";
		bgCol3 = "#AFA15A";
		snowCol = "#C9C17C";
	} else {
		// evening/night
		bgCol1 = "#99703C";
		bgCol2 = "#9E7744";
		bgCol3 = "#A37F4D";
		snowCol = "#b89965";
	}

	background(bgCol1);
	fill(bgCol2);
	ellipse(width / 2, -50, 1000, 500);
	fill(bgCol3);
	ellipse(width / 2, -80, 1000, 400);

	noStroke();
	fill(snowCol);
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

	fill("#C58954");
	triangle(300, 580, 270, 550, 330, 550); // nose

	if (eyes) {
		fill("#FEE8AF");
		ellipse(200, 500, 130, 120); // sclera L
		ellipse(400, 500, 130, 120); // sclera L

		fill("#8E442D"); // "front" by default
		let offsetX = 0;
		let offsetY = 0;
		if (eyeDirection === "right") {
			offsetX = 2;
			offsetY = 1;
		} else if (eyeDirection === "left") {
			offsetX = -1;
			offsetY = 2;
		} else if (eyeDirection === "down") {
			offsetX = 1;
			offsetY = 3;
		}
		circle(215 + offsetX, 490 + offsetY, 80); // pupils L
		circle(385 + offsetX, 490 + offsetY, 80); // pupils R
	} else {
		stroke("#282116");
		strokeWeight(24);
		line(150, 500, 250, 510); // closed eye L
		line(450, 500, 350, 510); // closed eye R
	}

	// eye movement
	if (millis() - lastEyeMove > random(1000, 4000)) {
		let eyeChance = random();
		lastEyeMove = millis();

		if (eyeChance < 0.6) {
			eyeDirection = "front";
		} else if (eyeChance >= 0.6 && eyeChance < 0.7) {
			eyeDirection = "right";
		} else if (eyeChance >= 0.7 && eyeChance < 0.8) {
			eyeDirection = "left";
		} else {
			eyeDirection = "down";
		}
	}

	// blink
	if (millis() - lastBlink > random(6000, 10000)) {
		eyes = !eyes; // hide eyes
		blinkStartTime = millis(); // start blink timer
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
