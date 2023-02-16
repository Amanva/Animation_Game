class ChainBot {

    constructor(game, x, y){
        Object.assign(this, { game, x, y });
        this.game.chainBot = this;
        this.velocity = { x: 0, y: 0 };
        this.hp = 120;
        this.maxHP = 120;
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
        this.animations[6] = new Animator(this.botDeath, 0, 0, 126, 39, 5, 0.20, 0, 0, false, true, true);
      
    }; // End load animation

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x+140, this.y+25, 50, 30*1.8 );
        this.lastAttackBB = this.AttackBB;
        this.detectionAttackBB = new BoundingBox(this.x+60,this.y+25,200,50);

        if(this.state === 4){
            this.AttackBB = new BoundingBox(this.x+190,this.y+25,100,50);
        }
        else if(this.state ===3){
            this.AttackBB = new BoundingBox(this.x+40,this.y+25,100,50);
        }
        else{
            this.AttackBB = new BoundingBox(0,0,0,0);
        }
        
    };

    update() {
        this.elapsedTime += this.game.clockTick;
        const TICK = this.game.clockTick;
        const RUN = 110; //change the speed
        const LOWER_BOUND = 95;
        const UPPER_BOUND = 650;
        this.velocity.y += this.fallAcc * TICK;
        
        // update position
        this.updateBB();

        this.x += this.velocity.x * TICK;
        this.y += this.velocity.y * TICK;
              
        var that = this;
        
        /** chainBot behaviour and collisions */ 
        // TODO this works, but need to ajust duration for the hit state.
        that.game.entities.forEach(function (entity) {
            if (entity.BB && that.BB.collide(entity.BB)) {
                if (entity instanceof Projectile  && that.hp > 0){
                    entity.removeFromWorld = true;
                    that.hp -= 20;
                    that.state = 5
                    if(that.animations[5].isAlmostDone(TICK)){
                        that.dead = true;
                        that.removeFromWorld = true;
                    }
                    
                } else if (that.hp <= 0) {
                    that.state = 6; // death
                    that.velocity.x = 0;
                    that.dead = true;
                    if(that.animations[6].isAlmostDone(TICK)){
                        // assetMangager.playAsset("sounds/blood_splash.wav");
                        that.dead = true;
                        that.removeFromWorld = true;
                    }
                                            
                }
                if (that.velocity.y > 0) { 
                    if (((entity instanceof Ground) || (entity instanceof Platform) || (entity instanceof Wall) || (entity instanceof Tiles)) && (that.lastBB.bottom >= entity.BB.top)){
                  
                    that.velocity.y = 0;
                    that.y = entity.BB.top - that.BB.height-25;
                    that.updateBB();
                }
            }
        } 
            // Decide to approach the mage
            if (entity instanceof Mage && Math.round(that.BB.bottom) === Math.round(entity.BB.bottom)){ // if both are on same surfase
                if (entity instanceof Mage && LOWER_BOUND <= Math.abs(that.BB.distance(entity.BB)) 
                        && Math.abs(that.BB.distance(entity.BB)) <= UPPER_BOUND) { //Mage is close, then go to Mage
                    if (that.BB && that.BB.distance(entity.BB) < 0 && (that.state !== 4) && (that.state !== 3)) { // Mage is on the Right side
                        // console.log(that.BB.distance(entity.BB));
                        that.state = 1; //state runRight
                        that.velocity.x = RUN; //speed of RUN
                        that.updateBB();

                    } else if(that.BB && that.BB.distance(entity.BB) > 0 && (that.state !== 4) && (that.state !== 3)){ 
                        that.state = 2; //state runLeft otherwise
                        that.velocity.x = -RUN;
                        that.updateBB();

                    } 
                    //Mage is not in range then stop and wait. Default state.        
                    } else if (entity instanceof Mage && Math.abs( that.BB.distance(entity.BB)) >= UPPER_BOUND) {  //!that.state = 5
                        that.state = 0; //state idle
                        that.velocity.x = 0;
                        that.updateBB();

                        
                    //Mage is close enough to fight, then fight                        
                    } else if ((entity instanceof Mage) && (Math.abs(that.BB.distance(entity.BB)) <= LOWER_BOUND&& that.detectionAttackBB.collide(entity.BB)) && !that.isHit) {
                        console.log("ISSUE");
                    if (entity.BB.left > that.BB.right) {
                    that.isHit = true;
                    that.velocity.x = 0;
                    that.state = 4; //state attackRight
                    that.updateBB();
                    entity.removeHealth(10);

                    
                    } else if(entity.BB.right < that.BB.left) {
                    that.isHit = true;
                    that.velocity.x = 0;

                    that.state = 3; //state attackLeft
                    that.updateBB();

                    entity.removeHealth(10);
                    }

                    // console.log(that.animations[that.state].currentFrame());
                }//end of attack logic
                    if(that.animations[4].isAlmostDone(TICK) || that.animations[3].isAlmostDone(TICK)){
                        that.state = 1;
                        that.animations[4].elapsedTime = 0;
                        that.animations[3].elapsedTime = 0;
                        that.isHit = false;
                        that.updateBB();

                    }
            } else if (entity instanceof Mage && Math.round(that.BB.bottom) !== Math.round(entity.BB.bottom)) {
                that.state = 0;
                that.velocity.x = 0;
            }
        
        }); //end of forEach
        //   console.log(this.state);
    };//end update() chainBot behavior and collisions

    draw(ctx) {
        if(this.hp >= 0) this.enemHealthBar.draw(ctx);
        this.animations[this.state].drawFrame(this.game.clockTick, ctx, this.x-this.game.camera.x, this.y-this.game.camera.y, PARAMS.SCALE);
            if(debug){
                // //draw the boundingBox
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