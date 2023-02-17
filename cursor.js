class Cursor {
    constructor(game) {
        this.game = game;
        this.spritesheet = assetMangager.getAsset("./sprites/cursor.png");
        this.srcWidth = 82;
        this.srcHeight = 82;
        this.scale = 64;
    }

    update() {
        // this.BB = new BoundingBox(this.game.mouse.x - (this.scale / 2) + this.game.camera.x, this.game.mouse.y - (this.scale / 2) + this.game.camera.y, this.scale, this.scale);


    }

    draw(ctx) {
        //offset dx and dy by half the drawing to get it in the middle of the actual cursor pos
                // ctx.drawImage(this.spritesheet, 0, 0, this.srcWidth, this.srcHeight, this.game.mouse.x - (this.scale / 2), this.game.mouse.y - (this.scale / 2), this.scale, this.scale);

        console.log(this.game.mouse.x);
        ctx.drawImage(this.spritesheet, 53, 19, 12, 12, this.game.mouse.x, this.game.mouse.y, 24, 24);
        // if (PARAMS.DEBUG) {
        //     this.BB = new BoundingBox(this.game.mouse.x - (this.scale / 2) + this.game.camera.x, this.game.mouse.y - (this.scale / 2) + this.game.camera.y, this.scale, this.scale);
        //     // ctx.fillStyle = "Red";
        //     // ctx.StrokeStyle = "Red";
        //     // ctx.fillText(this.myType, this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y);
        //     // ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.scale, this.scale);
        // }
    }
}