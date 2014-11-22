
function TypewriterEffect(text, interval, target) {
    
    var position;
    var text = text;  
    var target = target;  
    
   
    
    this.getText = function() {
        if(position >= text.length - 1) {
            position = 0;
            target.innerHTML = "";
        } else if (isNaN(position)) {
            position = 0;
        } else {
            position++;
        }
        var s = text.charAt(position);
        target.innerHTML += s;
        return s;
    }   
    
    this.animation = null;
    this.interval = interval;              
    this.target = function() { return target; }
    this.text = function()   { return text;   }
       
    return this;
}

TypewriterEffect.prototype.play = function(args) {  
    this.target().innerHTML = "";
    this.animation = setInterval(this.getText, this.interval); 
    return this;
}

TypewriterEffect.prototype.stop = function(args) {
    clearInterval(this.animation);
    return this;
} 

TypewriterEffect.prototype.toString = function() {
    return "TypewriterEffect";
}