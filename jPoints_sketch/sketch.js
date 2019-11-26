let population;
let info;

function setup() {
	createCanvas(1500, 800); //createCanvas(800, 124); createCanvas(windowWidth, windowHeight);
	colorMode(RGB, 255, 255, 255, 100); //colorMode(RGB, 1.0, 1.0, 1.0, 1.0);

	let popmax = 10;
	let mutationRate = 0.01; // A pretty high mutation rate here, our population is rather small we need to enforce variety
	// Create a population with a target phrase, mutation rate, and population max

	population = new Population(mutationRate, popmax);

	// A simple button class
	button = createButton("evolve new generation");
	button.mousePressed(nextGen);
	button.position(750/2, 700); //windowWidth/2, windowHeight-100
	info = createDiv('');
	info.position(750/2 + 30, 680); //10, 175

console.log(population);
	population.display();

}

function draw() {

	for (let y = 0; y < 2; y++) {
    for (let x = 0; x < 5; x++) {

			rectMode(CENTER);
      fill(255);
			noStroke();
      rect(140+x*275, 300+y*320 + 10, 40, 40);

    }
  }

	population.display3();

	// background(255); //white background - otherwise the displayed stuff just builds up on top of itself
  // Display the faces
  // population.display();
  population.rollover(mouseX, mouseY);
  info.html("Generation #:" + population.getGenerations());
}

// function keyPressed() {
// 	console.log("shit");
// }

// If the button is clicked, evolve next generation
function nextGen() {
	background(255);

  population.selection();
  population.reproduction();

	population.display();
	console.log(population);
}
