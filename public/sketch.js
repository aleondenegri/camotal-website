let img;
let cubes = [];
let cubeSize = 45; // Size of each cube
let threshold = 30; // Threshold for detecting black pixels

async function setup() {

  // Red background while asset loads
  background(255, 0, 0);

  // Wait for the image to load
  img = await loadImage('assets/camotal_delined.jpg');

  // box() is supported in WEBGL mode
  createCanvas(img.width, img.height, WEBGL);

  // Use CORNER mode.
  imageMode(CENTER);

  // Draw the image.
  image(img, 0, 0);

  // Load pixels to analyze the image
  img.loadPixels();
  
  let cols = floor(img.width / cubeSize);
  let rows = floor(img.height / cubeSize);
  
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * cubeSize + cubeSize/2;
      let y = j * cubeSize + cubeSize/2;
      
      // Determine if this cell is inside the black figure
      let isInside = isBlackFigure(x, y);
      
      // Always create a cube, but with different colors
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
 
  // Remove the displayed image and draw cubes in 3D
  clear();

  describe('A red brick wall.');
}

function isBlackFigure(x, y) {
  // Get pixel color at the specified position
  let index = (floor(y) * img.width + floor(x)) * 4;
  let r = img.pixels[index];
  let g = img.pixels[index + 1];
  let b = img.pixels[index + 2];
  
  // Check if the pixel is dark enough (close to black)
  return (r + g + b) < threshold;
}


function draw() {
  //background(200);

  // Enable orbiting with the mouse.
  //orbitControl();

  // Center the cubes
  translate(width/2 - img.width/2.5, height/2 - img.height/1.9, -150);

  // Rotate slowly for better visibility
  rotateY(PI/50)//animated rotation: rotateY(frameCount * 0.01);
  rotateX(PI/5)//animated rotation: rotateX(frameCount * 0.005);

  // Style the box.
  //normalMaterial();

  // Draw the box.
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
}



