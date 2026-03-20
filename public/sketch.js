let img;
let cubes = [];
let cubeSize = 45; // Size of each cube
let threshold = 30; // Threshold for detecting black pixels

async function setup() {

  // Red background while asset loads
  background(255, 0, 0);

  // Wait for the image to load
  img = await loadImage('camotal_delined.jpg');

  // box() is supported in WEBGL mode
  createCanvas(img.width, img.height, WEBGL);

  // Use CORNER mode.
  imageMode(CENTER);

  // Draw the image.
  image(img, 0, 0);

  // Add text confirmation
  fill(0);
  textSize(24);
  text("✅ Image loaded successfully!", 20, 40);
  
  console.log("✅ Setup complete - check the canvas!");

  }

function draw() {
  // No loop needed for this test
  noLoop();
}