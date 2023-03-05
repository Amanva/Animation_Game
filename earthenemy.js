class Boar{ 

    constructor(game, x, y){
     Object.assign(this, { game, x, y });
     this.velocity = { x: 0, y: 0 };
     this.hp = 100;
     this.maxHP = 100;
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
        this.game.mage.getMana();
        this.game.camera.potionDrop(this.BB.x+this.BB.width/2, this.BB.y);
            this.removeFromWorld = true;
        }
        
    }
    if(this.x <= 0){
        this.x = 0;
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
        this.state = 0;
        this.facing = 0;
        this.animations = [];
        this.loadAnimations();
        this.updateBB();
        this.BB;
        this.lastMageDetection;
        this.dead = false;
        this.hp = 30;
        this.healthbar = new HealthBar(this.game, this);
        this.maxHP = 30;
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
                    if ((entity instanceof Ground || (entity instanceof Platform) ) && (that.lastBB.bottom >= entity.BB.top) ){
                        that.y = entity.BB.top-107;
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
                this.game.mage.getMana();
                this.game.camera.potionDrop(this.x, this.y);
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
            this.BB = new BoundingBox(this.x+30,this.y+50,50,60);
        }
        else if(this.state === 1){
            this.BB = new BoundingBox(this.x+25,this.y+30,60,80);
        }
        else if(this.state === 2){
            this.BB = new BoundingBox(this.x+25,this.y+30,60,80);
        }
    }


    loseHealth(damage){
        this.hp -= damage;
    }
     draw(ctx) {
        if(this.hp > 0){
            this.healthbar.draw(ctx);
        }
        if(this.state === 2){
            if(this.facing === 1){
            this.animations[2][this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x-390, this.y - this.game.camera.y, PARAMS.SCALE);
            }
            else{
            this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x-70, this.y - this.game.camera.y, PARAMS.SCALE);
            }
        }
        else {
        if(this.facing === 1){
            this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x-390, this.y - this.game.camera.y, PARAMS.SCALE);

        }
        else{
            this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, PARAMS.SCALE);
        }
    }
            if(debug){
                ctx.strokeStyle = 'Red';
                ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width , this.BB.height);
                ctx.strokeStyle = 'blue';
                ctx.strokeRect(this.MageDetection.x - this.game.camera.x, this.MageDetection.y - this.game.camera.y, this.MageDetection.width, this.MageDetection.height);

        }
    };
}

// class mudGuard{
//     constructor(game, x , y){

//         Object.assign(this, { game, x, y });
//         this.velocity = { x: 0, y: 0 };
//         this.game = game;
//         this.spritesheetAttack = assetMangager.getAsset("./sprites/enemies/mudGuard/attack1.png");
//         this.spritesheetAttack2 = assetMangager.getAsset("./sprites/enemies/mudGuard/attack2.png");
//         this.spritesheetIdle = assetMangager.getAsset("./sprites/enemies/mudGuard/idle.png");
//         this.spritesheetRun = assetMangager.getAsset("./sprites/enemies/mudGuard/run.png");
//         this.spritesheetDeath = assetMangager.getAsset("./sprites/enemies/mudGuard/death.png");
//         // this.state = 1;
//         // this.facing = 0;
//         this.animations = [];
//         // this.animator = new Animator(this.spritesheetIdle, 0, 0, 36, 23, 5, 0.20, 0, 0, false, true, true);
//         this.loadAnimations();

//     };
//     loadAnimations() {
//         for (var i = 0; i < 4; i++) {
//             this.animations.push([]);
//             for (var j = 0; j < 2; j++) {
//                 this.animations[i].push([]);
//             }
//         }
//         this.animations[0][0] = new Animator(this.spritesheetIdle, 0, 0, 36, 23, 5, 0.20, 0, 0, false, true, true);
//         //attack 1
//         this.animations[1][0] = new Animator(this.spritesheetAttack, 0, 0, 45, 39, 7, 0.20, 0, 0, false, true, true);
//         // this.animations[0][2] = new Animator(this.spritesheetAttack, 0, 0, 126, 39, 4, 0.20, 0, 0, false, true, true);
//         // this.animations[0][3] = new Animator(this.spritesheetDeath, 0, 0, 126, 39, 4, 0.20, 0, 0, false, true, true); 
        
//     }; 

//     update(){

//     };
//     draw(ctx) {
//         console.log(this.spritesheetAttack);
//         this.animations[1][0].drawFrame(this.game.clockTick, ctx, this.x-this.game.camera.x, this.y-this.game.camera.y, PARAMS.SCALE*1.5);

        
//         //     if(debug){
//         //     ctx.strokeStyle = 'Red';
//         //     ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
//         // //     ctx.strokeStyle = 'Green';
//         // //     ctx.strokeRect(this.AttackBB.x- this.game.camera.x, this.AttackBB.y - this.game.camera.y, this.AttackBB.width, this.AttackBB.height);
//         //     ctx.strokeStyle = 'blue';
//         //     ctx.strokeRect(this.MageDetection.x - this.game.camera.x, this.MageDetection.y - this.game.camera.y, this.MageDetection.width, this.MageDetection.height);
//         // //     ctx.strokeStyle = 'yellow';
//         // //     ctx.strokeRect(this.AttackDetectionBB.x - this.game.camera.x, this.AttackDetectionBB.y - this.game.camera.y, this.AttackDetectionBB.width, this.AttackDetectionBB.height);
//         // //     ctx.strokeStyle = 'purple';
//         // //     ctx.strokeRect(this.JumpBB.x - this.game.camera.x, this.JumpBB.y - this.game.camera.y, this.JumpBB.width, this.JumpBB.height);

//         // }
//     };
// }
class Bat{ 

    constructor(game, x, y){
     Object.assign(this, { game, x, y });
     this.velocity = { x: 0, y: 0 };
     this.hp = 100;
     this.maxHP = 100;
     this.healthBar = new HealthBar(this.game, this);
     this.fallAcc = 200;        
     this.speed = 100;
     this.state = 0;
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
     
     
     
// attack
this.animations[0][0] = new Animator(assetMangager.getAsset("./sprites/enemies/Attack.png"), 0, 0, 150, 150, 8, 0.10, 0, 0, false, true, false);
// attack 2
this.animations[1][0] = new Animator(assetMangager.getAsset("./sprites/enemies/Attack2.png"), 0, 0, 150, 150, 8, 0.10, 0, 0, false, true, false);
// fly
this.animations[2][0] = new Animator(assetMangager.getAsset("./sprites/enemies/Flight.png"), 0, 0, 150, 150, 8, 0.10, 0, 0, false, true, false);
// death
this.animations[3][0] = new Animator(assetMangager.getAsset("./sprites/enemies/Death.png"), 0, 0, 150, 150, 4, 0.15, 0, 0, false, true, false);

//left
// attack
this.animations[0][1] = new Animator(assetMangager.getAsset("./sprites/enemies/Attack.png"), 0, 0, 150, 150, 8, 0.10, 0, 0, false, true, false);
// attack 2
this.animations[1][1] = new Animator(assetMangager.getAsset("./sprites/enemies/Attack2.png"), 0, 0, 150, 150, 8, 0.10, 0, 0, false, true, false);
// fly
this.animations[2][1] = new Animator(assetMangager.getAsset("./sprites/enemies/Flight.png"), 0, 0, 150, 150, 8, 0.10, 0, 0, false, true, false);
// death
this.animations[3][1] = new Animator(assetMangager.getAsset("./sprites/enemies/Death.png"), 0, 0, 150, 150, 4, 0.15, 0, 0, false, true, false);

for(var l = 0; l <= 2; l++){
    this.animations[l][1].flipped = true;
}
 }; 

   updateBB() {
      this.lastBB = this.BB;
      //this.BB = new BoundingBox(this.x+140, this.y + 25, 50, 30 * 1.8); 
      
      this.MageDetection = new BoundingBox(this.x-500, this.y-200, 1300, 700);
      if(this.facing == 1){
        this.BB = new BoundingBox(this.x+115, this.y+130, 50, 50);
        this.AttackBB = new BoundingBox(this.x+100, this.y+110, 70, 70);
      }
      else{
        this.BB = new BoundingBox(this.x+130, this.y+130, 50, 50);
        this.AttackBB = new BoundingBox(this.x+120, this.y+110, 70, 70);
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
    if(!this.dead){
    if(this.hp <= 0){
        this.state = 3;
        this.dead = true;
    }
    this.PlatformCollision();
    this.mageCollide(TICK);
    }
    else{
        this.velocity.x = 0;
        this.velocity.y = 0;
        let frame = this.animations[3][this.facing].currentFrame();
        console.log(frame);
       if(frame >= 3){
        this.game.mage.getMana();
        this.game.camera.potionDrop(this.BB.x+this.BB.width/2, this.BB.y);
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
            let middleMage = { x: entity.BB.left + entity.BB.width / 2, y: entity.BB.top + entity.BB.height / 2 };
            let middleMonster = { x: that.BB.left + that.BB.width / 2, y: that.BB.top + that.BB.height / 2 };
            let xDis = middleMage.x - middleMonster.x;
            let yDis = middleMage.y - middleMonster.y;
            let distance = distanceBetween(middleMage,middleMonster);
            let mageDB = entity.BB && that.MageDetection.collide(entity.BB);
            let mageAB = entity.BB && that.AttackBB.collide(entity.BB);
            let frame = that.animations[that.state][that.facing].currentFrame();
            if(mageDB){
                if(that.state !== 1){
                if(mageDB && !mageAB)
                    that.state = 2;
                if (xDis > 0 ) {
                    that.facing = 0;
                }
                else if (xDis < 0) {
                    that.facing = 1;
                }
                if (that.state == 2) {
                    that.velocity.x = 200 * xDis / distance;
                    that.velocity.y = 200 * yDis / distance;
                }
            }
                if(mageDB && mageAB){
                    that.state = 1;
                    if(that.facing === 1){
                    that.velocity.x = -300 ;
                    console.log(that.velocity.x)
                    }
                    else{
                        that.velocity.x = 300 ;   
                        console.log("some")
                    }
                    // that.velocity.y = 500 ;
                }
            }
            else if(!mageDB){
                that.state = 2;
                that.velocity.x = 0
                that.velocity.y = 0;
            }
            if(that.state === 1){
                if(mageAB && ((frame >= 3) && (frame <= 8)) && !that.playerHit){
                    that.playerHit = true;
                    entity.removeHealth(10); 
                }
                if(that.animations[1][that.facing].isAlmostDone(TICK)){
                    that.state = 2;
                    that.animations[1][that.facing].elapsedTime = 0;
                    that.playerHit = false;
                }
            }
        };
    }
        });

 }
 PlatformCollision(){
    var that = this;
        this.game.entities.forEach(function (entity) {
            if (entity.BB && that.BB.collide(entity.BB)) {
                if (that.velocity.y > 0) { 
                    if (((entity instanceof Ground) || (entity instanceof Platform) || (entity instanceof Wall) || (entity instanceof Tiles || (entity instanceof smallPlatforms) || (entity instanceof verticalWall))) && (that.lastBB.bottom <= entity.BB.top)){
                        that.velocity.y = 0;
                        that.y = entity.BB.top - that.BB.height-130;
                        that.updateBB();
                    }
                    if ((entity instanceof movingPlatforms) && (that.lastBB.bottom < entity.BB.top+6)){
                        that.y = entity.BB.top - that.BB.height-130;
                        that.velocity.y = 0;
                        that.updateBB();
                    }
                    } 
                    if(that.velocity.y < 0){
                        if ((entity instanceof Ground || entity instanceof Wall || entity instanceof Platform || entity instanceof movingPlatforms || (entity instanceof Tiles) || entity instanceof smallPlatforms) && (that.lastBB.top >= entity.BB.bottom)){
                            that.velocity.y = 0;
                            that.y = entity.BB.bottom-130;
                            that.updateBB();
                        }
                    }
                    if (((entity instanceof Wall) || (entity instanceof Ground) || (entity instanceof Platform) || (entity instanceof smallPlatforms) || (entity instanceof verticalWall)) && that.BB.collide(entity.leftBB) && (that.lastBB.top < entity.BB.bottom-5)){
                                that.x = entity.leftBB.left - that.BB.width-115;
                                that.velocity.x = 0;
                                that.updateBB();
                    }
                    if (((entity instanceof Wall) || (entity instanceof Ground) || (entity instanceof Platform) || (entity instanceof Tiles) || (entity instanceof smallPlatforms) || (entity instanceof verticalWall)) && that.BB.collide(entity.rightBB) && (that.lastBB.top < entity.BB.bottom-5)){               
                                that.x = entity.rightBB.right-115;
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
    if(this.hp > 0){
    this.healthBar.draw(ctx);
    }
    this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x-this.game.camera.x, this.y-this.game.camera.y, 2);
    // this.animations[3][0].drawFrame(this.game.clockTick, ctx, this.x-this.game.camera.x, this.y-this.game.camera.y, 2);


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
