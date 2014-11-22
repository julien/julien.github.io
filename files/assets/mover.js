(function () {
  'use strict';

  var MOVER_TEXTURE = new PIXI.Texture.fromImage('assets/particle03.png')
    , MOVER_GRAVITY = 0.4;

  function Mover(mass, x, y) {
    PIXI.Sprite.call(this, MOVER_TEXTURE);

    this.mass = mass || randomRange(4, 10);

    this.position.x = x;
    this.position.y = y;
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;

    this.blendMode = PIXI.blendModes.ADD;
    this.size = randomRange(2, 8);
    this.width = this.height = this.size;

    this.acceleration = new PIXI.Point(0, 0);
    this.velocity = new PIXI.Point(randomRange(-2, 2), randomRange(-2, 2));
    this.damp = -0.978;
  }

  Mover.prototype = Object.create(PIXI.Sprite.prototype);
  Mover.prototype.constructor = Mover;

  Mover.prototype.applyForce = function (point) {
    var f = new PIXI.Point(point.x / this.mass, point.y / this.mass);
    this.acceleration.x += f.x;
    this.acceleration.y += f.y;
  };

  Mover.prototype.update = function () {
    this.velocity.x += this.acceleration.x;
    this.velocity.y += this.acceleration.y;

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    this.acceleration.x *= 0;
    this.acceleration.y *= 0;

  };

  Mover.prototype.checkEdges = function (width, height) {
    var r = this.size / 2;

    if (this.position.x > width - r) {
      this.position.x = width - r;
      this.velocity.x *= this.damp;
    } else if (this.position.x < r) {
      this.position.x = r;
      this.velocity.x *= this.damp;
    }

    if (this.position.y > height - r) {
      this.position.y = height - r;
      this.velocity.y *= this.damp;
    } else if (this.position.y < r) {
      this.position.y = r;
      this.velocity.y *= this.damp;
    }
  };

  Mover.prototype.attract = function (mover) {
    var force, distance, strength;

    force = new PIXI.Point(this.position.x - mover.position.x, this.position.y - mover.position.y);

    distance = vec2_length(force);
    distance = clamp(distance, 5, 25);

    vec2_normalize(force);

    strength = (MOVER_GRAVITY * this.mass * mover.mass) / (distance * distance);

    force.x *= strength;
    force.y *= strength;

    return force;
  };

  window.Mover = Mover;
}());

