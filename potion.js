class Potion{
    constructor(game, x, y, forScreen, type) {
        Object.assign(this, { game, x, y, forScreen, type});
        this.spritesheet = assetMangager.getAsset("./sprites/potion.png");
        this.animations = [];
        this.type;
        this.textSize = '15px "Press Start 2P"';
        this.velocity = {x: 0, y: 0};
        this.animations.push(new Animator(this.spritesheet, 0, 0, 16, 16, 1, 0.1, 0, 0, false, true, false));
        this.animations.push(new Animator(this.spritesheet, 0, 16, 16, 16, 1, 0.1, 0, 0, false, true, false));
        this.updateBB();
    };
    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y, 40, 40); 
    };
    update(){
        const TICK = this.game.clockTick;
        const FALL = 100;
        if(!this.forScreen){
        this.velocity.y += FALL * TICK;
        this.y += this.velocity.y * TICK;
        this.updateBB();
        var that = this;
        this.game.entities.forEach(function (entity) {
            if (entity.BB && that.BB.collide(entity.BB)) {
                if (that.velocity.y > 0) { 
                    if (((entity instanceof Ground) || (entity instanceof Platform) || (entity instanceof Wall) || (entity instanceof Tiles || (entity instanceof smallPlatforms))) && (that.lastBB.bottom <= entity.BB.top)){
                        that.velocity.y = 0;
                        that.y = entity.BB.top - that.BB.height;
                        that.updateBB();
                    }
                }
                if(entity instanceof Mage){
                    // console.log("collide");
                    if(that.type == 0){
                        that.game.camera.healthPotion++;
                    }
                    else if(that.type == 1){
                        that.game.camera.manaPotion++;
                    }
                    that.removeFromWorld = true;
                }
            }
            });
            if(this.velocity.y >= FALL){
                this.velocity.y = FALL;
            }
        }
        // console.log(this.healthPotion);
    };
    draw(ctx){
        if(this.forScreen){
        ctx.font = this.textSize;
        ctx.fillStyle = "White";
        ctx.fillText("X "+ this.game.camera.healthPotion, 50, 110);
        this.animations[0].drawFrame(this.game.clockTick, ctx, 5, 80, PARAMS.SCALE);
        ctx.fillText("X "+ this.game.camera.manaPotion, 50, 160);
        this.animations[1].drawFrame(this.game.clockTick, ctx, 5, 130, PARAMS.SCALE);
    }
    else {
        if(this.type == 0){
            this.animations[0].drawFrame(this.game.clockTick, ctx, this.x-this.game.camera.x, this.y-this.game.camera.y, PARAMS.SCALE);
        }
        else if(this.type == 1){
            this.animations[1].drawFrame(this.game.clockTick, ctx, this.x-this.game.camera.x, this.y-this.game.camera.y, PARAMS.SCALE);
        }
    }
    if(!this.forScreen){
    if(debug){
        ctx.strokeStyle = 'Red';
        ctx.strokeRect(this.BB.x-this.game.camera.x, this.BB.y-this.game.camera.y, this.BB.width, this.BB.height);
    }
    }

    };
}