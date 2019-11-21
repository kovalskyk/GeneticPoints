//var ellipseColor;
//var ellipsePos;
let diameter;
let ellipses = [];

var lineWeight = 0.1;
var pointCount = 1000;

var freqX = 4;
var freqY = 7;
var phi = 15;

var modFreqX = 3;
var modFreqY = 2;

let population;


function setup() {
	createCanvas(800, 800);
  colorMode(RGB, 255, 255, 255, 100);
	background(220);
	let popmax = 3;
  let mutationRate = 0.05;

	population = new Population(mutationRate, popmax);
	console.log(population);

	lineColor = color(0,50);

	population.calc();
	population.display();
}

function draw() {
	//background(180);

	population.rollover(mouseX, mouseY);
}

/*function keyPressed(){
	if (key == '1') points.freqX--;
	if (key == '2') points.freqX++;
	points.freqX = max(points.freqX,1);

	if (key == '3') points.freqY--;
	if (key == '4') points.freqY++;
	points.freqY = max(points.freqY,1);

	if (keyCode == LEFT_ARROW) points.phi -= 15;
	if (keyCode == RIGHT_ARROW) points.phi += 15;

	if (key == '7') points.modFreqX--;
	if (key == '8') points.modFreqX++;
	points.modFreqX = max(points.modFreqX,1);

	if (key == '9') points.modFreqY--;
	if (key == '0') points.modFreqY++;
	points.modFreqY = max(points.modFreqY,1);

	//console.log('freqX: ' + this.freqX + ', freqY: ' + this.freqY + ', phi: ' + this.phi + ', modFreqX: ' + this.modFreqX + ', modFreqY: ' + this.modFreqY);

	points.calculateLissajousPoints();
	points.drawLissajous();
} */

function nextGen() {
	population.selection();
	population.reproduction();
}
