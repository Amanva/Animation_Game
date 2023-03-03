class DamageText {
    constructor(game, damage, x, y, color) {
        Object.assign(this, {game, damage, x, y, color});
        this.showTime = 0;
    }
    update() {
        
        const TICK = this.game.clockTick;
        this.y -= 50 * TICK;
        this.showTime += TICK;
        if(this.showTime > 1) {
            this.removeFromWorld = true;
        }
    }
    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.font = '10px "Press Start 2P"';
        ctx.fillText(this.damage,this.x - this.game.camera.x,this.y - this.game.camera.y);
    }
}