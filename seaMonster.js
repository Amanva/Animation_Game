
class SeaMonster{ 

    constructor(game, x, y){
     Object.assign(this, { game, x, y });
     this.velocity = { x: 0, y: 0 };
     this.hp = 100;
     this.maxHP = 100;
     this.healthBar = new HealthBar(this.game, this);
     this.fallAcc = 200;        
     this.spritesheetLeftAttack = assetMangager.getAsset("./sprites/seaMonster/monsterLeft.png");
     this.spritesheetRightAttack = assetMangager.getAsset("./sprites/seaMonster/monster-Riight-Attack.png");
     this.spritesheetLeftFly = assetMangager.getAsset("./sprites/seaMonster/monster-Left-Swim.png");
     this.spritesheetIdle = assetMangager.getAsset("./sprites/seaMonster/monster-idle.png");
     this.spritesheetRightFly = assetMangager.getAsset("./sprites/seaMonster/monster-Right-Swim.png");
     this.speed = 10;
     this.state = 1;
     this.facing = 0;
     this.playerHit = false;
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
    this.animations[0][0] = new Animator(this.spritesheetIdle, 0, 0, 48, 47, 5, 0.10, 0, 0, false, true, false);
    // swim
    this.animations[1][0] = new Animator(this.spritesheetLeftFly, 0, 0, 48, 47, 15, 0.10, 0, 0, false, true, false);
    // left attack
    this.animations[2][0] = new Animator(this.spritesheetRightAttack, 0, 0, 54, 51, 5, 0.07, 0, 0, true, true, false);
    // idle
    this.animations[0][1] = new Animator(this.spritesheetIdle, 0, 0, 48, 47, 5, 0.10, 0, 0, false, true, false);
    // swim
    this.animations[1][1] = new Animator(this.spritesheetLeftFly, 0, 0, 48, 47, 15, 0.10, 0, 0, false, true, false);
    // left attack
    this.animations[2][1] = new Animator(this.spritesheetRightAttack, 0, 0, 54, 51, 5, 0.07, 0, 0, true, true, false);

    //death
    this.animations[3][0] = new Animator(this.spritesheetRightFly, 0, 0, 48, 47, 15, 0.1, 0, 0, true, true, false);
            
    this.animations[3][1] = new Animator(this.spritesheetRightFly, 0, 0, 48, 47, 15, 0.1, 0, 0, true, true, false);

    for(var l = 0; l <= 3; l++){
        this.animations[l][1].flipped = true;
    }
 }; 

   updateBB() {
      this.lastBB = this.BB;
     this.BB = new BoundingBox(this.x+65, this.y+60, 60, 80);
      this.MageDetection = new BoundingBox(this.x-500, this.y-200, 1300, 700);
      if(this.facing == 0){
      this.AttackBB = new BoundingBox(this.x+125, this.y+60, 50, 80);
      }
      else{
      this.AttackBB = new BoundingBox(this.x+30, this.y+60, 50, 80);
      }          
      
 }

 update() {
    this.elapsedTime += this.game.clockTick;
    const TICK = this.game.clockTick;
    this.x += this.velocity.x * TICK;
    this.y += this.velocity.y * TICK;
    this.updateBB();

    var that = this;
    that.game.entities.forEach(function (entity) {
        if (entity.BB && that.BB.collide(entity.BB)) {
            if (entity instanceof Projectile  && that.hp > 0){
                entity.removeFromWorld = true;
                that.hp -= 10;
                that.state = 2
            } else if (that.hp <= 0) {
               that.state = 3; // death
               that.velocity.x = 0;
               that.dead = true;
               that.dead = true;
               that.removeFromWorld = true;
                                        
            }
        }
    })

     this.PlatformCollision();
     this.mageCollide(TICK);
};

 mageCollide(TICK){
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
            let frame = that.animations[that.state][that.facing].currentFrame();
            if(mageDB){
                if(that.state !== 2){
                if(mageDB && !mageAB)
                    that.state = 1;
                if (xDis > 0 ) {
                    that.facing = 0;
                }
                else if (xDis < 0) {
                    that.facing = 1;
                }
                if (that.state == 1) {
                    that.velocity.x = 200 * xDis / distance;
                    that.velocity.y = 200 * yDis / distance;
                }
            }
                if(mageDB && mageAB){
                    that.state = 2;
                    that.velocity.x = 0;
                    that.velocity.y = 0;
                }
            }
            else if(!mageDB){
                that.velocity.x = 0
                that.velocity.y = 0;
            }
            if(that.state === 2){
                if(mageAB && ((frame >= 8) && (frame <= 11)) && !that.playerHit){
                    that.playerHit = true;
                    entity.removeHealth(10); 
                }
                if(that.animations[2][that.facing].isAlmostDone(TICK)){
                    that.state = 1;
                    that.animations[2][that.facing].elapsedTime = 0;
                    that.playerHit = false;
                }
            }
        };
    });
}


PlatformCollision(){
    var that = this;
        this.game.entities.forEach(function (entity) {
            if (entity.BB && that.BB.collide(entity.BB)) {
                if (that.velocity.y > 0) { 
                    if (((entity instanceof Ground) || (entity instanceof Platform) || (entity instanceof Wall) || (entity instanceof Tiles || (entity instanceof smallPlatforms))) && (that.lastBB.bottom <= entity.BB.top)){
                        that.velocity.y = 0;
                        that.y = entity.BB.top - that.BB.height -60;
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
    if(this.hp >= 0){
    this.healthBar.draw(ctx);
    }
    if(this.state === 2 && this.facing  === 1){
    this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x-this.game.camera.x-30, this.y-this.game.camera.y, 2 );
    }
    else if(this.facing  === 1){
    this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x-this.game.camera.x + 30, this.y-this.game.camera.y, 2 );
    }
    else{
    this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x-this.game.camera.x, this.y-this.game.camera.y, 2 );
    }
    // this.animations[0][0].drawFrame(this.game.clockTick, ctx, this.x-this.game.camera.x, this.y-this.game.camera.y, 1 );
    // this.animations[0][1].drawFrame(this.game.clockTick, ctx, this.x-this.game.camera.x+30, this.y-this.game.camera.y, 1 );
    if(debug){
          ctx.strokeStyle = 'Red';
          ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width , this.BB.height);
          ctx.strokeStyle = 'blue';
          ctx.strokeRect(this.MageDetection.x - this.game.camera.x, this.MageDetection.y - this.game.camera.y, this.MageDetection.width, this.MageDetection.height);
          ctx.strokeStyle = 'yellow';
          ctx.strokeRect(this.AttackBB.x - this.game.camera.x, this.AttackBB.y - this.game.camera.y, this.AttackBB.width, this.AttackBB.height);   
    }     
       };
 

}; 

















