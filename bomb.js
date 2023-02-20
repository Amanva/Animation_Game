class Bomb {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y});
        this.game.bomb = this;
        this.state = 0;
        this.dead = false;
        this.spritesheet = assetMangager.getAsset("./sprites/waterLevel/bomb.png");
        this.updateBB();
        this.loadAnimations();
    };

    loadAnimations() {
        this.animations = [];
        for (var i = 0; i < 2; i++) { 
            this.animations.push([]);
        }
//(spritesheet, xStart, yStart, width, height, frameCount, frameDuration, framePaddingX, framePaddingY, reverse, loop, verticalSprite)
        // idle
        this.animations[0] = new Animator(this.spritesheet, 0, 0, 154, 768, 1, 0.30, 0, 0, false, true, false);
        // explosion
        this.animations[1] = new Animator(this.spritesheet, 0, 0, 154, 768, 5, 0.30, 0, 0, false, false, false);
        
    };
    
    updateBB() {
        this.lastBB = this.BB;
        this.BB =  new BoundingBox(this.x, this.y, 5, 138);
        this.explodeBB = new BoundingBox(this.x, this.y, 154, 154);
    };
    
    update() {
        this.elapsedTime += this.game.clockTick;
        const TICK = this.game.clockTick;
        this.updateBB();
        var that = this;

        that.game.entities.forEach(function (entity) {
            if (entity instanceof Projectile && entity.BB && that.explodeBB.collide(entity.BB)) {
                that.state = 0; // no explosion
                entity.removeFromWorld = true;
                if(that.animations[1].isAlmostDone(TICK)){
                    // assetMangager.playAsset("sounds/blood_splash.wav");
                    that.dead = true;
                    that.removeFromWorld = true;
                }
            } else if (entity instanceof Mage && (entity.BB && that.explodeBB.collide(entity.BB)) 
                                                || (entity.BB && that.BB.collide(entity.BB))) { //Kill the Mage
                that.state = 1; // explosion
                entity.removeFromWorld = true;
                if(that.animations[1].isAlmostDone(TICK)){
                    // assetMangager.playAsset("sounds/blood_splash.wav");
                    that.dead = true;
                    that.removeFromWorld = true;
                    entity.removeHealth(0.5);
                }
            }

        }); //end of forEach
    
    }; //end update

    draw(ctx) { //(this.spritesheet, 0, 0, width,height, this.x-this.game.camera.x, this.y, this.width, this.height);
        this.animations[this.state].drawFrame(this.game.clockTick, ctx, this.x-this.game.camera.x, this.y-this.game.camera.y, 0.25);
        if(debug){
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width , this.BB.height);
            
        }
    };

};
