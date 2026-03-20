// SUPER MINIMAL TEST
console.log("🚀 Minimal sketch.js loaded");

function setup() {
    console.log("📝 Setup started");
    
    // Try to create canvas with different methods
    try {
        let canvas = createCanvas(400, 400);
        console.log("✅ Canvas created:", canvas);
        
        background(255, 0, 0); // Bright red
        console.log("✅ Background set to red");
        
        // Draw a white circle
        fill(255);
        noStroke();
        circle(200, 200, 100);
        console.log("✅ Circle drawn");
        
    } catch (e) {
        console.error("❌ Error in setup:", e);
    }
}

function draw() {
    // Optional: update something
    // console.log("draw frame:", frameCount);
}