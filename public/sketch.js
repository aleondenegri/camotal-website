console.log("MINIMAL TEST - START");

function setup() {
    console.log("SETUP - creating canvas");
    createCanvas(400, 400);
    background(255, 0, 0); // Bright red
}

function draw() {
    console.log("DRAW - frame", frameCount);
    
    // Fill with changing color
    background(frameCount % 255, 100, 150);
    
    // Draw circle at mouse
    fill(255);
    noStroke();
    circle(mouseX, mouseY, 50);
}