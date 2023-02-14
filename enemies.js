class ChainBot {

    constructor(game, x, y){
        Object.assign(this, { game, x, y });
        this.game.chainBot = this;
        this.velocity = { x: 0, y: 0 };
        this.hitPoints = 3;
        this.hp = 100;
        this.maxHP = 100;
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
        
    }; // end of constructor

    loadAnimations() {
        this.animations = [];
        for (var i = 0; i < 6; i++) { 
            this.animations.push([]);
            
        }
//(spritesheet, xStart, yStart, width, height, frameCount, frameDuration, framePaddingX, framePaddingY, reverse, loop, verticalSprite)
               
        // idle
        this.animations[0] = new Animator(this.botIdle, 0, 0, 126, 39, 5, 0.30, 0, 0, false, true, true);
        // right run
        this.animations[1] = new Animator(this.botRunRight, 0, 0, 126, 39, 8, 0.30, 0, 0, false, true, true);
        // left run
        this.animations[2] = new Animator(this.botRunLeft, 0, 0, 126, 39, 8, 0.30, 0, 0, false, true, true);
        // left attack
        this.animations[3] = new Animator(this.botAttackLeft, 0, 0, 126, 39, 8, 0.10, 0, 0, false, true, true); 
        // right attack
        this.animations[4] = new Animator(this.botAttackRight, 0, 0, 126, 39, 8, 0.10, 0, 0, false, true, true);
        // hit
        this.animations[5] = new Animator(this.botHit, 0, 0, 126, 39, 2, 0.30, 0, 0, false, true, true);
        // death
        this.animations[6] = new Animator(this.botDeath, 0, 0, 126, 39, 5, 0.30, 0, 0, false, true, true);
      
    }; // End load animationf

    updateBB() {
        this.lastBB = this.BB;
        // this.BB = new BoundingBox(this.x+105, this.y+25, 115, 30*1.8 ); //TODO BB collisions acting weird maybe fix this 
        this.BB = new BoundingBox(this.x+140, this.y+25, 50, 30*1.8 );
        // this.BB = new BoundingBox(this.x, this.y, 126, 30);
        
    };
    
    update() {
        this.elapsedTime += this.game.clockTick;
        const TICK = this.game.clockTick;
        const RUN = 80; //change the speed
        const LOWER_BOUND = 80;
        const UPPER_BOUND = 550;
        this.velocity.y += this.fallAcc * TICK;
        
        // update position
        this.updateBB();
        this.x += this.velocity.x * TICK;
        this.y += this.velocity.y * TICK;
        
              
        var that = this;


        /** chainBot behaviour and collisions */ 
        
        // TODO this works, but need to ajust duration for the hit and death state, and death logic.
        that.game.entities.forEach(function (entity) {
            if (entity.BB && that.BB.collide(entity.BB)) {
                if (entity instanceof Projectile  && that.hitPoints > 0){
                    // && Math.abs(entity.BB && that.BB.distance(entity.BB)) === 0) {
                    entity.removeFromWorld = true;
                    --that.hitPoints;
                    that.state = 5;  //TODO does not rendring forthe whole cycle (sprite duration) chainBot hit

 //TODO delete **************************************   TEST
                    // that.updateBB();
                    // that.state = 0;
                } else if (that.hitPoints <= 0) {
                    // that.velocity = 0;
                    // that.game.camera.heartMana.addFullHeart();
                    that.game.mage.curMana += 10;
                    that.state = 6; // death
                    that.velocity.x = 0;
                    // that.updateBB();
                        
                }
                if (that.velocity.y > 0) { 
                    if (((entity instanceof Ground) || (entity instanceof Platform) || (entity instanceof Wall) || (entity instanceof Tiles)) && (that.lastBB.bottom <= entity.BB.top)){
                  
                    that.velocity.y = 0;
                    that.y = entity.BB.top - that.BB.height-25;
                    // if(that.state == that.states.jump) that.state = that.states.idle;
                    that.updateBB();
                }
            }
            if (that.velocity.y > 0) { 
                if (((entity instanceof Ground) || (entity instanceof Platform) || (entity instanceof Wall) || (entity instanceof Tiles)) && (that.lastBB.bottom <= entity.BB.top)){
                  
                    that.velocity.y = 0;
                    that.y = entity.BB.top - that.BB.height-25;
                    // if(that.state == that.states.jump) that.state = that.states.idle;
                    that.updateBB();
                }
            }
        }
           

            // Decide to approach the mage
            if (entity instanceof Mage && that.BB.bottom === entity.BB.bottom){
                if (entity instanceof Mage && LOWER_BOUND < Math.abs(that.BB.distance(entity.BB)) 
                        && Math.abs(that.BB.distance(entity.BB)) < UPPER_BOUND) { //Mage is close, then go to Mage
                    if (that.BB && that.BB.distance(entity.BB) < 0) { // Mage is on the Right side
                        that.state = 1; //state runRight
                        that.velocity.x = RUN; //RUN = 50
                        that.updateBB();
                        // console.log(Math.abs(entity.BB && that.BB.distance(entity.BB)));
                    } else { 
                        that.state = 2; //state runLeft otherwise
                        that.velocity.x = -RUN;
                        that.updateBB();
                        // console.log(that.BB.distance(entity.BB));
                    } 
                    //Mage is not in range then stop and wait. Default state.        
                    } else if (entity instanceof Mage && Math.abs( that.BB.distance(entity.BB)) >= UPPER_BOUND) {  //!that.state = 5
                        that.state = 0; //state idle
                        that.velocity.x = 0;
                        that.updateBB();

                    //Mage is close enough to fight, then fight                        
                    } else if (entity instanceof Mage && Math.abs(that.BB.distance(entity.BB)) <= LOWER_BOUND) {
                    if (-LOWER_BOUND < (that.BB.distance(entity.BB)) && (that.BB.distance(entity.BB)) < 0) {
                    that.state = 4; //state attackRight
                    if(that.animations[that.state].isAlmostDone(TICK)){
                        // console.log("ran");
                        // entity.hp -= 5;
                    }
                    that.velocity.x = 0;
                    that.updateBB();
                    // console.log(that.BB.distance(entity.BB));
                    } else {
                    that.state = 3; //state attackLeft
                    that.velocity.x = 0;
                    that.updateBB();
                    // console.log(entity.BB && that.BB.distance(entity.BB));
                    }

                }//end of ddattack logic

            }
            if(that.animations[6].isAlmostDone(TICK)){
                that.dead = true;
                that.removeFromWorld = true;
            }
        
           
        }); //end of forEach
        // if(this.y >= 650){
        //     this.y = 650;
        // }  
    };//end update() chainBot behavior and collisions

    draw(ctx) {
        this.enemHealthBar.draw(ctx);
        this.animations[this.state].drawFrame(this.game.clockTick, ctx, this.x-this.game.camera.x, this.y-this.game.camera.y, PARAMS.SCALE);
            //draw the boundingBox
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y-this.game.camera.y, this.BB.width , this.BB.height);
            // ctx.strokeStyle = 'Yellow';
            // ctx.strokeRect(this.BB.x + this.BB.width/2 - this.game.camera.x, this.BB.y-62, 87 , 3);
            // ctx.strokeStyle = 'Green';
            // ctx.strokeRect(this.BB.x + this.BB.width/2 - this.game.camera.x -87, this.BB.y-62, 87 , 3);
            
            //  // TEST draw text to canvas
            // ctx.font = "20px Arial";
            // ctx.fillStyle = "white";
            // ctx.fillText("X: " + Math.round(this.x), 510, 50);
            // ctx.fillText("ChainBot BB Width: " + Math.round(this.BB.width), 660, 50);
            // ctx.fillText("ChainBot BB bottom: " + Math.round(this.BB.bottom), 660, 70);
            

            // // console.log(that.BB.bottom);
            // // console.log(entity.BB.top);

            // ctx.fillText("Y: " + Math.round(this.y), 510, 70);
            // ctx.fillText("Speed: " + this.velocity.x, 510, 90);
            // ctx.fillText("State: " + this.state, 510, 110);
            // ctx.fillText("hitPoints: " + this.hitPoints, 510, 130);


                         
    }; // End draw method

};