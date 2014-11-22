Particle = function(context) {    
    this.context = context;
	this.velocityX = 0;
	this.velocityY = 0;
	this.gravity = 0;
	this.friction = 1; 
	this.x = 0;
	this.y = 0;
	this.radius = 10;
	
	this.render = function() {
	    if(!this.context)
	        return; 
	    this.context.beginPath();
	    this.context.fillStyle = "#000000";   
	    
	    if(this.radius < 0)
	        this.radius = this.radius *= -1;
	    
	    this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
	    this.context.closePath();
	    this.context.fill();	     
	}
	this.update = function() {
	    this.velocityX *= this.friction;
	    this.velocityY *= this.friction;
	    this.velocityY += this.gravity;
	    this.x += this.velocityX;
	    this.y += this.velocityY;
	}

}