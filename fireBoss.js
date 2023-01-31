class fireBoss{

    constructor(game){
        this.game = game;
        this.spritesheet = assetMangager.getAsset("./demonFire.png");
        this.spritesheetLeft = assetMangager.getAsset("./demonFireLeft.png");
        this.spritesheetSpecialAndSlime = assetMangager.getAsset("./slime_demonboss_specialmoves.png");
        this.spritesheetSpecialAndSlimeLeft = assetMangager.getAsset("./slime_demonboss_specialmovesLeft.png");


        // this.animator = new Animator(ASSET_MANAGER.getAsset("./demonFire.png"), 103, 50, 100, 108, 6, .2 ,187, false);
        this.x = 300;
        this.y = 300;
        this.speed = 100;
        this.facing = 0; //0=left, 1 = right
        this.state = 3; // 0 = idle, 1 = walking , 2 = attacking, 3 = hit, 4 = death, 5 = spawn, 6 = jump, 7 = fire attack, 8 = magic attack
        this.dead = false;
        this.health = 300;
        //animations
        this.animations = [];
        this.loadAnimations();
        this.updateBB();

    };

    loadAnimations() {
        for(var i = 0; i < 9; i++){ // number of different states
            this.animations.push([]);
            for(var j = 0; j < 2; j++){ // two directions
                this.animations[i].push([]);
            }
        }

        //left 
        // idle
        this.animations[0][0] = new Animator(this.spritesheet, 103, 50, 100, 108, 6, .2 ,188, 0, false, true, false);

        // walking
        this.animations[1][0] = new Animator(this.spritesheet, 103, 210, 100, 108, 12, .2 ,188, 0, false, true, false);

        // attacking
        this.animations[2][0] = new Animator(this.spritesheet, 10, 367, 200, 115, 15, .2 ,88, 0, false, true, false);

        // hit
        this.animations[3][0] = new Animator(this.spritesheet, 10, 531, 200, 115, 5, .2 ,88, 0, false, true, false);

        // death
        this.animations[4][0] = new Animator(this.spritesheet, 50, 700, 200, 115, 22, .2 ,88, 0, false, true, false);

        // spawn 
        this.animations[5][0] = new Animator(this.spritesheetSpecialAndSlime,85, 790, 125, 110, 19, .2, 163, 0, false,true, false)

        // jump
        this.animations[6][0] = new Animator(this.spritesheetSpecialAndSlime,50, 925, 200, 135, 18, .2, 88, 0, false,true, false)

        // fire attack
        this.animations[7][0] = new Animator(this.spritesheetSpecialAndSlime,50,1110,200, 110,21, .2, 88, 0, false,true, false)

        // magic attack
        this.animations[8][0] = new Animator(this.spritesheetSpecialAndSlime,0,1255,215, 125,18, .2, 73, 0, false,true, false)


        //right
        // idle
        this.animations[0][1] = new Animator(this.spritesheetLeft, 4705, 50, 100, 108, 6, .2 , 188, 0, true, true, false);

        // walking
        this.animations[1][1] = new Animator(this.spritesheetLeft, 2970, 210, 100, 108, 12, .2 ,188, 0, true, true, false);

        // attacking
        this.animations[2][1] = new Animator(this.spritesheetLeft, 2090, 367, 200, 115, 15, .2 ,88, 0, true, true, false);

        // hit
        this.animations[3][1] = new Animator(this.spritesheetLeft, 4960, 531, 200, 115, 5, .2 ,88, 0, false, true, false);

        // death
        this.animations[4][1] = new Animator(this.spritesheetLeft, 0, 700, 200, 115, 22, .2 ,88, 0, true, true, false);

        // spawn 
        this.animations[5][1] = new Animator(this.spritesheetSpecialAndSlimeLeft,940,795 , 125, 110, 19, .2, 163, 0, true,true, false)

        // jump
        this.animations[6][1] = new Animator(this.spritesheetSpecialAndSlimeLeft,1190, 925, 210, 135, 18, .2, 78, 0, true,true, false)
    
        // fire attack
        this.animations[7][1] = new Animator(this.spritesheetSpecialAndSlimeLeft,362,1060,210, 160,21, .2, 78, 0, true,true, false)

        // magic attack
        this.animations[8][1] = new Animator(this.spritesheetSpecialAndSlimeLeft,1230,1250,215, 130,18, .2, 73, 0, true ,true, false)
    }

    update() {
        // this.x += this.speed * this.game.clockTick;
        // if(this.x > 1200){
        //     this.x = 0;
        // }

    };
    updateBB() {
        this.lastBB = this.BB;
        this.lastAttackBB = this.AttackBB;
        if(this.state === 0){
            this.BB = new BoundingBox(this.x, this.y+100, 250, 225);
            // this.AttackBB = new BoundingBox(this.x+50, this.y+100, 0,0);

        }
        else if(this.state === 2){ // attack
            this.BB = new BoundingBox(this.x+50, this.y+100, 550, 235);
            this.AttackBB = new BoundingBox(this.x+50, this.y+100, 200,235);
        }
        else if(this.state === 3){
            this.BB = new BoundingBox(this.x+290, this.y+100, 300, 225);
        }
        else if(this.state === 1){
            this.BB = new BoundingBox(this.x, this.y+100, 250, 225);
        }
        else if(this.state === 1){
            this.BB = new BoundingBox(this.x, this.y+100, 250, 225);
        }
        else if(this.state === 1){
            this.BB = new BoundingBox(this.x, this.y+100, 250, 225);
        }
        else if(this.state === 1){
            this.BB = new BoundingBox(this.x, this.y+100, 250, 225);
        }
        else if(this.state === 1){
            this.BB = new BoundingBox(this.x, this.y+100, 250, 225);
        }
        else if(this.state === 1){
            this.BB = new BoundingBox(this.x, this.y+100, 250, 225);
        }
        else if(this.state === 1){
            this.BB = new BoundingBox(this.x, this.y+100, 250, 225);
        }
        else if(this.state === 1){
            this.BB = new BoundingBox(this.x, this.y+100, 250, 225);
        }


    };

    updateBBAttack(){

    }

    draw(ctx) {
        this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x, this.y, PARAMS.SCALE);
        this.animations[5][this.facing].drawFrame(this.game.clockTick, ctx, this.x, this.y, PARAMS.SCALE);

            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
            ctx.strokeStyle = 'Green';
            // ctx.strokeRect(this.AttackBB.x, this.AttackBB.y, this.AttackBB.width, this.AttackBB.height);

    };


}