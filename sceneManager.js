
class SceneManager {
    constructor(game) {
        this.x = 0;
        this.y = 0;
        this.game = game;
        this.game.camera = this;
        this.elapsedTime = 0;
        this.level = null;
        this.myCursor = new Cursor(this.game);
        this.mage = new Mage(this.game, 662, 488); 
        this.heartMana = new HeartManaHQ(this.game, this.mage);
        // this.game.addEntity(new FireBall(this.game, 300, 400));
        this.game.addEntity(this.mage);
        this.enemy = new ChainBot(this.game, 50, 500); 
        this.game.addEntity(this.enemy);
        this.enemy = new ChainBot(this.game, 350, 300); 
        this.game.addEntity(this.enemy);
         this.game.addEntity(new Monster(this.game, 600, 600));
        this.portal = new Portal(this.game, 10000, 430); 
        // this.portal = new Portal(this.game, 200, 430);
        this.game.addEntity(this.portal);
        this.loadLevel(levelOne);
        // this.fireBoss = new fireBoss(this.game, 300, 300); 
        // this.game.addEntity(this.fireBoss);
        
        
        this.game.addEntity(new BackGround(this.game, 0, 0, 1800, 800));
        
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
                this.game.addEntity(new Ground(this.game, ground.x, ground.y, ground.width, ground.height, ground.div));
            }
        }
        if(level.platforms){
            for (var i = 0; i < level.platforms.length; i++) {
                let platform = level.platforms[i];
                this.game.addEntity(new Platform(this.game, platform.x, platform.y, platform.width, platform.height, platform.divisorPlatforms));
            }
        }
        if(level.movingPlatforms){
            for (var i = 0; i < level.movingPlatforms.length; i++) {
                let wall = level.movingPlatforms[i];
                this.game.addEntity(new movingPlatforms(this.game, wall.x, wall.y, wall.width, wall.height, wall.divisorPlatforms, wall.direction));
            }
        }
        if(level.wall){
            for (var i = 0; i < level.wall.length; i++) {
                let wall = level.wall[i];
                this.game.addEntity(new Wall(this.game, wall.x, wall.y, wall.width, wall.height, wall.div));
            }
        }
        if(level.tiles){
            for (var i = 0; i < level.tiles.length; i++) {
                let tiles = level.tiles[i];
                this.game.addEntity(new Tiles(this.game, tiles.x, tiles.y, tiles.width, tiles.height, tiles.div));
            }
        }
        if(level.gate){
            for (var i = 0; i < level.gate.length; i++) {
                let gate = level.gate[i];
                this.game.addEntity(new Gate(this.game, gate.x, gate.y, gate.wallX, gate.wallY, gate.wallWidth, gate.wallHeight, gate.div));
            }
        }
        
        // if(level.lava){
        //     for (var i = 0; i < level.lava.length; i++) {
        //         let wall = level.lava[i];
        //         this.game.addEntity(new lava(this.game, wall.x, wall.y, wall.width, wall.height));
        //     }
        // }
        this.mage.velocity = { x: 0, y: 0 };
        
    }
    update() {
        this.heartMana.update();
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
        this.heartMana.draw(ctx);
        // this.myCursor.draw(ctx);
        if(debug){
            let xV = "xP=" + Math.floor(this.game.mage.x);
            let yV = "yP=" + Math.floor(this.game.mage.y);
            ctx.strokeStyle = "White";
            ctx.fillStyle = ctx.strokeStyle; 
            ctx.font = "30px Verdana";
            ctx.fillText(xV, 50, 100);
            ctx.fillText(yV, 50, 140);
            
        }
    };
    
};

