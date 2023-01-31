
  class Monster {
   
    constructor(game, x, y) {
        Object.assign(this, { game, x, y});
        this.spritesheet = assetMangager.getAsset("./sprites/monster.png");
        this.spritesheetLeft = assetMangager.getAsset("./sprites/monsterLeft.png");
        this.spritesheetIdle = assetMangager.getAsset("./sprites/demon-idle.png");
        this.spritesheetIdleLeft = assetMangager.getAsset("./sprites/demon-idleLeft.png");
        this.speed = 250;
        this.animations = [];
        this.dead = false;
        this.loadAnimations();  
        this.updateBB();
    };

    loadAnimations() {
        for (var i = 0; i < 2; i++) { 
            this.animations.push([]);
            for (var j = 0; j < 2; j++) { 
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

    };
    updateBB() {
       // this.lastBB = this.BB;
        //this.BB = new BoundingBox(this.x, this.y, 120, 120);

    };
    update(){
        
       // this.x += this.speed * this.game.clockTick;
       // this.updateBB();
       
    };

    draw(ctx){
        // this.animations[0][0].drawFrame(this.game.clockTick, ctx, this.x , this.y, 1);
        this.animations[0][1].drawFrame(this.game.clockTick, ctx, this.x , this.y, 1);
        // when idle, use this
        //right
        // this.animations[1][1].drawFrame(this.game.clockTick, ctx, this.x, this.y + 30, 1);
        //left
        // this.animations[1][0].drawFrame(this.game.clockTick, ctx, this.x + 60, this.y + 30, 1);
       
    };
};
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    