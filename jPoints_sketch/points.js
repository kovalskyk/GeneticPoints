// M_2_5_01
//
// Generative Gestaltung – Creative Coding im Web
// ISBN: 978-3-87439-902-9, First Edition, Hermann Schmidt, Mainz, 2018
// Benedikt Groß, Hartmut Bohnacker, Julia Laub, Claudius Lazzeroni
// with contributions by Joey Lee and Niels Poldervaart
// Copyright 2018
//
// http://www.generative-gestaltung.de
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * draw lissajous figures with all points connected
 *
 * KEYS
 * 1/2               : frequency x -/+
 * 3/4               : frequency y -/+
 * arrow left/right  : phi -/+
 * 7/8               : modulation frequency x -/+
 * 9/0               : modulation frequency y -/+
 * s                 : save png
 */
 class Points{
   constructor(dna_, x_, y_) {
     this.xPos = x_;
     this.yPos = y_;
     this.dna = dna_;
     this.wh = 730;
     this.r = new Rectangle(this.xPos - this.wh / 2, this.yPos - this.wh / 2, this.wh, this.wh);
     this.pointCount = 600;
     this.lissajousPoints = [];
     //freqX = 4;
     this.freqY = 7;
     this.phi = 15;

     this.modFreqX = 3;
     this.modFreqY = 2;

     this.lineWeight = 0.1;
     this.lineColor;
     this.lineAlpha = 50;

     this.connectionRadius = 100;
     this.connectionRamp = 6;

     this.noiseVal;
     this.fitness = 1;
   }

calc() {
  let genes = this.dna.genes;
  let freqX = genes[0];

    for (var i = 0; i <= this.pointCount; i++) {
      var angle = map(i, 0, this.pointCount, 0, TAU);
      this.noiseVal += 0.1;

      var x = sin(angle * freqX + radians(this.phi)) * cos(angle * this.modFreqX);
      var y = sin(angle * this.freqY) * cos(angle * this.modFreqY);
      x *= 800 / 2 - 30;
      y *= 800 / 2 - 30;

      this.lissajousPoints[i] = createVector(x,y);
    }
  }

  display(){
    push();
    strokeWeight(lineWeight);
    scale(0.3);
    translate(this.xPos, this.yPos);
    for (var i1 = 0; i1 < pointCount; i1++) {
      for (var i2 = 0; i2 < i1; i2++) {
        var d = this.lissajousPoints[i1].dist(this.lissajousPoints[i2]);
        var a = pow(1 / (d / this.connectionRadius + 1), 6);
        if (d <= this.connectionRadius) {
          stroke(lineColor, a * this.lineAlpha);
          line(
            this.lissajousPoints[i1].x,
            this.lissajousPoints[i1].y,
            this.lissajousPoints[i2].x,
            this.lissajousPoints[i2].y
          )
        }
      }
    }

    if (this.rolloverOn) fill(0, 0.25);
    else
    noFill();
    strokeWeight(1);
    rectMode(CENTER);
    rect(0, 0, this.wh, this.wh);
    pop();

    textAlign(CENTER);
    fill(255, 0, 0);
    textSize(20);
    text('' + floor(this.fitness), this.xPos/2-100, this.yPos/3);
  }

  rollover() {
    this.fitness += 1;
}
}



  /*keyPressed(){
	if (key == '1') freqX--;
	if (key == '2') freqX++;
	freqX = max(freqX,1);

	if (key == '3') this.freqY--;
	if (key == '4') this.freqY++;
	this.freqY = max(this.freqY,1);

	if (keyCode == LEFT_ARROW) this.phi -= 15;
	if (keyCode == RIGHT_ARROW) this.phi += 15;

	if (key == '7') this.modFreqX--;
	if (key == '8') this.modFreqX++;
	this.modFreqX = max(this.modFreqX,1);

	if (key == '9') this.modFreqY--;
	if (key == '0') this.modFreqY++;
	this.modFreqY = max(this.modFreqY,1);

	this.calculateLissajousPoints();
	this.drawLissajous();
*/
