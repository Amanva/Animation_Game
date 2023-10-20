/*
chain bot enemy animation
Aman Vahora, Arashpreet Pandher, Uladzimir Hanevich, Kemeria Mustfa
TCSS491 winter 2023
*/
class ChainBot {
    
    constructor(game, x, y){
        Object.assign(this, { game, x, y });
        this.game.chainBot = this;
        this.velocity = { x: 0, y: 0 };
                
        this.botIdle = assetMangager.getAsset("./sprites/enemies/chain_bot_idle.png");
        this.botRunRight = assetMangager.getAsset("./sprites/enemies/chain_bot_run_right.png");
        this.botRunLeft = assetMangager.getAsset("./sprites/enemies/chain_bot_run_left.png");
        this.botAttackRight = assetMangager.getAsset("./sprites/enemies/chain_bot_attack_right.png");
        this.botAttackLeft = assetMangager.getAsset("./sprites/enemies/chain_bot_attack_left.png");
        this.botHit = assetMangager.getAsset("./sprites/enemies/chain_bot_hit.png");
        this.botDeath = assetMangager.getAsset("./sprites/enemies/chain_bot_death.png");
              
        this.fallAcc = 200;
        this.facing = 1; 
        this.state = 5;
        this.playerJump = false;
        this.shoot = false;
        this.elapsedTime = 0;
        this.dead = false;
        // this.updateBB();
        // this.animations = [];
        this.loadAnimations();
    };
    loadAnimations() {
        this.animations = [];
        for (var i = 0; i < 7; i++) { 
            this.animations.push([]);
            for (var j = 0; j < 2; j++) { // directions
                this.animations[i].push([]);
            }
        }
//(spritesheet, xStart, yStart, width, height, frameCount, frameDuration, framePaddingX, framePaddingY, reverse, loop, verticalSprite)
               
        // idle
        this.animations[0][0] = new Animator(this.botIdle, 0, 0, 126, 39, 5, 0.30, 0, 0, false, true, true);
        // right run
        this.animations[1][0] = new Animator(this.botRunRight, 0, 0, 126, 39, 8, 0.30, 0, 0, false, true, true);
        // left run
        this.animations[2][0] = new Animator(this.botRunLeft, 0, 0, 126, 39, 8, 0.30, 0, 0, false, true, true);
        // left attack
        this.animations[3][0] = new Animator(this.botAttackLeft, 0, 0, 126, 39, 8, 0.30, 0, 0, false, true, true); 
        // right attack
        this.animations[4][0] = new Animator(this.botAttackRight, 0, 0, 126, 39, 8, 0.30, 0, 0, false, true, true);
        // hit
        this.animations[5][0] = new Animator(this.botHit, 0, 0, 126, 39, 2, 0.30, 0, 0, false, true, true);
        // death
        this.animations[6][0] = new Animator(this.botDeath, 0, 0, 126, 39, 5, 0.30, 0, 0, false, true, true);
      
    }; // End load animation

    // updateBB() {
    //     this.lastBB = this.BB;
    //     this.BB = new BoundingBox(this.x, this.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKHEIGHT);
        
    // };
    
    update() {
        this.elapsedTime += this.game.clockTick;
        const TICK = this.game.clockTick;
        
        const RUN = 153;


        const MAXFALL = 270;

            // this.velocity.y += this.fallAcc * TICK;
            // if(this.shoot){
            //     this.velocity.x = 0;
            //     if(this.elapsedTime > 0.3 && this.shootAnim.isAlmostDone(TICK)){
            //         this.game.addEntityToBegin(new Projectile(this.game, this.x, this.y));
            //         this.elapsedTime = 0;
            //         this.shoot = false;
            //     }
                
            // }
            //  else {        
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
                if(this.game.E){
                    this.shoot = true;
                 }
                 
            // }
            // if (this.velocity.y >= MAXFALL) this.velocity.y = MAXFALL;
            // if (this.velocity.y <= -200) this.velocity.y = -200;

            if (this.velocity.x >= RUN) this.velocity.x = RUN;
            if (this.velocity.x <= -RUN) this.velocity.x = -RUN;
            
            // update position
            this.x += this.velocity.x * TICK * PARAMS.SCALE;
            // this.y += this.velocity.y * TICK * PARAMS.SCALE;
            // this.updateBB();

                if(this.velocity.x === 0){
                    this.state = 0;
                }
                else if(this.velocity.x < 0){
                    this.facing = 1;
                }
                else if(this.velocity.x > 0){
                    this.facing = 0;
                }
                // else{
                //     this.state = 0;
                // }
            // } else {
            //     this.state = 1;
            //     this.facing = 2;
            // }
            if(this.x < -20){
                this.x = -20;
            }
            if(this.x >= 750){
                this.x = 750;
            }
            if(this.y <= 0){
                this.y = 0;
            }
            // update direction
            if (this.velocity.x < 0) this.facing = 1;
            if (this.velocity.x > 0) this.facing = 0;
            
            
    };

    draw(ctx) {
        // if(this.inRange){
        //     go towards the mage and attack him

        // }
        //  else {
            // this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x , this.y, PARAMS.SCALE);

            // this.animations[2][0].drawFrame(this.game.clockTick, ctx, this.x + 200 , this.y, PARAMS.SCALE);
        // }
            // ctx.strokeStyle = 'Red';
            // ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
 
            /*     drawing all chainBot srites on the screen     */
            this.animations[0][0].drawFrame(this.game.clockTick, ctx, 20 , 20, 1.5);
            this.animations[1][0].drawFrame(this.game.clockTick, ctx, 20 + 120 , 20, 1.5);
            this.animations[2][0].drawFrame(this.game.clockTick, ctx, 20 + 240 , 20, 1.5);
            this.animations[3][0].drawFrame(this.game.clockTick, ctx, 20 + 360, 20, 1.5);
            this.animations[4][0].drawFrame(this.game.clockTick, ctx, 20 + 480 , 20, 1.5);
            this.animations[5][0].drawFrame(this.game.clockTick, ctx, 20 , 20 + 72, 1.5);
            this.animations[6][0].drawFrame(this.game.clockTick, ctx, 20 + 120 , 20 + 72, 1.5);
                       
    }; // End draw method


}; // End of chain_bot
