const GSCALE = 1;
const WSCALE = 2;
class Ground {
    constructor(game, x, y, width, height) {
        Object.assign(this, { game, x, y, width, height});

        this.spritesheet = assetMangager.getAsset("./sprites/Lava64.png");
        // this.animations = [];
        // this.animations.push(new Animator(this.spritesheet, 0, 0, 48, 48, 1, 0.1, 0,0,false, true, false));
        this.updateBB();
    };
    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y, this.width, (64*GSCALE));
        
    };
    update() {
    };
    draw(ctx) {
        let brickWidth = this.width / ((256*GSCALE));
        for (var i = 0; i < brickWidth; i++) {
            ctx.drawImage(this.spritesheet, 0, 255, 256, 64, this.x + i * (256*GSCALE)-this.game.camera.x, this.y-this.game.camera.y, (256*GSCALE), (64*GSCALE));
        }
        if(debug){
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x-this.game.camera.x, this.BB.y-this.game.camera.y, this.BB.width, this.BB.height);
            }
    };
};

class Wall {
    constructor(game, x, y, width, height) {
        Object.assign(this, { game, x, y, width, height});

        this.spritesheet = assetMangager.getAsset("./sprites/Lava64.png");
        this.updateBB();
    };
    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y, (192*WSCALE), this.height);
        
    };
    update() {
    };
    draw(ctx) {
        let brickHeight = this.height / ((154*WSCALE));
        for (var i = 0; i < brickHeight; i++) {
        ctx.drawImage(this.spritesheet, 0, 11, 192, 154, this.x - this.game.camera.x, this.y + i * (154*WSCALE)-this.game.camera.y, (192*WSCALE), (154*WSCALE));
        // ctx.drawImage(this.spritesheet, 0, 11, 192, 154, this.x +192 - this.game.camera.x, this.y - i * (154*WSCALE), (192*WSCALE), (154*WSCALE));
        // ctx.drawImage(this.spritesheet, 0, 11, 192, 154, this.x +384 - this.game.camera.x, this.y - i * (154*WSCALE), (192*WSCALE), (154*WSCALE));
        }
        if(debug){
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x-this.game.camera.x, this.BB.y-this.game.camera.y, this.BB.width, this.BB.height);
        }
    };
};

class BackGround {
    constructor(game, x, y, w, h) {
        Object.assign(this, { game, x, y, w, h});

        this.spritesheet = assetMangager.getAsset(levelOne.background);

    };

    update() {
    };
    draw(ctx) {
        ctx.drawImage(this.spritesheet,this.x ,this.y, this.w, this.h);
    };
};
class platforms {
    constructor(game, x, y, width, height) {
        Object.assign(this, { game, x, y, width, height});

        this.spritesheet = assetMangager.getAsset("./sprites/Lava64.png");
        // this.animations = [];
        // this.animations.push(new Animator(this.spritesheet, 0, 0, 48, 48, 1, 0.1, 0,0,false, true, false));
        this.updateBB();
    };
    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y, this.width, (64*GSCALE));
        
    };
    update() {
    };
    draw(ctx) {
        let brickWidth = this.width / ((256*GSCALE));
        for (var i = 0; i < brickWidth; i++) {
            ctx.drawImage(this.spritesheet, 322, 256, 127, 31, this.x + i * (256*GSCALE)-this.game.camera.x, this.y, (256*GSCALE), (64*GSCALE));
        }

        if(debug){
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x-this.game.camera.x, this.BB.y-this.game.camera.y, this.BB.width, this.BB.height);
            }
    };
};

class lava {
    constructor(game, x, y, width, height) {
        Object.assign(this, { game, x, y, width, height});

        this.spritesheet = assetMangager.getAsset("./sprites/Lava64.png");
        // this.animations = [];
        // this.animations.push(new Animator(this.spritesheet, 0, 0, 48, 48, 1, 0.1, 0,0,false, true, false));
        this.updateBB();
    };
    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y, this.width, (64*GSCALE));
        
    };
    update() {
    };
    draw(ctx) {
        let brickWidth = this.width / ((256*GSCALE));
        for (var i = 0; i < brickWidth; i++) {
            ctx.drawImage(this.spritesheet, 188, 196, 10, 20, this.x + i * (10*GSCALE)-this.game.camera.x, this.y, (10*GSCALE), (64*GSCALE));
        }
        ctx.strokeStyle = 'Red';
        ctx.strokeRect(this.BB.x-this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
    };
};

