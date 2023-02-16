
class SceneManager {
    constructor(game) {
        this.x = 0;
        this.y = 0;
        this.game = game;
        this.game.camera = this;
        this.elapsedTime = 0;
        this.level = null; 
        this.loadLevel(levelOne);
        this.myCursor = new Cursor(this.game);
        
    };
    clearEntities() {
        this.game.entities.forEach(function (entity) {
            entity.removeFromWorld = true;
        });
    };
    loadLevel(level){
        this.level = level;
        this.clearEntities();
        this.mage = new Mage(this.game, 9400, 400);
        this.game.addEntity(this.mage);
        this.game.addEntity(new Sign(this.game, 700, 670, 5, "You're Finally Awake. Sigma Must Have Done A Number On You. Do You Remember Me? I'm Rush. Don't Worry. I'll Help You Remember Everything."));
        this.heartMana = new HeartManaHQ(this.game, this.mage);
        this.fireBoss = new fireBoss(this.game, 9600, 300);
        this.enemy = new ChainBot(this.game, 50, 500); 
        this.game.addEntity(this.enemy); 
        this.game.addEntity(this.fireBoss);
        
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
                this.game.addEntity(new movingPlatforms(this.game, wall.x, wall.y, wall.width, wall.height, wall.divisorPlatforms, wall.direction, wall.distance));
            }
        }
        if(level.verticalWall){
            for (var i = 0; i < level.verticalWall.length; i++) {
                let tiles = level.verticalWall[i];
                this.game.addEntity(new verticalWall(this.game, tiles.x, tiles.y, tiles.width, tiles.height, tiles.div));
            }
        }
        if(level.smallPlatforms){
            for (var i = 0; i < level.smallPlatforms.length; i++) {
                let tiles = level.smallPlatforms[i];
                this.game.addEntity(new smallPlatforms(this.game, tiles.x, tiles.y, tiles.width, tiles.height, tiles.div));
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

        this.game.addEntity(new BackGround(this.game, 0, 0, 1800, 800));
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
        this.myCursor.update();
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
        this.myCursor.draw(ctx);
        // if(this.game.inCanvas){
        //     this.myCursor.draw(ctx); 
        // }       
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

