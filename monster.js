class Monster{ 

    constructor(game, x, y){
        Object.assign(this, { game, x, y });
        this.game.monster = this;
        this.velocity = { x: 0, y: 0 };
        this.spritesheet = assetMangager.getAsset("./sprites/monster.png");
        this.spritesheetLeft = assetMangager.getAsset("./sprites/monsterLeft.png");
        this.spritesheetIdle = assetMangager.getAsset("./sprites/demon-idle.png");
        this.spritesheetIdleLeft = assetMangager.getAsset("./sprites/demon-idleLeft.png");
       
        this.x = 300;
        this.y = 300;
        this.speed = 100;
        this.dead = false;
        this.health = 300;
        //animations
        this.animations = [];
        this.BB;
        this.AttackBB;
        this.loadAnimations();
        this.updateBB();

    };

    loadAnimations() {
        for(var i = 0; i < 2; i++){ 
            this.animations.push([]);
            for(var j = 0; j < 2; j++){ // two directions
                this.animations[i].push([]);
            }
        }
        // attack
        this.animations[0][0] = new Animator(this.spritesheet, -40, 0, 200, 150, 11, 0.1, 40, 0, false, true, false);
        // idle
        this.animations[1][0] = new Animator(this.spritesheetIdle, 0, 0, 155, 126, 6, 0.10, 5, 0, false, true, false);

        // attack
        this.animations[0][1] = new Animator(this.spritesheetLeft, 0, 0, 200, 150, 11, 0.1, 40, 0, true, true, false);
        // idle
        this.animations[1][1] = new Animator(this.spritesheetIdleLeft, 5, 0, 155, 126, 6, 0.10, 5, 0, true, true, false);

       
        for(var l = 0; l < 2; l++){ 
            this.animations[l][1].flipped = true;
            
        }
    
    }; //end of loadAnimations()
    
    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y, 200, 150);
        
    };

    update() {
        this.timetoShoot += this.game.clockTick;
        const TICK = this.game.clockTick;
        const RUN = 300;
        const MAXFALL = 200;
        this.velocity.y += 200 * TICK;

        // this.y += this.velocity.y * this.monster.clockTick * PARAMS.SCALE;   //I'm not sure what it does I just commented it
            
            // this.updateBB();
            var that = this;
            this.game.entities.forEach(function (entity) {  //changed this.monster.entities.forEach(function (entity) to this.game.entities.forEach(function (entity)
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

    }; //end of update()

        // updateBB() {
        //     this.lastBB = this.BB;
        //     this.lastAttackBB = this.AttackBB;
        //     if(this.state === 0){
        //         this.BB = new BoundingBox(this.x, this.y, 200, 150);
        //         this.AttackBB = new BoundingBox(this.x+50, this.y+100, 0,0);

        //     }
        //     else if(this.state === 1){ // walk
        //         this.BB = new BoundingBox(this.x+255, this.y+200, 210, 200);
        //         this.AttackBB = new BoundingBox(0, 0,0,0);
        //     }
        // }; //end of updateBB()
       
    
    

    draw(ctx) {
        this.animations[0][1].drawFrame(this.game.clockTick, ctx, this.x , this.y, 1);  
        //draw BB here
        ctx.strokeStyle = 'Red';
        ctx.strokeRect(this.BB.x-this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
    };

}
  
