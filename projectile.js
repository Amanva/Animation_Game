class Projectile{
    constructor(game, x, y) {
        Object.assign(this, { game, x, y});

        this.spritesheet = assetMangager.getAsset("./sprites/blackFireball.png");
        this.speed = 500;
        this.animations = [];
        this.dead = false;
        this.animations.push(new Animator(this.spritesheet, 0, 0, 15, 15, 4, 0.3, 7, 0, false, true, false));
        this.shot = {x: this.game.click.x + this.game.camera.x, y: this.game.click.y + this.game.camera.y};
        var dist = distanceBetween(this, this.shot);
        this.velocity = { x: (this.shot.x - this.x) / dist * this.speed, y: (this.shot.y - this.y) / dist * this.speed};
        this.angle = getAngle(this.velocity);
        this.updateBB();
    };
    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x-15, this.y-15, 30, 30);
        
    };
    update(){
        const TICK = this.game.clockTick;
        this.x += this.velocity.x * TICK;
        this.y += this.velocity.y * TICK;
        this.updateBB();

        // if(this.y < 0){
        //     this.removeFromWorld = true;                
        // }
        if(this.x < -10){
            this.removeFromWorld = true; 
        }
        var that = this;
        this.game.entities.forEach(function (entity) {
            if (entity.BB && that.BB.collide(entity.BB)) {
                if ((entity instanceof Ground || entity instanceof Wall || entity instanceof Platform || entity instanceof movingPlatforms) && that.BB.collide(entity.BB)) {
                   that.removeFromWorld = true;
                }
                if(entity instanceof fireBoss){
                    that.removeFromWorld = true;
                    entity.loseHealth(100);

                }
            }
            
            });
            // console.log(this.velocity.x, this.velocity.y);
    };
// up: 4.7
// down 1.5
// up right 5.5
// right 0
// down right 7
// down left 8.5
// left 9.35
// up left 4.3
    draw(ctx){
        // this.animations[0].drawFrame(this.game.clockTick, ctx, this.x-this.game.camera.x, this.y-this.game.camera.y , 2);
        this.animations[0].drawAngle(this.game.clockTick, ctx, this.x-this.game.camera.x, this.y-this.game.camera.y, 2, this.angle);
        if(debug){
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x-this.game.camera.x, this.BB.y-this.game.camera.y, this.BB.width, this.BB.height);
            }
    };

    
};
function distanceBetween(A, B) {
    return Math.sqrt((B.x - A.x) * (B.x - A.x) + (B.y - A.y) * (B.y - A.y));
};
function getAngle(velocity) {
    // let radian = Math.atan2(velocity.y, velocity.x);
    // let degree = radian * (180 / Math.PI);
    let change = Math.atan2(velocity.y, velocity.x) / Math.PI;
    if (-0.625 < change && change < -0.375) return 4.7; // up 
    if (-0.375 < change && change < -0.125) return 5.5; // up right
    if (0.375 < change && change < 0.625) return 1.5; // down
    if (0.625 < change && change < 0.875) return 8.5; // down left
    if (-0.875 > change || change > 0.875) return 9.35; // left
    if (-0.875 < change && change < -0.625) return 4.3; // top left
    if (-0.125 < change && change < 0.125) return 0; // right
    if (0.125 < change && change < 0.375) return 7; // down right
    return change;
};
