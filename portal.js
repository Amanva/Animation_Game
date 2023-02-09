/*
chain bot enemy animation
Uladzimir Hanevich
TCSS491 winter 2023
*/
class ChainBot {

    constructor(game, x, y){
        Object.assign(this, { game, x, y });
        this.game.chainBot = this;
        this.velocity = { x: 0, y: 0 };
        this.hitPoints = 3;
                
        this.portal = assetMangager.getAsset("./sprites/portal.png");
        
        this.visible = true;
        this.updateBB();
        this.loadAnimations();
        
    }; // end of constructor

    loadAnimations() {
        this.animations = [];
        for (var i = 0; i < 2; i++) { 
            this.animations.push([]);
            
        }
//(spritesheet, xStart, yStart, width, height, frameCount, frameDuration, framePaddingX, framePaddingY, reverse, loop, verticalSprite)
               
        // start
        this.animations[0] = new Animator(this.botIdle, 0, 0, 126, 39, 5, 0.30, 0, 0, false, true, true);
        // done
        this.animations[1] = new Animator(this.botRunRight, 0, 0, 126, 39, 8, 0.30, 0, 0, false, true, true);
        
      
    }; // End load animation

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x+140, this.y + 25, 50, 30 * 1.8); //TODO BB collisions acting weird maybe fix this 
        // this.BB = new BoundingBox(this.x, this.y, 126, 30);
        
    };
    
    update() {
       
                  
    };//end update() chainBot behavior and collisions

    draw(ctx) {
                   
        this.animations[this.state].drawFrame(this.game.clockTick, ctx, this.x-this.game.camera.x, this.y, PARAMS.SCALE);
            //draw the boundingBox
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width , this.BB.height);
            // ctx.strokeStyle = 'Yellow';
            // ctx.strokeRect(this.BB.x + this.BB.width/2 - this.game.camera.x, this.BB.y-62, 87 , 3);
            // ctx.strokeStyle = 'Green';
            // ctx.strokeRect(this.BB.x + this.BB.width/2 - this.game.camera.x -87, this.BB.y-62, 87 , 3);
            
            //  // TEST draw text to canvas
            // ctx.font = "20px Arial";
            // ctx.fillStyle = "white";
            // ctx.fillText("X: " + Math.round(this.x), 510, 50);
            // ctx.fillText("ChainBot BB Width: " + Math.round(this.BB.width), 660, 50);
            // ctx.fillText("Y: " + Math.round(this.y), 510, 70);
            // ctx.fillText("Speed: " + this.velocity.x, 510, 90);
            // ctx.fillText("State: " + this.state, 510, 110);
            // ctx.fillText("hitPoints: " + this.hitPoints, 510, 130);
                         
    }; // End draw method

}; // End of chain_bot