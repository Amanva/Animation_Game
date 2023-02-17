class Potion{
    constructor(game, forScreen, type) {
        Object.assign(this, { game, forScreen, type});
        this.spritesheet = assetMangager.getAsset("./sprites/potion.png");
        this.animations = [];
        this.healthPotion = 0;
        this.manaPotion = 0;
        this.type = 0;
        this.textSize = '15px "Press Start 2P"';
        this.animations.push(new Animator(this.spritesheet, 0, 0, 16, 16, 1, 0.1, 0, 0, false, true, false));
        this.animations.push(new Animator(this.spritesheet, 0, 16, 16, 16, 1, 0.1, 0, 0, false, true, false));
    };
    update(){
        
    };
    draw(ctx){
        if(this.forScreen){
        ctx.font = this.textSize;
        ctx.fillStyle = "White";
        ctx.fillText("X "+ this.healthPotion, 50, 110);
        this.animations[0].drawFrame(this.game.clockTick, ctx, 5, 80, PARAMS.SCALE);
        ctx.fillText("X "+ this.manaPotion, 50, 160);
        this.animations[1].drawFrame(this.game.clockTick, ctx, 5, 130, PARAMS.SCALE);
    }

    };
}