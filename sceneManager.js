class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.x = 0;
        this.elapsedTime = 0;
        this.level = null;
        this.mage = new Mage(this.game, 700, 600); 
        // this.game.addEntity(new Projectile(this.game, 100, 100));
        this.game.addEntity(this.mage);

        //this.enemy = new ChainBot(this.game, 50, 670); 
        //this.game.addEntity(this.enemy);
        
        this.loadLevel(levelOne);

         this.monster = new Monster(this.game, 600, 600);
         this.game.addEntity(this.monster);
        
        this.game.addEntity(new BackGround(this.game, 0, 0, 1800, 800));
        
        
    //     this.fireBoss = new fireBoss(this.game, 300, 300); 
    //     this.game.addEntity(this.fireBoss);
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
        if(level.ground){
            for (var i = 0; i < level.ground.length; i++) {
                let ground = level.ground[i];
                this.game.addEntity(new Ground(this.game, ground.x, ground.y, ground.width, ground.height));
            }
        }
        if(level.wall){
            for (var i = 0; i < level.ground.length; i++) {
                let wall = level.wall[i];
                this.game.addEntity(new Wall(this.game, wall.x, wall.y, wall.width, wall.height));
            }
        }
        
        
    }
    update() {
        let midpoint = PARAMS.CANVAS_WIDTH/2 - PARAMS.PLAYERWIDTH / 2;
        // console.log(this.x,this.mage.x - midpoint);
      
            // this.x = this.mage.x - midpoint;
         if(this.x < this.mage.x - midpoint){
            this.x = this.mage.x - midpoint;  
        }


    };



    draw(ctx) {
    };
    
};


