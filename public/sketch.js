let img;
let cubes = [];
let cubeSize = 45; // Size of each cube
let threshold = 30; // Threshold for detecting black pixels

async function setup() {

  // Red background while asset loads
  background(255, 0, 0);

  // Wait for the image to load
  img = await loadImage('camotal_delined.jpg');

  console.log("✅ Image loaded:", img.width, "x", img.height);
  
  // Create canvas
  createCanvas(img.width, img.height);
  
  // Display original image faintly in background
  tint(255, 100);
  image(img, 0, 0);
  noTint();
  
  // Load pixels for analysis
  img.loadPixels();
  
  // Process the image to find black areas
  await processImage();
  
  // Draw the grid overlay
  drawGrid();
  
  console.log(`✅ Processed ${cubes.length} cubes`);
}

async function processImage() {
  console.log("🔄 Processing image pixels...");
  
  let cols = floor(img.width / cubeSize);
  let rows = floor(img.height / cubeSize);
  
  console.log(`Grid size: ${cols} x ${rows} cells`);
  
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * cubeSize + cubeSize/2;
      let y = j * cubeSize + cubeSize/2;
      
      // Check if this cell contains black
      let isInside = isBlackFigure(x, y);
      
      cubes.push({
        x: x,
        y: y,
        size: cubeSize * 0.9,
        type: isInside ? 'inside' : 'outside'
      });
    }
  }
}

function drawGrid() {
  // Draw all cells
  for (let cube of cubes) {
    push();
    translate(cube.x, cube.y);
    rectMode(CENTER);
    
    if (cube.type === 'inside') {
      fill(255, 165, 0, 150); // Orange semi-transparent
      stroke(255, 140, 0);
    } else {
      fill(0, 100, 255, 100); // Blue semi-transparent
      stroke(0, 70, 200);
    }
    
    strokeWeight(1);
    rect(0, 0, cube.size, cube.size);
    pop();
  }

  // Add statistics
  let insideCount = cubes.filter(c => c.type === 'inside').length;
  let outsideCount = cubes.filter(c => c.type === 'outside').length;
  
  push();
  fill(0);
  noStroke();
  textSize(16);
  text(`Orange (inside): ${insideCount}`, 20, 30);
  text(`Blue (outside): ${outsideCount}`, 20, 50);
  text(`Total cells: ${cubes.length}`, 20, 70);
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

function draw() {
  noLoop();
}