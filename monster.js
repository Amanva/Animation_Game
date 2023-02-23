class Monster{ 

    constructor(game, x, y){
     Object.assign(this, { game, x, y });
     this.game.monster = this;
     this.velocity = { x: 0, y: 0 };
     this.hitPoints = 1;
     this.fallAcc = 200;       
     
     this.IdleRight = assetMangager.getAsset("./sprites/demon-idleRight.png"); // idling and running right
     this.IdleLeft = assetMangager.getAsset("./sprites/demon-idleLeft.png"); // idling and running left
     this.AttackLeft = assetMangager.getAsset("./sprites/monsterRight.png"); //Left attack
     this.AttackRight = assetMangager.getAsset("./sprites/monsterLeft.png"); // Right attack
     
                               
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
     for (var i = 0; i < 4; i++) { 
         this.animations.push([]);
     }
               
    // idle or run left
    //(spritesheet, xStart, yStart, width, height, frameCount, frameDuration, framePaddingX, framePaddingY, reverse, loop, verticalSprite)
    this.animations[0] = new Animator(this.IdleRight, 0, 0, 160, 144, 6, 0.20, 0, 0, false, true, false);  
    // idle or runright
    this.animations[1] = new Animator(this.IdleLeft, 0, 0, 160, 144, 6, 0.20, 0, 0, false, true, false);  
    // attack right
    this.animations[2] = new Animator(this.AttackRight, 0, 0, 233, 179, 11, 0.20, 0, 0, true, true, false);
    // attack left
    this.animations[3] = new Animator(this.AttackLeft, 0, 0, 233, 179, 11, 0.20, 0, 0, false, true, false);
                    
 }; // End load animation



  updateBB() {
      this.lastBB = this.BB;
      this.BB = new BoundingBox(this.x, this.y, 160, 144);
    //   this.BB = new BoundingBox(this.x+20, this.y+30, 100, 100); // BB for Idling state
    }

 update() {
    this.elapsedTime += this.game.clockTick;
    const TICK = this.game.clockTick;
    const RUN_X = 200; //change the X speed
    const RUN_Y = 200; //change the Y speed
    const UPPER_BOUND = 450;
   
    // update position
    this.x += this.velocity.x * TICK;
    this.y += this.velocity.y * TICK; 
    this.updateBB();
    var that = this;

     // collisions
     this.game.entities.forEach(function (entity) {
        if (entity.BB && that.BB.collide(entity.BB)) {
            if (entity instanceof Projectile &&  that.hitPoints > 0){
                // && Math.abs(entity.BB && that.BB.distance(entity.BB)) === 0) {
                entity.removeFromWorld = true;
                --that.hitPoints;
            } else if (that.hitPoints <= 0) {
                that.dead = true;
                that.removeFromWorld = true;
            } //end projectile collision

            if (entity instanceof Mage) {  //collide mage and take his health
                entity.removeHealth(0.075);
                }

            if ((entity instanceof Ground) || (entity instanceof Platform) || (entity instanceof Wall) || (entity instanceof Tiles)) {
                //monster goes down
                if ((that.lastBB.bottom <= entity.BB.top && that.velocity.y > 0)) {
                    that.velocity.y = -that.velocity.y;
                    // that.velocity.x = 0;
                    if ((that.lastBB.Right <= entity.BB.Left) || (that.lastBB.Left >= entity.BB.Right)) {
                        that.velocity.y = -that.velosity.y;
                        that.velocity.x = 0; 
                    }

                } else if((that.lastBB.top >= entity.BB.Bottom && that.velocity.y < 0)){ //Monster goes UP
                    that.velocity.y = -that.velocity.y;
                    if ((that.lastBB.Right <= entity.BB.Left) || (that.lastBB.Left >= entity.BB.Right)) {
                        that.velocity.y = -that.velosity.y;
                        that.velocity.x = 0;
                    }
                } 
                else {
                    that.velocity.y = 0;
                    that.velocity.x = RUN_X; 
                }
            
                
            }

            
                    
        } // end of if collide
   
         //go towards to mage
        if (entity instanceof Mage && Math.abs(that.BB.distance(entity.BB)) < UPPER_BOUND) { // to toward the Mage if he is in range
             if (that.BB && that.BB.distance(entity.BB) < 0) { 
                 that.state = 0; //state runRight
                 that.velocity.x = RUN_X; // X increment
                 that.velocity.y = RUN_Y; // Y increment
                 
                 // console.log(Math.abs(entity.BB && that.BB.distance(entity.BB)));
             } else { 
                 that.state = 1;
                 that.velocity.x = -RUN_X;
                 that.velocity.y = -RUN_Y;
                 
                 // console.log(that.BB.distance(entity.BB));
             } 
         
         } else if (entity instanceof Mage && Math.abs( that.BB.distance(entity.BB)) >= UPPER_BOUND) {  
                 that.state = 0; 
                 that.velocity.x = 0;
                 that.velocity.y = 0;
                 

        //  // attack Mage                         
        //  } else if (entity instanceof Mage && Math.abs(that.BB.distance(entity.BB)) <= LOWER_BOUND) {
        //      if (-LOWER_BOUND < (that.BB.distance(entity.BB)) && (that.BB.distance(entity.BB)) < 0) {
        //      that.state = 4; 
        //      that.velocity.x = 0;
        //      that.updateBB();
        //      console.log(that.BB.distance(entity.BB));
        //      } else {
        //      that.state = 3; 
        //      that.velocity.x = 0;
        //      that.updateBB();
        //      console.log(entity.BB && that.BB.distance(entity.BB));
        //      }

         }
     
     }); 
     this.updateBB();
                
 };

 draw(ctx) {
     ctx.globalAlpha = 0.5;
    //  this.animations[this.state].drawFrame(this.game.clockTick, ctx, this.x-this.game.camera.x, this.y-this.game.camera.y, 1 ); //PARAMS.SCALE);
     this.animations[0].drawFrame(this.game.clockTick, ctx, this.x-this.game.camera.x, this.y-this.game.camera.y, 1 );
ctx.globalAlpha = 1;
         
         ctx.strokeStyle = 'Red';
         ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width , this.BB.height);

       }; 

}; 
