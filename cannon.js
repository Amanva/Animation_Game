class Cannon{

    constructor(game, x , y){
        Object.assign(this, { game, x, y });
        this.velocity = { x: 0, y: 0 };
        this.game.cannon = this;
        this.spritesheet = assetMangager.getAsset("./sprites/waterLevel/cannon.png");
        this.velocity = { x: 0, y: 0 };
        this.fallAcc = 300;
        this.state = 0;
        this.readyToAttack = false;
        // this.squidIsReady = true;
        this.attackCoolDown = 0;
        this.updateBB();
        this.loadAnimations();
    };

    loadAnimations() {
        this.animations = [];
        for (var i = 0; i < 2; i++) { 
            this.animations.push([]);
            
        }
    //(spritesheet, xStart, yStart, width, height, frameCount, frameDuration, framePaddingX, framePaddingY, reverse, loop, verticalSprite)

    // idling
    this.animations[0] = new Animator(this.spritesheet, 0, 62, 56, 48, 1, 0.2, 0, 0, true, true, false);
    // firing
    this.animations[1] = new Animator(this.spritesheet, 0, 62, 56, 48, 6, 0.1, 0, 0, false, true, false);
      
    }; // End load animations

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x+10, this.y+20, 75, 60);
    };

    update() {
        this.elapsedTime += this.game.clockTick;
        const TICK = this.game.clockTick;
        // const RUN = 110; //change the speed
        // const LOWER_BOUND = 95;
        const UPPER_BOUND = 600;
        const ATTACK_TIMING = 6;
        this.velocity.y += this.fallAcc * TICK;
        this.attackCoolDown += this.game.clockTick;
        
        // update position
        this.x += this.velocity.x * TICK;
        this.y += this.velocity.y * TICK;
        this.updateBB();
                     
        var that = this;

        /** Behaviour and collisions */ 
        that.game.entities.forEach(function (entity) {

            if (entity.BB && that.BB.collide(entity.BB)) {
                if (entity instanceof Projectile){
                    entity.removeFromWorld = true;

                }

                //landing
                if (that.velocity.y > 0) { 
                    if (((entity instanceof Ground) || (entity instanceof Platform || (entity instanceof movingPlatforms) 
                        || (entity instanceof Wall) || (entity instanceof Tiles))
                                 && (that.lastBB.bottom >= entity.BB.top))) {

                        // that.x += entity.velocity.x * that.game.clockTick;
                        // that.y += entity.velocity.y * that.game.clockTick;
                        that.velocity.y = 0;
                        that.y = entity.BB.top - that.BB.height-20;
                        // that.updateBB();
                    } 
                
                } 
                
            } 

            // Decide to approach the mage
            if ( that.attackCoolDown >= ATTACK_TIMING) { 
                that.state = 1;
                if (that.animations[1].isAlmostDone(TICK)){ //IF animation is done and attack_timing is done then shoot
                    that.attackCoolDown = 0;
                    that.game.addEntityToBegin(new CannonBall(that.game, that.x-20, that.y));
                    that.state = 0;
                    that.animations[1].elapsedTime = 0;
                
                }

            }// end attack logic (timing)
            
        }); //end of forEach
          
    };//end update() 

    draw(ctx) {
        // this.enemHealthBar.draw(ctx);
        this.animations[this.state].drawFrame(this.game.clockTick, ctx, this.x-this.game.camera.x, this.y-this.game.camera.y, 1.8);
        // this.animations[1].drawFrame(this.game.clockTick, ctx, this.x-this.game.camera.x, this.y-this.game.camera.y, 2);
           
        if(debug){
            //draw the boundingBox
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y-this.game.camera.y, this.BB.width , this.BB.height);
            // TEST draw text to canvas
            // ctx.font = "20px Arial";
            // ctx.fillStyle = "white";
            // ctx.fillText("attackCoolDown: " + this.attackCoolDown, this.x, this.y+220);

        }
                         
    }; // End draw method

}; //End of Cannon



//******************                                    CANNON BALL                          **********************************

class CannonBall {
    constructor(game, x, y){
        Object.assign(this, { game, x, y});
        this.game.cannonBall = this;
        this.velocity = { x: 0, y: 0 };
        this.cannonBall = assetMangager.getAsset("./sprites/waterLevel/cannonBall.png"); 
        this.scale = 1;
        this.dead = false;
        this.fallAcc = 400;        
        this.speed = 100;
        this.state = 0;
        this.dead = false;
        this.velocity.x = -300;
        this.updateBB();
        this.loadAnimations();
    }; // end of constructor

    loadAnimations() {
        this.animations = [];
        for (var i = 0; i < 2; i++) { 
            this.animations.push([]);
            
        }
    //(spritesheet, xStart, yStart, width, height, frameCount, frameDuration, framePaddingX, framePaddingY, reverse, loop, verticalSprite)
        this.animations[0] = new Animator(this.cannonBall, 0, 32, 32, 32, 1, 0.1, 0, 0, false, true, false); // Idling
        this.animations[1] = new Animator(this.cannonBall, 0, 0, 32, 32, 11 , 0.05, 0, 0, false, false, false); // Explosion
        
    }// END load animations
    
    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y, 32, 32); 
    };
    
    update() {
        const TICK = this.game.clockTick;
        this.velocity.y += this.fallAcc * TICK;
        this.x += this.velocity.x * TICK;
        this.y += this.velocity.y * TICK;
        this.updateBB();
        var that = this;

        that.game.entities.forEach(function (entity) {
            if (entity.BB && that.BB.collide(entity.BB)) {
                if (entity instanceof Projectile){
                    that.state = 1;
                    if (that.animations[1].isAlmostDone(TICK)){
                        entity.removeFromWorld = true;
                        that.removeFromWorld = true;
                        that.dead = true;
                    }
                } else if (((entity instanceof Ground) || (entity instanceof Platform || (entity instanceof movingPlatforms) 
                        || (entity instanceof Wall) || (entity instanceof Tiles))
                                && (that.lastBB.bottom >= entity.BB.top))) {
                    that.velocity.y = 0;
                    that.velocity.x = 0;
                    that.y = entity.BB.top - that.BB.height;
                    that.state = 1;
                    if (that.animations[1].isAlmostDone(TICK)){
                        that.removeFromWorld = true;
                        that.dead = true;
                    }
                
                } else if (entity instanceof Mage) {
                    that.state = 1;
                    that.velocity.y = 0;
                    that.velocity.x = 0;

                    if (that.animations[1].isAlmostDone(TICK)){
                        that.removeFromWorld = true;
                        that.dead = true;
                        entity.removeHealth(20);
                    }
                }
            }
        });
        
        this.updateBB();
    }

    draw(ctx) {
        if( this.state === 0){
            this.scale = 1.2;
        } else {
            this.scale = 2;
        }
        this.animations[this.state].drawFrame(this.game.clockTick, ctx, this.x-this.game.camera.x, this.y-this.game.camera.y, this.scale);

        if (debug) {
        //draw the boundingBox
            ctx.strokeStyle = 'white';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y-this.game.camera.y, this.BB.width * this.scale , this.BB.height * this.scale);
        }
    }; // End draw method
}; // End of CannonBall