
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
        this.initialCutSceen = false;
        this.animations = [];
        this.loadAnimations();
        this.damage = 10;
        this.specDamage = 50;
        this.level = null;
        this.initialSpawn = false;
        this.loadLevel(levelThree, this.title);
        this.myCursor = new Cursor(this.game);
        this.gameOver = false;
        this.timer = 0;
        this.credit = false;
        this.clicks = 0;

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
        if(!this.title && !this.initialCutSceen){
            this.level = level;
        // this.lastHP = this.mage.hp;
        // this.lastMana = this.mage.curMana;
        // this.lastJumpItem = this.mage.jumpItem;
        
        this.clearEntities();
        if(!this.initialSpawn){
            this.mage = new Mage(this.game, 50,400);
            this.game.addEntity(this.mage);
            this.initialSpawn = true;
        }
        if(this.level === levelOne){
            // this.lastMage = new Mage(this.game, 50,300);
        // this.damage = 10;
        this.jumpItem = false;
        this.game.mage.level2Ready = false;
        this.game.mage.level3Ready = false;
        this.x = 0;
        this.y = 0;
        this.mage.x = 7080;
        this.mage.y = 507;
        this.healthPotion = 0;
        this.manaPotion = 0;
        this.fireBoss = new fireBoss(this.game, 9600, 300);
        this.game.addEntity(this.fireBoss);
        this.game.addEntityToBegin(new Item(this.game, 500, 300, 0));
        // this.game.addEntityToBegin(new Portal(this.game, 500, 430, levelThree));
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

            if(level.Monster){
                for (var i = 0; i < level.Monster.length; i++) {
                    let monster = level.Monster[i];
                    this.game.addEntity(new Monster(this.game, monster.x, monster.y));
                }
            }

            if(level.ground){
                for (var i = 0; i < level.ground.length; i++) {
                    let ground = level.ground[i];
                    this.game.addEntity(new Ground(this.game, ground.x, ground.y, ground.width, ground.height, ground.div, level));
                }
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
                    
            // this.mage = new Mage(this.game, 662, 488);
            // this.game.addEntity(this.mage);
            this.mage.velocity = { x: 0, y: 0 };
        this.game.addEntity(new Sign(this.game, 700, 670, 15, 45, 10, "Controls: A-left, D-right, click-Basic attack, Num1-special attack, E-health potion, Q-mana potion"));
        this.game.addEntity(new Sign(this.game, 2700, 70, 6, 40, 1, "How do I go through?"));
        this.game.addEntity(new Sign(this.game, 302, -288, 10, 40, 1, "What does this do?"));
        this.game.addEntity(new Sign(this.game, 7300, 670, 43, 40, 1, "Up I must go"));
        this.game.addEntity(new BackGround(this.game, 0, 0, 1800, 800, this.level));       
    }
        else if(this.level === levelTwo) {
            this.x = 0;
            this.y = 0;
            this.mage.x = 50;
            this.mage.y = 400;
            this.game.mage.level2Ready = true;
            // this.game.addEntity(new Cave(this.game, 11030, 363, 1031, 439));
            //  this.game.addEntity(new SeaMonster(this.game, 690, 250));

            // this.game.addEntity(new Slime(this.game, 690, 250));

            // this.game.addEntity(new Squid(this.game, 690, 250));

            this.game.addEntity(new WaterBoss(this.game, 1580, 400));
            
            if(level.ChainBot){
                for (var i = 0; i < level.ChainBot.length; i++) {
                    let chainBot = level.ChainBot[i];
                    this.game.addEntity(new ChainBot(this.game, chainBot.x, chainBot.y));
                }
            }
            
            if(level.ground){
                for (var i = 0; i < level.ground.length; i++) {
                    let ground = level.ground[i];
                    this.game.addEntity(new Ground(this.game, ground.x, ground.y, ground.width, ground.height, ground.div, level));
                }
            }
            if(level.platforms){
                for (var i = 0; i < level.platforms.length; i++) {
                    let platform = level.platforms[i];
                    this.game.addEntity(new Platform(this.game, platform.x, platform.y, platform.width, platform.height, platform.divisorPlatforms, level));
                }
            }

            if(level.bomb){
                for (var i = 0; i < level.bomb.length; i++) {
                    let bomb = level.bomb[i];
                    this.game.addEntity(new Bomb(this.game, bomb.x, bomb.y));
                }
            }

            if(level.SeaMonster){
                for (var i = 1; i < level.SeaMonster.length; i++) {
                    let seaMonster = level.SeaMonster[i];
                    this.game.addEntity(new SeaMonster(this.game, seaMonster.x, seaMonster.y));
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
            
            
            this.game.addEntity(new BackGround(this.game, 0, 0, 1800, 800, this.level));


            // this.mage = new Mage(this.game, 662, 488);
            // this.game.addEntity(this.mage);
            
            // this.mage.velocity = { x: 0, y: 0 };
            
        }
        
    else if(this.level === levelThree){
        this.x = 0;
        this.y = 0;
        this.jumpItem = true;
        this.game.mage.level2Ready = true;
        this.game.mage.level3Ready = true;
        this.mage.x = 6200;
        this.mage.y = -600;
        // this.mage.x = 50;
        // this.mage.y = 400;
        this.earthBoss = new EarthBoss(this.game, 7500, 607);
        this.game.addEntity(this.earthBoss);
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
        if(level.slimeEarth){
            for (var i = 0; i < level.slimeEarth.length; i++) {
                let slimeEarth = level.slimeEarth[i];
                this.game.addEntity(new earthSlime(this.game, slimeEarth.x, slimeEarth.y));
            }
        }
        this.game.addEntity(new Item(this.game, 400, 400, 1));
        // this.game.addEntity(new Boar(this.game, 400, 500));
        // this.game.addEntity(new earthSlime(this.game, 5400, 500));
        // this.game.addEntity(new mudGuard(this.game, 2400,400,1));
        // this.game.addEntity(new Boar(this.game, 400, 500));
        // this.game.addEntity(new earthSlime(this.game, 400, 500));


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
      
        this.game.addEntity(new Sign(this.game, 100, 670, 55, 35, 2, "Num3-Earth  special"));

        this.game.addEntity(new Sign(this.game, 2920, -387, 11, 30, 3, "Defeat the monsters near the other shrine and come back"));
        this.game.addEntity(new Sign(this.game, 1000, 330, 60, 45, 10, "Carefull!"));

        this.game.addEntity(new Sign(this.game, 6500, 670, 43, 35, 3, "The Minatour  awaits you!"));
        this.game.addEntity(new Sign(this.game, 6700, 670, 55, 30, 4, "Your gonna  need this  potion"));
        this.game.addEntity(new Potion(this.game, 6800, 670, 0));

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
        if (level.music && !this.title) {
            console.log("playing");
            assetMangager.pauseBackgroundMusic();
            assetMangager.playAsset(level.music);
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
        const ran = randomInt(11); 
        const typeRan = randomInt(2);
        if(ran >= 8){
            this.game.addEntityToBegin(new Potion(this.game, x, y, typeRan));
        }
    }

    

    
    update() {
        // console.log(this.heartMana.cur_Hearts, this.mage.hp);
        this.timer += this.game.clockTick;
        if(this.title){
            // console.log(this.timer);

            if(this.game.click && (this.game.click.y > 224) && (this.game.click.y < 312) && (this.game.click.x > 733) && (this.game.click.x < 1056)){
                // this.loadLevel(levelOne, false);
                this.game.click = false;
                let cutText = [["Long ago existed humans and a temple of mages."],["But then the forces of darkness invaded and destroyed the temple."]]
                // let cutText = [["The world is in ruin, you are the only one that can stop the darkness."], ["Go forth The Last Magus and defeat the evil"]];
                this.CutSceneIntro1 = new CutScene(this.game, cutText, 0, 0, "red",0,0);
                this.game.addEntity(this.CutSceneIntro1);
                this.title = false;
            }
            else if(this.game.click && (this.game.click.y > 324) && (this.game.click.y < 412) && (this.game.click.x > 733) && (this.game.click.x < 1056)){
                // this.loadLevel(levelOne, false);
                this.game.click = false;
                let cutText = [["Credits: "], ["Aman Vahora"], ["Arashpreet S. Pandher"], ["Kemeria Mustfa"], ["Uladzimir Hanevich"]];
                this.creditScene = new CutScene(this.game, cutText, 0, 0, "red",0,-150);
                this.game.addEntity(this.creditScene);
                this.title = false;
                this.credit = true;
            }
        }
        if(this.gameOver){
            if(this.game.click && (this.game.click.y > 624) && (this.game.click.y < 712) && (this.game.click.x > 500) && (this.game.click.x < 1200)){
                this.loadLevel(levelOne, false);
                this.game.click = false;
                // let cutText = [["The world is in ruin, you are the only one that can stop the darkness."], ["Go forth The Last Magus and defeat the evil"]];
                // this.game.addEntity(new CutScene(this.game, cutText, 0, 0, "red"))
                this.gameOver = false;
                
            }
        }
        if(!this.title && this.initialCutSceen && !this.credit){
            if(this.game.click && this.clicks === 0){
                this.CutSceneIntro1.removeFromWorld = true;
                // this.initialCutSceen = false;
                this.game.click = false;
                let cutText = [["The mages have been defeated and the world is now in ruins."],["You are the only one that can stop the darkness."],["Go forth The Last Magus and defeat the evil."]];
                this.CutSceneIntro2 = new CutScene(this.game, cutText, 0, 0, "red",0,-150);
                this.game.addEntity(this.CutSceneIntro2);
                this.clicks=1;
            }
            else if(this.game.click && this.clicks === 1){
                this.game.click = false;
                // console.log("go in");
                this.initialCutSceen = false;
                this.loadLevel(levelTwo, false)
            }
        }
        if(this.credit){
            if(this.game.click){
                this.creditScene.removeFromWorld = true;
                this.game.click = false;
                this.title = true;
                this.credit = false;
            }
        }


        if(!this.title && !this.initialCutSceen){
            // if(this.earthBoss.dead === true){
            //     console.log("GAME OVER");
                
            // }
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
        ctx.fillText("Credits",750,400)
        // ctx.fillText("Start", 487,  97);
        ctx.fillStyle = "Red"
        ctx.fillText("The Last Magus", 490, 100);
        if(this.game.mouse && (this.game.mouse.y > 224) && (this.game.mouse.y < 312) && (this.game.mouse.x > 733) && (this.game.mouse.x < 1056)){
            this.animations[0][0].drawFrame(this.game.clockTick, ctx, 600, 150, 2); 
            ctx.fillStyle = "White";
            ctx.fillText("Start", 747,  297);

        }
        else{
            ctx.fillStyle = "Red";
            ctx.fillText("Start", 747,  297);
        }
        if(this.game.mouse && (this.game.mouse.y > 324) && (this.game.mouse.y < 412) && (this.game.mouse.x > 733) && (this.game.mouse.x < 1056)){
            this.animations[0][0].drawFrame(this.game.clockTick, ctx, 600, 250, 2); 
            ctx.fillStyle = "White";
            ctx.fillText("Credits", 747,  397);
        }
        else{
            ctx.fillStyle = "Red";
            ctx.fillText("Credits", 747,  397);

        }

    }
    
    winGame(ctx){            
        this.clearEntities();
        this.mage.removeFromWorld = true;
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
        ctx.fillText("You Defeated", 500,  300);
        ctx.fillText("The Evil", 600,  500);
        ctx.fillText("Play Again",600,700);
        // ctx.fillText("Start", 487,  97);
        ctx.fillStyle = "Red"
        ctx.fillText("The Last Magus", 490, 100);
        ctx.fillText("You Defeated", 503,  303);
        ctx.fillText("The Evil", 603,  503);
        if(this.game.mouse && (this.game.mouse.y > 624) && (this.game.mouse.y < 712) && (this.game.mouse.x > 500) && (this.game.mouse.x < 1200)){
            // this.animations[0][0].drawFrame(this.game.clockTick, ctx, 600, 150, 2);
            ctx.fillStyle = "White";
        }
        else{
            ctx.fillStyle = "Red";
        }
        ctx.fillText("Play Again",603,703);

        // ctx.fillText("all the elements ", 700,  327);

        this.gameOver = true;
        this.initialSpawn = false;
    };

    draw(ctx) {
        // if(this.game.inCanvas){
        //     this.myCursor.draw(ctx); 
        // }       
        if(this.title){
            this.makeTitle(ctx);
        }
        else if(!this.title && !this.initialCutSceen){
        ctx.font = "50px Arial";
        if(this.level === levelThree){
        if(this.earthBoss.dead){
           this.winGame(ctx);
        }
        }
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
    };
    this.myCursor.draw(ctx);
    
};
};

