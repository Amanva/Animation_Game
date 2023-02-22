class Item {
    constructor(game, x , y){
        Object.assign(this, { game, x, y });
        this.game.Item = this;
        this.x;
        this.y;
        this.spritesheet = assetMangager.getAsset("./sprites/book.png");
        this.animations = new Animator(this.spritesheet,  14, 17, 30, 50, 1, 1, 0, 0, false, true, false);
        this.BB;
    }

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x+160, this.y+200, 50, 120); 
    };

    update(){
       
    };
    

    draw(ctx){
        console.log("draw");
        this.animations.drawFrame(this.game.clockTick, ctx, this.x-this.game.camera.x, this.y-this.game.camera.y, this.scale);
        if (debug) {
            // ctx.strokeStyle = 'red';
            // ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y-this.game.camera.y, this.BB.width , this.BB.height);
        }    
    }
}