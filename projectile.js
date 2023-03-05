class Projectile{
    constructor(game, x, y) {
        Object.assign(this, { game, x, y});
        this.game.projectile = this;
        this.spritesheet = assetMangager.getAsset("./sprites/blackFireball.png");
        this.speed = 500;
        this.animations = [];
        this.dead = false;
        this.animations.push(new Animator(this.spritesheet, 0, 0, 15, 15, 4, 0.3, 7, 0, false, true, false));
        this.shot = {x: this.game.click.x + this.game.camera.x, y: this.game.click.y + this.game.camera.y};
        this.dist = distanceBetween(this, this.shot);
        this.velocity = { x: (this.shot.x - this.x) / this.dist * this.speed, y: (this.shot.y - this.y) / this.dist * this.speed};
        this.angle = getAngle(this.velocity);
        this.updateBB();
    };
    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x-15, this.y-15, 30, 30);
        
    };
    update(){
        const TICK = this.game.clockTick;
        this.x += this.velocity.x * TICK;
        this.y += this.velocity.y * TICK;
        this.updateBB();
        if(this.x < -10){
            this.removeFromWorld = true; 
        }
        var that = this;
        that.game.entities.forEach(function (entity) {
            if (entity.BB && that.BB.collide(entity.BB)) {
                if ((entity instanceof Ground || entity instanceof Wall || entity instanceof Platform || entity instanceof movingPlatforms || (entity instanceof Tiles) || entity instanceof smallPlatforms || (entity instanceof verticalWall)) && that.BB.collide(entity.BB)) {
                   that.removeFromWorld = true;
                }
                if(((entity instanceof fireBoss) || (entity instanceof Monster) || (entity instanceof Slime) || (entity instanceof Boar) || (entity instanceof earthSlime) || (entity instanceof ChainBot) || (entity instanceof Bat) || (entity instanceof SeaMonster) || (entity instanceof EarthBoss) || (entity instanceof Snake) || (entity instanceof WaterBoss)) && !that.removeFromWorld){
                    if(entity.hp > 0){
                    entity.loseHealth(that.getDmg());
                    that.game.addEntityToBegin(new DamageText(that.game, that.getDmg(), entity.BB.x+(entity.BB.width/2), entity.BB.y, "red"));
                    }
                    that.removeFromWorld = true;
                    // console.log("HIT2");
                }
                
            }
            
            });
            // console.log(this.dist);
            console.log(this.shot.x, this.shot.y);
    };
    getDmg() {
        let dmg = this.game.camera.damage;
        console.log(dmg);
        assetMangager.playAsset("./sounds/sfx/playerhit.mp3");
        return dmg;
    }
    draw(ctx){
        // this.animations[0].drawFrame(this.game.clockTick, ctx, this.x-this.game.camera.x, this.y-this.game.camera.y , 2);
        this.animations[0].drawAngle(this.game.clockTick, ctx, this.x-this.game.camera.x, this.y-this.game.camera.y, 2, this.angle);
        if(debug){
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x-this.game.camera.x, this.BB.y-this.game.camera.y, this.BB.width, this.BB.height);
        }
    };

    
};


class FireBall{
    constructor(game, x, y) {
        Object.assign(this, { game, x, y});

        this.spritesheet = assetMangager.getAsset("./sprites/FB001.png");
        this.animations = [];
        this.speed = 500;
        this.dead = false;
        this.animations.push(new Animator(this.spritesheet, 20, 5, 33, 18, 5, 0.2, 31, 0, false, true, false));
        this.shot = {x: this.game.mouse.x + this.game.camera.x, y: this.game.mouse.y + this.game.camera.y};
        var dist = distanceBetween(this, this.shot);
        this.velocity = { x: (this.shot.x - this.x) / dist * this.speed, y: (this.shot.y - this.y) / dist * this.speed};
        this.angle = getAngle(this.velocity);
        this.updateBB();
    };
    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x-20, this.y-20, 30*2, 13*2);
    };
    update(){
        const TICK = this.game.clockTick;
        this.x += this.velocity.x * TICK;
        this.y += this.velocity.y * TICK;
        this.updateBB();
        if(this.x < -10){
            this.removeFromWorld = true; 
        }
        if(this.y < -3000){
            this.removeFromWorld = true; 
        }
        if(this.x > 12000){
            this.removeFromWorld = true; 
        }
        if(this.y > 800){
            this.removeFromWorld = true; 
        }
        var that = this;
        this.game.entities.forEach(function (entity) {
            if (entity.BB && that.BB.collide(entity.BB)) {
                if ((entity instanceof Ground || entity instanceof Wall || entity instanceof Platform || entity instanceof movingPlatforms || (entity instanceof Tiles) || entity instanceof smallPlatforms || (entity instanceof verticalWall)) && that.BB.collide(entity.BB)) {                   that.removeFromWorld = true;
                }
                if(((entity instanceof fireBoss) || (entity instanceof Monster) || (entity instanceof Slime) || (entity instanceof Boar) || (entity instanceof earthSlime) || (entity instanceof ChainBot) || (entity instanceof Bat) || (entity instanceof SeaMonster) || (entity instanceof EarthBoss) || (entity instanceof Snake)|| (entity instanceof WaterBoss)) && !that.removeFromWorld){
                    if(entity.hp > 0){
                    entity.loseHealth(that.getSpecDmg());
                    that.game.addEntityToBegin(new DamageText(that.game, that.getSpecDmg(), entity.BB.x+(entity.BB.width/2), entity.BB.y, "red"));
                    }
                    that.removeFromWorld = true;
                    console.log("HIT2");
                }

            }
            
            });
    };
    getSpecDmg() {
        let specDmg = this.game.camera.specDamage;
        if(this.game.camera.level === levelThree){
            specDmg = 42;
        }
        else if(this.game.camera.level === levelTwo){
            specDmg = 25;
        }
        assetMangager.playAsset("./sounds/sfx/playerhit.mp3");
        return specDmg;
    }
    draw(ctx){
        this.animations[0].drawAngle(this.game.clockTick, ctx, this.x-this.game.camera.x, this.y-this.game.camera.y, 2, this.angle);
        if(debug){
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x-this.game.camera.x, this.BB.y-this.game.camera.y, this.BB.width, this.BB.height);
            }
    };

}

class Earth{
    constructor(game, x, y) {
        Object.assign(this, { game, x, y});

        this.spritesheet = assetMangager.getAsset("./sprites/earth.png");
        this.animations = [];
        this.speed = 500;
        this.dead = false;
        this.animations.push(new Animator(this.spritesheet, 0, 10, 22, 10, 6, 0.1, 27, 0, false, true, false));
        this.shot = {x: this.game.mouse.x + this.game.camera.x, y: this.game.mouse.y + this.game.camera.y};
        var dist = distanceBetween(this, this.shot);
        this.velocity = { x: (this.shot.x - this.x) / dist * this.speed, y: (this.shot.y - this.y) / dist * this.speed};
        this.angle = getAngle(this.velocity);
        this.updateBB();
    };
    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y, 23, 10);
    };
    update(){
        const TICK = this.game.clockTick;
        this.x += this.velocity.x * TICK;
        this.y += this.velocity.y * TICK;
        this.updateBB();
        if(this.x < -10){
            this.removeFromWorld = true; 
        }
        if(this.y < -3000){
            this.removeFromWorld = true; 
        }
        if(this.x > 12000){
            this.removeFromWorld = true; 
        }
        if(this.y > 800){
            this.removeFromWorld = true; 
        }
        var that = this;
        this.game.entities.forEach(function (entity) {
            if (entity.BB && that.BB.collide(entity.BB)) {
                if ((entity instanceof Ground || entity instanceof Wall || entity instanceof Platform || entity instanceof movingPlatforms || (entity instanceof Tiles) || entity instanceof smallPlatforms || (entity instanceof verticalWall)) && that.BB.collide(entity.BB)) {
                   that.removeFromWorld = true;
                }
                if(((entity instanceof fireBoss) || (entity instanceof Monster) || (entity instanceof Slime) || (entity instanceof Boar) || (entity instanceof earthSlime) || (entity instanceof ChainBot) || (entity instanceof Bat) || (entity instanceof SeaMonster) || (entity instanceof EarthBoss) || (entity instanceof Snake)|| (entity instanceof WaterBoss)) && !that.removeFromWorld){
                    if(entity.hp > 0){
                    entity.loseHealth(that.getSpecDmg());
                    that.game.addEntityToBegin(new DamageText(that.game, that.getSpecDmg(), entity.BB.x+(entity.BB.width/2), entity.BB.y, "red"));
                    }
                    that.removeFromWorld = true;
                    console.log("HIT2");
                }
            }
            
            });
    };

    getSpecDmg() {
        let specDmg = this.game.camera.specDamage;
        assetMangager.playAsset("./sounds/sfx/playerhit.mp3");
        return specDmg;
    }
    draw(ctx){
        this.animations[0].drawAngle(this.game.clockTick, ctx, this.x-this.game.camera.x, this.y-this.game.camera.y, 3, this.angle);
        if(debug){
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x-this.game.camera.x, this.BB.y-this.game.camera.y, this.BB.width, this.BB.height);
            }
    };

}
// class 
class WaterTornado{
    constructor(game, x, y) {
        Object.assign(this, { game, x, y});

        this.spritesheet = assetMangager.getAsset("./sprites/tornado.png");
        this.animations = [];
        this.speed = 500;
        this.dead = false;
        this.state = 0;
        this.facing = this.game.mage.facing;
        this.move = this.x;
        this.animations.push(new Animator(this.spritesheet, 33, 14, 60, 98, 4, 0.2, 68, 0, false, true, false));
        this.animations.push(new Animator(this.spritesheet, 33, 146, 60, 98, 4, 0.2, 68, 0, false, true, false));
        this.animations.push(new Animator(this.spritesheet, 33, 272, 60, 98, 4, 0.2, 68, 0, false, true, false));
        // this.shot = {x: this.game.mouse.x + this.game.camera.x, y: this.game.mouse.y + this.game.camera.y};
        // var dist = distanceBetween(this, this.shot);
        // this.velocity = { x: (this.shot.x - this.x) / dist * this.speed, y: (this.shot.y - this.y) / dist * this.speed};
        this.velocity = {x: 0, y : 0};
        // this.angle = getAngle(this.velocity);
        this.updateBB();
    };
    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.move+20, this.y+110, 50, 120);
    };
    update(){
        const TICK = this.game.clockTick;
        if(this.facing === 0){
            this.move += 200 * TICK;
        }
        else if(this.facing === 1){
            this.move -= 200 * TICK;
        }
        if(this.x < -10){
            this.removeFromWorld = true; 
        }
        if(this.y < -3000){
            this.removeFromWorld = true; 
        }
        if(this.x > 12000){
            this.removeFromWorld = true; 
        }
        if(this.y > 800){
            this.removeFromWorld = true; 
        }
        this.updateBB();
        // if(this.x < -10){
        //     this.removeFromWorld = true; 
        // }
        // if(this.y < -3000){
        //     this.removeFromWorld = true; 
        // }
        // if(this.x > 12000){
        //     this.removeFromWorld = true; 
        // }
        // if(this.y > 800){
        //     this.removeFromWorld = true; 
        // }
        
        var that = this;
        this.game.entities.forEach(function (entity) {
            if (entity.BB && that.BB.collide(entity.BB)) {
                if ((entity instanceof Ground || entity instanceof Wall || entity instanceof Platform || entity instanceof movingPlatforms || (entity instanceof Tiles) || entity instanceof smallPlatforms || (entity instanceof verticalWall)) && that.BB.collide(entity.BB)) { 
                    that.removeFromWorld = true;
                }
                if(((entity instanceof fireBoss) || (entity instanceof Monster) || (entity instanceof Slime) || (entity instanceof Boar) || (entity instanceof earthSlime) || (entity instanceof ChainBot) || (entity instanceof Bat) || (entity instanceof SeaMonster) ||  (entity instanceof Snake) || (entity instanceof EarthBoss) || (entity instanceof WaterBoss)) && !that.removeFromWorld){
                    if(entity.hp > 0){
                    entity.loseHealth(that.getSpecDmg());
                    that.game.addEntityToBegin(new DamageText(that.game, that.getSpecDmg(), entity.BB.x+(entity.BB.width/2), entity.BB.y, "red"));
                    }
                    that.removeFromWorld = true;
                    console.log("HIT2");
                }
            }
            
            });
            if(this.animations[0].isAlmostDone(TICK)){
                this.state = 1;
            }
            if(this.animations[1].isAlmostDone(TICK)){
                // console.log("how")
                this.state = 2;
                if(this.animations[2].isAlmostDone(TICK)){
                    this.state = 1;
                    this.animations[1].elapsedTime = 0;
                    this.animations[2].elapsedTime = 0;
                }
            }
            // console.log(this.shot.x, this.shot.y);
    };
    getSpecDmg() {
        let specDmg = this.game.camera.specDamage;
        if(this.game.camera.level === levelThree){
            specDmg = 35;
        }
        assetMangager.playAsset("./sounds/sfx/playerhit.mp3");
        return specDmg;
    }
    draw(ctx){
        this.animations[this.state].drawFrame(this.game.clockTick, ctx, this.move-this.game.camera.x, this.y-this.game.camera.y+90, 1.5);
        // this.animations[1].drawFrame(this.game.clockTick, ctx, this.x-this.game.camera.x+100, this.y-this.game.camera.y, 1.5);
        // this.animations[2].drawFrame(this.game.clockTick, ctx, this.x-this.game.camera.x+150, this.y-this.game.camera.y, 1.5);
        if(debug){
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x-this.game.camera.x, this.BB.y-this.game.camera.y, this.BB.width, this.BB.height);
            }
    };

}