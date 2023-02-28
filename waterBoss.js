class WaterBoss{

    constructor(game, x , y){
        Object.assign(this, { game, x, y });
        this.velocity = { x: 0, y: 0 };
        this.game.waterBoss = this;
        this.spritesheetLeft = assetMangager.getAsset("./sprites/waterLevel/hydra_left.png");
        // this.spritesheetRight = assetMangager.getAsset("./sprites/waterLevel/hydra_right.png");
        this.velocity = { x: 0, y: 0 };
        this.hp = 400;
        this.maxHP = 400;
        this.enemHealthBar = new HealthBar(this.game, this);
        this.fallAcc = 300;
        this.state = 0;
        this.dead = false;
        this.readyToAttack = false;
        this.attackCoolDown = 0;
        this.updateBB();
        this.loadAnimations();
    };

    loadAnimations() {
        this.animations = [];
        for (var i = 0; i < 3; i++) { 
            this.animations.push([]);
            
        }
//(spritesheet, xStart, yStart, width, height, frameCount, frameDuration, framePaddingX, framePaddingY, reverse, loop, verticalSprite)
        // Left run/idle
        this.animations[0] = new Animator(this.spritesheetLeft, 5, 262, 126, 131, 12, 0.15, 0, 0, true, true, false);
        // left dead
        this.animations[1] = new Animator(this.spritesheetLeft, 5, 131, 126, 131, 12, 0.10, 0, 0, true, false, false);
        // left attack
        this.animations[2] = new Animator(this.spritesheetLeft, 619, 393, 126, 131, 7, 0.15, 0, 0, true, true, false);
        // // left wave attack
        // this.animations[3] = new Animator(this.spritesheetLeft, 0, 0, 104, 155, 14, 0.20, 0, 0, true, true, false);
        // // hit
        // this.animations[5] = new Animator(this.botHit, 0, 0, 126, 39, 2, 0.20, 0, 0, false, true, true);
        // // death
        // this.animations[6] = new Animator(this.botDeath, 0, 0, 126, 39, 5, 0.20, 0, 0, false, true, true);
      
    }; // End load animations

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y, 124*1.5, 110*1.5);
    };

    update() {
        this.elapsedTime += this.game.clockTick;
        const TICK = this.game.clockTick;
        const RUN = 110; //change the speed
        const LOWER_BOUND = 95;
        const UPPER_BOUND = 1000;
        const ATTACK_TIMING = 3.5;
        this.velocity.y += this.fallAcc * TICK;
        this.attackCoolDown += this.game.clockTick;
        
        // update position
        this.x += this.velocity.x * TICK;
        this.y += this.velocity.y * TICK;
        this.updateBB();
        let currentState = this.state;
                     
        var that = this;

        /** chainBot behaviour and collisions */ 
        // TODO this works, but need to ajust duration for the hit state.
        that.game.entities.forEach(function (entity) {
            if (entity.BB && that.BB.collide(entity.BB)) {
                if (entity instanceof Projectile  && that.hp > 0){
                    entity.removeFromWorld = true;
                    that.hp -= 200;
                    
                } else if (that.hp <= 0) {
                    that.state = 1; // death
                    that.velocity.x = 0;
                    that.dead = true;
                    if(that.animations[1].isAlmostDone(TICK)){
                        // assetMangager.playAsset("sounds/blood_splash.wav");
                        that.dead = true;
                        that.removeFromWorld = true;
                    }
                                            
                }
                //landing
                if (that.velocity.y > 0) { 
                    if (((entity instanceof Ground) || (entity instanceof Platform) 
                        || (entity instanceof Wall) || (entity instanceof Tiles))
                                 && (that.lastBB.bottom >= entity.BB.top)){
                  
                        that.velocity.y = 0;
                        that.y = entity.BB.top - that.BB.height;
                        // that.updateBB();
                    } 
                
                } else if (that.velocity.y === 0){ //side collision

                    if (((entity instanceof Platform) 
                            || (entity instanceof Wall) || (entity instanceof Tiles))
                                && (that.BB.collide(entity.rightBB))) { //enemy on the right

                        that.velocity.x = 0;
                        that.velocity.y = 0;
                        that.state = 0;
                        
                    } 
                    
                    if (((entity instanceof Platform)  //side collision
                            || (entity instanceof Wall) || (entity instanceof Tiles))
                                && ( that.BB.collide(entity.leftBB))) { //enemy on the left

                        that.velocity.x = 0;
                        that.velocity.y = 0;
                        that.state = 0;
                        
                        // that.updateBB();
                    }

                }
            } 

            // Decide to approach the mage
            if (entity instanceof Mage && Math.round(that.BB.bottom) === Math.round(entity.BB.bottom) ){ // if both are on same surfase
                if (LOWER_BOUND <= Math.abs(that.BB.distance(entity.BB)) 
                        && Math.abs(that.BB.distance(entity.BB)) <= UPPER_BOUND) { //Mage is close, then go to Mage
                    if (that.BB && that.BB.distance(entity.BB) < 0) { // Mage is on the Right side
                        // that.state = 1; //state runRight
                        // that.velocity.x = RUN; //speed of RUN
                        
                    } else { 
                        that.state = 2; //state runLeft otherwise
                        // that.velocity.x = -RUN;
                        
                    } 
                    //Mage is not in range then stop and wait. Default state.        
                    } else if (Math.abs( that.BB.distance(entity.BB)) >= UPPER_BOUND) {
                        that.state = 0; //state idle
                        that.velocity.x = 0;
                        
                    // Mage is close enough to attack, then attack.                        
                    } else if (Math.abs(that.BB.distance(entity.BB)) <= LOWER_BOUND ) {
                    // if (-LOWER_BOUND <= (that.BB.distance(entity.BB)) && (that.BB.distance(entity.BB)) < 0 ) {
                        
                        that.state = 2; //state attackRight
                        that.velocity.x = 0;
                        
                        // assetMangager.playAsset("sounds/slash_swoosh.wav");
                        // entity.removeHealth(0.075);
                        // that.readyToAttack = true;
                    // } else {
                    //     that.state = 2; //state attackLeft
                    //     // entity.removeHealth(0.075);
                    //     that.velocity.x = 0;
                    //     that.attackCoolDown = 0;
                        // that.readyToAttack = true;
                    // }aaa

                }

                 // Holds current animation until the end of the animation.
                if (!that.animations[2].isAnimationDone()){ //wait until animation is finished here.
                    // that.game.addEntityToBegin(new Wave(this.game,this.x, this.y));
                    that.state = 2;
                    that.velocity.x = 0;
                    // that.attackCoolDown = 0;
                    if (that.animations[2].isAlmostDone(TICK)){ //IF animation is done and attack_timing is done then shoot
                        that.attackCoolDown = 0;
                        that.game.addEntityToBegin(new Wave(that.game, that.x, that.y));
                        that.animations[2].elapsedTime = 0;
                    
                    }

                }
                

            } else if (entity instanceof Mage && Math.round(that.BB.bottom) !== Math.round(entity.BB.bottom) || that.attackCoolDown < ATTACK_TIMING) {
                that.state = 0;
                that.velocity.x = 0;
            }// end attack logic
            
        }); //end of forEach

       
          
    };//end update() 

    draw(ctx) {
        this.enemHealthBar.draw(ctx);
        this.animations[this.state].drawFrame(this.game.clockTick, ctx, this.x-this.game.camera.x, this.y-this.game.camera.y, 1.5);
        // this.animations[1].drawFrame(this.game.clockTick, ctx, this.x-this.game.camera.x+600, this.y-this.game.camera.y, 1);
        // this.animations[2].drawFrame(this.game.clockTick, ctx, this.x-this.game.camera.x+900, this.y-this.game.camera.y, 1);
           
              
        if(debug){
            //draw the boundingBox
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y-this.game.camera.y, this.BB.width , this.BB.height);
            // TEST draw text to canvas
            ctx.font = "20px Arial";
            ctx.fillStyle = "white";
            ctx.fillText("fr0: " + this.animations[0].currentFrame(), this.x, this.y);
            ctx.fillText("fr1: " + this.animations[1].currentFrame(), this.x+60, this.y);
            ctx.fillText("fr2: " + this.animations[2].currentFrame(), this.x+120, this.y);
            ctx.fillText("fr2: " + this.animations[2].isAnimationDone(), this.x+120, this.y+25);
            ctx.fillText("fr0: " + this.animations[0].isAnimationDone(), this.x, this.y+25);
            ctx.fillText("game.clockTick: " + this.attackCoolDown, 660, 90);


            // ctx.fillText("ChainBot BB Width: " + Math.round(this.BB.width), 660, 50);
            // ctx.fillText("ChainBot BB bottom: " + Math.round(this.BB.bottom), 660, 70);
            
            // ctx.fillText("Y: " + Math.round(this.y), 510, 70);
            // ctx.fillText("Speed: " + this.velocity.x, 510, 90);
            // ctx.fillText("State: " + this.state, 510, 110);
            // ctx.fillText("hitPoints: " + this.hp, 510, 130);

        }
            


                         
    }; // End draw method

};




class Wave {
    constructor(game, x , y){
        Object.assign(this, { game, x, y });
        this.velocity = { x: 0, y: 0 };
        this.game.wave = this;
        this.spritesheetLeft = assetMangager.getAsset("./sprites/waterLevel/hydra_left.png");
        this.velocity = { x: 0, y: 0 };
        this.animations = [];
        this.speed = 500;
        this.dead = false;
        this.animations.push(new Animator(this.spritesheetLeft, 0, 0, 104, 155, 14, 0.20, 0, 0, true, false, false));
        this.initailX = this.x;

        this.shot = {x: this.game.mouse.x + this.game.camera.x, y: this.game.mouse.y + this.game.camera.y};
        this.velocity.x = -600;
        this.updateBB();
    };
    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y, 104, 155);
    };
    update(){
        const TICK = this.game.clockTick;
        const VAWE_RANGE = 1500;
        this.x += this.velocity.x * TICK;;
        this.updateBB();
        if(this.x < -10){
            this.removeFromWorld = true; 
        }
        var that = this;
        this.game.entities.forEach(function (entity) {
            if (entity.BB && that.BB.collide(entity.BB)) {
                if ((entity instanceof Wall || entity instanceof Platform || entity instanceof movingPlatforms) && that.BB.collide(entity.BB)) {
                   that.removeFromWorld = true;
                }
                if(entity instanceof Mage){
                    that.removeFromWorld = true;
                    entity.removeHealth(10);

                }

                if (entity instanceof Projectile) {
                    entity.removeFromWorld = true;
                }

                if (Math.abs(that.x - that.initailX) > VAWE_RANGE) {
                    that.removeFromWorld = true;
                }
            }

        
        });
       
    };

    draw(ctx){
        // this.animations[0].drawAngle(this.game.clockTick, ctx, this.x-this.game.camera.x, this.y-this.game.camera.y, 2, this.angle);
        this.animations[0].drawFrame(this.game.clockTick, ctx, this.x-this.game.camera.x, this.y-this.game.camera.y, 1.5);
        if(debug){
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x-this.game.camera.x, this.BB.y-this.game.camera.y, this.BB.width, this.BB.height);


            ctx.font = "20px Arial";
            ctx.fillStyle = "white";
            ctx.fillText("vawe x : " + this.initailX, 500, 350);
            // ctx.fillText("camera srtart-x : " + this.START_X, 500, 390);
            }
    };

}




class Squid {
    constructor(game, x, y){
        Object.assign(this, { game, x, y});
        this.game.squid = this;
        this.velocity = { x: 0, y: 0 };
        this.squid = assetMangager.getAsset("./sprites/waterLevel/squid.png");
        this.scale = 1;
        this.updateBB();
        this.loadAnimations();

        // // this.animations= new Animator(this.squid, 0, 0, 80, 60, 7, 0.20, 0, 0, false, true, undefined); //attack
        // this.animations= new Animator(this.squid, 0, 120, 80, 60, 4 , 0.50, 0, 0, false, true, undefined); //attack
        // //  this.animations= new Animator(this.squid, 0, 0, 80, 60, 11, 0.20, 0, 0, false, true, undefined); //attack
        // this.animations.columnNum = 4;
    }; // end of constructor

    

    loadAnimations() {
        this.animations = [];
        for (var i = 0; i < 3; i++) { 
            this.animations.push([]);
            this.animations[i].columnNum = 4;
            
        }
        this.animations[0] = new Animator(this.squid, 0, 0, 80, 60, 7, 0.12, 0, 0, false, true, false); //attack
        this.animations[1] = new Animator(this.squid, 0, 60, 80, 60, 4 , 0.30, 0, 0, false, true, false); //dead
        this.animations[2] = new Animator(this.squid, 0, 60, 80, 60, 4 , 0.30, 0, 0, true, true, false); //born
    }
    


    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x+10, this.y+10, 60, 40); 
    };
    
    update() {
        // let curFrame = this.animations.currentFrame();
        this.updateBB();
        var that = this;
        that.game.entities.forEach(function (entity) {
            if (entity instanceof Mage  && entity.BB && that.BB.collide(entity.BB)) {

            }
        
           
        }); //end of forEach
              
    };//end update() chainBot behavior and collisions

    draw(ctx) {
                   
        this.animations[0].drawFrame(this.game.clockTick, ctx, this.x-this.game.camera.x, this.y-this.game.camera.y, this.scale);
        this.animations[1].drawFrame(this.game.clockTick, ctx, this.x+150-this.game.camera.x, this.y-this.game.camera.y, this.scale);
        this.animations[2].drawFrame(this.game.clockTick, ctx, this.x+300-this.game.camera.x, this.y-this.game.camera.y, this.scale);
        if (debug) {
        //draw the boundingBox
            ctx.strokeStyle = 'white';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y-this.game.camera.y, this.BB.width , this.BB.height);
            ctx.strokeRect(this.BB.x +150- this.game.camera.x, this.BB.y-this.game.camera.y, this.BB.width , this.BB.height);
            ctx.strokeRect(this.BB.x +300- this.game.camera.x, this.BB.y-this.game.camera.y, this.BB.width , this.BB.height);
        }
        
                                
    }; // End draw method

}; // End of squid