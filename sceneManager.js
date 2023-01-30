class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.x = 0;
        this.elapsedTime = 0;
        this.fireBoss = new fireBoss(this.game, 100, 100); 
        this.game.addEntity(this.fireBoss);
    };

    

    update() {
    
    };



    draw(ctx) {
    };
    
};
