let img;
let cubes = [];
let cubeSize = 45;
let threshold = 30;
let rotationSpeed = 0.005;

async function setup() {
  // Red background while asset loads
  background(255, 0, 0);
  
  console.log("🔄 Loading image...");
  
  // Wait for the image to load
  img = await loadImage('camotal_delined.jpg');
  
  console.log("✅ Image loaded:", img.width, "x", img.height);
  
  // Create canvas with WEBGL for 3D
  createCanvas(800, 600, WEBGL);
  
  // Load pixels for analysis
  img.loadPixels();
  
  // Process the image to find black areas
  await processImage();
  
  console.log(`✅ Generated ${cubes.length} cubes (${cubes.filter(c => c.type === 'inside').length} inside, ${cubes.filter(c => c.type === 'outside').length} outside)`);
  
  // Set up lighting
  setupLighting();
}

async function processImage() {
  let cols = floor(img.width / cubeSize);
  let rows = floor(img.height / cubeSize);
  
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * cubeSize + cubeSize/2;
      let y = j * cubeSize + cubeSize/2;
      
      // Check if this cell contains black
      let isInside = isBlackFigure(x, y);
      
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
}

function draw() {
  background(255);
  
  // Center the figure
  translate(0, 0, -200);
  
  // Auto rotation
  rotateY(frameCount * rotationSpeed);
  rotateX(sin(frameCount * 0.002) * 0.2);
  
// Draw all cubes
  for (let cube of cubes) {
    push();
    translate(cube.x, cube.y, 0);
    
    // Update individual cube rotation
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
  
  // Add instructions
  push();
  resetMatrix();
  fill(0);
  noStroke();
  textSize(14);
  textAlign(LEFT);
  text(`FPS: ${floor(frameRate())} | Cubes: ${cubes.length}`, -width/2 + 20, -height/2 + 30);
  text("Press SPACE to toggle rotation | Click and drag to rotate view", -width/2 + 20, -height/2 + 50);
  pop();
}

function isBlackFigure(x, y) {
  // Boundary check
  if (x < 0 || x >= img.width || y < 0 || y >= img.height) return false;
  
  let index = (floor(y) * img.width + floor(x)) * 4;
  let r = img.pixels[index];
  let g = img.pixels[index + 1];
  let b = img.pixels[index + 2];
  
  return (r + g + b) < threshold;
}

