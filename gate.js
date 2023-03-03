class Gate {
    constructor(game, x, y, wallX, wallY, wallWidth, wallHeight, div, show = true, repeat = false) {
        Object.assign(this, { game, x, y, wallX, wallY, wallWidth, wallHeight, div, show, repeat});
        this.spritesheet = assetMangager.getAsset("./sprites/gate.png");

        if(this.game.camera.level === levelOne){
            this.wall = new Wall(this.game, this.wallX, this.wallY, this.wallWidth, this.wallHeight, this.div);
        }
        else if(this.game.camera.level === levelThree){
            this.wall = new verticalWall(this.game, this.wallX, this.wallY, this.wallWidth, this.wallHeight, this.div);

        }

        this.show = show;
        this.states = { dark: 0, lit: 1, full: 2};
        this.state = this.states.dark;
        this.animations = [];
        this.animations[this.states.dark] = new Animator(this.spritesheet, 15, 45, 69, 90, 1, 0.10, 0, 0, false, true, false);
        this.animations[this.states.lit] = new Animator(this.spritesheet, 115, 45, 69, 90, 10, 0.10, 31, 0, false, false, false);
        this.animations[this.states.full] = new Animator(this.spritesheet, 1015, 45, 69, 90, 1, 0.10, 0, 0, false, true, false);
        this.xOff = 30;
        this.game.addEntity(this.wall);
        this.updateBB();

    }
    updateBB() {
        this.BB = new BoundingBox(this.x+this.xOff, this.y, 69*1.2, 90*2);
    };
    update(){
        const TICK = this.game.clockTick;
        if(this.state == this.states.dark){
            var that = this;
            this.game.entities.forEach(function (entity) {
                if (entity instanceof Projectile) {
                    if (entity.BB && that.BB.collide(entity.BB)) {
                        entity.removeFromWorld = true;
                        that.state = that.states.lit;
                    }
                }
            });
            // console.log(that.animations[that.states.lit].isAlmostDone(TICK));
        }
        if(this.animations[this.states.lit].isAlmostDone(TICK)){
            this.state = this.states.full;
            this.wall.removeFromWorld = true;
        }
    };

    draw(ctx){
        this.animations[this.state].drawFrame(this.game.clockTick, ctx, this.x-this.game.camera.x, this.y-this.game.camera.y, 2);
        if(debug){
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x-this.game.camera.x, this.BB.y-this.game.camera.y, this.BB.width, this.BB.height);
            }
    };

    
};