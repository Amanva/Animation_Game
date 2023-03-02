class WaterBoss{

    constructor(game, x , y){
        Object.assign(this, { game, x, y });
        this.velocity = { x: 0, y: 0 };
        this.game.waterBoss = this;
        // this.spritesheetLeft = assetMangager.getAsset("./sprites/waterLevel/hydra_left.png");
        this.spritesheetLeft = assetMangager.getAsset("./sprites/waterLevel/pirate.png");
        this.velocity = { x: 0, y: 0 };
        this.hp = 400;
        this.maxHP = 400;
        this.enemHealthBar = new HealthBar(this.game, this);
        this.fallAcc = 300;
        this.state = 0;
        this.dead = false;
        this.readyToAttack = false;
        this.squidIsReady = true;
        this.attackCoolDown = 0;
        this.updateBB();
        this.loadAnimations();
    };

    loadAnimations() {
        this.animations = [];
        for (var i = 0; i < 4; i++) { 
            this.animations.push([]);
            
        }
//(spritesheet, xStart, yStart, width, height, frameCount, frameDuration, framePaddingX, framePaddingY, reverse, loop, verticalSprite)

// Left run/idle
this.animations[0] = new Animator(this.spritesheetLeft, 94, 0, 31, 15, 4, 0.2, 0, 0, true, true, false);
// left dead
this.animations[1] = new Animator(this.spritesheetLeft, 0, 15, 31, 15, 6, 0.15, 0, 0, true, true, false);
//squid attack
this.animations[2] = new Animator(this.spritesheetLeft, 32, 45, 31, 15, 6, 0.15, 0, 0, true, true, false);
// sword attack
this.animations[3] = new Animator(this.spritesheetLeft, 32, 30, 31, 15, 6, 0.1, 0, 0, true, true, false);

        // // Left run/idle
        // this.animations[0] = new Animator(this.spritesheetLeft, 5, 262, 126, 131, 12, 0.15, 0, 0, true, true, false);
        // // left dead
        // this.animations[1] = new Animator(this.spritesheetLeft, 5, 131, 126, 131, 12, 0.10, 0, 0, true, false, false);
        // // vawe attack
        // this.animations[2] = new Animator(this.spritesheetLeft, 619, 393, 126, 131, 7, 0.15, 0, 0, true, true, false);
        // // squid attack
        // this.animations[3] = new Animator(this.spritesheetLeft, 619, 524, 126, 131, 7, 0.15, 0, 0, true, true, false);
        // // left wave attack
        // this.animations[3] = new Animator(this.spritesheetLeft, 0, 0, 104, 155, 14, 0.20, 0, 0, true, true, false);
        // // hit
        // this.animations[5] = new Animator(this.botHit, 0, 0, 126, 39, 2, 0.20, 0, 0, false, true, true);
        // // death
        // this.animations[6] = new Animator(this.botDeath, 0, 0, 126, 39, 5, 0.20, 0, 0, false, true, true);
      
    }; // End load animations

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x+30, this.y+10, 70, 60);
    };

    update() {
        this.elapsedTime += this.game.clockTick;
        const TICK = this.game.clockTick;
        // const RUN = 110; //change the speed
        const LOWER_BOUND = 95;
        const UPPER_BOUND = 1000;
        const ATTACK_TIMING = 3.5;
        const SQUID_ATTACK_TIMING = 2.5;
        this.velocity.y += this.fallAcc * TICK;
        this.attackCoolDown += this.game.clockTick;
        
        // update position
        this.x += this.velocity.x * TICK;
        this.y += this.velocity.y * TICK;
        this.updateBB();
        // let currentState = this.state;
                     
        var that = this;

        /** Behaviour and collisions */ 
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
                        that.removeFromWorld = true;
                        
                    }
                                            
                }
                //landing
                if (that.velocity.y > 0) { 
                    if (((entity instanceof Ground) || (entity instanceof Platform) 
                        || (entity instanceof Wall) || (entity instanceof Tiles))
                                 && (that.lastBB.bottom >= entity.BB.top)){
                  
                        that.velocity.y = 0;
                        that.y = entity.BB.top - that.BB.height-10;
                        // that.updateBB();
                    } 
                
                } 
                
            } 

            // Decide to approach the mage
            if (entity instanceof Mage && Math.floor(that.BB.bottom) === Math.floor(entity.BB.bottom)) { // if both are on same surfase
                if (LOWER_BOUND <= Math.abs(that.BB.distance(entity.BB)) 
                        && Math.abs(that.BB.distance(entity.BB)) <= UPPER_BOUND) { //Mage is close and on the floor, then vawe attack
                    if (that.BB && that.BB.distance(entity.BB) < 0) { // Mage is on the Right side
                        // that.state = 1; //state runRight
                        // that.velocity.x = RUN; //speed of RUN
                        
                    } else { 
                        that.state = 2; //attack
                        // that.velocity.x = -RUN;
                        
                    } 
                    // Mage is not in range then stop and wait. Default state.        
                    } else if (Math.abs( that.BB.distance(entity.BB)) >= UPPER_BOUND) {
                        that.state = 0; //state idle
                        that.velocity.x = 0;
                        
                    //TODO approach and attack maybe? Mage is close enough to attack, then attack.                        
                    } else if (Math.abs(that.BB.distance(entity.BB)) <= LOWER_BOUND ) {
                    // if (-LOWER_BOUND <= (that.BB.distance(entity.BB)) && (that.BB.distance(entity.BB)) < 0 ) {
                        
                        // that.state = 2; //state attackRight
                        // that.velocity.x = 0;
                        
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
                
                

            } else if (that.attackCoolDown < ATTACK_TIMING) {
                that.state = 0;
                that.velocity.x = 0;

            } else if (entity instanceof Mage && Math.round(that.BB.bottom) > Math.round(entity.BB.bottom)
                        && that.attackCoolDown >= SQUID_ATTACK_TIMING && that.squidIsReady) {
                that.state = 3;
                that.squidIsReady = false;

            }// end attack logic

            if (!that.animations[2].isAnimationDone()){ //wait until animation is finished here.
                that.state = 2;
                that.velocity.x = 0;
                if (that.animations[2].isAlmostDone(TICK)){ //IF animation is done and attack_timing is done then shoot
                    that.attackCoolDown = 0;
                    that.game.addEntityToBegin(new Wave(that.game, that.x-100, that.y-5));
                    that.animations[2].elapsedTime = 0;
                
                }

            } else if (!that.animations[3].isAnimationDone()){ //wait until animation is finished here.
                that.state = 3;
                that.velocity.x = 0;
                if (that.animations[3].isAlmostDone(TICK)){ //IF animation is done and attack_timing is done then shoot
                    that.attackCoolDown = 0;
                    that.game.addEntityToBegin(new Squid(that.game, that.x-50, that.y-5));
                    that.animations[3].elapsedTime = 0;
                    console.log('Im here');
                }
            }

            //Can't create another squid until first is in game
            if (entity instanceof Squid){ 
                that.squidIsReady = false;

            }else {
                that.squidIsReady = true;
            }
            
        }); //end of forEach

       
          
    };//end update() 

    draw(ctx) {
        this.enemHealthBar.draw(ctx);
        this.animations[this.state].drawFrame(this.game.clockTick, ctx, this.x-this.game.camera.x, this.y-this.game.camera.y, 5);
           
        if(debug){
            //draw the boundingBox
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y-this.game.camera.y, this.BB.width , this.BB.height);
            // TEST draw text to canvas
            // ctx.font = "20px Arial";
            // ctx.fillStyle = "white";
            // ctx.fillText("fr0: " + this.animations[0].currentFrame(), this.x, this.y);
            // ctx.fillText("fr1: " + this.animations[1].currentFrame(), this.x+60, this.y);
            // ctx.fillText("fr2: " + this.animations[2].currentFrame(), this.x+120, this.y);
            // ctx.fillText("fr2: " + this.animations[2].isAnimationDone(), this.x+120, this.y+25);
            // ctx.fillText("fr0: " + this.animations[0].isAnimationDone(), this.x, this.y+25);
            // // ctx.fillText("game.clockTick: " + this.attackCoolDown, 660, 90);

        }
                         
    }; // End draw method

};


//********************                                 Wave object forthe vawe attack    (SWORD FOR PIRATE)               *******************************        


class Wave {
    constructor(game, x , y){
        Object.assign(this, { game, x, y });
        this.velocity = { x: 0, y: 0 };
        this.game.wave = this;
        this.spritesheetLeft = assetMangager.getAsset("./sprites/waterLevel/pirate.png");
        this.velocity = { x: 0, y: 0 };
        this.animations = [];
        this.speed = 500;
        this.dead = false;
        this.animations.push(new Animator(this.spritesheetLeft, 0, 45, 31, 15, 1, 0.3, 0, 0, true, true, false));
        this.initailX = this.x;

        // this.shot = {x: this.game.mouse.x + this.game.camera.x, y: this.game.mouse.y + this.game.camera.y};
        this.velocity.x = -900;
        // this.velocity.x = 0;
        this.updateBB();
    };
    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x+15, this.y+50, 50, 15);
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
        this.animations[0].drawFrame(this.game.clockTick, ctx, this.x-this.game.camera.x, this.y-this.game.camera.y, 5);
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


//******************                        very angry squid leaves no chance to survive                **********************************

class Squid {
    constructor(game, x, y){
        Object.assign(this, { game, x, y});
        this.game.squid = this;
        this.velocity = { x: 0, y: 0 };
        this.squid = assetMangager.getAsset("./sprites/waterLevel/squid.png");
        this.squidRight = assetMangager.getAsset("./sprites/waterLevel/squidRight.png");
        this.scale = 1;
        this.dead = false;
        // this.fallAcc = 200;        
        // this.speed = 100;
        this.state = 2;
        this.facing = 0;
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
                for (var j = 0; j < 2; j++) { 
                    this.animations[i].push([]);
                }
            
        }
        //Left
        this.animations[0][0] = new Animator(this.squid, 0, 0, 80, 60, 7, 0.12, 0, 0, false, true, false); // Run Left/attack
        this.animations[1][0] = new Animator(this.squid, 0, 60, 80, 60, 4 , 0.30, 0, 0, false, false, false); //dead
        this.animations[2][0] = new Animator(this.squid, 0, 60, 80, 60, 4 , 0.30, 0, 0, true, false, false); //born
        //Right
        this.animations[0][1] = new Animator(this.squidRight, 0, 0, 80, 60, 7, 0.12, 0, 0, true, true, false); // Run Right/attack
        this.animations[1][1] = new Animator(this.squidRight, 0, 60, 80, 60, 4 , 0.30, 0, 0, true, false, false); //dead
        this.animations[2][1] = new Animator(this.squidRight, 0, 60, 80, 60, 4 , 0.30, 0, 0, false, false, false); //born
    }
    
    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x+10, this.y+10, 60, 40); 
        this.MageDetection = new BoundingBox(this.x-800, this.y-200, 1800, 700);
    };
    
    update() {
        const TICK = this.game.clockTick;
        const RUN = 50;
        this.x += this.velocity.x * TICK;
        this.y += this.velocity.y * TICK;
        this.updateBB();
        var that = this;

        that.game.entities.forEach(function (entity) {
            if (entity instanceof Projectile && that.BB.collide(entity.BB)){
                entity.removeFromWorld = true;
                that.dead = true;
                that.state = 1;
            } 
        });
        
        
        if(this.dead) {
                this.removeFromWorld = true;
                
            }

        if (this.animations[2][this.facing].isAlmostDone(TICK)){
            this.state =0;
            this.dead = false;
            this.updateBB();
            this.mageCollide(TICK);

        } else if (this.animations[1][this.facing].isAlmostDone(TICK)){
            // entity.removeHealth(20);
            this.dead = true;
            this.removeFromWorld = true;
        }

        this.updateBB();
        this.mageCollide(TICK);
        
    }

    mageCollide(TICK){
        const RUN = 350;
        this.updateBB();
        let that = this;
        this.game.entities.forEach(function (entity) {
            if(!that.dead){     
            if (entity instanceof Mage) {
                let middleMage = { x: entity.BB.left + entity.BB.width / 2, y: entity.BB.top + entity.BB.height / 2 };
                let middleMonster = { x: that.BB.left + that.BB.width / 2, y: that.BB.top + that.BB.height / 2 };
                let xDis = middleMage.x - middleMonster.x;
                let yDis = middleMage.y - middleMonster.y;
                let mageDetected = entity.BB && that.MageDetection.collide(entity.BB);
                let mageAttacked = entity.BB && that.BB.collide(entity.BB);

                //Chase the Mage
                if(mageDetected && !(that.state === 1  || that.state === 2)){
                    if(mageDetected) {
                        that.state = 0;
                        
                        if (xDis > 0 ) { //On the Right
                            that.facing = 1;
                            that.velocity.x = RUN;

                        } else if (xDis < 0) { //On the Left
                            that.facing = 0;
                            that.velocity.x = -RUN;
                        }

                        if(yDis > 0) { //mage is below
                            that.velocity.y = RUN;

                        } else if(yDis < 0) { //Mage is above
                            that.velocity.y = -RUN;
                        
                        } else if( Math.round(yDis) === 0 && xDis < 0){
                            that.velocity.x = -RUN;

                        }else if( Math.round(yDis) === 0 && xDis > 0){
                            that.velocity.x = RUN;
                        }

                        
                    }

                } else if (!mageDetected) {
                    that.velocity.x = 0
                    that.velocity.y = 0;
                }//end if detected Chase

                if(mageAttacked) {
                    that.state = 1;
                    that.velocity.y = -RUN;
                    entity.removeHealth(0.75);
                      
                }
                
            } 
        };
    });

    that.updateBB();
    
}
    // PlatformCollision(){
    //     var that = this;
    //         this.game.entities.forEach(function (entity) {
    //             if (entity.BB && that.BB.collide(entity.BB)) {
    //                 if (that.velocity.y > 0) { 
    //                     if (((entity instanceof Ground) || (entity instanceof Platform) || (entity instanceof Wall) || (entity instanceof Tiles || (entity instanceof smallPlatforms) || (entity instanceof verticalWall))) && (that.lastBB.bottom <= entity.BB.top)){
    //                         that.velocity.y = 0;
    //                         that.y = entity.BB.top - that.BB.height-130;
    //                         that.updateBB();
    //                     }
    //                     if ((entity instanceof movingPlatforms) && (that.lastBB.bottom < entity.BB.top+6)){
    //                         that.y = entity.BB.top - that.BB.height-130;
    //                         that.velocity.y = 0;
    //                         that.updateBB();
    //                     }
    //                     } 
    //                     if(that.velocity.y < 0){
    //                         if ((entity instanceof Ground || entity instanceof Wall || entity instanceof Platform || entity instanceof movingPlatforms || (entity instanceof Tiles) || entity instanceof smallPlatforms) && (that.lastBB.top >= entity.BB.bottom)){
    //                             that.velocity.y = 0;
    //                             that.y = entity.BB.bottom-130;
    //                             that.updateBB();
    //                         }
    //                     }
    //                     if (((entity instanceof Wall) || (entity instanceof Ground) || (entity instanceof Platform) || (entity instanceof smallPlatforms) || (entity instanceof verticalWall)) && that.BB.collide(entity.leftBB) && (that.lastBB.top < entity.BB.bottom-5)){
    //                                 that.x = entity.leftBB.left - that.BB.width-115;
    //                                 that.velocity.x = 0;
    //                                 that.updateBB();
    //                     }
    //                     if (((entity instanceof Wall) || (entity instanceof Ground) || (entity instanceof Platform) || (entity instanceof Tiles) || (entity instanceof smallPlatforms) || (entity instanceof verticalWall)) && that.BB.collide(entity.rightBB) && (that.lastBB.top < entity.BB.bottom-5)){               
    //                                 that.x = entity.rightBB.right-115;
    //                                 that.velocity.x = 0; 
    //                                 that.updateBB(); 
    //                     }
    //                     if (((entity instanceof movingPlatforms)) && (that.lastBB.left >= entity.BB.right) && (that.lastBB.top < entity.BB.bottom-5)){               
    //                         that.x = entity.rightBB.right - that.xBBOffset;
    //                         that.velocity.x = 0; 
    //                         that.updateBB(); 
    //                     }
    //                     if (((entity instanceof movingPlatforms)) && (that.lastBB.right <= entity.BB.left) && (that.lastBB.top < entity.BB.bottom-5)){               
    //                         that.x = entity.leftBB.left - PARAMS.PLAYERWIDTH-that.xBBOffset;
    //                         that.velocity.x = 0; 
    //                         that.updateBB(); 
    //                     }
    //                 }
    //             });
    // }

    // loseHealth(damageRecieved){
    //     this.hp -= damageRecieved;
    
    // };

    draw(ctx) {
        this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x-this.game.camera.x, this.y-this.game.camera.y, this.scale);

        if (debug) {
        //draw the boundingBox
            ctx.strokeStyle = 'white';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y-this.game.camera.y, this.BB.width , this.BB.height);
            ctx.strokeStyle = 'red';
            ctx.strokeRect(this.MageDetection.x - this.game.camera.x, this.MageDetection.y - this.game.camera.y, this.MageDetection.width, this.MageDetection.height);
        }
    }; // End draw method
}; // End of squid