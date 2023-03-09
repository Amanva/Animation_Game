class Finalboss{
    constructor(game, x, y){
        Object.assign(this, { game, x, y });
        this.velocity = { x: 0, y: 0 };
        this.hp = 80;
        this.maxHP = 80;
        this.spritesheet = assetMangager.getAsset("./sprites/airLevel/mecha.png");
        this.enemHealthBar = new HealthBar(this.game, this);
        this.playerInRange = false;
        this.fallAcc = 300;
        this.state = 0;
        this.states = {
            idle: 0,
            glow: 1,
            sword: 2,
            summon: 3,
            melee: 5,
            laser: 4,
            buff: 6,
            death: 7,
        }
        this.attackState = 0;
        this.facing = 0;
        this.xOff = 120;
        this.yOff = 170;
        this.dead = false;
        this.updateBB();
        this.loadAnimations();
        this.isHit = false;
        
    }; // end of constructor




    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x+this.xOff, this.y+this.yOff, 230, 180);
        this.lastAttackBB = this.AttackBB;
        this.detectionAttackBB = new BoundingBox(this.x-500, this.y-200, 1300, 700);
        if(this.facing === 0){
            this.AttackBB = new BoundingBox(this.x+this.BB.width,this.y,700,400);
        }
        else if(this.facing === 1){
            this.AttackBB = new BoundingBox(this.x-450,this.y,700,400);
        }
    };

    update() {
        this.elapsedTime += this.game.clockTick;
        const TICK = this.game.clockTick;
        this.velocity.y += this.fallAcc * TICK;
        
        // update position

        // this.x += this.velocity.x * TICK;
        this.y += this.velocity.y * TICK;
        this.updateBB();
        // if(!this.dead){
        //     if(this.hp <= 0){
        //         this.state = 3;
        //         this.dead = true;
        //     }
        this.PlatformCollision();
        this.bossDirection();
        var that = this;
        that.game.entities.forEach(function (entity) {
            if(entity instanceof Mage){
            let mageDB = entity.BB && that.detectionAttackBB.collide(entity.BB);
            let mageAB = entity.BB && that.AttackBB.collide(entity.BB);
            if(!mageDB){
                that.state = that.states.idle;
            }
            else if(mageDB){
                that.playerInRange = true;
            }
            }

        });
        if(this.playerInRange){
            // let rand = randomInt(3)+2;
            // this.chooseAttack(rand);
            this.state = this.states.sword;
            if(this.animations[this.state][this.facing].isAlmostDone(TICK)){
                
            }
        }
         
    };
   chooseAttack(state){
    switch(state){
        case this.states.summon:
            
            break;
        case this.states.sword:
            break;
        case this.states.sword:
        
            break;
    }

   }
     bossDirection(){
        if (this.game.mage.BB.x > (this.BB.x + this.BB.width/2)) {
            // console.log(this.game.mage.BB.x, this.BB.width/2)
            this.facing = 0;
        }
        else if((this.game.mage.BB.x < (this.BB.x + this.BB.width/2))){
            // console.log("left")
            this.facing = 1;
        }
     }
     PlatformCollision(){
        var that = this;
            this.game.entities.forEach(function (entity) {
                if (entity.BB && that.BB.collide(entity.BB)) {
                    if (that.velocity.y > 0) { 
                        if (((entity instanceof Ground) || (entity instanceof Platform) || (entity instanceof Wall) || (entity instanceof Tiles || (entity instanceof smallPlatforms))) && (that.lastBB.bottom <= entity.BB.top)){
                            that.velocity.y = 0;
                            that.y = entity.BB.top - that.BB.height - that.yOff;
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
                                that.y = entity.BB.bottom-50;
                                that.updateBB();
                            }
                        }
                        if (((entity instanceof Wall) || (entity instanceof Ground) || (entity instanceof Platform) || (entity instanceof smallPlatforms)) && that.BB.collide(entity.leftBB) && (that.lastBB.top < entity.BB.bottom-5)){
                                    that.x = entity.leftBB.left - that.BB.width-50;
                                    that.velocity.x = 0;
                                    that.updateBB();
                        }
                        if (((entity instanceof Wall) || (entity instanceof Ground) || (entity instanceof Platform) || (entity instanceof Tiles) || (entity instanceof smallPlatforms)) && that.BB.collide(entity.rightBB) && (that.lastBB.top < entity.BB.bottom-5)){               
                                    that.x = entity.rightBB.right-50;
                                    that.velocity.x = 0; 
                                    that.updateBB(); 
                        }
                        if (((entity instanceof movingPlatforms)) && (that.lastBB.left >= entity.BB.right) && (that.lastBB.top < entity.BB.bottom-5)){               
                            that.x = entity.rightBB.right;
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

    loadAnimations() {
        this.animations = [];
        for (var i = 0; i < 8; i++) { 
            this.animations.push([]);
            for (var j = 0; j < 2; j++) { 
                this.animations[i].push([]);
             }
        }
//(spritesheet, xStart, yStart, width, height, frameCount, frameDuration, framePaddingX, framePaddingY, reverse, loop, verticalSprite)
        // idle
        this.animations[this.states.idle][0] = new Animator(this.spritesheet, 0, 0, 95, 70, 4, 0.20, 5, 0, false, true, false);
        // glow
        this.animations[this.states.glow][0] = new Animator(this.spritesheet, 0, 100, 95, 70, 8, 0.20, 5, 0, false, true, false);
        
        this.animations[this.states.sword][0] = new Animator(this.spritesheet, 0, 200, 95, 70, 9, 0.20, 5, 0, false, true, false);
        
        this.animations[this.states.summon][0] = new Animator(this.spritesheet, 0, 300, 95, 70, 8, 0.20, 5, 0, false, true, false);

        this.animations[this.states.melee][0] = new Animator(this.spritesheet, 0, 400, 95, 70, 7, 0.20, 5, 0, false, true, false);
        
        this.animations[this.states.laser][0] = new Animator(this.spritesheet, 0, 500, 95, 70, 7, 0.20, 5, 0, false, true, false);
        
        this.animations[this.states.buff][0] = new Animator(this.spritesheet, 0, 600, 95, 70, 10, 0.20, 5, 0, false, true, false);

        this.animations[this.states.death][0] = new Animator(this.spritesheet, 0, 700, 95, 70, 4, 0.20, 5, 0, false, true, false);

        // left
        this.animations[this.states.idle][1] = new Animator(this.spritesheet, 0, 0, 95, 70, 4, 0.20, 5, 0, false, true, false);
        // glow
        this.animations[this.states.glow][1] = new Animator(this.spritesheet, 0, 100, 95, 70, 8, 0.20, 5, 0, false, true, false);
        
        this.animations[this.states.sword][1] = new Animator(this.spritesheet, 0, 200, 95, 70, 9, 0.20, 5, 0, false, true, false);
        
        this.animations[this.states.summon][1] = new Animator(this.spritesheet, 0, 300, 95, 70, 8, 0.20, 5, 0, false, true, false);

        this.animations[this.states.melee][1] = new Animator(this.spritesheet, 0, 400, 95, 70, 7, 0.20, 5, 0, false, true, false);
        
        this.animations[this.states.laser][1] = new Animator(this.spritesheet, 0, 500, 95, 70, 7, 0.20, 5, 0, false, true, false);
        
        this.animations[this.states.buff][1] = new Animator(this.spritesheet, 0, 600, 95, 70, 10, 0.20, 5, 0, false, true, false);

        this.animations[this.states.death][1] = new Animator(this.spritesheet, 0, 700, 95, 70, 4, 0.20, 5, 0, false, true, false);

        for(var l = 0; l <= 7; l++){
            this.animations[l][1].flipped = true;
        }
    }; 
    draw(ctx) {
        if(this.hp >= 0) this.enemHealthBar.draw(ctx);
        
        this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x-this.game.camera.x, this.y-this.game.camera.y, 5);

            if(debug){
                //draw the boundingBox
                ctx.strokeStyle = 'Red';
                ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y-this.game.camera.y, this.BB.width , this.BB.height);
                ctx.strokeStyle = 'yellow';
                ctx.strokeRect(this.AttackBB.x - this.game.camera.x, this.AttackBB.y-this.game.camera.y, this.AttackBB.width , this.AttackBB.height);
                ctx.strokeStyle = 'green';
                ctx.strokeRect(this.detectionAttackBB.x - this.game.camera.x, this.detectionAttackBB.y-this.game.camera.y, this.detectionAttackBB.width , this.detectionAttackBB.height);

            }
            


                         
    };


}

class Sword{
    constructor(game, x, y) {
        Object.assign(this, { game, x, y});
        this.game.projectile = this;
        this.spritesheet = assetMangager.getAsset("./sprites/arms.png");
        this.speed = 500;
        this.animations = [];
        this.dead = false;
        this.animations.push(new Animator(this.spritesheet, 59, 128, 36, 15, 1, 0.1, 0, 0, false, true, false));
        this.shot = {x: this.game.click.x + this.game.camera.x, y: this.game.click.y + this.game.camera.y};
        this.dist = distanceBetween(this, this.shot);
        this.velocity = { x: (this.shot.x - this.x) / this.dist * this.speed, y: (this.shot.y - this.y) / this.dist * this.speed};
        this.angle = getAngle(this.velocity);
        this.updateBB();
    };
    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x-15, this.y-15, 30, 30);
        
    };
    update(){
        const TICK = this.game.clockTick;
        this.x += this.velocity.x * TICK;
        this.y += this.velocity.y * TICK;
        this.updateBB();
        if(this.x < -10){
            this.removeFromWorld = true; 
        }
        var that = this;
        that.game.entities.forEach(function (entity) {
            if (entity.BB && that.BB.collide(entity.BB)) {
                if ((entity instanceof Ground || entity instanceof Wall || entity instanceof Platform || entity instanceof movingPlatforms || (entity instanceof Tiles) || entity instanceof smallPlatforms || (entity instanceof verticalWall)) && that.BB.collide(entity.BB)) {
                   that.removeFromWorld = true;
                }
                if(((entity instanceof fireBoss) || (entity instanceof Monster) || (entity instanceof Slime) || (entity instanceof Boar) || (entity instanceof earthSlime) || (entity instanceof ChainBot) || (entity instanceof Bat) || (entity instanceof SeaMonster) || (entity instanceof EarthBoss) || (entity instanceof Snake) || (entity instanceof WaterBoss)) && !that.removeFromWorld){
                    if(entity.hp > 0){
                    entity.loseHealth(that.getDmg());
                    that.game.addEntityToBegin(new DamageText(that.game, that.getDmg(), entity.BB.x+(entity.BB.width/2), entity.BB.y, "red"));
                    }
                    that.removeFromWorld = true;
                    // console.log("HIT2");
                }
                
            }
            
            });
            // console.log(this.dist);
            // console.log(this.shot.x, this.shot.y);
    };
    getDmg() {
        let dmg = this.game.camera.damage;
        console.log(dmg);
        assetMangager.playAsset("./sounds/sfx/playerhit.mp3");
        return dmg;
    }
    draw(ctx){
        // this.animations[0].drawFrame(this.game.clockTick, ctx, this.x-this.game.camera.x, this.y-this.game.camera.y , 2);
        this.animations[0].drawAngle(this.game.clockTick, ctx, this.x-this.game.camera.x, this.y-this.game.camera.y, 2, this.angle);
        if(debug){
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x-this.game.camera.x, this.BB.y-this.game.camera.y, this.BB.width, this.BB.height);
        }
    };

    
};