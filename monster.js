class Monster{ 

    constructor(game, x, y){
     Object.assign(this, { game, x, y });
     this.velocity = { x: 0, y: 0 };
     this.hitPoints = 4;
     this.fallAcc = 200;        
     this.spritesheetLeftAttack = assetMangager.getAsset("./sprites/monsterLeft.png");
     this.spritesheetRightAttack = assetMangager.getAsset("./sprites/monster-Riight-Attack.png");
     this.spritesheetLeftFly = assetMangager.getAsset("./sprites/monster-Left-Fly.png");
     this.spritesheetIdle = assetMangager.getAsset("./sprites/monster-idle.png");
     this.spritesheetRightFly = assetMangager.getAsset("./sprites/monster-Right-Fly.png");
     this.speed = 100;
     this.state = 2;
     this.facing = 1;
     this.dead = false;
     this.xOff = 0;
     this.yOff = 0;
     this.updateBB();
     this.loadAnimations();
     
 }; 

 loadAnimations() {
     this.animations = [];
     for (var i = 0; i < 5; i++) { 
         this.animations.push([]);
         for (var j = 0; j < 2; j++) { 
            this.animations[i].push([]);
        }
     }

// idle
this.animations[0][0] = new Animator(this.spritesheetIdle, 0, -30, 159, 177, 6, 0.10, 0, 0, false, true, false);
// fly
this.animations[1][0] = new Animator(this.spritesheetIdle, 0, -30, 159, 177, 6, 0.10, 0, 0, false, true, false);
// left attack
this.animations[2][0] = new Animator(this.spritesheetLeftAttack, 0, 0, 246, 177, 11, 0.1, -6, 0, true, true, false);
// idle
this.animations[0][1] = new Animator(this.spritesheetIdle, 0, -30, 159, 177, 6, 0.10, 0, 0, false, true, false);
// fly
this.animations[1][1] = new Animator(this.spritesheetIdle, 0, -30, 159, 177, 6, 0.10, 0, 0, false, true, false);
// left attack
this.animations[2][1] = new Animator(this.spritesheetLeftAttack, 0, 0, 246, 177, 11, 0.1, -6, 0, true, true, false);
          
for(var l = 0; l <= 2; l++){
    this.animations[l][1].flipped = true;
}
 }; 

   updateBB() {
      this.lastBB = this.BB;
      //this.BB = new BoundingBox(this.x+140, this.y + 25, 50, 30 * 1.8); 
      this.BB = new BoundingBox(this.x+65, this.y+60, 60, 100);
      this.MageDetection = new BoundingBox(this.x-300, this.y-200, 1000, 500);
      if(this.facing == 0){
      this.AttackBB = new BoundingBox(this.x+125, this.y+60, 90, 120);
      }
      else{
      this.AttackBB = new BoundingBox(this.x-18, this.y+60, 80, 120);
      }
     
                   
 // };
 //updateBB() {
   //  this.BB = new BoundingBox(this.x + 45-this.game.camera.x, this.y + 35, 70, 90, "red");
     // this.BB = new BoundingBox(this.x + 60-this.game.camera.x, this.y + 35, 70, 110, "red");
     
 }
//  updateOffset(){
//     if(this.facing  === 1){
//     if((this.state === 0) || (this.state === 1)){
//         this.xOff = 40;
//     } 
// }
// else{
//     this.xOff = 0;
// }
//  };
 update() {
    const TICK = this.game.clockTick;
    this.x += this.velocity.x * TICK;
    this.y += this.velocity.y * TICK;
    this.updateBB();
    let that = this;
    this.game.entities.forEach(function (entity) {
        if (entity instanceof Mage) {
            const middleMage = { x: entity.BB.left + entity.BB.width / 2, y: entity.BB.top + entity.BB.height / 2 };
            const middleMonster = { x: that.BB.left + that.BB.width / 2, y: that.BB.top + that.BB.height / 2 };
            const xDis = middleMage.x - middleMonster.x;
            const yDis = middleMage.y - middleMonster.y;
            const distance = distanceBetween(middleMage,middleMonster);
            let mageDB = entity.BB && that.MageDetection.collide(entity.BB);
            let mageAB = entity.BB && that.AttackBB.collide(entity.BB);

            if(mageDB){
                if(mageDB && !mageAB)
               that.state = 1;
                if (xDis > 0 ) {
                    that.facing = 0;
                }
                else if (xDis < 0) {
                    that.facing = 1;
                }
                if (that.state == 1) {
                    that.velocity.x = 100 * xDis / distance;
                    that.velocity.y = 100 * yDis / distance;
                }
                if(mageAB && mageAB){
                    that.state = 2;
                }
            }
            else if(!mageDB){
                that.velocity.x = 0
                that.velocity.y = 0;
            }

        };
        });
    
 };

 draw(ctx) {

   
    if(this.state === 2 && this.facing  === 1){
    this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x-this.game.camera.x-30, this.y-this.game.camera.y, 1 );
    }
    else if(this.facing  === 1){
    this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x-this.game.camera.x + 30, this.y-this.game.camera.y, 1 );
    }
    else{
    this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x-this.game.camera.x, this.y-this.game.camera.y, 1 );
    }
    // this.animations[0][0].drawFrame(this.game.clockTick, ctx, this.x-this.game.camera.x, this.y-this.game.camera.y, 1 );
    // this.animations[0][1].drawFrame(this.game.clockTick, ctx, this.x-this.game.camera.x+30, this.y-this.game.camera.y, 1 );
          ctx.strokeStyle = 'Red';
          ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width , this.BB.height);
          ctx.strokeStyle = 'blue';
          ctx.strokeRect(this.MageDetection.x - this.game.camera.x, this.MageDetection.y - this.game.camera.y, this.MageDetection.width, this.MageDetection.height);
          ctx.strokeStyle = 'yellow';
          ctx.strokeRect(this.AttackBB.x - this.game.camera.x, this.AttackBB.y - this.game.camera.y, this.AttackBB.width, this.AttackBB.height);        
       }; 
 

}; 