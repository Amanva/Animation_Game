
class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.healthPotion = 0;
        this.manaPotion = 0;
        this.jumpItem = false;
        this.elapsedTime = 0;
        this.mageDead = false;
        this.title = false;
        this.animations = [];
        this.loadAnimations();
        this.damage = 100;
        this.specDamage = 50;
        this.level = null;
        this.mage = new Mage(this.game, 50,400);
        this.game.addEntityToBegin(this.mage);
        this.loadLevel(levelThree, this.title);
        this.myCursor = new Cursor(this.game);
        
    };
    clearEntities() {
        this.game.entities.forEach(function (entity) {
            if(!(entity instanceof Mage)){
            entity.removeFromWorld = true;
            }
        });
        // this.mageDead = true;
    };
    loadLevel(level, title){
        this.title = title;
        
        if(!this.title){
        this.level = level;
        // this.lastHP = this.mage.hp;
        // this.lastMana = this.mage.curMana;
        // this.lastJumpItem = this.mage.jumpItem;
        
        this.clearEntities();
        
        if(this.level === levelOne){
            // this.lastMage = new Mage(this.game, 50,300);
        this.damage = 10;
        this.jumpItem = false;
        this.x = 0;
        this.y = 0;
        this.mage.x = 9500;
        this.mage.y = 300;
        this.healthPotion = 0;
        this.manaPotion = 0;
        this.game.addEntity(new Item(this.game, 400, 400, 0));
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

         
        // slime
        this.game.addEntity(new Slime(this.game, 1400, 250));
        this.game.addEntity(new Slime(this.game, 1800, 50));
        this.game.addEntity(new Slime(this.game, 4000, 500));
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
    }
    else if(this.level === levelThree){
        this.x = 0;
        this.y = 0;
        this.jumpItem = true;
        this.mage.x = 5097;
        this.mage.y = -707;
        this.game.addEntity(new EarthBoss(this.game, 4697,307));
        this.game.addEntity(new SeaMonster(this.game, 5681, 507));
        if(level.boar){
            for (var i = 0; i < level.boar.length; i++) {
                let boar = level.boar[i];
                this.game.addEntity(new Boar(this.game, boar.x, boar.y));
            }
        }
        if(level.bat){
            for (var i = 0; i < level.bat.length; i++) {
                let bat = level.bat[i];
                this.game.addEntity(new Bat(this.game, bat.x, bat.y));
            }
        }
        // if(level.slimeEarth){
        //     for (var i = 0; i < level.slimeEarth.length; i++) {
        //         let slimeEarth = level.slimeEarth[i];
        //         this.game.addEntity(new earthSlime(this.game, slimeEarth.x, slimeEarth.y));
        //     }
        // }
        this.game.addEntity(new Item(this.game, 400, 400, 1));
        // this.game.addEntity(new Boar(this.game, 400, 500));
        // this.game.addEntity(new earthSlime(this.game, 5400, 500));
        // this.game.addEntity(new mudGuard(this.game, 400,400,1));
        this.game.addEntity(new Boar(this.game, 400, 500));
        this.game.addEntity(new earthSlime(this.game, 400, 500));


        // if(level.dirt){   
        //     for (var i = 0; i < level.dirt.length; i++) {
        //         let dirt = level.dirt[i];
        //         this.game.addEntity(new Dirt(this.game, dirt.x, dirt.y, dirt.width, dirt.height, dirt.div));
        //     }
        // }
        // if(level.halfGround){   
        //     for (var i = 0; i < level.halfGround.length; i++) {
        //         let halfGround = level.halfGround[i];
        //         this.game.addEntity(new HalfGround(this.game, halfGround.x, halfGround.y, halfGround.width, halfGround.height, halfGround.div));
        //     }
        // }
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
        if(level.gate){
            for (var i = 0; i < level.gate.length; i++) {
                let gate = level.gate[i];
                this.game.addEntity(new Gate(this.game, gate.x, gate.y, gate.wallX, gate.wallY, gate.wallWidth, gate.wallHeight, gate.div));
            }
        }
        if(level.trigger){
            for (var i = 0; i < level.trigger.length; i++) {
                let triggers = level.trigger[i];
                this.game.addEntity(new trigger(this.game, triggers.x, triggers.y, triggers.wallX, triggers.wallY, triggers.wallWidth,triggers.wallHeight, triggers.div));
            }
        }
      

        this.game.addEntity(new Sign(this.game, 3200, -377, 45, 10 , 3, "Defeat the monsters near the other shrine and come back"));

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
        // this.lastMage = new Mage(this.game, 50,300);
        // this.lastMage.hp = this.lastHP;
        // this.lastMage.curMana = this.lastMana;
        // this.mage = this.lastMage;
        if(this.mageDead){
            this.mage = new Mage(this.game, 50,400);
            this.mageDead = false;
            this.game.addEntityToBegin(this.mage);
        }
        this.heartMana = new HeartManaHQ(this.game, this.mage); 
        
        this.mage.velocity = { x: 0, y: 0 };
} 
    }
    updateAudio() {
        var mute = document.getElementById("mute").checked;
        var volume = document.getElementById("volume").value;

        assetMangager.muteAudio(mute);
        assetMangager.adjustVolume(volume);

    };
    potionDrop(x, y){
        const ran = randomInt(0); 
        const typeRan = randomInt(2);
        if(ran >= 0){
            this.game.addEntityToBegin(new Potion(this.game, x, y, typeRan));
        }
    }
    update() {
        // console.log(this.heartMana.cur_Hearts, this.mage.hp);
        if(this.title){
            if(this.game.click && (this.game.click.y > 224) && (this.game.click.y < 312) && (this.game.click.x > 733) && (this.game.click.x < 1056)){
                this.loadLevel(levelOne, false);
                this.title = false;
            }
        }
        if(!this.title){
        this.heartMana.update();
        let midpoint = PARAMS.CANVAS_WIDTH/2 - PARAMS.PLAYERWIDTH / 2;
        if ((this.mage.x > midpoint) && (this.mage.x + midpoint <= 11000)) this.x = this.mage.x - midpoint;
        if ((this.mage.x < midpoint) && (this.mage.x - midpoint >= 0)) this.x = this.mage.x - midpoint;
        if ((this.mage.y < 200) && (this.mage.y + 200 >= -3000)) this.y = this.mage.y - 200;
        if ((this.mage.y > 600) && (this.mage.y - 600 <= 0)) this.y = this.mage.y - 600;
        }
        this.myCursor.update();
        this.updateAudio();
        
        // console.log(this.x,this.mage.x - midpoint);

       
    };

    loadAnimations(){
        for (var i = 0; i < 3; i++) { 
            this.animations.push([]);
            for (var j = 0; j < 2; j++) { 
                this.animations[i].push([]);
            }
        }

        this.animations[0][0] = new Animator(assetMangager.getAsset("./sprites/mageRight.png"), 1491, 284, 80, 105, 1, 0.05, 0,0, false, true, false);
        this.animations[0][1] = new Animator(assetMangager.getAsset("./sprites/mageRight.png"), 1491, 284, 80, 105, 1, 0.05, 0,0, false, true, false);
        // health potion
        this.animations[1][0] = new Animator(assetMangager.getAsset("./sprites/potion.png"), 0, 0, 16, 16, 1, 0.1, 0, 0, false, true, false);
        // mana potion
        this.animations[2][0] = new Animator(assetMangager.getAsset("./sprites/potion.png"), 0, 16, 16, 16, 1, 0.1, 0, 0, false, true, false);
        // background level 1
        // this.animations[3][0] = new Animator(, 0, 16, 16, 16, 1, 0.1, 0, 0, false, true, false);
        this.animations[0][1].flipped = true;
    }
    makeTitle(ctx){
        // background level 1
        ctx.drawImage(assetMangager.getAsset(levelOne.background), 0, 0, 450, 400);
        // placeholder level 2
        ctx.drawImage(assetMangager.getAsset(levelOne.background), 0, 400, 450, 400);
        // background level 3
        ctx.drawImage(assetMangager.getAsset(levelThree.background1), 1350, 0, 450, 400);
        ctx.drawImage(assetMangager.getAsset(levelThree.background2), 1350, 0, 450, 400);
        ctx.drawImage(assetMangager.getAsset(levelThree.background3), 1350, 0, 450, 400);
        // placeholder level 4
        ctx.drawImage(assetMangager.getAsset(levelOne.background), 1350, 400, 450, 400);
        ctx.fillStyle = 'Black';
        ctx.fillRect(450, 0, 900, 800);
        ctx.font = '60px "Press Start 2P"';
        ctx.fillStyle = "White"
        ctx.fillText("The Last Magus", 487,  97);
        ctx.fillText("Start", 750,  300);
        // ctx.fillText("Start", 487,  97);
        ctx.fillStyle = "Red"
        ctx.fillText("The Last Magus", 490, 100);
        if(this.game.mouse && (this.game.mouse.y > 224) && (this.game.mouse.y < 312) && (this.game.mouse.x > 733) && (this.game.mouse.x < 1056)){
            this.animations[0][0].drawFrame(this.game.clockTick, ctx, 600, 150, 2);
            ctx.fillStyle = "White";
        }
        else{
            ctx.fillStyle = "Red";
        }
        ctx.fillText("Start", 747,  297);
    }
    draw(ctx) {
        // if(this.game.inCanvas){
        //     this.myCursor.draw(ctx); 
        // }       
        if(this.title){
            this.makeTitle(ctx);
        }
        else{
        this.heartMana.draw(ctx);
        ctx.font = '15px "Press Start 2P"';
        ctx.fillStyle = "White";
        ctx.fillText("X "+ this.game.camera.healthPotion, 50, 110);
        this.animations[1][0].drawFrame(this.game.clockTick, ctx, 5, 80, PARAMS.SCALE);
        ctx.fillText("X "+ this.game.camera.manaPotion, 50, 160);
        this.animations[2][0].drawFrame(this.game.clockTick, ctx, 5, 130, PARAMS.SCALE);
        if(debug){
            let xV = "xP=" + Math.floor(this.game.mage.x);
            let yV = "yP=" + Math.floor(this.game.mage.y);
            ctx.strokeStyle = "White";
            ctx.fillStyle = ctx.strokeStyle; 
            ctx.font = "30px Verdana";
            ctx.fillText(xV, 200, 100);
            ctx.fillText(yV, 200, 140);
            ctx.fillText("xV=" + Math.floor(this.game.mage.velocity.x), 200, 180);
            ctx.fillText("yV="+ Math.floor(this.game.mage.velocity.y), 200, 220);
        }
    }
    this.myCursor.draw(ctx);
    };
    
};

