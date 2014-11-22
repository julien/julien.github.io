Walker walker;

void setup() {
  size(640, 360);
  background(0);
  walker = new Walker();
}

void draw() {
  fill(0, 5);
  noStroke();
  rect(0, 0, width, height);
  walker.step();
  walker.display();
}
class Walker {
  float x, y, tx, ty;
  
  Walker() {
    x = width / 2;
    y = height / 2;
    tx = 0;
    ty = 3000;
  }
  
  void display() {
    strokeWeight((int) random(1, 6));
    stroke(255);
    point(x, y);
  }
  
  void step() {
    x = map(noise(tx), 0, 1, 0, width);
    y = map(noise(ty), 0, 1, 0, height);
    tx += 0.01;
    ty += 0.02;
  }
}

