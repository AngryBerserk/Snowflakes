let snow = [];
let gravity;

let zoff = 0;

let spritesheet;
let textures = [];

//let wind;

function preload(){
	spritesheet  = loadImage('f32.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  gravity = createVector(0, 0.1);
  for (let x = 0; x < spritesheet.width; x+=32)
  for (let y = 0; y < spritesheet.height; y+=32){
  	let img = spritesheet.get(x,y,32,32);
  	textures.push(img);
  }
  for (let i = 0; i < 300; i++){
  	let x = random(width);
  	let y = random(height);
  	snow.push(new Snowflake(x,y, random(textures)));
  }
  
}

function draw() {
  background(0);
  zoff += 0.01;
  for (flake of snow){
  	let xoff = flake.pos.x / width;
  	let yoff = flake.pos.y / height;
  	let wAngle = noise(xoff, yoff, zoff) * TWO_PI;
  	let wind = p5.Vector.fromAngle(wAngle);
  	wind.mult(0.05);
    flake.applyForce(gravity);
    flake.applyForce(wind);
    flake.update();
    flake.render();
  }
}