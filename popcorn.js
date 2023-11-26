var POINT_SIZE = 5;
var NUM_POINTS = 500;

var canvas = document.getElementById("canvas");
canvas.width = innerWidth;
canvas.height = innerHeight;

var g = canvas.getContext("webgl");
var W = canvas.clientWidth;
var H = canvas.clientHeight;
var hw = W * 0.5;
var hh = W * 0.5;

var mouse = [
	0,
	0,
	hw + random(-200, 200),
	hh + random(-200, 200),
	random(0.02, 0.3),
	random(0.02, 0.3)
];

document.body.addEventListener("mousemove", (e) => {
	mouse[2] = e.clientX;
	mouse[3] = e.clientY;
});

var viewMatrix = new Float32Array([
	2 / W, 0, 0, 0, 
	0, -2 / H, 0, 0,
	0, 0, 1, 1, 
	-1, 1, 0, 0
]);

var TOTAL_POINTS = NUM_POINTS * POINT_SIZE;
var points = new Array(TOTAL_POINTS);
for (var i = 0; i < TOTAL_POINTS; i += POINT_SIZE) {
	points[i] =   hw + random(-400, 400);
	points[i+1] = hh + random(-400, 400);

	var size = 8 + Math.random() * 40 - 10;

	if (size < 8) size = 8;

	points[i+2] = size;
	points[i+3] = random(-10, 10) * Math.sin(i);
	points[i+4] = random(-10, 10) * Math.sin(i);
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

var POSITION_SIZE = 3;
var TOTAL_POSITIONS = NUM_POINTS * POSITION_SIZE;
var positionData = new Float32Array(TOTAL_POSITIONS);
for (var i = 0, j = 0; i < TOTAL_POINTS; i += POINT_SIZE, j += POSITION_SIZE) {

	positionData[j] = points[i];
	positionData[j+1] = points[i+1];
	positionData[j+2] = points[i+2];
}
var positionBuffer = g.createBuffer(g.ARRAY_BUFFER);
g.bindBuffer(g.ARRAY_BUFFER, positionBuffer);
g.bufferData(g.ARRAY_BUFFER, positionData, g.DYNAMIC_DRAW);
g.enableVertexAttribArray(positionLocation);
g.vertexAttribPointer(positionLocation, 3, g.FLOAT, false, 0, null);

var u_matrix = g.getUniformLocation(sp, "u_matrix");
g.uniformMatrix4fv(u_matrix, false, viewMatrix);

var img = new Image();
var texture;
img.onload = function () {
	texture = createTexture(g, img);
	g.activeTexture(g.TEXTURE0);
	update();
};
img.src =
	"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAnUlEQVRYR+2XsQ6AIAxEYVD//3PVQcNAYhTKnSlphzKb3uOBUHIyHtk4PwUAbWA/j0tatm1ZqZrwx6PgNxQKAgGw4RUGgRAB/gYzNvwCaM1+tBxNA9rhEoQ/gFmz71n4GAiAMBAGzA2U/3UWROt29HcS1hNL20KvN/B7HWvuBakz8t2SPVsrdk8g/WCpDxlgQNDgWpMG0H7KBYC5gRtfzGAhGEQe7AAAAABJRU5ErkJgggAA";

function update() {
	requestAnimationFrame(update);

	var dx = (mouse[2] - mouse[0]);
	var dy = (mouse[3] - mouse[1]);

	if (Math.abs(dx) < 1 && Math.abs(dy) < 1) {
		mouse[2] = W * 0.5 + random(-200, 200);
		mouse[3] = H * 0.5 + random(-200, 200);

		mouse[4] = random(0.02, 0.1);
		mouse[5] = random(0.02, 0.1);
	} else {
		var vx = dx * mouse[4];
		var vy = dy * mouse[5];
		mouse[0] += vx;
		mouse[1] += vy;
	}

	for (var i = 0, j = 0; i < TOTAL_POINTS; i += POINT_SIZE, j += POSITION_SIZE) {
		var dx = mouse[0] - points[i];
		var dy = mouse[1] - points[i+1];
		var acc = 80 / (dx*dx + dy*dy);

		var ax = acc * dx;
		var ay = acc * dy;

		points[i+3] += ax;
		points[i+4] += ay;

		points[i] += points[i+3];
		points[i+1] += points[i+4];

		points[i+3] *= 0.76;
		points[i+4] *= 0.76;

		if (points[i] > W) {
			points[i] = 0;
		} else if (points[i] < 0) {
			points[i] = W;
		}

		if (points[i+1] > H) {
			points[i+1] = 0;
		} else if (points[i+1] < 0) {
			points[i+1] = H;
		}

		positionData[j] = points[i];
		positionData[j+1] = points[i+1];
		positionData[j+2] = points[i+2];
	}

	g.clear(g.COLOR_BUFFER_BIT);
	g.bufferSubData(g.ARRAY_BUFFER, 0, positionData);
	g.drawArrays(g.POINTS, 0, NUM_POINTS);
}

function random(min, max) {
	return (Math.random() * (max - min)) + min;
}

function createTexture(gl, image) {
	const tex = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D, tex);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
	// gl.generateMipmap(gl.TEXTURE_2D);
	return tex;
}
