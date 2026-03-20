let img;
let cubes = [];
let cubeSize = 45; // Size of each cube
let threshold = 30; // Threshold for detecting black pixels

async function setup() {
  // Red background while asset loads
  background(255, 0, 0);

  // Wait for the image to load
  img = await loadImage('camotal_delined.jpg');

  // Create canvas with WEBGL mode
  createCanvas(800, 600, WEBGL);

  // Load pixels to analyze the image
  img.loadPixels();
  
  // Process the image to create cubes
  await processImage();
  
  console.log(`✅ Setup complete: ${cubes.length} cubes created`);
}

function processImage() {
  return new Promise((resolve) => {
    let cols = floor(img.width / cubeSize);
    let rows = floor(img.height / cubeSize);
    
    console.log(`📊 Processing grid: ${cols} x ${rows}`);
    
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let x = i * cubeSize + cubeSize/2;
        let y = j * cubeSize + cubeSize/2;
        
        // Determine if this cell is inside the black figure
        let isInside = isBlackFigure(x, y);
        
        // Create cube
        cubes.push({
          x: x - img.width/2,
          y: y - img.height/2,
          size: cubeSize * 0.9,
          type: isInside ? 'inside' : 'outside',
          rotX: random(TWO_PI),
          rotY: random(TWO_PI),
          rotSpeed: random(0.005, 0.02)
        });
      }
    }
    
    resolve();
  });
}

function isBlackFigure(x, y) {
  // Boundary check
  if (x < 0 || x >= img.width || y < 0 || y >= img.height) return false;
  
  // Get pixel color at the specified position
  let index = (floor(y) * img.width + floor(x)) * 4;
  let r = img.pixels[index];
  let g = img.pixels[index + 1];
  let b = img.pixels[index + 2];
  
  // Check if the pixel is dark enough (close to black)
  return (r + g + b) < threshold;
}

function draw() {
  // Set background
  background(255);

  // Set up lighting (directly in draw instead of separate function)
  ambientLight(100);
  directionalLight(255, 255, 255, 0, 0, -1);
  pointLight(255, 255, 255, 0, 0, 200);

  // Center the cubes
  translate(0, 0, -200);

  // Rotate slowly for better visibility
  rotateY(frameCount * 0.005);
  rotateX(sin(frameCount * 0.002) * 0.2);

  // Draw all cubes
  for (let cube of cubes) {
    push();
    translate(cube.x, cube.y, 0);
    
    // Update rotation
    cube.rotX += cube.rotSpeed;
    cube.rotY += cube.rotSpeed * 0.3;
    rotateX(cube.rotX);
    rotateY(cube.rotY);
    
    // Set color based on position
    if (cube.type === 'inside') {
      // Orange for inside the figure
      fill(255, 165, 0);
      stroke(255, 140, 0);
    } else {
      // Blue for outside
      fill(0, 100, 255);
      stroke(0, 70, 200);
    }
    
    strokeWeight(1);
    box(cube.size);
    pop();
  }
  
  // Add debug info
  push();
  resetMatrix();
  fill(0);
  noStroke();
  textSize(12);
  text(`FPS: ${floor(frameRate())} | Cubes: ${cubes.length}`, -width/2 + 20, -height/2 + 30);
  pop();
}