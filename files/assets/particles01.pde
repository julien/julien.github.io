
Particle particle;
Particle particles[];
int numParticles = 100;

void setup() {
  size(550, 400);
  background(255);
  smooth();
  // create the main particle
  particle = new Particle(width / 2, height / 2, 2);
  particle.centerX = width / 2;
  particle.centerY = height / 2;
  particle.radiusX = particle.radiusY = 100;
  particle.vx = .03;
  particle.vy = .05;
  // create the "child" particles
  particles = new Particle[numParticles];
  Particle p;
  float radius;
  float vx;
  float vy;
  for(int i = 0; i < particles.length; i++) {
    radius = random(2, 8);
    vx = random(-2, 2);
    vy = random(-3, 3);
    p = new Particle(particle.x, particle.y, radius);
    p.centerX = particle.x;
    p.centerY = particle.y;
    p.vx = vx;
    p.vy = vy;
    particles[i] = p;
  }
  frameRate(60);
}

void draw() {
  fill(0, 15);
  rect(0, 0, width, height);
  // background(255);
  fill(255);
  // move the main particle
  particle.x = particle.centerX + cos(particle.angleX) * particle.radiusX;
  particle.y = particle.centerY + sin(particle.angleY) * particle.radiusY;
  particle.angleX += particle.vx;
  particle.angleY += particle.vy;
  // particle.render();
  // make the children move too
  Particle p;
  for(int i = 0; i < particles.length; i++) {
    p = particles[i];
    p.x += p.vx;
    p.y += p.vy;

    if(p.x + (p.radius / 2) > width ||
       p.x - (p.radius / 2) < 0 ||
       p.y + (p.radius / 2) > height ||
       p.y - (p.radius / 2) < 0)
    {
       p.x = particle.x;
       p.y = particle.y;
       p.vx = random(-2, 2);
       p.vy = random(-3, 3);
    }
    p.render();
  }
}

class Particle {
  float x;
  float y;
  float radius;
  float angleX = 0;
  float angleY = 0;
  float ax = 0;
  float ay = 0;
  float centerX = 0;
  float centerY = 0;
  float spring =  0;
  float radiusX = 0;
  float radiusY = 0;
  float rangeX = 0;
  float rangeY = 0;
  float vx = 0;
  float vy = 0;
  float gravity = 0;

  public Particle(float x, float y, float radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
  }

  void render() {
    fill(255);
    ellipse(x, y, radius, radius);
  }
}
