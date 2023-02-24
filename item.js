class Item {
    constructor(game, x , y, type){
        Object.assign(this, { game, x, y, type });
        this.spritesheet = assetMangager.getAsset("./sprites/book.png");
        this.iconSheet = assetMangager.getAsset("./sprites/icons.png");
        this.velocity = {x: 0, y: 0};
        this.animations = [];
        // damage
        this.animations.push(new Animator(this.spritesheet,  14, 17, 35, 50, 1, 1, 0, 0, false, true, false));
        // double jump
        this.animations.push(new Animator(this.iconSheet,  0, 289, 16, 16, 1, 1, 0, 0, false, true, false));
        this.updateBB();
    }

    updateBB() {
        this.lastBB = this.BB;
        if(this.type === 0){
            this.BB = new BoundingBox(this.x, this.y, 35,40);
        }
        else if(this.type === 1){
            this.BB = new BoundingBox(this.x, this.y,48,48);
        } 
    };

    update(){
        const TICK = this.game.clockTick;
        const FALL = 100;
        this.velocity.y += FALL * TICK;
        this.y += this.velocity.y * TICK;
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
                if(that.type === 0){
                that.game.camera.damage *= 1.3;
                that.removeFromWorld = true;
                }
                else if(that.type === 1){
                    that.game.mage.jumpItem = true;
                    that.removeFromWorld = true;
                    }
            }
        
        }
        }); //end of forEach
              
        // if(this.animations.isAlmostDone(this.game.clockTick)){
        //     this.animations.elapsedTime = 2.7;
        // }
    };//end update() chainBot behavior and collisions
    

    draw(ctx){
        if(this.type === 0){
        ctx.strokeStyle = "White";
        ctx.fillStyle = ctx.strokeStyle; 
        ctx.font = '8px "Press Start 2P"';
        ctx.fillText("Book of strength", this.x-50, this.y-10);
        this.animations[0].drawFrame(this.game.clockTick, ctx, this.x-this.game.camera.x, this.y-this.game.camera.y, 1);
        }
        else if(this.type === 1){
            this.animations[1].drawFrame(this.game.clockTick, ctx, this.x-this.game.camera.x, this.y-this.game.camera.y, 3); 
        }
        if (debug) {
            ctx.strokeStyle = 'red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y-this.game.camera.y, this.BB.width , this.BB.height);
        }    
    }
}