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
        this.state = 2; // 0 = idle, 1 = walking , 2 = attacking, 3 = hit, 4 = death, 5 = spawn, 6 = jump, 7 = fire attack, 8 = magic attack
        this.dead = false;
        this.hp = 300;
        this.healthbar = new HealthBar(game, this);
        this.maxHP = 300;


        // attack damage
        this.swordAttack = 50;
        this.flameAttack = 70;
        this.jumpAttack = 50;
        this.offsetX = 0;
        this.offsetY = 0;
        //animations
        this.animations = [];
        this.BB;
        this.AttackBB;
        this.lastMageDetection;
        this.loadAnimations();
        this.updateBB();

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
        this.animations[2][0] = new Animator(this.spritesheet, 0, 320, 288, 160, 15, 0.1, 0, 0, false, true, false);

        // hit
        this.animations[3][0] = new Animator(this.spritesheet, 0, 480, 288, 160, 5, 0.09, 0, 0, false, true, false);

        // death
        this.animations[4][0] = new Animator(this.spritesheet, 0, 640, 288, 160, 22, 0.07, 0, 0, false, true, false);

        // spawn 
        this.animations[5][0] = new Animator(this.spritesheetSpecialAndSlime,  0, 740, 288, 160, 19, 0.15, 0, 0, false,true, false)

        // jump
        this.animations[6][0] = new Animator(this.spritesheetSpecialAndSlime,0, 900, 288, 160, 18, 0.1, 0, 0, false,true, false)

        // fire attack
        this.animations[7][0] = new Animator(this.spritesheetSpecialAndSlime,0, 1060, 288, 160, 21, 0.05, 0, 0, false,true, false)

        // magic attack
        this.animations[8][0] = new Animator(this.spritesheetSpecialAndSlime,0, 1220, 285, 160, 18, 0.1, 3, 0, false,true, false)


        // //right
        // // idle
        this.animations[0][1] = new Animator(this.spritesheet,  0, 0, 288, 160, 6, 0.1, 0, 0, false, true, false);
        // walking
        this.animations[1][1] = new Animator(this.spritesheet, 0, 160, 288, 160, 12, 0.1, 0, 0, false, true, false);

        // attacking
        this.animations[2][1] = new Animator(this.spritesheet, 0, 320, 288, 160, 15, 0.1, 0, 0, false, true, false);

        // hit
        this.animations[3][1] = new Animator(this.spritesheet, 0, 480, 288, 160, 5, 0.09, 0, 0, false, true, false);

        // death
        this.animations[4][1] = new Animator(this.spritesheet, 0, 640, 288, 160, 22, 0.07, 0, 0, false, true, false);

        // spawn 
        this.animations[5][1] = new Animator(this.spritesheetSpecialAndSlime,  0, 740, 288, 160, 19, 0.15, 0, 0, false,true, false)

        // jump
        this.animations[6][1] = new Animator(this.spritesheetSpecialAndSlime,0, 900, 288, 160, 18, 0.1, 0, 0, false,true, false)

        // fire attack
        this.animations[7][1] = new Animator(this.spritesheetSpecialAndSlime,0, 1060, 288, 160, 21, 0.05, 0, 0, false,true, false)

        // magic attack
        this.animations[8][1] = new Animator(this.spritesheetSpecialAndSlime,0, 1220, 285, 160, 18, 0.1, 3, 0, false,true, false)
        
        for(var l = 0; l <= 8; l++){
            this.animations[l][1].flipped = true;
        }
    
    }

    update() {
        this.velocity.y += 200 * this.game.clockTick;
        

        this.y += this.velocity.y * this.game.clockTick * PARAMS.SCALE;
        this.updateBB();
        var that = this;
        
        this.game.entities.forEach(function (entity) {
            if(entity instanceof Mage && that.MageDetection.collide(entity.BB)){

                if(that.state === 2 && !that.AttackDetectionBB.collide(entity.BB)){
                    that.animations[that.state][that.facing].elapsedTime = 0;
                }
                
                if(that.BB.left > entity.BB.right){
                    that.x -= 10*that.game.clockTick;
                    if(that.state !== 6){
                        that.state = 1;
                    }
                    that.facing = 0;
                }
                else if(that.BB.right < entity.BB.left){
                    that.x += 10* that.game.clockTick;
                    if(that.state !== 6){
                        that.state = 1;
                    }
                    that.facing = 1; 
                }
                if(that.BB.top > entity.BB.top){
                    that.velocity.y -= 400*that.game.clockTick;
                    that.state = 6;
                    
                    if(that.animations[that.state][that.facing].isAlmostDone(that.game.clockTick)){
                        that.animations[that.state][that.facing].elapsedTime = 0;
                    }
                }
                if(that.AttackDetectionBB.collide(entity.BB)){
                    that.state = 2;
                    if(that.animations[that.state][that.facing].isAlmostDone(that.game.clockTick)){
                        that.animations[that.state][that.facing].elapsedTime = 0;
                    }
                }
                

                if(that.AttackBB.collide(entity.BB) && that.state === 2 && that.animations[that.state][that.facing].currentFrame() >= 9 && that.animations[that.state][that.facing].currentFrame() <= 12){
                    entity.removeHealth(1) * that.game.clockTick;
                }
            }
            if (entity.BB && that.BB.collide(entity.BB)) {
                // console.log("yes");
                if (that.velocity.y > 0) { 
                    if ((entity instanceof Ground) && (that.lastBB.bottom <= entity.BB.top) ){
                        that.y = entity.BB.top - 160*PARAMS.SCALE;
                        that.velocity.y = 0;
                        that.updateBB();
                        }
                    }

            }
            
            });
        if(that.hp <= 0){
            console.log("Dead");
            that.state = 4;
            that.updateBB;
            if(that.animations[that.state][that.facing].isAlmostDone(that.game.clockTick)){
                that.removeFromWorld = true;
            }        
        }

    };
    updateBB() {
        this.lastBB = this.BB;
        this.lastAttackBB = this.AttackBB;
        this.lastMageDetection = this.MageDetection
        this.lastAttackDetectionBB = this.AttackDetectionBB;
        

        this.MageDetection = new BoundingBox(this.x-500, this.y-500, 2000, 900);
        this.AttackDetectionBB = new BoundingBox(this.x+90, this.y+70, 600,530);
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
                this.AttackBB = new BoundingBox(this.x+50, this.y+162, 200,235);
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
                this.BB = new BoundingBox(this.x+270, this.y+80, 190, 320);
                this.AttackBB = new BoundingBox(this.x+165, this.y+350, 380, 50);

            }
            else if(this.state === 7){
                this.BB = new BoundingBox(this.x+270, this.y+200, 230, 200);
                this.AttackBB = new BoundingBox(this.x+50, this.y+100, 220, 295);

                // this.BB = new BoundingBox(this.x+220, this.y+200, 230, 200);
                // this.AttackBB = new BoundingBox(this.x+450, this.y+100, 220, 295);
                

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

        }
    };


}