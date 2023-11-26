var a=document.getElementById("canvas");a.width=innerWidth;a.height=innerHeight;var c=a.getContext("webgl"),e=a.clientWidth,g=a.clientHeight,k=[0,0,.5*e+h(-200,200),.5*e+h(-200,200),h(.06,.01),h(.05,.02)];document.body.addEventListener("mousemove",function(d){k[2]=d.clientX;k[3]=d.clientY});
for(var l=new Float32Array([2/e,0,0,0,0,-2/g,0,0,0,0,1,1,-1,1,0,0]),m=Array(2500),n=0;2500>n;n+=5){m[n]=h(0,e);m[n+1]=h(0,g);var p=8+40*Math.random()-10;8>p&&(p=8);m[n+2]=p;m[n+3]=h(-10,10)*Math.sin(n);m[n+4]=h(-10,10)*Math.sin(n)}var q=document.getElementById("vsrc").innerText,r=document.getElementById("fsrc").innerText,t=c.createProgram(),u;c.shaderSource(u=c.createShader(c.VERTEX_SHADER),q);c.compileShader(u);c.attachShader(t,u);c.shaderSource(u=c.createShader(c.FRAGMENT_SHADER),r);c.compileShader(u);
c.attachShader(t,u);c.linkProgram(t);c.useProgram(t);c.viewport(0,0,c.canvas.clientWidth,c.canvas.clientHeight);c.enable(c.BLEND);c.blendFunc(c.SRC_ALPHA,c.ONE_MINUS_SRC_ALPHA);c.clearColor(0,0,0,1);for(var v=c.getAttribLocation(t,"a_position"),w=new Float32Array(1500),x=n=0;2500>n;n+=5,x+=3)w[x]=m[n],w[x+1]=m[n+1],w[x+2]=m[n+2];var y=c.createBuffer(c.ARRAY_BUFFER);c.bindBuffer(c.ARRAY_BUFFER,y);c.bufferData(c.ARRAY_BUFFER,w,c.DYNAMIC_DRAW);c.enableVertexAttribArray(v);
c.vertexAttribPointer(v,3,c.FLOAT,!1,0,null);c.uniformMatrix4fv(c.getUniformLocation(t,"u_matrix"),!1,l);var A=new Image;
A.onload=function(){c.activeTexture(c.TEXTURE0);c.bindTexture(c.TEXTURE_2D,c.createTexture());c.texParameteri(c.TEXTURE_2D,c.TEXTURE_WRAP_S,c.CLAMP_TO_EDGE);c.texParameteri(c.TEXTURE_2D,c.TEXTURE_WRAP_T,c.CLAMP_TO_EDGE);c.texParameteri(c.TEXTURE_2D,c.TEXTURE_MIN_FILTER,c.LINEAR);c.texParameteri(c.TEXTURE_2D,c.TEXTURE_MAG_FILTER,c.LINEAR);c.texImage2D(c.TEXTURE_2D,0,c.RGBA,c.RGBA,c.UNSIGNED_BYTE,A);B()};A.src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAnUlEQVRYR+2XsQ6AIAxEYVD//3PVQcNAYhTKnSlphzKb3uOBUHIyHtk4PwUAbWA/j0tatm1ZqZrwx6PgNxQKAgGw4RUGgRAB/gYzNvwCaM1+tBxNA9rhEoQ/gFmz71n4GAiAMBAGzA2U/3UWROt29HcS1hNL20KvN/B7HWvuBakz8t2SPVsrdk8g/WCpDxlgQNDgWpMG0H7KBYC5gRtfzGAhGEQe7AAAAABJRU5ErkJgggAA";
var C=0,D=0,E=c.getUniformLocation(t,"u_time");c.uniform4fv(c.getUniformLocation(t,"u_color"),[.9,0,.3,1]);var F=document.createElement("input");document.body.appendChild(F);F.addEventListener("change",function(){if(F.value){var d="http://api.soundcloud.com/tracks/"+F.value+"/stream?client_id=56c4f3443da0d6ce6dcb60ba341c4e8d";G.paused||(G.pause(),G.currentTime=0);G.src=d;G.play()}});F.placeholder="SoundCloud Track ID";var H,I,J,K,M,N,O=c.getUniformLocation(t,"u_audioTime"),G=document.createElement("audio");
document.body.appendChild(G);G.classList.add("hide");G.controls="controls";G.crossOrigin="anonymous";G.addEventListener("play",function(){if(!H){H=new AudioContext;I=H.createAnalyser();var d=H.createGain();d.connect(H.destination);d.connect(I);H.createMediaElementSource(G).connect(d);J=new Uint8Array(I.frequencyBinCount);K=new Uint8Array(4*J.length);M=new Float32Array(I.frequencyBinCount);N=new Uint8Array(4*M.length)}});c.pixelStorei(c.UNPACK_ALIGNMENT,1);var P=c.createTexture();c.activeTexture(c.TEXTURE1);
c.bindTexture(c.TEXTURE_2D,P);c.texParameteri(c.TEXTURE_2D,c.TEXTURE_MIN_FILTER,c.LINEAR);c.texParameteri(c.TEXTURE_2D,c.TEXTURE_MAG_FILTER,c.LINEAR);c.texParameteri(c.TEXTURE_2D,c.TEXTURE_WRAP_S,c.CLAMP_TO_EDGE);c.texParameteri(c.TEXTURE_2D,c.TEXTURE_WRAP_T,c.CLAMP_TO_EDGE);c.texImage2D(c.TEXTURE_2D,0,c.LUMINANCE,3,2,0,c.LUMINANCE,c.UNSIGNED_BYTE,new Uint8Array([128,128,128,0,0,0]));var Q=c.createTexture();c.activeTexture(c.TEXTURE2);c.bindTexture(c.TEXTURE_2D,Q);
c.texParameteri(c.TEXTURE_2D,c.TEXTURE_MIN_FILTER,c.LINEAR);c.texParameteri(c.TEXTURE_2D,c.TEXTURE_MAG_FILTER,c.LINEAR);c.texParameteri(c.TEXTURE_2D,c.TEXTURE_WRAP_S,c.CLAMP_TO_EDGE);c.texParameteri(c.TEXTURE_2D,c.TEXTURE_WRAP_T,c.CLAMP_TO_EDGE);c.texImage2D(c.TEXTURE_2D,0,c.LUMINANCE,3,2,0,c.LUMINANCE,c.UNSIGNED_BYTE,new Uint8Array([128,128,128,0,0,0]));var R=c.getUniformLocation(t,"u_waveform");c.uniform1i(c.getUniformLocation(t,"u_spectrum"),1);c.uniform1i(R,2);
function B(){requestAnimationFrame(B);var d=(new Date).getTime();D&&(C+=2*(d-D)/1E3);D=d;c.uniform1f(E,C);if(a.clientWidth!==innerWidth||a.clientHeight!==innerHeight)a.width=innerWidth,a.height=innerHeight,c.viewport(0,0,a.clientWidth,a.clientHeight);d=k[2]-k[0];var f=k[3]-k[1];if(1>Math.abs(d)&&1>Math.abs(f))k[2]=h(0,e),k[3]=h(0,g),k[4]=h(.05,.01),k[5]=h(.06,.03);else{var b=f*k[5]*.5;k[0]+=d*k[4]*.5;k[1]+=b}H&&(c.activeTexture(c.TEXTURE1),c.bindTexture(c.TEXTURE_2D,P),I.getByteFrequencyData(J),S(J,
K),c.activeTexture(c.TEXTURE2),c.bindTexture(c.TEXTURE_2D,Q),I.getFloatTimeDomainData(M),S(M,N),c.uniform1f(O,H.currentTime));for(var z=b=0;2500>b;b+=5,z+=3){d=k[0]+20-m[b];f=k[1]-m[b+1];var L=20/(d*d+f*f)*.2;f*=L;m[b+3]+=L*d;m[b+4]+=f;m[b]+=m[b+3];m[b+1]+=m[b+4];m[b+3]*=.8;m[b+4]*=.8;m[b]>e?m[b]=0:0>m[b]&&(m[b]=e);m[b+1]>g?m[b+1]=0:0>m[b+1]&&(m[b+1]=g);w[z]=m[b];w[z+1]=m[b+1];w[z+2]=m[b+2]}c.clear(c.COLOR_BUFFER_BIT);c.bufferSubData(c.ARRAY_BUFFER,0,w);c.drawArrays(c.POINTS,0,500)}
function h(d,f){return Math.random()*(f-d)+d}function S(d,f){for(var b=0;b<d.length;b++)f[4*b]=d[b],f[4*b+1]=d[b],f[4*b+2]=d[b],f[4*b+3]=255;c.texImage2D(c.TEXTURE_2D,0,c.RGBA,d.length,1,0,c.RGBA,c.UNSIGNED_BYTE,f)};