Particle particles[] = new Particle[500];

void setup() {
  size(640, 360);
  background(255);
  smooth();
  for (int i = 0; i < particles.length; i++) {
    particles[i] = new Particle();
    particles[i].xoff = 1000 * (i + i);
    // particles[i].rad = random(40, 100);
    particles[i].ellipseSize = random(4, 16);
    particles[i].topspeed = random(4, 10);
  }
}

void draw() {
  noStroke();
  smooth();
  fill(255, 50);
  rect(0, 0, width, height);
  
  for (int i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].display();
  }
}

class Particle {
  PVector location, 
     velocity, 
     acceleration;
  
  float topspeed,
    xoff, 
    yoff,
    x, 
    y,
    rad,
    centerX, 
    centerY,
    angleX, 
    angleY,
    speedX,
    speedY,
    ellipseSize;
  
  Particle() {
    location = new PVector(width / 2, height / 2);
    velocity = new PVector(0, 0);
    topspeed = 4;
    xoff = 1000;
    yoff = 0;
    centerX = width / 2;
    centerY = height / 2;
    rad = random(100, 200);
    angleX = 0;
    angleY = 0;
    ellipseSize = min(16, random(16, 30));
  }
  
  void update() {
    x = centerX + cos(angleX * .5) * rad;
    y = centerY + sin(angleY * .2) * rad;
    
    angleX += 0.1; 
    angleY += 0.1;
    
    PVector mouse = new PVector(x, y);
    PVector dir = PVector.sub(mouse, location);
    dir.normalize();
    dir.mult(0.9);
    acceleration = dir;
    
    velocity.add(acceleration);
    velocity.limit(topspeed);
    location.add(velocity);
    
  }
  
  void display() {
    noStroke();
    fill(0);
    ellipse(location.x, location.y, ellipseSize, ellipseSize);
  }
  
  void checkEdges() {
    if (location.x > width) {
      location.x = 0;
    } else if (location.x < 0) {
      location.x = width;
    }
    
    if (location.y > height) {
      location.y = 0;
    } else if (location.y < 0) {
      location.y = height;
    }
  }
}

