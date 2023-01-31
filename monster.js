 // /*
 // kemeria
 // */

  class Monster {
   
    constructor(game, x, y) {
        Object.assign(this, { game, x, y});
        this.spritesheet = assetMangager.getAsset("./sprites/monster.png");
        this.speed = 250;
        this.animations = [];
        this.dead = false;
         this.animations.push(new Animator(this.spritesheet, 0, 0, 231, 179, 18, 0.2, 0, 0, false, true, false));
        this.updateBB();
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
        this.animations[0].drawFrame(this.game.clockTick, ctx, this.x, this.y, 1);
       ;
    };
};
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    