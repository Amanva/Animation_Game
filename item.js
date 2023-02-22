class Item {
    constructor(game, x , y){
        Object.assign(this, { game, x, y });
        this.spritesheet = assetMangager.getAsset("./sprites/book.png");
        this.velocity = {x: 0, y: 0};
        this.animations = new Animator(this.spritesheet,  14, 17, 35, 50, 1, 1, 0, 0, false, true, false);
        this.updateBB();
    }

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y, 35,40); 
    };

    update(){
        const TICK = this.game.clockTick;
        const FALL = 100;
        this.velocity.y += FALL * TICK;
        this.y += this.velocity.y * TICK;
        let curFrame = this.animations.currentFrame();
        this.updateBB();
        var that = this;
        that.game.entities.forEach(function (entity) {
            if (entity.BB && that.BB.collide(entity.BB)) {
                    if (that.velocity.y > 0) { 
                        if (((entity instanceof Ground) || (entity instanceof Platform) || (entity instanceof Wall) || (entity instanceof Tiles || (entity instanceof smallPlatforms))) && (that.lastBB.bottom <= entity.BB.top)){
                            that.velocity.y = 0;
                            that.y = entity.BB.top - that.BB.height;
                            that.updateBB();
                        }
                    }
            if (entity instanceof Mage) {
                that.game.camera.damage *= 1.3;
                that.removeFromWorld = true;
            }
        
        }
        }); //end of forEach
              
        // if(this.animations.isAlmostDone(this.game.clockTick)){
        //     this.animations.elapsedTime = 2.7;
        // }
    };//end update() chainBot behavior and collisions
    

    draw(ctx){
        ctx.strokeStyle = "White";
        ctx.fillStyle = ctx.strokeStyle; 
        ctx.font = '8px "Press Start 2P"';
        ctx.fillText("Book of strength", this.x-50, this.y-10);
        this.animations.drawFrame(this.game.clockTick, ctx, this.x-this.game.camera.x, this.y-this.game.camera.y, 1);
        if (debug) {
            ctx.strokeStyle = 'red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y-this.game.camera.y, this.BB.width , this.BB.height);
        }    
    }
}