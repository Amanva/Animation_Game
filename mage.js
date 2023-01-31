class Mage {

    constructor(game, x, y){
        Object.assign(this, { game, x, y });
        this.game.mage = this;
        this.velocity = { x: 0, y: 0 };
        this.spritesheet = assetMangager.getAsset("./sprites/mageRight.png");
        this.spritesheetLeft = assetMangager.getAsset("./sprites/mageLeft.png");
        this.speed = 200;
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
        this.playerJump = false;
        this.shoot = false;
        this.elapsedTime = 0;
        this.dead = false;
        this.updateBB();
        this.animations = [];
        this.loadAnimations();
    };
    loadAnimations() {
        for (var i = 0; i < 7; i++) { 
            this.animations.push([]);
            for (var j = 0; j < 2; j++) { 
                this.animations[i].push([]);
            }
        }

        // right idle
        this.animations[0][0] = new Animator(this.spritesheet, 61, 15, 45, 105, 8, 0.20, 115, 0, false, true, false);
        // right run
        this.animations[1][0] = new Animator(this.spritesheet, 65, 150, 39, 105, 8, 0.20, 121, 0, false, true, false);
        // right attack
        this.animations[2][0] = new Animator(this.spritesheet, 61, 269, 70, 105, 13, 0.05, 90, false, true, false); 
        this.animations[2][0] = new Animator(this.spritesheet, 61, 269, 70, 105, 13, 0.05, 90, 0, false, true, false); 
        // skull attack
        this.animations[3][0] = new Animator(this.spritesheet, 57, 527, 50, 105, 17, 0.10, 110, 0, false, true, false);
        // hit
        this.animations[4][0] = new Animator(this.spritesheet, 57, 655, 50, 105, 5, 0.20, 110, 0, false, true, false);
        // death
        this.animations[5][0] = new Animator(this.spritesheet, 57, 789, 50, 105, 9, 0.20, 110, false, true, false);
        // jump
        this.animations[6][0] = new Animator(this.spritesheet, 57, 399, 50, 105, 13, 0.10, 110, false, true, false);
        this.animations[5][0] = new Animator(this.spritesheet, 57, 789, 50, 105, 9, 0.20, 110, 0, false, true, false);
        // jump
        this.animations[6][0] = new Animator(this.spritesheet, 57, 399, 50, 105, 13, 0.10, 110, 0, false, true, false);


        // left idle
        this.animations[0][1] = new Animator(this.spritesheetLeft, 1495, 15, 45, 105, 8, 0.20, 115, 0, true, true, false);

        // left run
        this.animations[1][1] = new Animator(this.spritesheetLeft, 1495, 150, 39, 105, 8, 0.20, 121, 0, true, true, false);

        // left attack
        this.animations[2][1] = new Animator(this.spritesheetLeft, 692, 269, 70, 105, 13, 0.05, 90, true, true, false);
        this.animations[2][1] = new Animator(this.spritesheetLeft, 692, 269, 70, 105, 13, 0.05, 90, 0, true, true, false);

        // left skull attack
        this.animations[3][1] = new Animator(this.spritesheetLeft, 55, 527, 50, 105, 17, 0.10, 110, 0, true, true, false);

        // left hit
        this.animations[4][1] = new Animator(this.spritesheetLeft, 1976, 655, 50, 105, 5, 0.20, 110, 0, true, true, false);
        // left death
        this.animations[5][1] = new Animator(this.spritesheetLeft, 1336, 789, 50, 105, 9, 0.20, 110, true, true, false);
        // left jump
        this.animations[6][1] = new Animator(this.spritesheetLeft, 692, 399, 50, 105, 13, 0.10, 110, false, true, false);
        // this.shootAnim = new Animator(this.spritesheetMage, 1205, 1051, 60, 52, 4, 0.05, 84, false, true);
        this.animations[5][1] = new Animator(this.spritesheetLeft, 1336, 789, 50, 105, 9, 0.20, 110, 0, true, true, false);
        // left jump
        this.animations[6][1] = new Animator(this.spritesheetLeft, 692, 399, 50, 105, 13, 0.10, 110, 0, false, true, false);
        // this.shootAnim = new Animator(this.spritesheetMage, 1205, 1051, 60, 52, 4, 0.05, 84, 0, false, true, false);

        

    };
    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y+110, PARAMS.PLAYERWIDTH, PARAMS.PLAYERHEIGHT);
        
    };
    
    update() {
        this.elapsedTime += this.game.clockTick;
        const TICK = this.game.clockTick;
        const RUN = 153;
        const MAXFALL = 150;

        this.velocity.y += this.fallAcc * TICK; 

            if(this.state !== 6){
            if(this.shoot){
                this.velocity.x = 0;
                this.state = this.states.normAttack;
                if(this.elapsedTime > 1 && this.animations[this.state][this.facing].isAlmostDone(TICK)){
                    this.game.addEntity(new Projectile(this.game, this.x+100, this.y+140));
                    this.animations[this.state][this.facing].elapsedTime = 0;
                    this.elapsedTime = 0;
                    this.shoot = false;
                    this.game.attack = false;
                }
            }
             else {
                if (this.game.left) {
                    this.facing = 1;
                    this.state = 1;
                    this.velocity.x -= RUN;
                }
                if (this.game.right) {
                    this.facing = 0;
                    this.state = 1;
                    this.velocity.x += RUN;
                }  
                if(!this.game.left && !this.game.right){
                    this.velocity.x = 0;
                }     
                if(this.game.attack){
                    this.shoot = true;
                }
                
                if(this.game.jump && this.playerJump){
                    this.state = 6;
                    this.velocity.y = -150;
                    this.playerJump = false;
                }
            }
        }
             else {       
                if(this.animations[this.state][this.facing].isAlmostDone(TICK)){
                this.state = 0;

                }
                
                 
            }
            if (this.velocity.y >= MAXFALL) this.velocity.y = MAXFALL;
            if (this.velocity.y <= -150) this.velocity.y = -150;

            if (this.velocity.x >= RUN) this.velocity.x = RUN;
            if (this.velocity.x <= -RUN) this.velocity.x = -RUN;
            
            // update position
            this.x += this.velocity.x * TICK * PARAMS.SCALE;
            this.y += this.velocity.y * TICK * PARAMS.SCALE;
            this.updateBB();

            var that = this;
            // console.log(this.game.entities);
            this.game.entities.forEach(function (entity) {
                if (entity.BB && that.BB.collide(entity.BB)) {
                    if (that.velocity.y > 0) { 
                        if ((entity instanceof Ground)) {
                            that.playerJump = true;
                            that.y = entity.BB.top - PARAMS.PLAYERHEIGHT - 110;
                            that.velocity.y === 0;
                            that.updateBB();
                            }
                            
                        }
                    }
                });

                if(this.velocity.x === 0 && !this.shoot){
                    this.state = 0;
                }
                else if(this.velocity.x < 0){
                    this.facing = 1;
                }
                else if(this.velocity.x > 0){
                    this.facing = 0;
                }
                

            if(this.x < -20){
                this.x = -20;
            }
            if(this.y <= 0){
                this.y = 0;
            }
            // update direction
            if (this.velocity.x < 0) this.facing = 1;
            if (this.velocity.x > 0) this.facing = 0;
            if (this.velocity.y < 0)  this.state = 6;
            
            
    };

    draw(ctx) {
        // if(this.shoot){
        //     // this.animations[1][2].drawFrame(this.game.clockTick, ctx, this.x , this.y, PARAMS.SCALE);
        //     this.shootAnim.drawFrame(this.game.clockTick, ctx, this.x , this.y, PARAMS.SCALE);
        // }
        //  else {
            this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x , this.y, PARAMS.SCALE);
            // this.animations[6][1].drawFrame(this.game.clockTick, ctx, this.x , this.y, PARAMS.SCALE);
            // this.animations[2][1].drawFrame(this.game.clockTick, ctx, this.x , this.y, PARAMS.SCALE);
            // this.animations[2][1].drawFrame(this.game.clockTick, ctx, this.x , this.y, PARAMS.SCALE);

            // this.animations[2][0].drawFrame(this.game.clockTick, ctx, this.x + 200 , this.y, PARAMS.SCALE);
        // }
            // ctx.strokeStyle = 'Red';
            // ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
    };


};