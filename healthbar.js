class HealthBar{
    constructor(game, agent) {
        Object.assign(this, { game, agent});
    };


    update() {

    };

    draw(ctx) {
        // if (this.agent.hp < this.agent.maxHP) {
            var height = 15;
            var ratio = this.agent.hp / this.agent.maxHP;
            ctx.strokeStyle = "Black";
                // ctx.fillRect((this.agent.BB.x-this.game.camera.x), (this.agent.BB.y-this.game.camera.y) - offsetY, this.agent.BB.width, height);
                // ctx.fillStyle = ratio < 0.2 ? "Red" : ratio < 0.5 ? "Yellow" : "Green";
                // ctx.fillRect((this.agent.BB.x-this.game.camera.x) , (this.agent.BB.y-this.game.camera.y) - offsetY, this.agent.BB.width * ratio, height);
                // ctx.strokeRect((this.agent.BB.x-this.game.camera.x) , (this.agent.BB.y-this.game.camera.y) - offsetY, this.agent.BB.width, height);
            // ctx.fillRect((30-this.game.camera.x), (30-this.game.camera.y) - offsetY, 100, height); 
            ctx.fillStyle = ratio < 0.2 ? "Red" : ratio < 0.5 ? "Yellow" : "Green";
            ctx.fillRect((2), (5), 250 * ratio, height);
            ctx.strokeRect((2), (5), 250, height);
        // }
    };


};

class HeartManaHQ{
    constructor(game, agent) {
        Object.assign(this, { game, agent});
        this.max_Hearts = 10;
        this.max_Mana = 10;
        this.cur_Hearts = this.max_Hearts;
        this.cur_Mana = this.max_Mana;
        this.total_Hearts = [];
        this.total_Mana = [];
        for (let i = 0; i < this.max_Hearts; i++) {
            let heart = new Hearts(this.game, 45 * i, 5, 3);
            this.total_Hearts.push(heart);
        }
        for (let i = 0; i < this.max_Mana; i++) {
            let mana = new Mana(this.game, 45 * i + 6, 40, 3);
            this.total_Mana.push(mana);
        }

    };


    update() {
    
    };

    draw(ctx) {
        for (let i = 0; i < this.max_Hearts; i++) {
            this.total_Hearts[i].draw(ctx);
        }
        for (let i = 0; i < this.max_Mana; i++) {
            this.total_Mana[i].draw(ctx);
        }
    };


};
class Hearts{
    constructor(game, x, y, scale) {
        Object.assign(this, { game, x, y, scale});
        this.spritesheet = assetMangager.getAsset("./sprites/Hearts.png");
        this.states = {
            full: 0,
            half: 1,
            empty: 2
        };
        this.state = this.states.full;
        this.animations = [];
        this.animations[this.states.full] = new Animator(this.spritesheet, 0, 4, 15, 12, 1, 0.1, 0, 0, false, true, false);
        this.animations[this.states.half] = new Animator(this.spritesheet, 16, 4, 15, 12, 1, 0.1, 0, 0, false, true, false);
        this.animations[this.states.empty] = new Animator(this.spritesheet, 32, 4, 15, 12, 1, 0.1, 0, 0, false, true, false);
    };


    update() {
    
    };

    draw(ctx) {
        this.animations[this.state].drawFrame(this.game.clockTick, ctx, this.x, this.y, this.scale);
    };


};

class Mana{
    constructor(game, x, y, scale) {
        Object.assign(this, { game, x, y, scale});
        this.spritesheet = assetMangager.getAsset("./sprites/Mana.png");
        this.states = {
            full: 0,
            empty: 1
        };
        this.state = this.states.full;
        this.animations = [];
        this.animations[this.states.full] = new Animator(this.spritesheet, 20, 25, 12, 12, 1, 0.1, 0, 0, false, true, false);
        this.animations[this.states.empty] = new Animator(this.spritesheet, 32, 25, 12, 12, 1, 0.1, 0, 0, false, true, false);
    };


    update() {
    
    };

    draw(ctx) {
        this.animations[this.state].drawFrame(this.game.clockTick, ctx, this.x, this.y, this.scale);
    };


};
// class ManaBar{
//     constructor(game, agent) {
//         Object.assign(this, { game, agent});

//     };


//     update() {

//     };

//     draw(ctx) {
//         // if (this.agent.hp < this.agent.maxHP) {
//             var height = 15;
//             var subtract = 100;
//             ctx.strokeStyle = "Black";
//             ctx.fillStyle = "#00FFFF";
//             ctx.fillRect((2), (30), 250, height);
//             ctx.strokeRect((2), (30), 250, height);
//         // }
//     };


// };


