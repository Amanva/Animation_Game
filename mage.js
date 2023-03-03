class Mage {

    constructor(game, x, y){
        Object.assign(this, { game, x, y });
        this.game.mage = this;
        this.velocity = { x: 0, y: 0 };
        this.spritesheet = assetMangager.getAsset("./sprites/mageRight.png");
        this.spritesheetLeft = assetMangager.getAsset("./sprites/mageLeft.png");
        this.speed = 100;
        this.fallAcc = 200;
        this.facing = 0; 
        this.state = 0;
        this.states = {
            idle: 0,
            run: 1,
            normAttack: 2,
            skullAttack: 3,
            hit: 4,
            death: 5,
            jump: 6
        }
        this.specialAttack1 = false;
        this.specialAttack2 = false;
        this.level2Ready = false;
        this.level3Ready = false;
        this.specialAttack3 = false;
        // this.hp= 100;
        this.hp= 100000;
        this.maxHP = 100;
        this.curMana = 100;
        this.maxMana = 100;
        this.manaTime = 0;
        // this.healthbar = new HealthBar(game, this);
        // this.manaBar = new ManaBar(game, this);
        this.doubleJump = false;
        this.playerJump = false;
        this.air = false;
        this.shoot = false;
        this.timetoShoot = 0;
        this.xBBOffset = 20;
        this.yBBOffset = 130;
        this.dead = false;
        this.updateBB();
        this.animations = [];
        this.loadAnimations();
        // this.animations[2][0].elapsedTime = 0;
    };
    loadAnimations() {
        for (var i = 0; i < 7; i++) { 
            this.animations.push([]);
            for (var j = 0; j < 2; j++) { 
                this.animations[i].push([]);
            }
        }

        // right idle
        this.animations[0][0] = new Animator(this.spritesheet, 58, 15, 45, 105, 8, 0.10, 115, 0, false, true, false);
        // right run
        this.animations[1][0] = new Animator(this.spritesheet, 65, 150, 39, 105, 8, 0.10, 121, 0, false, true, false);
        // right attack
        this.animations[2][0] = new Animator(this.spritesheet, 61, 269, 70, 105, 13, 0.3, 90,0, false, false, false); 
        // skull attack
        this.animations[3][0] = new Animator(this.spritesheet, 57, 527, 50, 105, 17, 0.05, 110, 0, false, false, false);
        // hit
        this.animations[4][0] = new Animator(this.spritesheet, 57, 655, 50, 105, 5, 0.20, 110, 0, false, true, false);
        // death
        this.animations[5][0] = new Animator(this.spritesheet, 57, 786, 50, 105, 9, 0.20, 110, 0, false, false, false);
        // jump
        this.animations[6][0] = new Animator(this.spritesheet, 57, 399, 50, 105, 13, 0.20, 110, 0, false, true, false);

        // left idle
        this.animations[0][1] = new Animator(this.spritesheetLeft, 1495, 15, 45, 105, 8, 0.10, 115, 0, true, true, false);

        // left run
        this.animations[1][1] = new Animator(this.spritesheetLeft, 1495, 150, 39, 105, 8, 0.10, 121, 0, true, true, false);

        // left attack

        this.animations[2][1] = new Animator(this.spritesheetLeft, 692, 269, 70, 105, 13, 0.3, 90, 0, true, true, false);

        // left skull attack
        this.animations[3][1] = new Animator(this.spritesheetLeft, 55, 527, 50, 105, 17, 0.05, 110, 0, true, true, false);

        // left hit
        this.animations[4][1] = new Animator(this.spritesheetLeft, 1976, 655, 50, 105, 5, 0.20, 110, 0, true, true, false);
        // left death
        this.animations[5][1] = new Animator(this.spritesheetLeft, 1336, 786, 50, 105, 9, 0.20, 110,0 , true, false, false);
        // left jump 13
        this.animations[6][1] = new Animator(this.spritesheetLeft, 692, 399, 50, 105, 13, 0.20, 110,0 , true, true, false);
        // this.shootAnim = new Animator(this.spritesheetMage, 1205, 1051, 60, 52, 4, 0.05, 84, false, true)
        // left jump



        

    };
    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x+20, this.y+130, PARAMS.PLAYERWIDTH, PARAMS.PLAYERHEIGHT);
        this.topBB = new BoundingBox(this.x+20, this.y+130, PARAMS.PLAYERWIDTH, 0);
        this.rightBB = new BoundingBox(this.x+20+PARAMS.PLAYERWIDTH, this.y+130, 0, PARAMS.PLAYERHEIGHT);
        this.leftBB = new BoundingBox(this.x+20, this.y+130, 0, PARAMS.PLAYERHEIGHT);  
    };
    
    update() {
        // console.log(this.state);
        this.timetoShoot += this.game.clockTick;
        this.manaTime += this.game.clockTick;
        const TICK = this.game.clockTick;
        const DE_ACC = 200;
        const RUN = 200;
        const MAXFALL = 200;
        this.velocity.y += this.fallAcc * TICK;
        if(this.dead){
            this.deadPlayer(TICK, DE_ACC);
            if(this.animations[this.states.death][this.facing].isAlmostDone(TICK)){
                this.game.camera.mageDead = true;
                this.removeFromWorld = true;
                if(this.game.camera.level === levelOne){
                this.game.camera.loadLevel(levelOne, false);
                }
                else if(this.game.camera.level === levelThree){
                    this.game.camera.loadLevel(levelThree, false);
                }
                this.hp = 100;
                this.curMana = 100;
            } 
        }
        else{
            if(this.game.E){
                this.healthPotion();
                this.game.E = false;
            }
            if(this.game.Q){
                this.manaPotion();
                this.game.Q = false;
            }
            if(this.state != this.states.jump){
                if (this.game.left) {
                    this.velocity.x -= RUN;
                }
                if (this.game.right) {
                    this.velocity.x += RUN;
                }  
                if(!this.game.left && !this.game.right){
                    this.velocity.x = 0;
                }     
                if(this.game.attack && !this.specialAttack1 && !this.specialAttack3){
                    this.shoot = true;
                    // if(this.playerJump){
                    // this.velocity.x = 0;
                    // }
                }
                else if(this.game.digit1 && (this.curMana >= 50)){       
                    this.specialAttack1 = true;
                }
                else if(this.game.digit3 && (this.curMana >= 50) && (this.level3Ready)){       
                    this.specialAttack3 = true;
                }
                if(this.game.jump && (this.playerJump)){
                    this.state = this.states.jump;  
                    this.velocity.y = -MAXFALL;
                    this.animations[this.state][this.facing].elapsedTime = 0;
                    this.playerJump = false;
                    this.game.jump = false;
                }
            }
             else {
                // console.log(this.game.jump, this.playerJump, this.doubleJump);
                    if(this.game.camera.jumpItem && this.game.jump && this.doubleJump){  
                        // console.log(this.doubleJump)
                        this.velocity.y = -150;
                        this.animations[this.state][this.facing].elapsedTime = 0;
                        this.doubleJump = false;
                    }
                if(this.game.attack){
                    this.shoot = true;
                    this.velocity.y = 0;
                }
                else if(this.game.digit1 && (this.curMana >= 50)){       
                    this.specialAttack1 = true;
                }
                else if(this.game.digit3 && (this.curMana >= 50)){       
                    this.specialAttack3 = true;
                }
                if (this.game.right && !this.game.left) {
                    this.velocity.x += 1.66;
                } else if (this.game.left && !this.game.right) {
                    this.velocity.x -= 1.66;
                } else {
                }
            }
            if(this.specialAttack1){
                this.state = this.states.skullAttack;
                this.velocity.x = 0;
                if(this.animations[this.states.skullAttack][this.facing].isAlmostDone(TICK)){
                    if(this.facing == 0){
                    this.game.addEntityToBegin(new FireBall(this.game, this.x+100, this.y+140));
                    }
                     if(this.facing == 1){
                    this.game.addEntityToBegin(new FireBall(this.game, this.x, this.y+140));
                    }
                    this.curMana -= 50;
                    this.animations[this.state][this.facing].elapsedTime = 0;
                    this.timetoShoot = 0;
                    this.specialAttack1 = false;
                    // this.game.E = false;
                    this.state = this.states.idle;
                } 
            }
             if(this.specialAttack3){
                this.state = this.states.skullAttack;
                this.velocity.x = 0;
                if(this.animations[this.states.skullAttack][this.facing].isAlmostDone(TICK)){
                    if(this.facing == 0){
                    this.game.addEntityToBegin(new Earth(this.game, this.x+100, this.y+140));
                    }
                     if(this.facing == 1){
                    this.game.addEntityToBegin(new Earth(this.game, this.x, this.y+140));
                    }
                    this.curMana -= 50;
                    this.animations[this.state][this.facing].elapsedTime = 0;
                    this.timetoShoot = 0;
                    this.specialAttack3 = false;
                    // this.game.E = false;
                    this.state = this.states.idle;
                } 
            }
            else if(this.shoot && (this.timetoShoot > 0.5) && (!this.specialAttack1) && (!this.specialAttack3)){
                this.state = this.states.normAttack;
                // console.log("ste");
                if(this.facing === 0){
                    console.log(this.animations[this.state][0].elapsedTime, this.animations[this.state][1].elapsedTime);
                    if(this.animations[this.state][0].elapsedTime != 0){
                        this.animations[this.state][1].elapsedTime = this.animations[this.state][0].elapsedTime;
                    }
                     if(this.facing === 1){
                        console.log(this.animations[this.state][0].elapsedTime, this.animations[this.state][1].elapsedTime);
                        if(this.animations[this.state][1].elapsedTime != 0){
                            this.animations[this.state][0].elapsedTime = this.animations[this.state][1].elapsedTime;
                        }
                    }
                }
                if(this.animations[this.state][this.facing].isAlmostDone(TICK)){
                    if(this.facing == 0){
                    this.game.addEntityToBegin(new Projectile(this.game, this.x+100, this.y+140));
                    }
                     if(this.facing == 1){
                    this.game.addEntityToBegin(new Projectile(this.game, this.x, this.y+140));
                    }
                    this.animations[this.state][0].elapsedTime = 0;
                    this.animations[this.state][1].elapsedTime = 0;
                    this.timetoShoot = 0;
                    this.shoot = false;
                    this.game.attack = false;
                    this.state = this.states.idle;
                }      
            }
        }
            
            // if (this.velocity.y >= MAXFALL) this.velocity.y = MAXFALL;
            // if (this.velocity.y <= -MAXFALL) this.velocity.y = -MAXFALL;

            if (this.velocity.x >= RUN) this.velocity.x = RUN;
            if (this.velocity.x <= -RUN) this.velocity.x = -RUN;
            if (this.velocity.x >= 150 && (this.shoot || !this.playerJump)) this.velocity.x = 150;
            if (this.velocity.x <= -150 && (this.shoot || !this.playerJump)) this.velocity.x = -150;
            
            // update position
            this.x += this.velocity.x * TICK * PARAMS.SCALE;
            this.y += this.velocity.y * TICK * PARAMS.SCALE;
            this.updateBB();

            var that = this;
            this.game.entities.forEach(function (entity) {
                if (entity.BB && that.BB.collide(entity.BB)) {
                    if (that.velocity.y > 0) { 
                        if (((entity instanceof Ground) || (entity instanceof Platform) || (entity instanceof Wall) || (entity instanceof Tiles || (entity instanceof smallPlatforms) || (entity instanceof verticalWall))) && (that.lastBB.bottom <= entity.BB.top)){
                          
                            that.playerJump = true;
                            that.doubleJump = true;
                            that.velocity.y = 0;
                            that.y = entity.BB.top - PARAMS.PLAYERHEIGHT - that.yBBOffset;
                            if(that.state == that.states.jump) that.state = that.states.idle;
                            that.updateBB();
                        }
                        if ((entity instanceof movingPlatforms) && (that.lastBB.bottom < entity.BB.top+6)){
                            // console.log(entity.BB.top);
                       
                            that.playerJump = true;
                            that.y = entity.BB.top - PARAMS.PLAYERHEIGHT -129;
                            that.velocity.y = 0;
                            if(that.state == that.states.jump) that.state = that.states.idle;
                            that.updateBB();
                        }
                        } 

                    if(that.velocity.y < 0){
                        if ((entity instanceof Ground || entity instanceof Wall || entity instanceof Platform || entity instanceof movingPlatforms || (entity instanceof Tiles) || entity instanceof smallPlatforms || (entity instanceof verticalWall)) && (that.lastBB.top >= entity.BB.bottom)){
                            that.velocity.y = 0;
                            that.updateBB();
                        }
                    }
                    if (((entity instanceof Wall) || (entity instanceof Ground) || (entity instanceof Platform) || (entity instanceof smallPlatforms) || (entity instanceof verticalWall)) && that.BB.collide(entity.leftBB) && (that.lastBB.top < entity.BB.bottom-5)){
                                that.x = entity.leftBB.left - PARAMS.PLAYERWIDTH-that.xBBOffset;
                                that.velocity.x = 0;
                                that.updateBB();
                    }
                    if (((entity instanceof Wall) || (entity instanceof Ground) || (entity instanceof Platform) || (entity instanceof Tiles) || (entity instanceof smallPlatforms) || (entity instanceof verticalWall)) && that.BB.collide(entity.rightBB) && (that.lastBB.top < entity.BB.bottom-5)){               
                                that.x = entity.rightBB.right - that.xBBOffset;
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
                
            if(this.state != this.states.jump){
                if(Math.abs(this.velocity.x) > 0 && (this.state != this.states.normAttack) && (this.state != this.states.skullAttack)){
                    this.state = this.states.run;
                }
                if(this.velocity.x == 0 && !this.shoot && !this.specialAttack1 && !this.specialAttack3){
                    this.state = this.states.idle;
                }
                // if(this.states.skullAttack){
                //     this.animations[this.states.skullAttack][this.facing].isAlmostDone(TICK);
                // }
            }
            if(this.hp <= 0){
                this.dead = true;
            }
            if(this.y >= 700){
                this.dead = true;
            }
             if(this.velocity.x < 0){
                this.facing = 1;
            }
            if(this.velocity.x > 0){
                this.facing = 0;
            }
            if(this.x < -40){
                this.x = -40;
                this.velocity.x = 0;
                this.state = this.states.idle;
            }
            // console.log(this.x);
            if(this.manaTime >= 10 && this.curMana <= this.maxMana){
                this.manaTime = 0;
                this.curMana += 10;
            }
            // console.log(this.velocity.x);
    };
    healthPotion() {
        if (this.hp < this.maxHP) {
            if (this.game.camera.healthPotion > 0) {
                this.heal(50);
                this.game.camera.healthPotion--;
            } 
        }
    }
    manaPotion() {
        if (this.curMana < this.maxMana) {
            if (this.game.camera.manaPotion > 0) {
                this.drinkMana(30);
                this.game.camera.manaPotion--;
            }
        }
    }
    getMana(){
        if (this.curMana < this.maxMana) {
        this.curMana += 5;
        }
    }
    deadPlayer(TICK, DE_ACC){
        this.state = this.states.death;
        if (this.facing == 1) {
            if (this.velocity.x < 0) {
                this.velocity.x += DE_ACC * TICK;
            }
            else {
                this.velocity.x = 0;
            }
        }
        else if (this.facing == 0) {
            if (this.velocity.x > 0) {
                this.velocity.x -= DE_ACC * TICK;
            }
            else {
                this.velocity.x = 0;
            }
        }
    }
    
    heal(healAmount) {
        if (this.hp < this.maxHP) {
            let canHeal = ((this.hp + healAmount) >= this.maxHP) ? (this.maxHP - this.hp) : healAmount;
            this.hp += canHeal;
        }
    }
    drinkMana(manaAmount) {
        if (this.curMana < this.maxMana) {
            let canDrink = ((this.curMana + manaAmount) >= this.maxMana) ? (this.maxMana - this.curMana) : manaAmount;
            this.curMana += canDrink;
        }
    }
    removeHealth(damageRecieved){
        assetMangager.playAsset("./sounds/sfx/zombiehit.wav");
        this.hp -= damageRecieved;
    }
    
    draw(ctx) {
            // this.healthbar.draw(ctx);
            // this.manaBar.draw(ctx);
            if(this.dead){
                this.animations[this.states.death][this.facing].drawFrame(this.game.clockTick, ctx, this.x-this.game.camera.x, this.y-this.game.camera.y, PARAMS.SCALE);
            }
            else{
                this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x-this.game.camera.x, this.y-this.game.camera.y, PARAMS.SCALE);
            }
            if(debug){
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x-this.game.camera.x, this.BB.y-this.game.camera.y, this.BB.width, this.BB.height);
            // ctx.strokeRect(this.rightBB.x-this.game.camera.x, this.rightBB.y-this.game.camera.y, this.rightBB.width, this.rightBB.height);
            }
    };


};