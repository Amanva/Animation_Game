class Item {
    constructor(game, x , y){
        Object.assign(this, { game, x, y });
        this.spritesheet = assetMangager.getAsset("./sprites/book.png");
        this.animations = new Animator(this.spritesheet,  14, 17, 35, 50, 1, 1, 0, 0, false, true, false);
        this.updateBB();
    }

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y, 35,40); 
    };

    update(){
        let curFrame = this.animations.currentFrame();
        this.updateBB();
        var that = this;
        that.game.entities.forEach(function (entity) {
            if (entity instanceof Mage  && entity.BB && that.BB.collide(entity.BB)) {
                
            }
        
           
        }); //end of forEach
              
        // if(this.animations.isAlmostDone(this.game.clockTick)){
        //     this.animations.elapsedTime = 2.7;
        // }
    };//end update() chainBot behavior and collisions
    

    draw(ctx){
        console.log("draw");
        this.animations.drawFrame(this.game.clockTick, ctx, this.x-this.game.camera.x, this.y-this.game.camera.y, 1);
        if (debug) {
            ctx.strokeStyle = 'red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y-this.game.camera.y, this.BB.width , this.BB.height);
        }    
    }
}