class Cursor {
    constructor(game) {
        Object.assign(this, {game});
        this.spritesheet = assetMangager.getAsset("./sprites/cursor.png");
    };

    update() {
        // this.BB = new BoundingBox(this.game.mouse.x - (this.scale / 2) + this.game.camera.x, this.game.mouse.y - (this.scale / 2) + this.game.camera.y, this.scale, this.scale);
        if(this.game.mouse == null){
            this.game.mouse = {x: 100, y: 100};
        }
    };

    draw(ctx) {
        this.BB = new BoundingBox(this.game.mouse.x-14, this.game.mouse.y-14, 24,24);
        ctx.drawImage(this.spritesheet, 53, 19, 12, 12, this.game.mouse.x - 14, this.game.mouse.y - 14, 24, 24);
        // ctx.drawImage(this.spritesheet, 53, 19, 12, 12, this.game.mouse.x - 32, this.game.mouse.y - 32, 24, 24);
        if (debug) {            
        ctx.StrokeStyle = "Red";
        ctx.strokeRect(this.BB.x, this.BB.y, 24, 24);
        }
    };
}