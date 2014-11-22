Walker w;

void setup() {
  size(500, 400);
  w = new Walker();
  background(0);
}

void draw() {
  noStroke();
  fill(0, random(2, 5));
  rect(0, 0, width, height);
  
  w.step();
  w.display();  
}

class Walker {
  int x, y, speedX, speedY;
  float strokeW, r, g, b, a;
  boolean randomizeColors = false;
  
  Walker() {
    x = int ((width / 2) + random(-20, 20));
    y = int ((height / 2) + random(-20, 20));
    randomizeValues();
  }
  
  void display() {
    strokeWeight(strokeW);
    stroke(r, g, b, a);
 
    if (x > width) {
      x = 0;
    } else if (x < 0) {
      x = width;
    }
    
    if (y > height) {
      y = 0;
    } else if (y < 0) {
      y = height;
    }

    if (frameCount % 10 == 0) {
      randomizeValues();
      randomizeColors = !randomizeColors;
      speedX *= -1;
    }
    point(x, y);
  }
  
  void step() {
    int choice = int (random(4));
    
    if (choice == 0) {
      x += speedX;  
    } else if (choice  == 1) {
      x -= speedX;
    } else if (choice  == 2) {
      y += speedY;
    } else {
      y -= speedY;
    }
  }
  
  void randomizeValues() {
    speedX = int (random(4, 6));
    speedY = int (random(4, 8));
    
    if (randomizeColors) {
      r = random(255);
      g = random(255);
      b = random(124);
    } else {
      r = g = b = 255;
    }
    a = random(90, 100);
    
    strokeW = random(2, 18);  
  }
  
  
}

