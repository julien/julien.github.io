!(function n(o, s, h) {
	function l(i, t) {
		if (!s[i]) {
			if (!o[i]) {
				var r = "function" == typeof require && require;
				if (!t && r) return r(i, !0);
				if (u) return u(i, !0);
				var a = new Error("Cannot find module '" + i + "'");
				throw ((a.code = "MODULE_NOT_FOUND"), a);
			}
			var e = (s[i] = { exports: {} });
			o[i][0].call(
				e.exports,
				function(t) {
					return l(o[i][1][t] || t);
				},
				e,
				e.exports,
				n,
				o,
				s,
				h
			);
		}
		return s[i].exports;
	}
	for (
		var u = "function" == typeof require && require, t = 0;
		t < h.length;
		t++
	)
		l(h[t]);
	return l;
})(
	{
		1: [
			function(t, i, r) {
				"use strict";
				(r.createBuffer = function(t, i, r, a) {
					var e = t.createBuffer();
					return t.bindBuffer(i, e), t.bufferData(i, r, a), e;
				}),
					(r.createProgram = function(t, i, r) {
						var a = t.createShader(t.VERTEX_SHADER);
						t.shaderSource(a, i), t.compileShader(a);
						var e = t.createShader(t.FRAGMENT_SHADER);
						t.shaderSource(e, r), t.compileShader(e);
						var n = t.createProgram();
						return (
							t.attachShader(n, a), t.attachShader(n, e), t.linkProgram(n), n
						);
					}),
					(r.createTexture = function(t, i) {
						var r = t.createTexture();
						return (
							t.bindTexture(t.TEXTURE_2D, r),
							t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE),
							t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE),
							t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.LINEAR),
							t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, t.LINEAR),
							t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, t.RGBA, t.UNSIGNED_BYTE, i),
							t.bindTexture(t.TEXTURE_2D, null),
							r
						);
					});
			},
			{}
		],
		2: [
			function(t, i, r) {
				"use strict";
				var n,
					o,
					a,
					e,
					s,
					h = t("./renderer"),
					l = t("./vec2"),
					u = t("./gl-utils"),
					c = t("./math-utils"),
					g = 5e3,
					v = 30,
					A = 20,
					f = 100,
					D = {
						ax: Array.from(new Array(g)).fill(0),
						ay: Array.from(new Array(g)).fill(0),
						count: 0,
						dx: Array.from(new Array(g)).fill(0),
						dy: Array.from(new Array(g)).fill(0),
						hh: Array.from(new Array(g)).fill(0),
						hw: Array.from(new Array(g)).fill(0),
						px: Array.from(new Array(g)).fill(0),
						py: Array.from(new Array(g)).fill(0),
						rgba: Array.from(new Array(g)).fill(0),
						sx: Array.from(new Array(g)).fill(0),
						sy: Array.from(new Array(g)).fill(0),
						target: Array.from(new Array(g)).fill(0),
						u0: Array.from(new Array(g)).fill(0),
						u1: Array.from(new Array(g)).fill(0),
						v0: Array.from(new Array(g)).fill(0),
						v1: Array.from(new Array(g)).fill(0),
						vx: Array.from(new Array(g)).fill(0),
						vy: Array.from(new Array(g)).fill(0)
					};
				function d(t, i, r) {
					var a = [0, 0];
					if (i < g) {
						var e = [r[0] - t.px[i], r[1] - t.py[i]],
							n = A,
							o = l.get_mag(e);
						o < 100 && (n = c.map(o, 0, 100, 0, A)),
							l.set_mag(e, n),
							(a[0] = e[0] - t.vx[i]),
							(a[1] = e[1] - t.vy[i]),
							l.limit(a, v);
					}
					return a;
				}
				function x(t, i, r) {
					var a = [0, 0];
					if (i < g) {
						var e = [r[0] - t.px[i], r[1] - t.py[i]];
						l.get_mag(e) < f &&
							(l.set_mag(e, A),
							(e[0] *= -1),
							(e[1] *= -1),
							(a[0] = e[0] - t.vx[i]),
							(a[1] = e[1] - t.vy[i]),
							l.limit(a, v));
					}
					return a;
				}
				function y(t, i, r) {
					i < g &&
						((t.ax[i] += r[0]),
						(t.ay[i] += r[1]),
						(t.sx[i] += 0.0125 * r[0]),
						(t.sy[i] += 0.0125 * r[0]));
				}
				function m(t) {
					t.preventDefault(),
						t.stopPropagation(),
						0 === t.button && D.count + 100 < g && (D.count += 100),
						2 === t.button && 1 < D.count - 100 && (D.count -= 100);
				}
				function E(t) {
					0 < t.deltaY && f + 10 < 400 && (f += 10),
						t.deltaY < 0 && 60 < f - 10 && (f -= 10);
				}
				function P(t) {
					(a[0] = t.clientX), (a[1] = t.clientY);
				}
				function R(t) {
					(a[0] = t.touches[0].clientX), (a[1] = t.touches[0].clientY);
				}
				function b() {
					requestAnimationFrame(b),
						(function() {
							for (var t = 0; t < D.count; t++) {
								(D.px[t] += D.vx[t]),
									(D.py[t] += D.vy[t]),
									(D.vx[t] += D.ax[t]),
									(D.vy[t] += D.ay[t]),
									(D.ax[t] = 0),
									(D.ay[t] = 0);
								var i = d(D, t, D.target[t]);
								(i[0] *= 0.75), (i[1] *= 0.75);
								var r = x(D, t, a);
								(r[1] *= 0.75), (r[1] *= 0.75), y(D, t, i), y(D, t, r);
							}
						})(),
						(function() {
							e.cls();
							for (var t = 0; t < D.count; t++)
								(e.col = D.rgba[t]),
									e.img(
										s,
										-D.hw[t],
										-D.hh[t],
										D.dx[t],
										D.dy[t],
										0,
										D.px[t],
										D.py[t],
										D.sx[t],
										D.sy[t],
										D.u0[t],
										D.u1[t],
										D.v0[t],
										D.v1[t]
									);
							e.flush();
						})();
				}
				onload = function() {
					((n = document.getElementById("c")).width = innerWidth),
						(n.height = innerHeight),
						(e = new h(n)).bkg(0, 0, 0),
						((o = new Image()).onload = function() {
							(s = u.createTexture(e.gl, o)),
								(function() {
									for (
										var t = 0.5 * n.width, i = 0.5 * n.height, r = 0;
										r < g;
										r++
									) {
										(D.ax[r] = 0),
											(D.ay[r] = 0),
											(D.dx[r] = o.width),
											(D.dy[r] = o.height),
											(D.hw[r] = 0.5 * o.width),
											(D.hh[r] = 0.5 * o.height),
											(D.px[r] = t + c.random(-t, t)),
											(D.py[r] = i + c.random(-i, i)),
											(D.rgba[r] = 4294967295 * Math.random());
										var a = 0.15 + c.random(0.15, 0.25);
										D.sx[r] = D.sy[r] = a;
										var e = [D.px[r], D.py[r]];
										(D.target[r] = e),
											(D.u0[r] = 0),
											(D.u1[r] = 0),
											(D.v0[r] = 1),
											(D.v1[r] = 1),
											(D.vx[r] = c.random(-2, 2)),
											(D.vy[r] = c.random(-2, 2));
									}
									(D.count = 2e3), requestAnimationFrame(b);
								})();
						}),
						(o.src =
							"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAnUlEQVRYR+2XsQ6AIAxEYVD//3PVQcNAYhTKnSlphzKb3uOBUHIyHtk4PwUAbWA/j0tatm1ZqZrwx6PgNxQKAgGw4RUGgRAB/gYzNvwCaM1+tBxNA9rhEoQ/gFmz71n4GAiAMBAGzA2U/3UWROt29HcS1hNL20KvN/B7HWvuBakz8t2SPVsrdk8g/WCpDxlgQNDgWpMG0H7KBYC5gRtfzGAhGEQe7AAAAABJRU5ErkJgggAA"),
						(a = [0.5 * n.width, 0.5 * n.height]),
						document.body.addEventListener("mousemove", P, !1),
						document.body.addEventListener("touchmove", R, !1),
						document.addEventListener("mousedown", m, !1),
						document.addEventListener("mousewheel", E, !1),
						n.addEventListener("contextmenu", function(t) {
							return t.preventDefault();
						});
				};
			},
			{ "./gl-utils": 1, "./math-utils": 3, "./renderer": 4, "./vec2": 5 }
		],
		3: [
			function(t, i, r) {
				"use strict";
				function n(t, i, r) {
					return (r - i) * t + i;
				}
				function o(t, i, r) {
					return (t - i) / (r - i);
				}
				(r.lerp = n),
					(r.map = function(t, i, r, a, e) {
						return n(o(t, i, r), a, e);
					}),
					(r.norm = o),
					(r.random = function(t, i) {
						return t + Math.random() * (i - t);
					});
			},
			{}
		],
		4: [
			function(t, i, r) {
				"use strict";
				var A = t("./gl-utils"),
					b = 10922;
				function a(t) {
					var i = t.getContext("webgl");
					if (!i) throw new Error("Couldn't initialize WebGL context");
					(this.gl = i), (this.col = 4294967295);
					var r = t.width,
						a = t.height,
						e = A.createProgram(
							this.gl,
							"\nprecision lowp float;\n\nattribute float a;\nattribute vec2 b,c,d,e;\nattribute vec4 f;\nvarying vec2 g;\nvarying vec4 h;\nuniform mat4 i;\n\nvoid main() {\n  float q = cos(a);\n  float w = sin(a);\n  gl_Position = i * vec4(((vec2(d.x * q - d.y * w, d.x * w + d.y * q) * c) + b), 1.0, 1.0);\n  g = e;\n  h = f;\n}\n",
							"\nprecision lowp float;\n\nvarying vec2 g;\nvarying vec4 h;\nuniform sampler2D j;\n\nvoid main() {\n  gl_FragColor = texture2D(j, g) * h;\n}\n"
						);
					(this.vertexData = new ArrayBuffer(1747520)),
						(this.vPositionData = new Float32Array(this.vertexData)),
						(this.vColorData = new Uint32Array(this.vertexData)),
						(this.vIndexData = new Uint16Array(131064)),
						(this.IBO = A.createBuffer(
							this.gl,
							this.gl.ELEMENT_ARRAY_BUFFER,
							this.vIndexData.byteLength,
							i.STATIC_DRAW
						)),
						(this.VBO = A.createBuffer(
							this.gl,
							this.gl.ARRAY_BUFFER,
							this.vertexData.byteLength,
							i.DYNAMIC_DRAW
						)),
						(this.count = 0),
						(this.viewMatrix = new Float32Array([
							2 / r,
							0,
							0,
							0,
							0,
							-2 / a,
							0,
							0,
							0,
							0,
							1,
							1,
							-1,
							1,
							0,
							0
						])),
						this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA),
						this.gl.enable(this.gl.BLEND),
						this.gl.useProgram(e),
						this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.IBO);
					for (var n = 0, o = 0; n < 6 * b; n += 6, o += 4)
						(this.vIndexData[n + 0] = o),
							(this.vIndexData[n + 1] = o + 1),
							(this.vIndexData[n + 2] = o + 2),
							(this.vIndexData[n + 3] = o + 0),
							(this.vIndexData[n + 4] = o + 3),
							(this.vIndexData[n + 5] = o + 1);
					this.gl.bufferSubData(
						this.gl.ELEMENT_ARRAY_BUFFER,
						0,
						this.vIndexData
					),
						this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.VBO);
					var s = this.gl.getAttribLocation(e, "a"),
						h = this.gl.getAttribLocation(e, "b"),
						l = this.gl.getAttribLocation(e, "c"),
						u = this.gl.getAttribLocation(e, "d"),
						c = this.gl.getAttribLocation(e, "e"),
						g = this.gl.getAttribLocation(e, "f"),
						v = (this.locViewMatrix = this.gl.getUniformLocation(e, "i"));
					this.gl.enableVertexAttribArray(s),
						this.gl.vertexAttribPointer(s, 1, this.gl.FLOAT, !1, 40, 0),
						this.gl.enableVertexAttribArray(h),
						this.gl.vertexAttribPointer(h, 2, this.gl.FLOAT, !1, 40, 4),
						this.gl.enableVertexAttribArray(l),
						this.gl.vertexAttribPointer(l, 2, this.gl.FLOAT, !1, 40, 12),
						this.gl.enableVertexAttribArray(u),
						this.gl.vertexAttribPointer(u, 2, this.gl.FLOAT, !1, 40, 20),
						this.gl.enableVertexAttribArray(c),
						this.gl.vertexAttribPointer(c, 2, this.gl.FLOAT, !1, 40, 28),
						this.gl.enableVertexAttribArray(g),
						this.gl.vertexAttribPointer(
							g,
							4,
							this.gl.UNSIGNED_BYTE,
							!0,
							40,
							36
						),
						this.gl.uniformMatrix4fv(v, !1, this.viewMatrix),
						this.gl.activeTexture(this.gl.TEXTURE0);
				}
				(a.prototype.resize = function(t, i) {
					return (
						(this.gl.canvas.width !== t || this.gl.canvas.height !== i) &&
						((this.gl.canvas.width = t),
						(this.gl.canvas.height = i),
						this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height),
						this.gl.uniformMatrix4fv(this.locViewMatrix, !1, this.viewMatrix),
						!0)
					);
				}),
					(a.prototype.img = function(
						t,
						i,
						r,
						a,
						e,
						n,
						o,
						s,
						h,
						l,
						u,
						c,
						g,
						v
					) {
						var A = i,
							f = r,
							D = i + a,
							d = r + e,
							x = i,
							y = r + e,
							m = i + a,
							E = r,
							P = this.col,
							R = 0;
						(t !== this.currentTexture || this.count + 1 >= b) &&
							(this.gl.bufferSubData(this.gl.ARRAY_BUFFER, 0, this.vertexData),
							this.gl.drawElements(
								4,
								6 * this.count,
								this.gl.UNSIGNED_SHORT,
								0
							),
							(this.count = 0),
							t !== this.currentTexture &&
								((this.currentTexture = t),
								this.gl.bindTexture(this.gl.TEXTURE_2D, this.currentTexture))),
							(R = 40 * this.count),
							(this.vPositionData[R++] = n),
							(this.vPositionData[R++] = o),
							(this.vPositionData[R++] = s),
							(this.vPositionData[R++] = h),
							(this.vPositionData[R++] = l),
							(this.vPositionData[R++] = A),
							(this.vPositionData[R++] = f),
							(this.vPositionData[R++] = u),
							(this.vPositionData[R++] = c),
							(this.vColorData[R++] = P),
							(this.vPositionData[R++] = n),
							(this.vPositionData[R++] = o),
							(this.vPositionData[R++] = s),
							(this.vPositionData[R++] = h),
							(this.vPositionData[R++] = l),
							(this.vPositionData[R++] = D),
							(this.vPositionData[R++] = d),
							(this.vPositionData[R++] = g),
							(this.vPositionData[R++] = v),
							(this.vColorData[R++] = P),
							(this.vPositionData[R++] = n),
							(this.vPositionData[R++] = o),
							(this.vPositionData[R++] = s),
							(this.vPositionData[R++] = h),
							(this.vPositionData[R++] = l),
							(this.vPositionData[R++] = x),
							(this.vPositionData[R++] = y),
							(this.vPositionData[R++] = u),
							(this.vPositionData[R++] = v),
							(this.vColorData[R++] = P),
							(this.vPositionData[R++] = n),
							(this.vPositionData[R++] = o),
							(this.vPositionData[R++] = s),
							(this.vPositionData[R++] = h),
							(this.vPositionData[R++] = l),
							(this.vPositionData[R++] = m),
							(this.vPositionData[R++] = E),
							(this.vPositionData[R++] = g),
							(this.vPositionData[R++] = c),
							(this.vColorData[R++] = P),
							++this.count >= b &&
								(this.gl.bufferSubData(
									this.gl.ARRAY_BUFFER,
									0,
									this.vertexData
								),
								this.gl.drawElements(
									4,
									6 * this.count,
									this.gl.UNSIGNED_SHORT,
									0
								),
								(this.count = 0));
					}),
					(a.prototype.bkg = function(t, i, r) {
						this.gl.clearColor(t, i, r, 1);
					}),
					(a.prototype.cls = function() {
						this.gl.clear(this.gl.COLOR_BUFFER_BIT);
					}),
					(a.prototype.flush = function() {
						0 !== this.count &&
							(this.gl.bufferSubData(
								this.gl.ARRAY_BUFFER,
								0,
								this.vPositionData.subarray(0, 40 * this.count)
							),
							this.gl.drawElements(
								4,
								6 * this.count,
								this.gl.UNSIGNED_SHORT,
								0
							),
							(this.count = 0));
					}),
					(i.exports = a);
			},
			{ "./gl-utils": 1 }
		],
		5: [
			function(t, i, r) {
				"use strict";
				function a(t) {
					return Math.sqrt(t[0] * t[0] + t[1] * t[1]);
				}
				function e(t) {
					return t[0] * t[0] + t[1] * t[1];
				}
				function n(t) {
					var i = a(t);
					0 !== i && 1 !== i && ((t[0] /= i), (t[1] /= i));
				}
				i.exports = {
					angle: function(t, i) {
						if (0 === t[0] && 0 === t[1] && 0 === i[0] && 0 === i[1]) return 0;
						var r =
							(t[0] * i[0] + t[1] * i[1]) /
							(Math.sqrt(t[0] * t[0] + t[1] * t[1]) *
								Math.sqrt(i[0] * i[0] + i[1] * i[1]));
						return r <= -1 ? Math.PI : 1 <= r ? 0 : Math.acos(r);
					},
					dist: function(t, i) {
						var r = t[0] - i[0],
							a = t[1] - i[1];
						return Math.sqrt(r * r + a * a);
					},
					dot: function(t, i) {
						return t[0] * i[0] + t[1] * i[1];
					},
					from_angle: function(t) {
						return [Math.cos(t), Math.sin(t)];
					},
					get_mag: a,
					get_mag_sq: e,
					heading: function(t) {
						return Math.atan2(t[1], t[0]);
					},
					limit: function(t, i) {
						e(t) > i * i && (n(t), (t[0] *= i), (t[1] *= i));
					},
					normalize: n,
					rotate: function(t, i) {
						var r = t[0];
						(t[0] = t[0] * Math.cos(i) - t[1] * Math.sin(i)),
							(t[1] = r * Math.sin(i) + t[1] * Math.cos(i));
					},
					set_mag: function(t, i) {
						n(t), (t[0] *= i), (t[1] *= i);
					}
				};
			},
			{}
		]
	},
	{},
	[2]
);
