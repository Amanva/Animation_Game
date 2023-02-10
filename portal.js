/**
 * @class Portal animation
 * @author Uladzimir Hanevich
 * @version  TCSS491 winter 2023
 */
class Portal {
    constructor(game, x, y){
        Object.assign(this, { game, x, y });
        this.game.portal = this;
        this.velocity = { x: 0, y: 0 };
        this.portal = assetMangager.getAsset("./sprites/portal.png");
        this.scale = 1;
        
        this.visible = true;
        this.updateBB();
        this.animations = new Animator(this.portal, 0, 0, 320, 320, 41, 0.07, 0, 0, false, true, undefined);
        
    }; // end of constructor


    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y, this.width, this.height); 
    };
    
    update() {
       //Do noting
                  
    };//end update() chainBot behavior and collisions

    draw(ctx) {
                   
        this.animations.drawFrame(this.game.clockTick, ctx, this.x-this.game.camera.x, this.y, this.scale);
            //draw the boundingBox
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width , this.BB.height);
                                     
    }; // End draw method

}; // End of chain_bot