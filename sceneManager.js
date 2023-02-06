
class SceneManager {
    constructor(game) {
        this.x = 0;
        this.y = 0;
        this.game = game;
        this.game.camera = this;
        this.elapsedTime = 0;
        this.level = null;
        this.mage = new Mage(this.game, 100, 500); 
        // this.game.addEntity(new Projectile(this.game, 100, 100));
        this.game.addEntity(this.mage);
        this.loadLevel(levelOne);
        this.fireBoss = new fireBoss(this.game, 300, 300); 
        this.game.addEntity(this.fireBoss);
        this.game.addEntity(new BackGround(this.game, 0, 0, 1800, 800));
        // this.game.addEntity(new Monster(this.game, 600, 600))S
    //    this.enemy = new ChainBot(this.game, 170, 170); 
      // this.enemy = new ChainBot(this.game, 120, 120); 
        // this.game.addEntity(this.enemy);
       // this.game.addEntity(this.monster);
        
        
        
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
        // this.x = 0;
        if(level.ground){
            for (var i = 0; i < level.ground.length; i++) {
                let ground = level.ground[i];
                this.game.addEntity(new Ground(this.game, ground.x, ground.y, ground.width, ground.height));
            }
        }
        if(level.wall){
            for (var i = 0; i < level.wall.length; i++) {
                let wall = level.wall[i];
                this.game.addEntity(new Wall(this.game, wall.x, wall.y, wall.width, wall.height));
            }
        }
        if(level.platforms){
            for (var i = 0; i < level.platforms.length; i++) {
                let wall = level.platforms[i];
                this.game.addEntity(new platforms(this.game, wall.x, wall.y, wall.width, wall.height, wall.divisorPlatforms));
            }
        }
        if(level.movingPlatforms){
            for (var i = 0; i < level.movingPlatforms.length; i++) {
                let wall = level.movingPlatforms[i];
                this.game.addEntity(new movingPlatforms(this.game, wall.x, wall.y, wall.width, wall.height, wall.divisorPlatforms, wall.direction));
            }
        }
        // if(level.lava){
        //     for (var i = 0; i < level.lava.length; i++) {
        //         let wall = level.lava[i];
        //         this.game.addEntity(new lava(this.game, wall.x, wall.y, wall.width, wall.height));
        //     }
        // }
        
        
    }
    update() {
        let midpoint = PARAMS.CANVAS_WIDTH/2 - PARAMS.PLAYERWIDTH / 2;
        // console.log(this.x,this.mage.x - midpoint);
      
            // this.x = this.mage.x - midpoint;
        //  if(this.x < this.mage.x - midpoint){
        //     this.x = this.mage.x - midpoint;  
        // } 

        if ((this.mage.x > midpoint) && (this.mage.x + midpoint <= 12000)) this.x = this.mage.x - midpoint;
        if ((this.mage.x < midpoint) && (this.mage.x - midpoint >= 0)) this.x = this.mage.x - midpoint;
        if ((this.mage.y < 200) && (this.mage.y + 200 >= -3000)) this.y = this.mage.y - 200;
        if ((this.mage.y > 600) && (this.mage.y - 600 <= 700)) this.y = this.mage.y - 600;
    };



    draw(ctx) {
    };
    
};

