/**
 * @class Portal animation
 * @author Uladzimir Hanevich
 * @version  TCSS491 winter 2023
 */
class Portal {
    constructor(game, x, y){
        Object.assign(this, { game, x, y });
        this.game.portal = this;
        this.portal = assetMangager.getAsset("./sprites/portal.png");
        this.scale = 1;
        this.animations = new Animator(this.portal, 0, 0, 320, 320, 41, 0.07, 0, 0, false, false, undefined);
        this.updateBB();
        
    }; // end of constructor


    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x+160, this.y+200, 50, 120); 
    };
    
    update() {
        this.updateBB();
        var that = this;
        that.game.entities.forEach(function (entity) {
            if (entity instanceof Mage  && entity.BB && that.BB.collide(entity.BB)) {
                that.game.camera.loadLevel(levelTwo);
            }
        }); //end of forEach
              
        if(that.animations.isAlmostDone(that.game.clockTick)){
            that.animations.elapsedTime = 2.7;
        }
    };

    draw(ctx) {
                   
        this.animations.drawFrame(this.game.clockTick, ctx, this.x-this.game.camera.x, this.y-this.game.camera.y, this.scale);
        if (debug) {
            //draw the boundingBox
            ctx.strokeStyle = 'white';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y-this.game.camera.y, this.BB.width , this.BB.height);
        }    
        
                                
    };

}; 