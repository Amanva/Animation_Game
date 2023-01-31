class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.x = 0;
        this.elapsedTime = 0;
        this.level = null;
        this.mage = new Mage(this.game, 100, 100); 
        // this.game.addEntity(new Projectile(this.game, 100, 100));
        this.game.addEntity(this.mage);
        this.loadLevel(levelOne);
        this.game.addEntity(new Ground(this.game, 0, 700, 47, 47));
        this.game.addEntity(new Monster(this.game, 600, 600))
        this.game.addEntity(this.mage);
       this.enemy = new ChainBot(this.game, 170, 170); 
      // this.enemy = new ChainBot(this.game, 120, 120); 
        this.game.addEntity(this.enemy);
       // this.game.addEntity(this.monster);
        
        
        this.fireBoss = new fireBoss(this.game, 300, 300); 
        this.game.addEntity(this.fireBoss);
    };

    // loadLevel(level){
    //     this.game.entites = [];
    //     this.x = 0;

    //     for(var i = 0; i < this.level.length; i++){

    //     }
    // }


    loadLevel(level){
        this.game.entites = [];
        this.level = level;
        this.x = 0;
        let ground = level.ground[0];
        this.game.addEntity(new Ground(this.game, ground.x, ground.y, ground.width));
        
    }
    update() {
    
    };



    draw(ctx) {
    };
    
};
