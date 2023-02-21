
class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.healthPotion = 0;
        this.manaPotion = 0;
        this.elapsedTime = 0;
        this.level = null; 
        this.loadLevel(levelThree);
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
        if(this.level === levelOne){
        this.x = 0;
        this.y = 0;
        this.healthPotion = 0;
        this.manaPotion = 0;
        this.mage = new Mage(this.game, 100,460);
        this.game.addEntity(this.mage);
        this.game.addEntity(new Potion(this.game, 0, 0, true, 0));
        this.heartMana = new HeartManaHQ(this.game, this.mage);
        this.fireBoss = new fireBoss(this.game, 9600, 300); 
        //mobs
        //chainbot
        this.game.addEntity(new ChainBot(this.game, 2629,507));
        this.game.addEntity(new ChainBot(this.game, 2586,207));
        this.game.addEntity(new ChainBot(this.game, 703,-453)); 
        this.game.addEntity(new ChainBot(this.game, 2100,107));
        this.game.addEntity(new ChainBot(this.game, 4300,207));


        //monster flying
        this.game.addEntity(new Monster(this.game, 6000, 100));
        this.game.addEntity(new Monster(this.game, 2300, -300));

         
        //slime
        this.game.addEntity(new Slime(this.game, 1400, 250));
        this.game.addEntity(new Slime(this.game, 1800, 50));
        this.game.addEntity(new Slime(this.game, 4000, 500));



        this.game.addEntity(this.fireBoss);
        // this.game.addEntity(new Slime(this.game, 400, 400));
        
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
        if(level.smallPlatforms){
            for (var i = 0; i < level.smallPlatforms.length; i++) {
                let tiles = level.smallPlatforms[i];
                this.game.addEntity(new smallPlatforms(this.game, tiles.x, tiles.y, tiles.width, tiles.height, tiles.div));
            }
        }
        if(level.verticalWall){
            for (var i = 0; i < level.verticalWall.length; i++) {
                let tiles = level.verticalWall[i];
                this.game.addEntity(new verticalWall(this.game, tiles.x, tiles.y, tiles.width, tiles.height, tiles.div));
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
        this.game.addEntity(new Sign(this.game, 700, 670, 50, -15, 10, "Controls: A-left, D-right, click-Basic attack, Num1-special attack, E-health potion, Q-mana potion"));
        this.game.addEntity(new Sign(this.game, 2700, 70, 50, 25, 1, "How do I go through?"));
        this.game.addEntity(new Sign(this.game, 302, -288, 50, 30, 1, "What does this do?"));
        this.game.addEntity(new Sign(this.game, 7300, 670, 70, 30, 1, "Up I must go"));
        this.game.addEntity(new BackGround(this.game, 0, 0, 1800, 800, this.level));
        this.mage.velocity = { x: 0, y: 0 };
    }
    else if(this.level === levelThree){
        this.game.addEntity(new BackGround(this.game, 0, 0, 1800, 800, this.level));
    }
        // if(level.lava){
        //     for (var i = 0; i < level.lava.length; i++) {
        //         let wall = level.lava[i];
        //         this.game.addEntity(new lava(this.game, wall.x, wall.y, wall.width, wall.height));
        //     }
        // }

        
        // if(level.Monster){
        //     for (var i = 0; i < level.Monster.length; i++) {
        //         let Monster = level.Monster[i];
        //         this.game.addEntity(new monster(this.game, Monster.x, Monster.y));
        //     }
        // }
       
        
    }
    update() {
        // this.heartMana.update();
        // this.myCursor.update();
        let midpoint = PARAMS.CANVAS_WIDTH/2 - PARAMS.PLAYERWIDTH / 2;
        // console.log(this.x,this.mage.x - midpoint);
      
            // this.x = this.mage.x - midpoint;
        //  if(this.x < this.mage.x - midpoint){
        //     this.x = this.mage.x - midpoint;  
        // } 

        // if ((this.mage.x > midpoint) && (this.mage.x + midpoint <= 12000)) this.x = this.mage.x - midpoint;
        // if ((this.mage.x < midpoint) && (this.mage.x - midpoint >= 0)) this.x = this.mage.x - midpoint;
        // if ((this.mage.y < 200) && (this.mage.y + 200 >= -3000)) this.y = this.mage.y - 200;
        // if ((this.mage.y > 600) && (this.mage.y - 600 <= 0)) this.y = this.mage.y - 600;
    };



    draw(ctx) {
        // this.heartMana.draw(ctx); 
        // this.myCursor.draw(ctx);
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

