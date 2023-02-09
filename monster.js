class Monster{ 

           constructor(game, x, y){
            Object.assign(this, { game, x, y });
            this.game.monster = this;
            this.velocity = { x: 0, y: 0 };
            this.hitPoints = 1;
                    
            
            this.spritesheet = assetMangager.getAsset("./sprites/monster.png");
            this.spritesheetLeft = assetMangager.getAsset("./sprites/monsterLeft.png");
            this.spritesheetIdle = assetMangager.getAsset("./sprites/demon-idle.png");
            this.spritesheetIdleLeft = assetMangager.getAsset("./sprites/demon-idleLeft.png");
            this.spritesheetIdleLeft = assetMangager.getAsset("./sprites/demon-idleRight.png");
            
                                      
            // this.fallAcc = 200;
            this.x = 180;
            this.y = 330;
            this.speed = 100;
            this.state = 0;
            this.dead = false;
            this.updateBB();
            this.loadAnimations();
            
        }; // end of constructor
    
        loadAnimations() {
            this.animations = [];
            for (var i = 0; i < 2; i++) { 
                this.animations.push([]);
                
            }
                      
            // idle
           this.animations[0] = new Animator(this.spritesheetIdleLeft, 5, 0, 155, 126, 6, 0.10, 5, 0, true, true, false);
            // right run
           this.animations[1] = new Animator(this.spritesheetIdle, 0, 0, 155, 126, 6, 0.10, 5, 0, false, true, false);
            // left run
           this.animations[2] = new Animator(this.spritesheetIdle, 0, 0, 155, 126, 6, 0.10, 5, 0, false, true, false);
            // left attack
           this.animations [3] = new Animator(this.spritesheet, -40, 0, 200, 150, 11, 0.1, 40, 0, false, true, false);
            // right attack
            this.animations[4] = new Animator(this.spritesheetLeft, 0, 0, 200, 150, 11, 0.1, 40, 100, true, true, false);
                      
        }; // End load animation
    
 

         updateBB() {
             this.lastBB = this.BB;
             this.BB = new BoundingBox(this.x+140, this.y + 25, 50, 30 * 1.8); 
             this.BB = new BoundingBox(this.x, this.y, 80, 120);
            
            
        // };
        //updateBB() {
          //  this.BB = new BoundingBox(this.x + 45-this.game.camera.x, this.y + 35, 70, 90, "red");
            // this.BB = new BoundingBox(this.x + 60-this.game.camera.x, this.y + 35, 70, 110, "red");
            
        }
        update() {
            this.elapsedTime += this.game.clockTick;
            // default state, and default velocity
            // this.state = 0;  
             //this.velocity.x = 0; 
            const TICK = this.game.clockTick;
            const RUN = 200; //change the speed
            const LOWER_BOUND = 80;
            const UPPER_BOUND = 350;
          
            // const MAXFALL = 270;
    
            // update position
            this.x += this.velocity.x * TICK;
                  
            var that = this;
            this.updateBB();
    
            // collisions
            this.game.entities.forEach(function (entity) {
                if (entity instanceof Projectile && entity.BB && that.BB.collide(entity.BB) && that.hitPoints > 0){
                        // && Math.abs(entity.BB && that.BB.distance(entity.BB)) === 0) {
                        entity.removeFromWorld = true;
                        --that.hitPoints;            
                        that.state = 5;  
    
                        console.log(entity.BB && that.BB.distance(entity.BB)); 
                        that.updateBB();
                        // that.state = 0;
                 } else if (that.hitPoints <= 0) {
                        // that.velocity = 0;
                        that.state = 6; // death
                        that.dead = true;
                        that.removeFromWorld = true;
                        that.updateBB();
                            
                    }
    
                    
                //go towards to mage
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
                //Mage is not in range then stop and wait.        
                } else if (entity instanceof Mage && Math.abs( that.BB.distance(entity.BB)) >= UPPER_BOUND) {  //!that.state = 5
                        that.state = 0; //state idle
                        that.velocity.x = 0;
                        that.updateBB();
    
                // attack Mage                         
                } else if (entity instanceof Mage && Math.abs(that.BB.distance(entity.BB)) <= LOWER_BOUND) {
                    if (-LOWER_BOUND < (that.BB.distance(entity.BB)) && (that.BB.distance(entity.BB)) < 0) {
                    that.state = 4; //state attackRight
                    that.velocity.x = 0;
                    that.updateBB();
                    console.log(that.BB.distance(entity.BB));
                    } else {
                    that.state = 3; //state attackLeft
                    that.velocity.x = 0;
                    that.updateBB();
                    console.log(entity.BB && that.BB.distance(entity.BB));
                    }
    
                }
            
            }); 
                      
        };
    
        draw(ctx) {
            
            this.animations[this.state].drawFrame(this.game.clockTick, ctx, this.x-this.game.camera.x, this.y, 1 ); //PARAMS.SCALE);
                
                ctx.strokeStyle = 'Red';
                ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width , this.BB.height);
                ctx.strokeStyle = 'Yellow';
                ctx.strokeRect(this.BB.x + this.BB.width/2 - this.game.camera.x, this.BB.y, 87 , 3);
                            
                                
                 ctx.strokeStyle = 'Green';
                 ctx.strokeRect(this.BB.x + this.BB.width/2 - this.game.camera.x-87, this.BB.y, 87 , 3);
               
                 
                ctx.font = "20px Arial";
                ctx.fillStyle = "white";
                ctx.fillText("X: " + Math.round(this.x), 10, 50);
                ctx.fillText("Monster BB Width: " + Math.round(this.BB.width), 160, 50);
                // ctx.fillText("Y: " + Math.round(this.y), 10, 70);
                ctx.fillText("Speed: " + this.velocity.x, 10, 90);
                ctx.fillText("State: " + this.state, 10, 110);
                ctx.fillText("hitPoints: " + this.hitPoints, 10, 130);
                             
        }; 
    
    }; 
    
    



