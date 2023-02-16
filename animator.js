class Animator {

    constructor(spritesheet, xStart, yStart, width, height, frameCount, frameDuration, framePaddingX, framePaddingY, reverse, loop, verticalSprite) {
        Object.assign(this, {spritesheet, xStart, yStart, width, height, frameCount, frameDuration, framePaddingX, framePaddingY, reverse, loop, verticalSprite});
        this.elapsedTime = 0;
        this.totalTime = this.frameCount * this.frameDuration;
        this.flipped = false;
        this.columnNum = 0;
        this.rowNum = 0;
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
        let row = Math.floor(frame / this.rowNum);
        let column = frame % this.columnNum;

        if (this.reverse) {
            frame = this.frameCount - frame - 1;
        }

        /*
         verticalSprite = true for sprites that are verical. 
         False for Horizontals are by default.
         Undetermined that are both then else
         added by UH.
        */
       let mult = 1;
       let offset = 0;
       
       if(this.flipped){
        ctx.save();
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

        } else if (this.verticalSprite === false) {
            // Horizontal sprites drawn here
            ctx.drawImage(this.spritesheet,  
                this.xStart + frame * (this.width + this.framePaddingX), this.yStart, 
                this.width, this.height, 
                (x * mult) + offset, y, 
                this.width * scale, this.height * scale);
        } else if (this.verticalSprite === undefined) {
            ctx.drawImage(this.spritesheet,
            this.xStart + this.width * column, this.yStart + this.height * row, //source x and y (for example, use "0, 0" on call ofthis function)
            this.width, this.height, //source width and hight
            x, y, //destination x and y, where to draw this frame
            this.width, this.height); //destination width and hight

        }
        
        ctx.restore();
        
            
    };
    drawAngle(tick, ctx, x, y, scale, degree){
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(degree);
        this.drawFrame(tick, ctx, -(this.width), -(this.height), scale)
    }
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