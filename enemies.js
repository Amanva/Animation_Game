class ChainBot {

    constructor(game, x, y){
        Object.assign(this, { game, x, y });
        this.velocity = { x: 0, y: 0 };
        this.hp = 80;
        this.maxHP = 80;
        this.botIdle = assetMangager.getAsset("./sprites/enemies/chain_bot_idle.png");
        this.botRunRight = assetMangager.getAsset("./sprites/enemies/chain_bot_run_right.png");
        this.botRunLeft = assetMangager.getAsset("./sprites/enemies/chain_bot_run_left.png");
        this.botAttackRight = assetMangager.getAsset("./sprites/enemies/chain_bot_attack_right.png");
        this.botAttackLeft = assetMangager.getAsset("./sprites/enemies/chain_bot_attack_left.png");
        this.botHit = assetMangager.getAsset("./sprites/enemies/chain_bot_hit.png");
        this.botDeath = assetMangager.getAsset("./sprites/enemies/chain_bot_death.png");
        this.enemHealthBar = new HealthBar(this.game, this);
        this.fallAcc = 300;
        this.state = 0;
        this.dead = false;
        this.updateBB();
        this.loadAnimations();
        this.isHit = false;
        
    }; // end of constructor

    loadAnimations() {
        this.animations = [];
        for (var i = 0; i < 6; i++) { 
            this.animations.push([]);
            
        }
//(spritesheet, xStart, yStart, width, height, frameCount, frameDuration, framePaddingX, framePaddingY, reverse, loop, verticalSprite)
        // idle
        this.animations[0] = new Animator(this.botIdle, 0, 0, 126, 39, 5, 0.20, 0, 0, false, true, true);
        // right run
        this.animations[1] = new Animator(this.botRunRight, 0, 0, 126, 39, 4, 0.20, 0, 0, false, true, true);
        // left run
        this.animations[2] = new Animator(this.botRunLeft, 0, 0, 126, 39, 4, 0.20, 0, 0, false, true, true);
        // left attack
        this.animations[3] = new Animator(this.botAttackLeft, 0, 0, 126, 39, 4, 0.20, 0, 0, false, true, true); 
        // right attack
        this.animations[4] = new Animator(this.botAttackRight, 0, 0, 126, 39, 4, 0.3, 0, 0, false, true, true);
        // hit
        this.animations[5] = new Animator(this.botHit, 0, 0, 126, 39, 2, 0.20, 0, 0, false, true, true);
        // death
        this.animations[6] = new Animator(this.botDeath, 0, 0, 126, 39, 5, 0.20, 0, 0, false, false, true);
      
    }; // End load animation

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x+140, this.y+25, 50, 30*1.8 );
        this.lastAttackBB = this.AttackBB;
        this.detectionAttackBB = new BoundingBox(this.x-500, this.y-200, 1300, 700);

        if(this.state === 1){
            this.AttackBB = new BoundingBox(this.x+190,this.y+25,100,50);
        }
        else if(this.state === 2){
            this.AttackBB = new BoundingBox(this.x+40,this.y+25,100,50);
        }
        else{
            this.AttackBB = new BoundingBox(0,0,0,0);
        }
    };

    update() {
        this.elapsedTime += this.game.clockTick;
        const TICK = this.game.clockTick;
        this.velocity.y += this.fallAcc * TICK;
        
        // update position

        this.x += this.velocity.x * TICK;
        this.y += this.velocity.y * TICK;
        this.updateBB();
        
        /** chainBot behaviour and collisions */ 
        // TODO this works, but need to ajust duration for the hit state.
        if(!this.dead){
            if(this.hp <= 0){
                this.state = 6;
                // this.animations[3][this.facing].elapsedTime = 7;
                this.dead = true;
            }
            this.PlatformCollision();
            this.mageCollide(TICK);
            }
            else{
                this.velocity.x = 0;
                this.velocity.y = 0;;
               if(this.animations[6].isAlmostDone(TICK)){
                this.game.mage.getMana();
                this.game.camera.potionDrop(this.BB.x+this.BB.width/2, this.BB.y);
                this.removeFromWorld = true;
               }
            }
    // console.log(this.state);
        //   console.log(this.state);
    };//end update() chainBot behavior and collisions
    mageCollide(TICK){
        let that = this;
        this.game.entities.forEach(function (entity) {   
            if(!that.dead){     
            if (entity instanceof Mage) {
                let middleMage = { x: entity.BB.left + entity.BB.width / 2, y: entity.BB.top + entity.BB.height / 2 };
                let middleMonster = { x: that.BB.left + that.BB.width / 2, y: that.BB.top + that.BB.height / 2 };
                let xDis = middleMage.x - middleMonster.x;
                let distance = distanceBetween(middleMage,middleMonster);
                let mageDB = entity.BB && that.detectionAttackBB.collide(entity.BB);
                let mageAB = entity.BB && that.AttackBB.collide(entity.BB);
                // let frame = that.animations[that.state][that.facing].currentFrame();
                if(mageDB){
                    if((that.state !== 3) && (that.state !== 4)){
                        // console.log(that.velocity.x);
                    if(mageDB && !mageAB){
                    if (xDis > 0 ) {
                        that.state = 1;
                    }
                    else if (xDis < 0) {
                        that.state = 2;
                    }
                    if ((that.state == 1) || (that.state == 2)) {
                        that.velocity.x = 200 * xDis / distance;
                    }
                }
                }
                    if(mageDB && mageAB){
                        if(that.state == 1){
                            that.state = 4;
                        }
                        else if(that.state == 2){
                            that.state = 3;
                        }
                        that.velocity.x = 0;
                    }
                }
                else if(!mageDB){
                    that.state = 0;
                    that.velocity.x = 0;
                }
                if((that.state === 3) || (that.state === 4)){
                    if(mageAB && !that.playerHit){
                        that.playerHit = true;
                        entity.removeHealth(10); 
                    }
                    if(that.animations[3].isAlmostDone(TICK) || that.animations[4].isAlmostDone(TICK)){
                        that.state = 0;
                        that.animations[3].elapsedTime = 0;
                        that.animations[4].elapsedTime = 0;
                        that.playerHit = false;
                    }
                }
            };
        }
            });
     }
     PlatformCollision(){
        var that = this;
            this.game.entities.forEach(function (entity) {
                if (entity.BB && that.BB.collide(entity.BB)) {
                    if (that.velocity.y > 0) { 
                        if (((entity instanceof Ground) || (entity instanceof Platform) || (entity instanceof Wall) || (entity instanceof Tiles || (entity instanceof smallPlatforms))) && (that.lastBB.bottom <= entity.BB.top)){
                            that.velocity.y = 0;
                            that.y = entity.BB.top - that.BB.height-25;
                            that.updateBB();
                        }
                        if ((entity instanceof movingPlatforms) && (that.lastBB.bottom < entity.BB.top+6)){
                            that.y = entity.BB.top - that.BB.height;
                            that.velocity.y = 0;
                            that.updateBB();
                        }
                        } 
                        if(that.velocity.y < 0){
                            if ((entity instanceof Ground || entity instanceof Wall || entity instanceof Platform || entity instanceof movingPlatforms || (entity instanceof Tiles) || entity instanceof smallPlatforms) && (that.lastBB.top >= entity.BB.bottom)){
                                that.velocity.y = 0;
                                that.y = entity.BB.bottom-60;
                                that.updateBB();
                            }
                        }
                        if (((entity instanceof Wall) || (entity instanceof Ground) || (entity instanceof Platform) || (entity instanceof smallPlatforms)) && that.BB.collide(entity.leftBB) && (that.lastBB.top < entity.BB.bottom-5)){
                                    that.x = entity.leftBB.left - that.BB.width-65;
                                    that.velocity.x = 0;
                                    that.updateBB();
                        }
                        if (((entity instanceof Wall) || (entity instanceof Ground) || (entity instanceof Platform) || (entity instanceof Tiles) || (entity instanceof smallPlatforms)) && that.BB.collide(entity.rightBB) && (that.lastBB.top < entity.BB.bottom-5)){               
                                    that.x = entity.rightBB.right-65;
                                    that.velocity.x = 0; 
                                    that.updateBB(); 
                        }
                        if (((entity instanceof movingPlatforms)) && (that.lastBB.left >= entity.BB.right) && (that.lastBB.top < entity.BB.bottom-5)){               
                            that.x = entity.rightBB.right - that.xBBOffset;
                            that.velocity.x = 0; 
                            that.updateBB(); 
                        }
                        if (((entity instanceof movingPlatforms)) && (that.lastBB.right <= entity.BB.left) && (that.lastBB.top < entity.BB.bottom-5)){               
                            that.x = entity.leftBB.left - PARAMS.PLAYERWIDTH-that.xBBOffset;
                            that.velocity.x = 0; 
                            that.updateBB(); 
                        }
                    }
                    });
    }
    loseHealth(damageRecieved){
        this.hp -= damageRecieved;
    
    };
    draw(ctx) {
        if(this.hp >= 0) this.enemHealthBar.draw(ctx);
        this.animations[this.state].drawFrame(this.game.clockTick, ctx, this.x-this.game.camera.x, this.y-this.game.camera.y, PARAMS.SCALE);
            if(debug){
                //draw the boundingBox
                ctx.strokeStyle = 'Red';
                ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y-this.game.camera.y, this.BB.width , this.BB.height);
                ctx.strokeStyle = 'yellow';
                ctx.strokeRect(this.AttackBB.x - this.game.camera.x, this.AttackBB.y-this.game.camera.y, this.AttackBB.width , this.AttackBB.height);
                ctx.strokeStyle = 'green';
                ctx.strokeRect(this.detectionAttackBB.x - this.game.camera.x, this.detectionAttackBB.y-this.game.camera.y, this.detectionAttackBB.width , this.detectionAttackBB.height);
                // // TEST draw text to canvas
                // ctx.font = "20px Arial";
                // ctx.fillStyle = "white";
                // ctx.fillText("X: " + Math.round(this.x), 510, 50);
                // ctx.fillText("ChainBot BB Width: " + Math.round(this.BB.width), 660, 50);
                // ctx.fillText("ChainBot BB bottom: " + Math.round(this.BB.bottom), 660, 70);
                
                // ctx.fillText("Y: " + Math.round(this.y), 510, 70);
                // ctx.fillText("Speed: " + this.velocity.x, 510, 90);
                // ctx.fillText("State: " + this.state, 510, 110);
                // ctx.fillText("hitPoints: " + this.hp, 510, 130);

            }
            


                         
    }; // End draw method

};

