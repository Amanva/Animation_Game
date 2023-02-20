class Bomb {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y});
        this.game.bomb = this;
        this.velocity = { x: 0, y: 0 };
        this.state = 0;
        this.dead = false;
        this.fallAcc = -170;
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
        this.animations[0] = new Animator(this.spritesheet, 0, 0, 108, 535, 1, 1, 0, 0, false, true, false);
        // explosion
        this.animations[1] = new Animator(this.spritesheet, 0, 0, 108, 535, 5, 0.15, 0, 0, false, false, false);
        
    };
    
    updateBB() {
        this.lastBB = this.BB;
        this.chainBB =  new BoundingBox(this.x + 51, this.y + 95, 5, 440);
        this.explodeBB = new BoundingBox(this.x + 12, this.y + 14, 80, 80);
        this.stopBB = new BoundingBox(this.x+15, this.y + 535, 80, 5);
    };
    
    update() {
        // this.elapsedTime += this.game.clockTick;
        const TICK = this.game.clockTick;
        this.velocity.y += this.fallAcc * TICK;
        this.y += this.velocity.y * TICK;
        this.updateBB();
        var that = this;

        that.game.entities.forEach(function (entity) {
            if (( entity instanceof Ground) && (entity.BB && that.stopBB.collide(entity.BB))){
                that.velocity.y =  0;
                that.y  = entity.BB.y + entity.BB.height-535;

            } else if ((entity instanceof Platform) && (entity.BB && that.explodeBB.collide(entity.BB))) {

                that.velocity.y =  0;
                that.y  = entity.BB.y + entity.BB.height-14;
            }



            if (entity instanceof Projectile && entity.BB && that.explodeBB.collide(entity.BB)) {
                that.state = 1; // no explosion
                entity.removeFromWorld = true;
                
                console.log("projectile hit");
                if(that.animations[1].isAlmostDone(TICK)){
                    // assetMangager.playAsset("sounds/blood_splash.wav");
                    that.dead = true;
                    that.removeFromWorld = true;
                    
                    console.log("IF 1/2");
                }
            } else if (entity instanceof Projectile && entity.BB && that.chainBB.collide(entity.BB)) {
                entity.removeFromWorld = true;

            } else if (entity instanceof Mage && ((entity.BB && that.explodeBB.collide(entity.BB)))) { //Kill the Mage
                that.state = 1; // explosion
                // entity.removeFromWorld = true;
                console.log("ELSE IF 1");
                if(that.animations[1].isAlmostDone(TICK)){
                    // assetMangager.playAsset("sounds/blood_splash.wav");
                    that.dead = true;
                    that.removeFromWorld = true;
                    entity.removeHealth(100);
                    console.log("ELSE IF isAlmostDone 1/2");
                }
            }
            

        }); //end of forEach
        
    
    }; //end update

    draw(ctx) {
        this.animations[this.state].drawFrame(this.game.clockTick, ctx, this.x-this.game.camera.x, this.y-this.game.camera.y, 1);

        if(debug){
            //draw the boundingBox
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.chainBB.x - this.game.camera.x, this.chainBB.y-this.game.camera.y, this.chainBB.width , this.chainBB.height);
            ctx.strokeRect(this.explodeBB.x - this.game.camera.x, this.explodeBB.y-this.game.camera.y, this.explodeBB.width , this.explodeBB.height);
            ctx.strokeRect(this.stopBB.x - this.game.camera.x, this.stopBB.y-this.game.camera.y, this.stopBB.width , this.stopBB.height);
        }              
    }; // End draw method

};
