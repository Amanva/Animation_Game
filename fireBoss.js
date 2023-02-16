class fireBoss{

    constructor(game, x , y){
        Object.assign(this, { game, x, y });
        this.velocity = { x: 0, y: 0 };
        this.spritesheet = assetMangager.getAsset("./demonFire.png");
        this.spritesheetLeft = assetMangager.getAsset("./demonFireLeft.png");
        this.spritesheetSpecialAndSlime = assetMangager.getAsset("./slime_demonboss_specialmoves.png");
        this.spritesheetSpecialAndSlimeLeft = assetMangager.getAsset("./slime_demonboss_specialmovesLeft.png");


        // this.animator = new Animator(ASSET_MANAGER.getAsset("./demonFire.png"), 103, 50, 100, 108, 6, .2 ,187, false);
        this.speed = 100;
        this.facing = 0; //0=left, 1 = right
        this.state = 1; // 0 = idle, 1 = walking , 2 = attacking, 3 = hit, 4 = death, 5 = spawn, 6 = jump, 7 = fire attack, 8 = magic attack
        this.dead = false;
        this.hp = 300;
        this.healthbar = new HealthBar(game, this);
        this.maxHP = 300;
        this.hit = false;
        this.attackCoolDown = 0;
        this.attackFrameCD = 0;
        this.bossJump = false;
        this.attackList = [2,7,8];
        this.randomSelectCD = 0;
        this.changeState = true;
        this.jumpState= true;
        // attack damage
        this.swordAttack = 50;
        this.flameAttack = 70;
        this.jumpAttack = 50;
        this.offsetX = 0;
        this.offsetY = 0;
        //animations
        this.isDead = false;
        this.animations = [];
        this.BB;
        this.AttackBB;
        this.rand= 0;
        this.lastMageDetection;
        this.loadAnimations();
        this.updateBB();
        this.ctx;

        //if move or attack
        this.moveBoss = false;
        this.attackBoss = true;
        this.attackFrameFinished = false;
    };

    loadAnimations() {
        for(var i = 0; i < 9; i++){ // number of different states
            this.animations.push([]);
            for(var j = 0; j < 2; j++){ // two directions
                this.animations[i].push([]);
            }
        }

        //left 
        // idle
        this.animations[0][0] = new Animator(this.spritesheet,  0, 0, 288, 160, 6, 0.1, 0, 0, false, true, false);

        // walking
        this.animations[1][0] = new Animator(this.spritesheet, 0, 160, 288, 160, 12, 0.1, 0, 0, false, true, false);

        // attacking
        this.animations[2][0] = new Animator(this.spritesheet, 0, 320, 288, 160, 15, 0.1, 0, 0, false, false, false);

        // hit
        this.animations[3][0] = new Animator(this.spritesheet, 0, 480, 288, 160, 5, 0.09, 0, 0, false, true, false);

        // death
        this.animations[4][0] = new Animator(this.spritesheet, 0, 640, 288, 160, 22, 0.07, 0, 0, false, true, false);

        // spawn 
        this.animations[5][0] = new Animator(this.spritesheetSpecialAndSlime,  0, 740, 288, 160, 19, 0.15, 0, 0, false,true, false)

        // jump
        this.animations[6][0] = new Animator(this.spritesheetSpecialAndSlime,0, 900, 288, 160, 18, 0.1, 0, 0, false,true, false)

        // fire attack
        this.animations[7][0] = new Animator(this.spritesheetSpecialAndSlime,0, 1060, 288, 160, 21, 0.05, 0, 0, false,false, false)

        // magic attack
        this.animations[8][0] = new Animator(this.spritesheetSpecialAndSlime,0, 1220, 285, 160, 18, 0.1, 3, 0, false,false, false)


        // //right
        // // idle
        this.animations[0][1] = new Animator(this.spritesheet,  0, 0, 288, 160, 6, 0.1, 0, 0, false, true, false);
        // walking
        this.animations[1][1] = new Animator(this.spritesheet, 0, 160, 288, 160, 12, 0.1, 0, 0, false, true, false);

        // attacking
        this.animations[2][1] = new Animator(this.spritesheet, 0, 320, 288, 160, 15, 0.1, 0, 0, false, false, false);

        // hit
        this.animations[3][1] = new Animator(this.spritesheet, 0, 480, 288, 160, 5, 0.09, 0, 0, false, true, false);

        // death
        this.animations[4][1] = new Animator(this.spritesheet, 0, 640, 288, 160, 22, 0.07, 0, 0, false, true, false);

        // spawn 
        this.animations[5][1] = new Animator(this.spritesheetSpecialAndSlime,  0, 740, 288, 160, 19, 0.15, 0, 0, false,true, false)

        // jump
        this.animations[6][1] = new Animator(this.spritesheetSpecialAndSlime,0, 900, 288, 160, 18, 0.1, 0, 0, false,true, false)

        // fire attack
        this.animations[7][1] = new Animator(this.spritesheetSpecialAndSlime,0, 1060, 288, 160, 21, 0.05, 0, 0, false,false, false)

        // magic attack
        this.animations[8][1] = new Animator(this.spritesheetSpecialAndSlime,0, 1220, 285, 160, 18, 0.1, 3, 0, false,false, false)
        
        for(var l = 0; l <= 8; l++){
            this.animations[l][1].flipped = true;
        }
    
    }

    update() {
        this.velocity.y += 200 * this.game.clockTick;
        

        this.y += this.velocity.y * this.game.clockTick * PARAMS.SCALE;
        this.updateBB();
        var that = this;
        if(this.attackFrameFinished){
            console.log("FINISHED FRAME");
            this.animations[this.state][this.facing].elapsedTime =0;
            this.moveBoss = true;
            this.attackBoss = false;
            this.attackFrameFinished = false;
        }
        this.game.entities.forEach(function (entity) {
            if(entity instanceof Mage && that.MageDetection.collide(entity.BB)){
                if(that.hit){
                    that.attackCoolDown += that.game.clockTick;
                    that.attackFrameCD += that.game.clockTick;
                }
                if(that.attackCoolDown >= 3){
                    that.hit = false;
                    that.attackCoolDown = 0;
                    that.attackFrameCD = 0;
                    that.attackFrameFinished = false;
                    that.moveBoss = true;
                    that.attackBoss = false;
                    // that.jumpState = true;

                }
                //If move 

                if(that.moveBoss){
                    that.state = 1;
                    if(that.BB.left > entity.BB.right){
                    
                        if(that.state == 1){
                            that.state = 1;
                            that.x -= 80*that.game.clockTick;
                        }
                        else if(that.state === 6){
                            that.x -= 80*that.game.clockTick;
                        }
                        that.facing = 0;
                    }
                    //moving right
                    else if(that.BB.right < entity.BB.left){
                        if(that.state == 1){
                            that.x += 80* that.game.clockTick;
                            that.state = 1;
    
                        }
                        else if(that.state == 6){
                            that.x += 80* that.game.clockTick;
    
                        }
                        that.facing = 1; 
                        
                    }

                    if(that.AttackDetectionBB.collide(entity.BB) && that.attackCoolDown <= 0){
                        that.moveBoss = false;
                        that.attackBoss = true;
                        
                    }
                }
                
                //jump state, if your under boss
                // if(that.state === 6){
                //     that.changeState = false;
                //     if(that.animations[that.state][that.facing].isAlmostDone(that.game.clockTick)){
                //         that.changeState = true;
                //         that.state = 1;
                //     }
                // }
           
                //if attack animation doesnt collide with mage. reset frames
                // if(that.state === 2 || that.state === 7 || that.state === 8 && !that.AttackDetectionBB.collide(entity)){
                //     that.animations[that.state][that.facinga].elapsedTime = 0;
                // }
                
                //moving left
            else if(that.attackBoss && !that.attackFrameFinished){
                    
                    //[2,7,8] random select. then remove
                    //if attack bb colliding with mage bb 
                    if(that.randomSelectCD <= 0){
                        that.rand = randomInt(3);
                        that.randomSelectCD = 4;
                        console.log("TEST2");
                    }
                    that.rand = 0;
                    
                        // if((that.JumpBB.collide(entity.BB))){
                        //     console.log("JUMPING STATE");
                        //     that.state = 6; 
                        // }
                        if(!that.AttackDetectionBB.collide(entity.BB)  && that.state===1){
                            that.moveBoss = true;
                            that.attackBoss = false;
                        }
                        else {
                            
                        if(that.rand === 1){
                            
                            if(that.AttackDetectionBB.collide(entity.BB) && (that.AttackDetectionBB.right > entity.BB.left-200)){
                                console.log(that.AttackDetectionBB.right, entity.BB.left);
                                that.state = that.attackList[that.rand];
                                console.log("In Attacking Range");
                                that.updateBB();
                            }
                            
                            if(that.AttackBB.collide(entity.BB) && that.state === 7 && that.animations[that.state][that.facing].currentFrame() >= 10 && that.animations[that.state][that.facing].currentFrame() <= 16 && !that.hit){
                                    that.hit = true;
                                    entity.removeHealth(10);
                                    // that.state = 1;
                                    that.updateBB();
            
                            }
                            
                            if(that.animations[that.state][that.facing].currentFrame() >= 20){
                                console.log("EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
                                that.attackFrameFinished = true; 
                                that.updateBB();
  
                            }
                        }
                        else if(that.rand === 0 ){
                            if(that.AttackDetectionBB.collide(entity.BB) && (that.AttackDetectionBB.right > entity.BB.left-200)){
                                console.log(that.AttackDetectionBB.right, entity.BB.left);
                                that.state = that.attackList[that.rand];
                                console.log("In Attacking Range");
                                that.updateBB();
                            }
            
                            if(that.AttackBB.collide(entity.BB) && that.state === 2 && that.animations[that.state][that.facing].currentFrame() >= 10 && that.animations[that.state][that.facing].currentFrame() <= 12 && !that.hit){
                                    that.hit = true;
                                    entity.removeHealth(10);
                                    that.updateBB();
                            }
                                  
                            if(that.animations[that.state][that.facing].currentFrame() >= 15){
                                console.log("EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
                                that.attackFrameFinished = true; 
                                that.updateBB();
  
                            }
                        }
                        else if(that.rand === 2){
                            if(that.AttackDetectionBB.collide(entity.BB) && (that.AttackDetectionBB.right > entity.BB.left-200)){
                                console.log(that.AttackDetectionBB.right, entity.BB.left);
                                that.state = that.attackList[that.rand];
                                console.log("In Attacking Range");
                                that.updateBB();
                            }
            
                            if(that.AttackBB.collide(entity.BB) && that.state === 8 && that.animations[that.state][that.facing].currentFrame() >= 5 && that.animations[that.state][that.facing].currentFrame() <= 11 && !that.hit){
                                    that.hit = true;
                                    entity.removeHealth(10);
                                    that.updateBB();
                            }
                            if(that.animations[that.state][that.facing].currentFrame() >= 16){
                                console.log("EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
                                that.attackFrameFinished = true; 
                                that.updateBB();
  
                            }
                        }
                    }
                    
                    
                    
                }
                
                that.updateBB();
            }
            if (entity.BB && that.BB.collide(entity.BB)) {
                // console.log("yes");
                if (that.velocity.y >= 0) { 
                    if ((entity instanceof Ground) && (that.lastBB.bottom >= entity.BB.top) ){
                        that.bossJump = true;
                        that.y = entity.BB.top - 160*PARAMS.SCALE;
                        that.velocity.y = 0;
                        that.updateBB();
                        }
                    }

            }
            
            
            });
        // console.log(this.randomSelectCD);
        if(this.randomSelectCD > 0){
            this.randomSelectCD -= this.game.clockTick;
        }

        if(that.hp <= 0){
            that.velocity.x = 0;
            that.velocity.y = 0;
            console.log("Dead");
            that.state = 4;
            that.updateBB;
            
            if(that.animations[that.state][that.facing].isAlmostDone(that.game.clockTick)){
                that.removeFromWorld = true;
                that.isDead = true;
            }        
        }
        if(this.isDead){
            this.game.addEntityToBegin(new Portal(this.game, this.x, 430));
        }
    };
    updateBB() {
        this.lastBB = this.BB;
        this.lastAttackBB = this.AttackBB;
        this.lastMageDetection = this.MageDetection;
        this.lastAttackDetectionBB = this.AttackDetectionBB;
        this.lastJumpBB = this.JumpBB;

        this.JumpBB = new BoundingBox(this.x+285,this.y+380,150,20)
        this.MageDetection = new BoundingBox(this.x-500, this.y-400, 2000, 900);
        this.AttackDetectionBB = new BoundingBox(this.x+80, this.y+70, 550,530);
        if(this.facing === 0){
            if(this.state === 0){
                this.BB = new BoundingBox(this.x+250, this.y+200, 205, 200);
                this.AttackBB = new BoundingBox(this.x+50, this.y+100, 0,0);

            }
            else if(this.state === 1){ // walk
                this.BB = new BoundingBox(this.x+255, this.y+200, 210, 200);
                this.AttackBB = new BoundingBox(0, 0,0,0);
            }
            else if(this.state === 2){ // attack
                this.BB = new BoundingBox(this.x+220, this.y+200, 290, 200);
                this.AttackBB = new BoundingBox(this.x+70, this.y+220, 100,180);
            }
            else if(this.state === 3){
                this.BB = new BoundingBox(this.x+260, this.y+200, 230, 200);
                this.AttackBB = new BoundingBox(0,0,0,0);

            }
            else if(this.state === 4){
                this.BB = new BoundingBox(this.x+260, this.y+200, 230, 200);
                this.AttackBB = new BoundingBox(0,0,0,0);

            }
            else if(this.state === 5){
                this.BB = new BoundingBox(this.x+240, this.y+200, 250, 200);
                this.AttackBB = new BoundingBox(0,0,0,0);

            }
            else if(this.state === 6){
                // this.BB = new BoundingBox(this.x+270, this.y+80, 190, 320);
                this.AttackBB = new BoundingBox(this.x+165, this.y+350, 380, 50);
                this.BB = new BoundingBox(this.x+270, this.y+80, 190, 320);

                

            }
            else if(this.state === 7){
                this.BB = new BoundingBox(this.x+270, this.y+200, 230, 200);
                this.AttackBB = new BoundingBox(this.x+50, this.y+100, 220, 295);
                

            }
            else if(this.state === 8){
                this.BB = new BoundingBox(this.x+240, this.y+200, 250, 200);
                this.AttackBB = new BoundingBox(this.x, this.y+100, 150, 305);

            }
        }
        else{
            if(this.state === 0){
                this.BB = new BoundingBox(this.x+250, this.y+200, 205, 200);
                this.AttackBB = new BoundingBox(this.x+50, this.y+100, 0,0);

            }
            else if(this.state === 1){ // walk
                this.BB = new BoundingBox(this.x+255, this.y+200, 210, 200);
                this.AttackBB = new BoundingBox(0, 0,0,0);
            }
            else if(this.state === 2){ // attack
                this.BB = new BoundingBox(this.x+220, this.y+200, 290, 200);
                this.AttackBB = new BoundingBox(this.x+500, this.y+162, 200,235);
            }
            else if(this.state === 3){
                this.BB = new BoundingBox(this.x+230, this.y+200, 230, 200);
                this.AttackBB = new BoundingBox(0,0,0,0);

            }
            else if(this.state === 4){
                this.BB = new BoundingBox(this.x+240, this.y+200, 230, 200);
                this.AttackBB = new BoundingBox(0,0,0,0);

            }
            else if(this.state === 5){
                this.BB = new BoundingBox(this.x+230, this.y+200, 250, 200);
                this.AttackBB = new BoundingBox(0,0,0,0);

            }
            else if(this.state === 6){
                this.BB = new BoundingBox(this.x+270, this.y+80, 190, 320);
                this.AttackBB = new BoundingBox(this.x+165, this.y+350, 380, 50);

            }
            else if(this.state === 7){
                this.BB = new BoundingBox(this.x+220, this.y+200, 230, 200);
                this.AttackBB = new BoundingBox(this.x+450, this.y+110, 220, 295);

            }
            else if(this.state === 8){
                this.BB = new BoundingBox(this.x+230, this.y+200, 250, 200);
                this.AttackBB = new BoundingBox(this.x+570, this.y+100, 150, 305);

            }
        }
       


    };



    loseHealth(damageRecieved){
        this.hp -= damageRecieved;
    
    }
    

    draw(ctx) {
        this.healthbar.draw(ctx);
        this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, PARAMS.SCALE);
            if(debug){
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
            ctx.strokeStyle = 'Green';
            ctx.strokeRect(this.AttackBB.x- this.game.camera.x, this.AttackBB.y - this.game.camera.y, this.AttackBB.width, this.AttackBB.height);
            ctx.strokeStyle = 'blue';
            ctx.strokeRect(this.MageDetection.x - this.game.camera.x, this.MageDetection.y - this.game.camera.y, this.MageDetection.width, this.MageDetection.height);
            ctx.strokeStyle = 'yellow';
            ctx.strokeRect(this.AttackDetectionBB.x - this.game.camera.x, this.AttackDetectionBB.y - this.game.camera.y, this.AttackDetectionBB.width, this.AttackDetectionBB.height);
            ctx.strokeStyle = 'purple';
            ctx.strokeRect(this.JumpBB.x - this.game.camera.x, this.JumpBB.y - this.game.camera.y, this.JumpBB.width, this.JumpBB.height);

        }
    };


}