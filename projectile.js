class Projectile{
    constructor(game, x, y) {
        Object.assign(this, { game, x, y});

        this.spritesheet = assetMangager.getAsset("./sprites/blackFireball.png");
        this.speed = 500;
        this.animations = [];
        this.dead = false;
        this.animations.push(new Animator(this.spritesheet, 0, 0, 15, 15, 4, 0.3, 7, 0, false, true, false));
        this.shot = {x: this.game.click.x + this.game.camera.x, y: this.game.click.y + this.game.camera.y};
        var dist = distance(this, this.shot);
        this.velocity = { x: (this.shot.x - this.x) / dist * this.speed, y: (this.shot.y - this.y) / dist * this.speed};
        this.updateBB();
    };
    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y, 30, 30);
        
    };
    update(){
        const TICK = this.game.clockTick;
        this.x += this.velocity.x * TICK;
        this.y += this.velocity.y * TICK;
        this.updateBB();

        if(this.y < 0){
            this.removeFromWorld = true;                
        }
        if(this.x < -10){
            this.removeFromWorld = true; 
        }
        // console.log(this.velocity.x, this.velocity.y);
        if(this.velocity.x < 0){
        this.animations[0].flipped = true;
        }
        // var that = this;
        // this.game.entities.forEach(function (entity) {
        //     if (entity.BB && that.BB.collide(entity.BB)) {
        //         if ((entity instanceof Fruit) && that.BB.collide(entity.BB)) {
        //            that.dead = true;
        //            entity.removeFromWorld = true;
        //         }
        //             }
        //     });
    };

    draw(ctx){
        this.animations[0].drawFrame(this.game.clockTick, ctx, this.x-this.game.camera.x, this.y-this.game.camera.y , 2);
        if(debug){
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x-this.game.camera.x, this.BB.y-this.game.camera.y, this.BB.width, this.BB.height);
            }
    };

    
};
function distance(A, B) {
    return Math.sqrt((B.x - A.x) * (B.x - A.x) + (B.y - A.y) * (B.y - A.y));
};


