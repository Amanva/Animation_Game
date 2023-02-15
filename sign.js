class Sign {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});
        this.spritesheet = assetMangager.getAsset("./sprites/04.png");
        this.size = 2;
    };

    update() {
       
    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 5, 5, 37, 43, this.x, this.y, 37 * this.size, 43 * this.size);
        if (debug) {            
        // ctx.StrokeStyle = "Red";
        // ctx.strokeRect(this.BB.x, this.BB.y, 24, 24);
        }
    };

}