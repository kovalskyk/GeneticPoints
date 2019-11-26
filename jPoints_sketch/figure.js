class Figure{
  constructor(dna_, x_, y_){

    this.rolloverOn = false; // Are we rolling over this figure?
    this.dna = dna_; // Figure's DNA
    this.x = x_; // Position on screen
    this.y = y_;
    this.wh = 830; // Size of square enclosing face 70 |300
    this.fitness = 1; // How good is this face?
    // Using java.awt.Rectangle (see: http://java.sun.com/j2se/1.4.2/docs/api/java/awt/Rectangle.html)
    this.r = new Rectangle(this.x/3.3-120, this.y/3.2 - 150, 230, 230);

    this.pointCount = 600; //vars that don't change 1000
    this.lissajousPoints = [];
    this.lineWeight = 0.1;
    this.lineAlpha = 50;
    this.connectionRadius = 100;
    this.connectionRamp = 6;
    this.noiseVal;
    this.lineColor = color(0,50);
  }

  display() {
    let genes = this.dna.genes;

    let freqX = floor(map(genes[0], 0, 1, 1, 20));
    let freqY = floor(map(genes[1], 0, 1, 1, 20));
    let phi = floor(map(genes[2], 0, 1, 1, 15));
    let modFreqX = floor(map(genes[3], 0, 1, 1, 30));
    let modFreqY = floor(map(genes[4], 0, 1, 1, 20));

    let rr = floor(map(genes[5], 0, 1, 1, 255));
    let gg = floor(map(genes[6], 0, 1, 1, 255));
    let bb = floor(map(genes[7], 0, 1, 1, 255));

    let myalpha = floor(map(genes[8], 0, 1, 10, 255));

    let mycolor = color(rr, gg, bb, myalpha);

    for (var i = 0; i <= this.pointCount; i++) {
    	var angle = map(i, 0, this.pointCount, 0, TAU);
    	this.noiseVal = 0.1;

      // let noise = noise(noiseVal);

      let xoff = 0.0;
      let n = noise(xoff);
      let m = noise(xoff);

      // var x = sin(angle * freqX + radians(phi)) * cos(angle * modFreqX);
      // var y = sin(angle * freqY) * cos(angle * modFreqY);

    	var x = sin(angle*n * freqX + radians(phi)) * cos(angle*m * modFreqX);
    	var y = sin(angle*m * freqY) * cos(angle*n * modFreqY);
    	x *= 800 / 2 - 30;  //width / 2 - 30;
    	y *= 800 / 2 - 30; //height / 2 - 30;

    	this.lissajousPoints[i] = createVector(x,y);
    }

    push();
    //background(127);
    // noFill();

    strokeWeight(this.lineWeight);
    scale(0.3);
    translate(this.x, this.y);

    // rectMode(CENTER);
    // rect(mouth_x, mouth_y, mouthw, mouthh);

    for (var i1 = 0; i1 < this.pointCount; i1++) {
    	for (var i2 = 0; i2 < i1; i2++) {
    		var d = this.lissajousPoints[i1].dist(this.lissajousPoints[i2]);
    		var a = pow(1 / (d / this.connectionRadius + 1), 6);
    		if (d <= this.connectionRadius) {
    			stroke(mycolor, a * this.lineAlpha); //this.lineColor
    			line(
    				this.lissajousPoints[i1].x,
    				this.lissajousPoints[i1].y,
    				this.lissajousPoints[i2].x,
    				this.lissajousPoints[i2].y
    			);
    		}
    	}
    }

    // Draw the bounding box
    stroke(0.25);
    if (this.rolloverOn) fill(0, 0.25);
    else noFill();
    strokeWeight(1);
    rectMode(CENTER);
    rect(0, 0, this.wh, this.wh);

    pop();

    // // Display fitness value
    // textAlign(CENTER);
    // if (this.rolloverOn) fill(0);
    // else fill(0.25);
    // text('' + floor(this.fitness), this.x, this.y + 55);

  } //end of display()


  display2(){

  // Display fitness value
  // textAlign(CENTER);
  // if (this.rolloverOn) fill(0);
  // else fill(0.25);
  // text('' + floor(this.fitness), this.x/3.3, this.y/3+120); //this.x, this.y + 55

    // Display fitness value:
    fill(255, 0, 0);
    textSize(20);
    text('' + floor(this.fitness), this.x/3.3, this.y/3.4+160);
  }

  getFitness() {
    return this.fitness;
  }

  getDNA() {
    return this.dna;
  }

  // Increment fitness if mouse is rolling over face
  rollover(mx, my) {
    if (this.r.contains(mx, my)) {
      this.rolloverOn = true;
      this.fitness += 0.25;
    } else {
      this.rolloverOn = false;
    }
  }

  // displayFitness(){
  //   console.log(this.fitness);
  // }

}
