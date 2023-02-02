const GSCALE = 1;
class Ground {
    constructor(game, x, y, w) {
        Object.assign(this, { game, x, y, w});

        this.spritesheet = assetMangager.getAsset("./sprites/Lava64.png");
        // this.animations = [];
        // this.animations.push(new Animator(this.spritesheet, 0, 0, 48, 48, 1, 0.1, 0,0,false, true, false));
        this.updateBB();
    };
    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y, this.w+256, (64*GSCALE));
        
    };
    update() {
    };
    draw(ctx) {
        let brickCount = this.w / ((256*GSCALE));
        for (var i = 0; i < brickCount; i++) {
        ctx.drawImage(this.spritesheet, 0, 255, 256, 64, this.x + i * (256*GSCALE)-this.game.camera.x, this.y, (256*GSCALE), (64*GSCALE));
        }
        ctx.strokeStyle = 'Red';
        ctx.strokeRect(this.BB.x-this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
    };
};


class BackGround {
    constructor(game, x, y, w, h) {
        Object.assign(this, { game, x, y, w, h});

        this.spritesheet = assetMangager.getAsset(levelOne.backround);

    };

    update() {
    };
    draw(ctx) {
        ctx.drawImage(this.spritesheet,this.x ,this.y, this.w, this.h);
    };
};
