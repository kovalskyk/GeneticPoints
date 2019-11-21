class myEllipse{
  constructor(dna_, _x,_y){
    this.xPos = _x;
    this.yPos = _y;
    this.dna = dna_;
    this.fitness = 1;

    this.wh = 70;
    this.r = new Rectangle(this.xPos - this.wh / 2, this.yPos - this.wh / 2, this.wh, this.wh);
  }

  display() {
    let genes = this.dna.genes;
    let r = map(genes[0], 0, 1, 0, 70);
    let c = color(genes[1], genes[2], genes[3]);


    push();
    translate(this.xPos, this.yPos);
    noStroke();

    // Draw the head
    fill(c);
    rectMode(CENTER);
    rect(0, 0, r, r);


    //stroke(0.25);
    if (this.rolloverOn) fill(0, 0.25);
    else noFill();
    rectMode(CENTER);
    rect(0, 0, this.wh, this.wh);

    pop();

    textAlign(CENTER);
    if (this.rolloverOn) fill(0);
    else fill(0.25);
    text('' + floor(this.fitness), this.xPos, this.yPos + 55);
  }

  getFitness() {
    return this.fitness;
  }

  getDNA() {
    return this.dna;
  }

  rollover(mx, my) {
    if (this.r.contains(mx, my)) {
      this.rolloverOn = true;
      this.fitness += 0.25;
    } else {
      this.rolloverOn = false;
    }
  }
}
