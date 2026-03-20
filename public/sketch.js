let img;
let cubes = [];
let cubeSize = 45;
let threshold = 30;

async function setup() {
  // Simple test first
  console.log("1️⃣ Setup started");
  
  background(255, 0, 0);
  
  console.log("2️⃣ Loading image...");
  img = await loadImage('camotal_delined.jpg');
  console.log("3️⃣ Image loaded:", img.width, "x", img.height);
  
  createCanvas(800, 600, WEBGL);
  console.log("4️⃣ Canvas created");
  
  // Just create a few test cubes to verify 3D works
  for (let i = 0; i < 10; i++) {
    cubes.push({
      x: random(-200, 200),
      y: random(-200, 200),
      size: 30,
      type: 'inside',
      rotX: random(TWO_PI),
      rotY: random(TWO_PI),
      rotSpeed: random(0.005, 0.02)
    });
  }
  
  console.log("5️⃣ Test cubes created:", cubes.length);
}

function draw() {
  background(255);
  
  // Simple lighting
  ambientLight(100);
  directionalLight(255, 255, 255, 0, 0, -1);
  
  // Rotate view
  rotateY(frameCount * 0.01);
  
  // Draw test cubes
  for (let cube of cubes) {
    push();
    translate(cube.x, cube.y, 0);
    
    cube.rotX += cube.rotSpeed;
    cube.rotY += cube.rotSpeed;
    rotateX(cube.rotX);
    rotateY(cube.rotY);
    
    fill(255, 165, 0);
    stroke(255, 140, 0);
    strokeWeight(1);
    box(cube.size);
    pop();
  }
  
  // Show FPS
  push();
  resetMatrix();
  fill(0);
  text(`FPS: ${floor(frameRate())}`, -width/2 + 20, -height/2 + 30);
  pop();
}