class HealthBar{
    constructor(game, agent) {
        Object.assign(this, { game, agent});
    };


    update() {

    };

    draw(ctx) {
        // if (this.agent.hp < this.agent.maxHP) {
            var offsetY = 30;
            var height = 8;
            var ratio = this.agent.hp / this.agent.maxHP;
                ctx.strokeStyle = "Black";
                ctx.fillRect((this.agent.BB.x-this.game.camera.x), (this.agent.BB.y-this.game.camera.y) - offsetY, this.agent.BB.width, height);
                ctx.fillStyle = ratio < 0.2 ? "Red" : ratio < 0.5 ? "Yellow" : "Green";
                ctx.fillRect((this.agent.BB.x-this.game.camera.x) , (this.agent.BB.y-this.game.camera.y) - offsetY, this.agent.BB.width * ratio, height);
                ctx.strokeRect((this.agent.BB.x-this.game.camera.x) , (this.agent.BB.y-this.game.camera.y) - offsetY, this.agent.BB.width, height);
        // }
    };


};