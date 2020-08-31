function getRandomSize(){
  let r = pow(random(0, 1),3);
  return constrain(r * 32, 2, 32);
}

class Snowflake{
  
  randomize(sx,sy){
      let x = sx || random(width);
      let y = sy || random(-100, -10);
      this.pos = createVector(x,y);
      this.vel = createVector(0, 0);
      this.acc = createVector();
      this.angle = random(TWO_PI);
      this.dir = random(2) - 1;
      this.r = getRandomSize(); 
  }

  constructor(sx, sy, img){
    this.img = img;
    this.randomize(sx, sy);
  }

  
  
  render(){
      this.offset = sin(this.angle / 5) * this.r;
      push();
      translate(this.pos.x + this.offset, this.pos.y);
      rotate(this.angle);
      this.angle+=this.dir / 10;
      imageMode(CENTER);
      image(this.img, 0, 0, this.r, this.r);
      pop();
    }
  
    applyForce(force){
      let f = force.copy();
      f.mult(this.r);
      this.acc.add(f);
    }

  update(){
    this.vel.add(this.acc);
    this.vel.limit(this.r * 0.2);
    if (this.vel.mag() < 1)
      this.vel.normalize();
    this.pos.add(this.vel);
    this.acc.mult(0);
    this.offScreen();
    if (this.pos.x < 0)
      this.pos.x = width;
    else
    if (this.pos.x > width)
      this.pos.x = 0;
  }

  offScreen(){
    if (this.pos.y > height + this.r)
      this.randomize();
  }
}