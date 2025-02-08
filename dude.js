function createShader(gl, src, type) {
    var s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        var e = gl.getShaderInfoLog(s);
        gl.deleteShader(s);
        throw new Error(e);
    }
    return s;
}

function createProgram(gl, vshader, fshader) {
    var p = gl.createProgram();
    gl.attachShader(p, vshader);
    gl.attachShader(p, fshader);
    gl.linkProgram(p);

    if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
        var e = gl.getProgramInfoLog(p);
        gl.deleteProgram(p);
        throw new Error(e);
    }

    gl.detachShader(p, vshader);
    gl.detachShader(p, fshader);
    gl.deleteShader(vshader);
    gl.deleteShader(fshader);
    return p;
}

function getProgramInfo(gl, program) {
    var out = {};
    var attribs = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);
    var i, info;
    for (i = 0; i < attribs; i++) {
        info = gl.getActiveAttrib(program, i);
        out[info.name] = {
            location: gl.getAttribLocation(program, info.name),
            name: info.name,
            size: info.size,
            type: info.type,
            attribute: true
        };
    }

    var unis = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
    for (i = 0; i < unis; i++) {
        info = gl.getActiveUniform(program, i);
        var uni = gl.getActiveUniform(program, i);
        out[info.name] = {
            location: gl.getUniformLocation(program, info.name),
            name: info.name,
            size: info.size,
            type: info.type,
            uniform: true
        };
    }
    return out;
}

class M3x3 {
    constructor() {
        this.matrix = [ 1, 0, 0, 0, 1, 0, 0, 0, 1 ];
    }
    multiply(m) {
        var output = new M3x3();
        output.matrix = [
            this.matrix[M3x3.M00] * m.matrix[M3x3.M00] + this.matrix[M3x3.M10] * m.matrix[M3x3.M01] + this.matrix[M3x3.M20] * m.matrix[M3x3.M02],
            this.matrix[M3x3.M01] * m.matrix[M3x3.M00] + this.matrix[M3x3.M11] * m.matrix[M3x3.M01] + this.matrix[M3x3.M21] * m.matrix[M3x3.M02],
            this.matrix[M3x3.M02] * m.matrix[M3x3.M00] + this.matrix[M3x3.M12] * m.matrix[M3x3.M01] + this.matrix[M3x3.M22] * m.matrix[M3x3.M02],

            this.matrix[M3x3.M00] * m.matrix[M3x3.M10] + this.matrix[M3x3.M10] * m.matrix[M3x3.M11] + this.matrix[M3x3.M20] * m.matrix[M3x3.M12],
            this.matrix[M3x3.M01] * m.matrix[M3x3.M10] + this.matrix[M3x3.M11] * m.matrix[M3x3.M11] + this.matrix[M3x3.M21] * m.matrix[M3x3.M12],
            this.matrix[M3x3.M02] * m.matrix[M3x3.M10] + this.matrix[M3x3.M12] * m.matrix[M3x3.M11] + this.matrix[M3x3.M22] * m.matrix[M3x3.M12],

            this.matrix[M3x3.M00] * m.matrix[M3x3.M20] + this.matrix[M3x3.M10] * m.matrix[M3x3.M21] + this.matrix[M3x3.M20] * m.matrix[M3x3.M22],
            this.matrix[M3x3.M01] * m.matrix[M3x3.M20] + this.matrix[M3x3.M11] * m.matrix[M3x3.M21] + this.matrix[M3x3.M21] * m.matrix[M3x3.M22],
            this.matrix[M3x3.M02] * m.matrix[M3x3.M20] + this.matrix[M3x3.M12] * m.matrix[M3x3.M21] + this.matrix[M3x3.M22] * m.matrix[M3x3.M22]
        ];
            return output;
    }
    transition(x, y) {
        var output = new M3x3();
        output.matrix = [
            this.matrix[M3x3.M00],
            this.matrix[M3x3.M01],
            this.matrix[M3x3.M02],

            this.matrix[M3x3.M10],
            this.matrix[M3x3.M11],
            this.matrix[M3x3.M12],

            x * this.matrix[M3x3.M00] + y * this.matrix[M3x3.M10] + this.matrix[M3x3.M20],
            x * this.matrix[M3x3.M01] + y * this.matrix[M3x3.M11] + this.matrix[M3x3.M21],
            x * this.matrix[M3x3.M02] + y * this.matrix[M3x3.M12] + this.matrix[M3x3.M22]
        ];
            return output;
    }
    scale(x, y) {
        var output = new M3x3();
        output.matrix = [
            this.matrix[M3x3.M00] * x,
            this.matrix[M3x3.M01] * x,
            this.matrix[M3x3.M02] * x,

            this.matrix[M3x3.M10] * y,
            this.matrix[M3x3.M11] * y,
            this.matrix[M3x3.M12] * y,

            this.matrix[M3x3.M20],
            this.matrix[M3x3.M21],
            this.matrix[M3x3.M22]
        ];
            return output;
    }
    getFloatArray() {
        return new Float32Array(this.matrix);
    }
}
M3x3.M00 = 0;
M3x3.M01 = 1;
M3x3.M02 = 2;
M3x3.M10 = 3;
M3x3.M11 = 4;
M3x3.M12 = 5;
M3x3.M20 = 6;
M3x3.M21 = 7;
M3x3.M22 = 8;

class Material {
    constructor(gl, vsrc, fsrc) {
        this.gl = gl;
        this.vshader = createShader(this.gl, vsrc, this.gl.VERTEX_SHADER);
        this.fshader = createShader(this.gl, fsrc, this.gl.FRAGMENT_SHADER);
        this.program = createProgram(this.gl, this.vshader, this.fshader);
        this.parameters = getProgramInfo(this.gl, this.program);
    }

    set(name, a, b, c, d) {
        var gl = this.gl;
        var param = this.parameters[name];
        if (!!param) {
            if (param.uniform) {
                switch (param.type) {
                    case gl.FLOAT: gl.uniform1f(param.location, a); break;
                    case gl.FLOAT_VEC2: gl.uniform2f(param.location, a, b); break;
                    case gl.FLOAT_VEC3: gl.uniform3f(param.location, a, b, c); break;
                    case gl.FLOAT_VEC4: gl.uniform4f(param.location, a, b, c, d); break;
                    case gl.FLOAT_MAT3: gl.uniformMatrix3fv(param.location, false, a); break;
                    case gl.FLOAT_MAT4: gl.uniformMatrix4fv(param.location, false, a); break;
                    case gl.SAMPLER_2D: gl.uniform1i(param.location, a); break;
                }
            } else {
                gl.enableVertexAttribArray(param.location);
                if (!a) a = gl.FLOAT;
                if (!b) b = false;
                if (!c) c = 0;
                if (!d) d = 0;

                switch (param.type) {
                    case gl.FLOAT:      gl.vertexAttribPointer(param.location, 1, a, b, c, d); break;
                    case gl.FLOAT_VEC2: gl.vertexAttribPointer(param.location, 2, a, b, c, d); break;
                    case gl.FLOAT_VEC3: gl.vertexAttribPointer(param.location, 3, a, b, c, d); break;
                    case gl.FLOAT_VEC4: gl.vertexAttribPointer(param.location, 4, a, b, c, d); break;
                }
            }
        }
    }
}

class Sprite {
    constructor(gl, img_url, vsrc, fsrc, opts = {}) {
        this.gl = gl;
        this.material = new Material(this.gl, vsrc, fsrc);

        this.size = {x: 32, y: 32};
        if ('width' in opts) {
            this.size.x = opts.width * 1;
        }
        if ('height' in opts) {
            this.size.y = opts.height * 1;
        }

        this.worldSpaceMatrix = new M3x3();

        this.gl_tex = null;

        this.image = new Image();
        this.image.onload = this.setup.bind(this);
        this.image.src = img_url;

        this.uv_x = 0;
        this.uv_y = 0;

        this.loaded = false;
    }

    static createRectArray(x = 0, y = 0, w = 1, h = 1) {
        return new Float32Array([
                x, y,
                x + w, y,
                x, y + h,
                x, y + h,
                x + w, y,
                x + w, y + h
        ]);
    }

    setup() {
        this.gl.useProgram(this.material.program);

        this.gl_tex = this.gl.createTexture();
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.gl_tex);

        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, this.image);

        this.gl.bindTexture(this.gl.TEXTURE_2D, null);

        this.uv_x = this.size.x / this.image.width;
        this.uv_y = this.size.y / this.image.height;

        this.tex_buf = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.tex_buf);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, Sprite.createRectArray(0, 0, this.uv_x, this.uv_y), this.gl.STATIC_DRAW);

        this.geo_buf = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.geo_buf);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, Sprite.createRectArray(0, 0, this.size.x, this.size.y), this.gl.STATIC_DRAW);

        this.gl.useProgram(null);
        this.loaded = true;
    }

    render(position = {x: 0, y: 0}, frames = {x: 0, y: 0}) {
        if (this.loaded) {
            this.gl.useProgram(this.material.program);

            this.gl.activeTexture(this.gl.TEXTURE0);
            this.gl.bindTexture(this.gl.TEXTURE_2D, this.gl_tex);

            this.material.set('u_tex', 0);

            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.tex_buf);

            this.material.set('a_texCoord', this.gl.FLOAT, false, 0, 0);
            this.gl.enableVertexAttribArray(this.material.parameters.a_texCoord.location);
            this.gl.vertexAttribPointer(this.material.parameters.a_texCoord.location, 2, this.gl.FLOAT, false, 0, 0);

            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.geo_buf);

            this.material.set('a_position', this.gl.FLOAT, false, 0, 0);

            var frame_x = Math.floor(frames.x) * this.uv_x;
            var frame_y = Math.floor(frames.y) * this.uv_y;

            var oMat = new M3x3().transition(position.x, position.y);

            this.material.set('u_frame', frame_x, frame_y);
            this.material.set('u_world', this.worldSpaceMatrix.getFloatArray());
            this.material.set('u_object', oMat.getFloatArray());

            this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 6);
        }
    }
}
