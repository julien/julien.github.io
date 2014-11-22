(function (exports) {
  var camcapture,
    container,
    canvas,
    context,
    imgCanvas,
    imgContext,
    video,
    videoScale = {},
    requestAnimationFrame,
    config,
    filters,
    gui;


  camcapture = exports.camcapture || {};

  requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame;

  function Config() {
    this.blur = 0;
    this.brightness = 0.0;
    this.contrast = 1;
    this.grayscale = 0.0;
    this.hueRotate = 0;
    this.invert = 0;
    this.opacity = 1;
    this.saturate = 1;
    this.sepia = 0;
  }

  function onFinishChange (value) {
    if (typeof value === 'function') {
      return;
    }
    var obj, prop, val, measure = '', style = '', pval;
    obj = this.object;
    pval = {'grayscale': 'grayscale', 'invert': 'invert', 'opacity': 'opacity', 'sepia': 'sepia'};

    canvas.style.webkitFilter = '';
    // pattern = /(\w+)(\()(\d{1,3}(\.\d)?)(px|deg)?(\))/g

    for (prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        val = obj[prop];
        if (prop === 'blur') {
          measure = 'px';
        } else if (prop === 'hueRotate') {
          measure = 'deg';
        } else {
          measure = '';
        }
        if (val > 0) {
          if (prop === 'brightness' || prop === 'grayscale') {
            val = val / 10;
          }
          if (prop in pval) {
            val = val.toPrecision(2);
          } else {
            val = val.toFixed();
          }
          if (prop == 'hueRotate') {
            prop = 'hue-rotate';
          }
          style += prop + '(' + val + measure + ') ';
        }
      }
    }

    canvas.style.webkitFilter = style;

  }

  function handleMedia(stream) {
    video.setAttribute('src', window.webkitURL.createObjectURL(stream));
    videoScale.x = canvas.width / video.videoWidth;
    videoScale.y = canvas.height / video.videoHeight;
    drawVideo();
  }

  function handleError(e) {
    container.removeChild(canvas);
    container.innerHTML = 'Sorry, it didn\'t work out';
    document.body.removeChild(gui.domElement.parentNode);
  }

  function startCapture(e) {
    navigator.webkitGetUserMedia({
      audio: true, video: true
    }, handleMedia, handleError);
  }

  function drawVideo() {
    var x, y, w, h;

    requestAnimationFrame(drawVideo);

    canvas.width = canvas.width;

    x = canvas.width  / 2;
    y = canvas.height / 2;
    w = canvas.width  * videoScale.x;
    h = canvas.height * videoScale.y;

    context.save();
    context.scale(videoScale.x, videoScale.y);
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    context.restore();
  }

  function init() {
    var i, total, controller, prop;
    config = new Config();
    gui = new dat.GUI();
    filters = gui.addFolder('filters');
    filters.add(config, 'blur', 0, 10);
    filters.add(config,'brightness', 0, 10).step(1);
    filters.add(config,'contrast', 1, 10);
    filters.add(config,'grayscale', 0, 10).step(1);
    filters.add(config,'hueRotate', 0, 360);
    filters.add(config,'invert', 0, 1);
    filters.add(config,'opacity', 0, 1);
    filters.add(config,'saturate', 1, 10);
    filters.add(config,'sepia', 0, 1);
    filters.open();


    total = filters.__controllers.length;
    for (i = 0; i < total; i += 1) {
      controller = filters.__controllers[i];
      prop = controller.property;
      controller.onFinishChange(onFinishChange.bind(controller));
    }

    container = document.getElementsByTagName('div')[0];

    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');

    imgCanvas = document.getElementById('canvas');
    imgCanvas.width = canvas.width;
    imgCanvas.height = canvas.height;
    imgContext = imgCanvas.getContext('2d');

    video = document.createElement('video');
    video.setAttribute('autoplay', 'autoplay');

    startCapture();
  }

  document.addEventListener('DOMContentLoaded', init, false);
  exports.camcapture = camcapture;

}(this));
