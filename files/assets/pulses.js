var pulses = function(p) {
    
   var beans = [];
   var toggle = false;
   var startTime;
   var ellaspedTime;
   var count =  0;

    p.setup = function() {
        p.size($(window).width(), $(window).height());
        p.background(0);
        p.frameRate(90);
        startTime = new Date().getTime();
    };
    
    p.draw = function() {
        /* iteration 1 */
        /* p.background(p.frameCount); */
    
        /* iteration 2 */
        /* var xOff = p.frameCount * 0.004;
        var yOff = xOff + 10;
        var x  = p.noise(xOff) * p.width;
        var y  = p.noise(yOff) * p.height;
        p.strokeWeight(2);
        p.stroke(255, 0, 0, 45);
        p.point(x, y); */

        /* iteration 3 */
        if(!toggle) {
            p.fill(0, 30);
            p.rect(0, 0, p.width, p.height);
        } 
        // p.smooth();
        p.strokeWeight(3);

        var xOff = p.frameCount * 0.006;
        var yOff = xOff + p.random(-20, 20);
        var x = p.noise(xOff) * p.width;
        var y = p.noise(yOff) * p.height;
        
        if(p.frameCount % 6 == 0) {
            var bean = new Bean(p, {
                x: x,
                y: y,
                xOff: xOff,
                yOff: yOff
            });
            beans.push(bean);  
        }
        
        for(var i = 0, j = beans.length - 1; i < j; i++) {
            beans[i].draw();
        }

        
        
    };

    p.mousePressed = function() {
        toggle = !toggle;
    };

    function Bean(p, opts) {
        this.p = p;
        this.x = opts.x;
        this.y = opts.y;
        this.xOff = opts.xOff;
        this.yOff = opts.yOff;
        this.vel = opts.vel || 3;
        this.accel = opts.accell || -0.003;

        this.draw = function() {
            if(this.vel < 0) return;

            this.xOff += 0.035;
            this.yOff += 0.007;
            this.vel += this.accel;
            
            this.x += this.p.noise(this.xOff) * this.vel - (this.vel / 2);
            this.y += this.p.noise(this.yOff) * this.vel - (this.vel / 2);
            /* this.p.stroke(0, 255, 0, 10);
            */
            this.setColor();
            this.p.point(this.x, this.y);

        }
        this.setColor = function() {
            this.p.colorMode(this.p.HSB, 360, 100, 100);
            var h = this.p.noise((this.xOff + this.yOff) / 2) * 360;
            var s = 100,
                b = 255,
                a = 50;
            this.p.stroke(h, s, b, a);
        }
    }
}

$(document).ready(function() {
    var canvas = document.getElementById("processing");
    var processing = new Processing(canvas, pulses);
    window.processing = processing;
});

