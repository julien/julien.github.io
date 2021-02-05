function random(min, max) {
	return (Math.random() * (max - min)) + min;
}

function map(val, srcmin, srcmax, dstmin, dstmax) {
	var normalized = (val - srcmin) / (srcmax - srcmin);
	return (dstmax - dstmin) * normalized + dstmin;
}

function vec2getmag(v) {
	return Math.sqrt(v[0]*v[0] + v[1]*v[1]);
}

function vec2getmagsq(v) {
	return (v[0]*v[0] + v[1]*v[1]);
}

function vec2normalize(v) {
	var m = vec2getmag(v);
	if (m !== 0 && m !== 1) {
		v[0] /= m;
		v[1] /= m;
	}
}

function vec2limit(v, max) {
	if (vec2getmagsq(v) > max*max) {
		vec2normalize(v);
		v[0] *= max;
		v[1] *= max;
	}
}

function vec2setmag(v, len) {
	vec2normalize(v);
	v[0] *= len;
	v[1] *= len;
}

var COUNT = 1000;
var MAX_FORCE = 200;
var MAX_SPEED = 40;
var MIN_FLEE_DISTANCE = 80;
var MAX_FLEE_DISTANCE = 200;
var FLEE_DISTANCE = MIN_FLEE_DISTANCE; 

var sprites = {
	ax: new Array(COUNT).fill(0),
	ay: new Array(COUNT).fill(0),
	px: new Array(COUNT).fill(0),
	py: new Array(COUNT).fill(0),
	sx: new Array(COUNT).fill(0),
	sy: new Array(COUNT).fill(0),
	vx: new Array(COUNT).fill(0),
	vy: new Array(COUNT).fill(0),
	target: new Array(COUNT).fill([0, 0]),
};

var canvas = document.getElementById("canvas");
canvas.width = innerWidth;
canvas.height = innerHeight;

var g = canvas.getContext("webgl");

var W = canvas.clientWidth;
var H = canvas.clientHeight;

var viewMatrix = new Float32Array([
	2 / W, 0, 0, 0, 
	0, -2 / H, 0, 0,
	0, 0, 1, 1, 
	-1, 1, 0, 0
]);

var numVertices = 6;
var bufferOffset = 0;
var mouse = [0, 0];

var hw = W * 0.5;
var hh = H * 0.5;

for (var i = 0; i < COUNT; i++) {
	sprites.ax[i] = 0;
	sprites.ay[i] = 0;
	sprites.px[i] = hw + random(-300, 300);
	sprites.py[i] = hh + random(-300, 300);

	var size = 3 + random(0, 4);

	sprites.sx[i] = size;
	sprites.sy[i] = size;

	sprites.vx[i] = 0;
	sprites.vy[i] = 0;

	var target = [sprites.px[i], sprites.py[i]];

	sprites.target[i] = target;
}

var vsrc = document.getElementById("vsrc").innerText;
var fsrc = document.getElementById("fsrc").innerText;
var sp = g.createProgram();
var s;

g.shaderSource((s = g.createShader(g.VERTEX_SHADER)), vsrc);
g.compileShader(s);
g.attachShader(sp, s);

g.shaderSource((s = g.createShader(g.FRAGMENT_SHADER)), fsrc);
g.compileShader(s);
g.attachShader(sp, s);

g.linkProgram(sp);
g.useProgram(sp);
g.viewport(0, 0, g.canvas.clientWidth, g.canvas.clientHeight);
g.enable(g.BLEND);
g.blendFunc(g.SRC_ALPHA, g.ONE_MINUS_SRC_ALPHA);
g.clearColor(0.0, 0.0, 0.0, 1.0);

var positionLocation = g.getAttribLocation(sp, "a_position");

var positionData = new Float32Array(COUNT * 12);
var positionBuffer = g.createBuffer(g.ARRAY_BUFFER);
g.bindBuffer(g.ARRAY_BUFFER, positionBuffer);
g.bufferData(g.ARRAY_BUFFER, positionData, g.DYNAMIC_DRAW);
g.enableVertexAttribArray(positionLocation);
g.vertexAttribPointer(positionLocation, 2, g.FLOAT, false, 0, null);

var u_matrix = g.getUniformLocation(sp, "u_matrix");
g.uniformMatrix4fv(u_matrix, false, viewMatrix);

update();

document.body.addEventListener("mousemove", (e) => {
	mouse[0] = e.clientX;
	mouse[1] = e.clientY;
});

document.body.addEventListener("mouseout", (e) => {
	mouse[0] = 0;
	mouse[1] = 0;
});

function arrive(idx, target) {
	var f = [0, 0];
	var desired = [
		target[0] - sprites.px[idx],
		target[1] - sprites.py[idx]
	];

	var speed = MAX_SPEED;
	var d = vec2getmag(desired);
	if (d < 100) {
		speed = map(d, 0, 100, 0, MAX_SPEED);
	}
	vec2setmag(desired, speed);

	f[0] = desired[0] - sprites.vx[idx];
	f[1] = desired[1] - sprites.vy[idx];

	vec2limit(f, MAX_FORCE);
	return f;
}

function flee(idx, target) {
	var f = [0, 0];
	var desired = [
		target[0] - sprites.px[idx],
		target[1] - sprites.py[idx]
	];

	var d = vec2getmag(desired);
	if (d < FLEE_DISTANCE) {
		vec2setmag(desired, MAX_SPEED);
		desired[0] *= -1;
		desired[1] *= -1;

		f[0] = desired[0] - sprites.vx[idx];
		f[1] = desired[0] - sprites.vy[idx];
		vec2limit(f, MAX_FORCE);
	}
	return f;
}

function applyForce(idx, force) {
	sprites.ax[idx] += force[0];
	sprites.ay[idx] += force[1];

	var size = force[0] * 2;
	sprites.sx[idx] += size;
	sprites.sy[idx] += size;
}

function update() {
	requestAnimationFrame(update);

	g.clear(g.COLOR_BUFFER_BIT);
	for (var i = 0; i < COUNT; i++) {

		sprites.px[i] += sprites.vx[i];
		sprites.py[i] += sprites.vy[i];

		sprites.vx[i] += sprites.ax[i];
		sprites.vy[i] += sprites.ay[i];

		sprites.ax[i] = 0;
		sprites.ay[i] = 0;

		var a = arrive(i, sprites.target[i]);
		a[0] *= 0.09;
		a[1] *= 0.09;

		var f = flee(i, mouse);
		var r = random(0.2, 0.6);
		f[0] *= r;
		f[1] *= r;

		applyForce(i, a);
		applyForce(i, f);

		var x = sprites.px[i];
		var y = sprites.py[i];
		var w = sprites.sx[i];
		var h = sprites.sy[i];

		/* 1st triangle */
		positionData[bufferOffset + 0] = x;
		positionData[bufferOffset + 1] = y;
		positionData[bufferOffset + 2] = x + w;
		positionData[bufferOffset + 3] = y + h;
		positionData[bufferOffset + 4] = x;
		positionData[bufferOffset + 5] = y + h;
		/* 2nd triangle */
		positionData[bufferOffset + 6] = x;
		positionData[bufferOffset + 7] = y;
		positionData[bufferOffset + 8] = x + w;
		positionData[bufferOffset + 9] = y;
		positionData[bufferOffset + 10] = x + w;
		positionData[bufferOffset + 11] = y + h;

		++bufferOffset;
		
		g.bindBuffer(g.ARRAY_BUFFER, positionBuffer);
		g.bufferSubData(g.ARRAY_BUFFER, 0, positionData);

		g.drawArrays(g.TRIANGLES, 0, bufferOffset * numVertices);
		bufferOffset = 0;
	}
}
