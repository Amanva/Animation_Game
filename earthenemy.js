class Boar{ 

    constructor(game, x, y){
     Object.assign(this, { game, x, y });
     this.velocity = { x: 0, y: 0 };
     this.hp = 10;
     this.maxHP = 10;
     this.healthBar = new HealthBar(this.game, this);
     this.fallAcc = 200;        
     this.scale = 2;
     this.spriteIdle = assetMangager.getAsset("./sprites/enemies/Idle-Sheet.png");
     this.spriteRun = assetMangager.getAsset("./sprites/enemies/Run-Sheet.png");
     this.spriteHit = assetMangager.getAsset("./sprites/enemies/Hit-Sheet.png");
     this.spriteWalk = assetMangager.getAsset("./sprites/enemies/Walk-Base-Sheet.png");
     this.speed = 100;
     this.state = 1;
     this.facing = 0;
     this.playerHit = false;
     this.attackCoolDown = 0;
     this.dead = false;
     this.xOff = 0;
     this.yOff = 0;
     this.updateBB();
     this.loadAnimations();
     
 }; 

 loadAnimations() {
     this.animations = [];
     for (var i = 0; i < 4; i++) { 
         this.animations.push([]);
         for (var j = 0; j < 2; j++) { 
            this.animations[i].push([]);
        }
     }

// idle
this.animations[0][0] = new Animator(this.spriteIdle, 1, 2, 41, 28, 4, 0.10, 7, 0, false, true, false);
// run
this.animations[1][0] = new Animator(this.spriteRun, 1, 2, 43, 30, 6, 0.10, 5, 0, false, true, false);
// walk
this.animations[2][0] = new Animator(this.spriteWalk, 1, 2, 43, 30, 6, 0.10, 5, 0, false, true, false);
// death
this.animations[3][0] = new Animator(this.spriteHit, 1, 2, 43, 30, 4, 0.10, 5, 0, false, true, false);

this.animations[0][1] = new Animator(this.spriteIdle, 1, 2, 41, 28, 4, 0.10, 7, 0, false, true, false);

this.animations[1][1] = new Animator(this.spriteRun, 1, 2, 43, 30, 6, 0.10, 5, 0, false, true, false);

this.animations[2][1] = new Animator(this.spriteWalk, 1, 2, 43, 30, 6, 0.10, 5, 0, false, true, false);

this.animations[3][1] = new Animator(this.spriteHit, 1, 2, 43, 30, 4, 0.10, 5, 0, false, true, false);

for(var l = 0; l <= 3; l++){
    this.animations[l][1].flipped = true;
}
 }; 

   updateBB() {
      this.lastBB = this.BB;
      this.BB = new BoundingBox(this.x, this.y, 42*this.scale, 28*this.scale);
      this.MageDetection = new BoundingBox(this.x-500, this.y-200, 1300, 700);
      if(this.facing == 1){
      this.AttackBB = new BoundingBox(this.x+80, this.y, 42*4.8, 28*this.scale);
      }
      else{
      this.AttackBB = new BoundingBox(this.x-200, this.y, 42*4.8, 28*this.scale);
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
    this.velocity.y += 200 * TICK;
    this.x += this.velocity.x * TICK;
    this.y += this.velocity.y * TICK;
    this.updateBB();
    if(!this.dead){
    if(this.hp <= 0){
        this.state = 3;
        // this.animations[3][this.facing].elapsedTime = 7;
        this.dead = true;
    }
    this.PlatformCollision();
    this.mageCollide(TICK);
    }
    else{
        this.velocity.x = 0;
        this.velocity.y = 0;
        let frame = this.animations[3][this.facing].currentFrame();
        if(this.animations[3][this.facing].isAlmostDone(TICK)){
            this.game.camera.potionDrop(this.x, this.y);
            this.removeFromWorld = true;
        }
        
    }
    // console.log(this.velocity.x, this.velocity.y);
 };
 mageCollide(TICK){
    let that = this;
    this.game.entities.forEach(function (entity) {   
        if(!that.dead){     
        if (entity instanceof Mage) {
            if(that.playerHit){
                that.attackCoolDown += TICK;
            }
            if(that.attackCoolDown >= 2){
                console.log("Reset");
                that.playerHit = false;
                that.attackCoolDown = 0;
            }
            let middleMage = { x: entity.BB.left + entity.BB.width / 2, y: entity.BB.top + entity.BB.height / 2 };
            let middleMonster = { x: that.BB.left + that.BB.width / 2, y: that.BB.top + that.BB.height / 2 };
            let xDis = middleMage.x - middleMonster.x;
            let distance = distanceBetween(middleMage,middleMonster);
            let mageDB = entity.BB && that.MageDetection.collide(entity.BB);
            let mageAB = entity.BB && that.AttackBB.collide(entity.BB);
            // let frame = that.animations[that.state][that.facing].currentFrame();
            if(mageDB && !mageAB && that.attackCoolDown === 0){
                that.state = 2;
                if (xDis > 0 ) {
                    that.facing = 1;
                }
                else if (xDis < 0) {
                    that.facing = 0;
                }
                if (that.state == 2) {
                    that.velocity.x = 50 * xDis / distance;
                }
            }
            else if(mageDB && mageAB){
                that.state = 1;
                that.velocity.x = 300 * xDis / distance;
            }
            else if(!mageDB){
                that.velocity.x = 0;
                that.state = 0;
            }
            if(entity.BB.collide(that.BB) && !that.playerHit){
                that.playerHit = true;
                entity.removeHealth(10);
                that.updateBB();
            }
        }
        };
        });
        // console.log(this.velocity.x)
 }
 PlatformCollision(){
    var that = this;
        this.game.entities.forEach(function (entity) {
            if (entity.BB && that.BB.collide(entity.BB)) {
                if (that.velocity.y > 0) { 
                    if (((entity instanceof Ground) || (entity instanceof Platform) || (entity instanceof Wall) || (entity instanceof Tiles || (entity instanceof smallPlatforms))) && (that.lastBB.bottom <= entity.BB.top)){
                        that.velocity.y = 0;
                        that.y = entity.BB.top - that.BB.height;
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
                            that.y = entity.BB.bottom;
                            that.updateBB();
                        }
                    }
                    if (((entity instanceof Wall) || (entity instanceof Ground) || (entity instanceof Platform) || (entity instanceof smallPlatforms)) && that.BB.collide(entity.leftBB) && (that.lastBB.top < entity.BB.bottom-5)){
                                that.x = entity.leftBB.left - that.BB.width-65;
                                that.velocity.x = 0;
                                that.updateBB();
                    }
                    if (((entity instanceof Wall) || (entity instanceof Ground) || (entity instanceof Platform) || (entity instanceof Tiles) || (entity instanceof smallPlatforms)) && that.BB.collide(entity.rightBB) && (that.lastBB.top < entity.BB.bottom-5)){               
                                that.x = entity.rightBB.right;
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
    this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x-this.game.camera.x, this.y-this.game.camera.y, this.scale);
    // this.animations[2][0].drawFrame(this.game.clockTick, ctx, this.x-this.game.camera.x, this.y-this.game.camera.y, this.scale);
    // this.animations[2][1].drawFrame(this.game.clockTick, ctx, this.x-this.game.camera.x, this.y-this.game.camera.y, this.scale);
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

// class Boar{ 

//     constructor(game, x, y){
//      Object.assign(this, { game, x, y });
//      this.velocity = { x: 0, y: 0 };
//      this.hp = 100;
//      this.maxHP = 100;
//      this.healthBar = new HealthBar(this.game, this);
//      this.fallAcc = 200;        
//      this.scale = 2;
//      this.spriteIdle = assetMangager.getAsset("./sprites/enemies/Idle-Sheet.png");
//      this.spriteRun = assetMangager.getAsset("./sprites/enemies/Run-Sheet.png");
//      this.speed = 100;
//      this.state = 1;
//      this.facing = 0;
//      this.playerHit = false;
//      this.attackCoolDown = 0;
//      this.dead = false;
//      this.xOff = 0;
//      this.yOff = 0;
//      this.updateBB();
//      this.loadAnimations();
     
//  }; 

//  loadAnimations() {
//      this.animations = [];
//      for (var i = 0; i < 2; i++) { 
//          this.animations.push([]);
//          for (var j = 0; j < 2; j++) { 
//             this.animations[i].push([]);
//         }
//      }

// // idle
// this.animations[0][0] = new Animator(this.spriteIdle, 1, 2, 41, 28, 4, 0.10, 7, 0, false, true, false);
// // fly
// this.animations[1][0] = new Animator(this.spriteRun, 1, 2, 43, 30, 6, 0.10, 5, 0, false, true, false);

// this.animations[0][1] = new Animator(this.spriteIdle, 1, 2, 41, 28, 4, 0.10, 7, 0, false, true, false);

// this.animations[1][1] = new Animator(this.spriteRun, 1, 2, 43, 30, 6, 0.10, 5, 0, false, true, false);

// for(var l = 0; l <= 1; l++){
//     this.animations[l][1].flipped = true;
// }
//  }; 

//    updateBB() {
//       this.lastBB = this.BB;
//       this.BB = new BoundingBox(this.x, this.y, 42*this.scale, 28*this.scale);
//       this.MageDetection = new BoundingBox(this.x-500, this.y-200, 1300, 700);
//     //   if(this.facing == 0){
//     //   this.AttackBB = new BoundingBox(this.x+125, this.y+60, 50, 100);
//     //   }
//     //   else{
//     //   this.AttackBB = new BoundingBox(this.x+30, this.y+60, 50, 100);
//     //   }
     
                   
//  // };
//  //updateBB() {
//    //  this.BB = new BoundingBox(this.x + 45-this.game.camera.x, this.y + 35, 70, 90, "red");
//      // this.BB = new BoundingBox(this.x + 60-this.game.camera.x, this.y + 35, 70, 110, "red");
     
//  }
// //  updateOffset(){
// //     if(this.facing  === 1){
// //     if((this.state === 0) || (this.state === 1)){
// //         this.xOff = 40;
// //     } 
// // }
// // else{
// //     this.xOff = 0;
// // }
// //  };
//  update() {
//     const TICK = this.game.clockTick;
//     this.velocity.y += 200 * TICK;
//     this.x += this.velocity.x * TICK;
//     this.y += this.velocity.y * TICK;
//     this.updateBB();
//     if(!this.dead){
//     if(this.hp <= 0){
//         // this.state = 3;
//         // this.animations[3][this.facing].elapsedTime = 7;
//         this.dead = true;
//     }
//     this.PlatformCollision();
//     this.mageCollide(TICK);
//     }
//     else{
//         this.velocity.x = 0;
//         this.velocity.y = 0;
//         let frame = this.animations[3][this.facing].currentFrame();
//         console.log(frame);
//         this.removeFromWorld = true;
//     }
//     // console.log(this.velocity.x, this.velocity.y);
//  };
//  mageCollide(TICK){
//     let that = this;
//     this.game.entities.forEach(function (entity) {   
//         if(!that.dead){     
//         if (entity instanceof Mage) {
//             if(that.playerHit){
//                 that.attackCoolDown += TICK;
//             }
//             if(that.attackCoolDown >= 1){
//                 console.log("Reset");
//                 that.playerHit = false;
//                 that.attackCoolDown = 0;
//             }
//             const middleMage = { x: entity.BB.left + entity.BB.width / 2, y: entity.BB.top + entity.BB.height / 2 };
//             const middleMonster = { x: that.BB.left + that.BB.width / 2, y: that.BB.top + that.BB.height / 2 };
//             const xDis = middleMage.x - middleMonster.x;
//             const distance = distanceBetween(middleMage,middleMonster);
//             let mageDB = entity.BB && that.MageDetection.collide(entity.BB);
//             // let frame = that.animations[that.state][that.facing].currentFrame();
//             if(mageDB){
//                 that.state = 1;
//                 if (xDis > 0 ) {
//                     that.facing = 1;
//                 }
//                 else if (xDis < 0) {
//                     that.facing = 0;
//                 }
//                 if (that.state == 1) {
//                     that.velocity.x = 200 * xDis / distance;
//                 }
//             }
//             else if(!mageDB){
//                 that.velocity.x = 0;
//                 that.state = 0;
//             }
//             if(entity.BB.collide(that.BB) && !that.playerHit){
//                 assetMangager.playAsset("./sounds/sfx/playerhit.mp3");
//                 that.playerHit = true;
//                 entity.removeHealth(10);
//                 that.updateBB();
//             }
//         }
//         };
//         });

//  }
//  PlatformCollision(){
//     var that = this;
//         this.game.entities.forEach(function (entity) {
//             if (entity.BB && that.BB.collide(entity.BB)) {
//                 if (that.velocity.y > 0) { 
//                     if (((entity instanceof Ground) || (entity instanceof Platform) || (entity instanceof Wall) || (entity instanceof Tiles || (entity instanceof smallPlatforms))) && (that.lastBB.bottom <= entity.BB.top)){
//                         that.velocity.y = 0;
//                         that.y = entity.BB.top - that.BB.height;
//                         that.updateBB();
//                     }
//                     if ((entity instanceof movingPlatforms) && (that.lastBB.bottom < entity.BB.top+6)){
//                         that.y = entity.BB.top - that.BB.height;
//                         that.velocity.y = 0;
//                         that.updateBB();
//                     }
//                     } 
//                     if(that.velocity.y < 0){
//                         if ((entity instanceof Ground || entity instanceof Wall || entity instanceof Platform || entity instanceof movingPlatforms || (entity instanceof Tiles) || entity instanceof smallPlatforms) && (that.lastBB.top >= entity.BB.bottom)){
//                             that.velocity.y = 0;
//                             that.y = entity.BB.bottom;
//                             that.updateBB();
//                         }
//                     }
//                     if (((entity instanceof Wall) || (entity instanceof Ground) || (entity instanceof Platform) || (entity instanceof smallPlatforms)) && that.BB.collide(entity.leftBB) && (that.lastBB.top < entity.BB.bottom-5)){
//                                 that.x = entity.leftBB.left - that.BB.width-65;
//                                 that.velocity.x = 0;
//                                 that.updateBB();
//                     }
//                     if (((entity instanceof Wall) || (entity instanceof Ground) || (entity instanceof Platform) || (entity instanceof Tiles) || (entity instanceof smallPlatforms)) && that.BB.collide(entity.rightBB) && (that.lastBB.top < entity.BB.bottom-5)){               
//                                 that.x = entity.rightBB.right;
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
//                 });
// }
// loseHealth(damageRecieved){
//     this.hp -= damageRecieved;

// };
//  draw(ctx) {
//     if(this.hp >= 0){
//     this.healthBar.draw(ctx);
//     }
//     this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x-this.game.camera.x, this.y-this.game.camera.y, this.scale);
//     if(debug){
//           ctx.strokeStyle = 'Red';
//           ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width , this.BB.height);
//           ctx.strokeStyle = 'blue';
//           ctx.strokeRect(this.MageDetection.x - this.game.camera.x, this.MageDetection.y - this.game.camera.y, this.MageDetection.width, this.MageDetection.height);
//         //   ctx.strokeStyle = 'yellow';
//         //   ctx.strokeRect(this.AttackBB.x - this.game.camera.x, this.AttackBB.y - this.game.camera.y, this.AttackBB.width, this.AttackBB.height);   
//     }     
//        }; 
 

// }; 

class earthSlime{
    constructor(game, x, y){
        Object.assign(this, { game, x, y });
        this.velocity = { x: 0, y: 0 };
        
        this.spritesheet = assetMangager.getAsset("./sprites/enemies/earthslime.png");
        this.state = 1;
        this.facing = 0;
        this.animations = [];
        this.loadAnimations();
        this.BB;
        this.lastMageDetection;
        this.dead = false;
        this.hp = 50;
        this.healthbar = new HealthBar(this.game, this);
        this.maxHP = 50;
        this.hit = false;
        this.attackCoolDown = 0;
    };

    loadAnimations() {
        this.animations = [];
        for (var i = 0; i < 4; i++) { 
            this.animations.push([]);
            for (var j = 0; j < 2; j++) { 
               this.animations[i].push([]);
           }
        }
   
        // idle
        this.animations[0][0] = new Animator(this.spritesheet,  120, 55, 200, 160, 6, 0.1, 88, 0, false, true, false);

        // walking
        this.animations[1][0] = new Animator(this.spritesheet, 120, 215, 200, 160, 8, 0.1, 88, 0, false, true, false);

        // idle
        this.animations[0][1] = new Animator(this.spritesheet, 120, 55, 200, 160, 6, 0.1, 88, 0, false, true, false);

        // walking
        this.animations[1][1] = new Animator(this.spritesheet, 120, 215, 200, 160, 8, 0.1, 88, 0, false, true, false);


        //death
        this.animations[2][0] = new Animator(this.spritesheet, 90, 534, 230, 160, 9, 0.1, 58, 0, false, true, false);

        this.animations[2][1] = new Animator(this.spritesheet, 90, 534, 230, 160, 9, 0.1, 58, 0, false, true, false);



        //reverse
        for(var l = 0; l <= 2; l++){
            this.animations[l][1].flipped = true;
        }
    }; 
     update(){
        this.velocity.y += 200 * this.game.clockTick;
        this.x += this.velocity.x * this.game.clockTick;
        this.y += this.velocity.y * this.game.clockTick * PARAMS.SCALE;
        this.updateBB();
        var that = this;
        this.game.entities.forEach(function (entity) {  
        // console.log(that.attackCoolDown);
            if(entity instanceof Mage && that.state !== 2 && !entity.dead){
                if(that.hit){
                    that.attackCoolDown += that.game.clockTick;
                }
                if(that.attackCoolDown >= 1){
                    console.log("Reset");
                    that.hit = false;
                    that.attackCoolDown = 0;
                }
                    const middleMage = { x: entity.BB.left + entity.BB.width / 2, y: entity.BB.top + entity.BB.height / 2 };
                    const middleMonster = { x: that.BB.left + that.BB.width / 2, y: that.BB.top + that.BB.height / 2 };
                    const xDis = middleMage.x - middleMonster.x;
                    const distance = distanceBetween(middleMage,middleMonster);
                    let mageDB = entity.BB && that.MageDetection.collide(entity.BB);

                    if(mageDB){
                        if(mageDB)
                       that.state = 1;
                        if (xDis > 0 ) {
                            that.facing = 1;
                        }
                        else if (xDis < 0) {
                            that.facing = 0;
                        }
                        if (that.state == 1) {
                            that.velocity.x = 100 * xDis / distance;
                        }
                        
                    }
                    else if(!mageDB){
                        that.velocity.x = 0
                    };
                // if(that.BB.left > entity.BB.right){
                    
                //     if(that.state === 0){
                //         that.state = 0;
                //         that.velocity.x -= 100 * that.game.clockTick;
                //     }
                //     that.facing = 0;
                // }
                // if(that.BB.right < entity.BB.left){
                    
                //     if(that.state === 0){
                //         that.state = 0;
                //         that.velocity.x += 100 * that.game.clockTick;
                //     }
                //     that.facing = 1;
                // }
                // else{
                //     that.velocity.x =0;
                // }
                if(entity.BB.collide(that.BB) && that.hit === false){
                    console.log("Hit");
                    that.hit = true;
                    entity.removeHealth(10);
                    that.updateBB();
                }
                
            }
            
            if (entity.BB && that.BB.collide(entity.BB)) {
                if (that.velocity.y >= 0) { 
                    if ((entity instanceof Ground) && (that.lastBB.bottom >= entity.BB.top) ){
                        that.y = entity.BB.top-105;
                        that.velocity.y = 0;
                        that.updateBB();
                        }
                    }
            }
        });
        if(this.hp <= 0){
            this.velocity.x = 0;
            this.velocity.y = 0;
            console.log("Dead");
            this.state = 2;
            this.updateBB;

            if(this.animations[that.state][that.facing].isAlmostDone(that.game.clockTick)){
                this.removeFromWorld = true;
                this.isDead = true;
            }
        }
    };

    updateBB(){
        this.lastBB = this.BB;
        this.lastMageDetection =  this.MageDetection;
        this.MageDetection = new BoundingBox(this.x-300,this.y,700,110);
        if(this.state === 0){
            this.BB = new BoundingBox(this.x+30,this.y+50,50,55);
        }
        else if(this.state === 1){
            this.BB = new BoundingBox(this.x+25,this.y+30,60,75);
        }
        else if(this.state === 2){
            this.BB = new BoundingBox(this.x+25,this.y+30,60,75);
        }
    }


    loseHealth(damage){
        this.hp -= damage;
    }
     draw(ctx) {
        if(this.hp >= 0){
            this.healthbar.draw(ctx);
        }

        if(this.facing === 1){
            this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x-390, this.y - this.game.camera.y, PARAMS.SCALE);

        }
        else{
            this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, PARAMS.SCALE);
        }
            if(debug){
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        //     ctx.strokeStyle = 'Green';
        //     ctx.strokeRect(this.AttackBB.x- this.game.camera.x, this.AttackBB.y - this.game.camera.y, this.AttackBB.width, this.AttackBB.height);
            ctx.strokeStyle = 'blue';
            ctx.strokeRect(this.MageDetection.x - this.game.camera.x, this.MageDetection.y - this.game.camera.y, this.MageDetection.width, this.MageDetection.height);
        //     ctx.strokeStyle = 'yellow';
        //     ctx.strokeRect(this.AttackDetectionBB.x - this.game.camera.x, this.AttackDetectionBB.y - this.game.camera.y, this.AttackDetectionBB.width, this.AttackDetectionBB.height);
        //     ctx.strokeStyle = 'purple';
        //     ctx.strokeRect(this.JumpBB.x - this.game.camera.x, this.JumpBB.y - this.game.camera.y, this.JumpBB.width, this.JumpBB.height);

        }
    };
}