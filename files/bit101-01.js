(function () {
  /* this is a port of Keith Peter's (@bit-101) ActionScript code */
  var degreesToRadians
    , isCanvas
    , checkDistance
    , update
    , resize
    , init, canvas
    , context
    , food
    , fleets
    , numFleets;

  degreesToRadians = function(value) {
    return value * Math.PI / 180;
  };

  isCanvas = function(c) {
    return Object.prototype.toString.call(c) === '[object HTMLCanvasElement]';
  };


  function Food(canvas, x, y) {
    if (!canvas || !isCanvas(canvas)) { throw 'Canvas object must be defined.'; }

    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');
    this.x = x || 0;
    this.y = y || 0;
    this.radius = 40;
    this.scale = 1.0;
  }

  Food.prototype = {
    display: function() {
      if (this.scale > 0) {
        var r = this.radius * this.scale;
        this.context.save();
        this.context.lineWidth = 3;
        this.context.beginPath();
        this.context.arc(this.x, this.y, r, 0, Math.PI * 2, true);
        this.context.closePath();
        this.context.stroke();
        this.context.restore();
      }
    }
  };

  function Fleet(canvas, x, y) {
    if (!canvas || !isCanvas(c)) { throw 'Canvas is not defined'; }

    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');
    this.x = x || 0;
    this.y = y || 0;
    this.angle = 0;
    this.ate = 0;
    this.capacity = 10;
    this.distX = 0;
    this.distY = 0;
    this.full = false;
    this.lineLength = 10;
    this.radius = 10;
  }

  Fleet.prototype = {
    display: function() {
      this.context.save();
      this.context.translate(this.x, this.y);
      this.context.rotate(degreesToRadians(this.angle));
      this.context.beginPath();
      this.context.moveTo(0, 0);
      this.context.lineTo(0, this.lineLength);
      this.context.closePath();
      this.context.stroke();

      this.context.beginPath();
      this.context.arc(0, this.lineLength + this.radius, this.radius, 0, Math.PI * 2, true);
      this.context.closePath();
      this.context.stroke();
      this.context.restore();
    }
  };

  // kinda silly but kinda "works"
  checkDistance = function(fleet) {
    var dx, dy, dist;
    dx = fleet.x - food.x;
    dy = fleet.y - food.y;
    dist = Math.sqrt(dx * dx + dy * dy);
    return dist;
  };


  update = function() {
    var i, f, restX = 0,
        restY = 0,
        angle;

    //context.clearRect(0, 0, canvas.width, canvas.height);
    canvas.width = canvas.width; // same as above.

    for (i = 0; i < numFleets; i += 1) {
      f = fleets[i];
      if (f.full) {
        f.distX = restX - f.x;
        f.distY = restY - f.y;
        f.ate -= 0.002;
        if (f.ate < 1) {
          f.full = false;
        }
      } else {
        f.distX = food.x - f.x;
        f.distY = food.y - f.y;
      }
      angle = Math.atan2(f.distY, f.distX);
      f.angle = angle * 180 / Math.PI + 90;

      if (checkDistance(f) < food.radius && !f.full) {
        food.scale -= 0.002;
        f.ate += 1;
        if (f.ate > f.capacity) {
          f.full = true;
          f.ate = 0;
          restX = Math.random() * canvas.width + f.x;
          restY = Math.random() * canvas.height + f.y;
          f.x = Math.random() * canvas.width;
          f.y = Math.random() * canvas.height;
          f.angle = (Math.random() * 360) * 180 / Math.PI + 90;
        }
        if (food.scale < 0.1) {
          food.scale = 1;
          food.x = Math.random() * canvas.width;
          food.y = Math.random() * canvas.height;
        }
      }
      f.x += f.distX / 10;
      f.y += f.distY / 10;
      f.display();
    }
    food.display();
    window.requestAnimationFrame(update);
  };

  resize = function(e) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  window.onresize = resize;


  canvas = document.getElementById('c');
  resize();
  context = canvas.getContext('2d');

  var i, w = canvas.width,
      h = canvas.height;
  numFleets = 10;
  fleets = [];

  food = new Food(canvas, w / 2, h / 2);
  food.display();

  for (i = 0; i < numFleets; i += 1) {
    fleets[i] = new Fleet(canvas, Math.random() * w, Math.random() * h);
    fleets[i].display();
  }
  update();

}());
