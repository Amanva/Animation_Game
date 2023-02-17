class Monster{ 

    constructor(game, x, y){
     Object.assign(this, { game, x, y });
     this.game.monster = this;
     this.velocity = { x: 0, y: 0 };
     this.hitPoints = 4;
     this.fallAcc = 200;        
    this.spritesheetLeftAttack = assetMangager.getAsset("./sprites/monster-Left-Attack.png");
     this.spritesheetRightAttack = assetMangager.getAsset("./sprites/monster-Riight-Attack.png");
     this.spritesheetLeftFly = assetMangager.getAsset("./sprites/monster-Left-Fly.png");
    this.spritesheetIdle = assetMangager.getAsset("./sprites/monster-idle.png");
     this.spritesheetRightFly = assetMangager.getAsset("./sprites/monster-Right-Fly.png");
     
               
                               
    
     this.x = 120;
     this.y = 280;
     this.speed = 100;
     this.state = 0;
     this.dead = false;
     this.updateBB();
     this.loadAnimations();
     
 }; 

 loadAnimations() {
     this.animations = [];
     for (var i = 0; i < 5; i++) { 
         this.animations.push([]);
         
     }

      // idle
this.animations[0] = new Animator(this.spritesheetIdle, 5, 0, 155, 126, 6, 0.10, 5, 0, true, true, false);
    // right fly
this.animations[1] = new Animator(this.spritesheetRightFly, 0, 0, 155, 126, 6, 0.10, 5, 0, false, true, false);

// left fly
this.animations[2] = new Animator(this.spritesheetLeftFly, 0, 0, 155, 126, 6, 0.10, 5, 0, false, true, false);

// left attack
this.animations [3] = new Animator(this.spritesheetLeftAttack, -40, 0, 200, 150, 11, 0.1, 40, 0, false, true, false);

// right attack
this.animations[4] = new Animator(this.spritesheetRightAttack, 0, 0, 200, 150, 11, 0.1, 40, 100, true, true, false);
                
         
 }; 

   updateBB() {
      this.lastBB = this.BB;
      //this.BB = new BoundingBox(this.x+140, this.y + 25, 50, 30 * 1.8); 
      this.BB = new BoundingBox(this.x, this.y, 110, 140);
     
                   
 // };
 //updateBB() {
   //  this.BB = new BoundingBox(this.x + 45-this.game.camera.x, this.y + 35, 70, 90, "red");
     // this.BB = new BoundingBox(this.x + 60-this.game.camera.x, this.y + 35, 70, 110, "red");
     
 }
 update() {
     this.elapsedTime += this.game.clockTick;
     const TICK = this.game.clockTick;
     const FLY = 200; 
     const LOWER_BOUND = 80;
     const UPPER_BOUND = 350;
   
     

     // update position
     this.x += this.velocity.x * TICK;
     this.y += this.velocity.y * TICK;     
     var that = this;
     this.updateBB();

     // collisions
     this.game.entities.forEach(function (entity) {
         if (entity instanceof Projectile && entity.BB && that.BB.collide(entity.BB) && that.hitPoints > 0){
               
                 entity.removeFromWorld = true;
                 --that.hitPoints;            
                 that.state = 5;  

                 console.log(entity.BB && that.BB.distance(entity.BB)); 
                 that.updateBB();
                 // that.state = 0;
          } else if (that.hitPoints <= 0) {
                
                 that.state = 6; 
                 that.dead = true;
                 that.removeFromWorld = true;
                 that.updateBB();
                     
             }

             
         
         if (entity instanceof Mage && LOWER_BOUND < Math.abs(that.BB.distance(entity.BB)) 
                     && Math.abs(that.BB.distance(entity.BB)) < UPPER_BOUND) { 
             if (that.BB && that.BB.distance(entity.BB) < 0) { 
                 that.state = 1; 
                 that.velocity.x = FLY; 
                 that.velocity.y = FLY; 
                 that.updateBB();
                
             } else { 
                 that.state = 2;
                 that.velocity.x = -FLY;
                 that.velocity.y = -FLY;
                 that.updateBB();
                
             } 
         
         } else if (entity instanceof Mage && Math.abs( that.BB.distance(entity.BB)) >= UPPER_BOUND) {  
                 that.state = 0; 
                 that.velocity.x = 0;
                 that.velocity.y = -that.velocity.y;
                 //that.updateBB();

         // attack                          
         } else if (entity instanceof Mage && Math.abs(that.BB.distance(entity.BB)) <= LOWER_BOUND) {
             if (-LOWER_BOUND < (that.BB.distance(entity.BB)) && (that.BB.distance(entity.BB)) < 0) {
             that.state = 4; 
             that.velocity.x = 0;
             that.velocity.y = -that.velocity.y;
             //that.updateBB();
             console.log(that.BB.distance(entity.BB));
             } else {
             that.state = 3; 
             that.velocity.x = 0;
             that.velocity.y = 0;
             that.updateBB();
             console.log(entity.BB && that.BB.distance(entity.BB));
             }

         }
     
     }); 
               
 };

 draw(ctx) {
     ctx.globalAlpha = 0.2;
     this.animations[this.state].drawFrame(this.game.clockTick, ctx, this.x-this.game.camera.x, this.y, 1 ); 
    
     ctx.globalAlpha = 1;  
          ctx.strokeStyle = 'Red';
          ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width , this.BB.height);
         

                 
       }; 
 

}; 