class Animator {

    constructor(spritesheet, xStart, yStart, width, height, frameCount, frameDuration, framePaddingX, framePaddingY, reverse, loop, verticalSprite) {
        Object.assign(this, {spritesheet, xStart, yStart, width, height, frameCount, frameDuration, framePaddingX, framePaddingY, reverse, loop, verticalSprite});
        this.elapsedTime = 0;
        this.totalTime = this.frameCount * this.frameDuration;
        this.flipped = false;
    };

    drawFrame(tick, ctx, x, y, scale) {

        this.elapsedTime += tick;
        
        if (this.isDone()) {
            if (this.loop) {
                this.elapsedTime -= this.totalTime;
            } else {
                return;
            }
        }

        if(this.elapsedTime > this.totalTime) this.elapsedTime -= this.totalTime;
        
        let frame = this.currentFrame();
        if (this.reverse) {
            frame = this.frameCount - frame - 1;
        }

        /*
         verticalSprite = true for sprites that are verical. 
         Horizontals are by default.
         added by UH.
        */
       let mult = 1;
       let offset = 0;
       ctx.save();
       if(this.flipped){
        ctx.scale(-1, 1);
        mult *= -1;
        offset = -(this.width*scale);
       }
        if (this.verticalSprite){
            // Vertical sprites drawn here.
            ctx.drawImage(this.spritesheet,
                this.xStart , this.yStart + frame * (this.height + this.framePaddingY), //source x and y (for example, use "0, 0" on call of this function)
                this.width, this.height, //source width and height
                x * mult + offset, y, //destination x and y, where to draw this frame
                this.width * scale, this.height * scale); //destination width and hight

        } else {
            // Horizontal sprites drawn here
            ctx.drawImage(this.spritesheet,  
                this.xStart + frame * (this.width + this.framePaddingX), this.yStart, 
                this.width, this.height, 
                (x * mult) + offset, y, 
                this.width * scale, this.height * scale);
        }
        ctx.restore();
        
            
    };

currentFrame() {
    return Math.floor(this.elapsedTime / this.frameDuration);
};
    
isDone() {
        return (this.elapsedTime >= this.totalTime);
    };
    isAlmostDone(TICK) {
        return ((this.elapsedTime + TICK) >= this.totalTime);
    }
}