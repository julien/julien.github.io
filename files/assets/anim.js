
function randomRange(min, max) {
  if (isNaN(min)) {
    min = 0;
    max = 1;
  } else if (isNaN(max)) {
    max = min;
    min = 0;
  }
  return (Math.random() * (max - min)) + min;
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function vec2_angle(v, val) {
  var len;
  if (!!val) {
    len = v.length();
    a.x = Math.cos(val) * len;
    a.y = Math.sin(val) * len;
  } else {
    return Math.atan2(a.x, a.y);
  }
}

function vec2_length(v, val) {
  var angle;
  if (val) {
    angle = vec2_angle(v);
    v.x = Math.cos(angle) * val;
    v.y = Math.sin(angle) * val;
  } else {
    return Math.sqrt(v.x * v.x + v.y * v.y);
  }
}

function vec2_normalize(v) {
  var len = vec2_length(v);
  if (len && len !== 1) {
    v.x /= len;
    v.y /= len;
  }
}

