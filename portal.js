class Portal {
    constructor(game, x, y, level){
        Object.assign(this, { game, x, y, level});
        this.game.portal = this;
        this.velocity = { x: 0, y: 0 };
        this.portal = assetMangager.getAsset("./sprites/portal.png");
        this.scale = 1;
        this.animations = new Animator(this.portal, 0, 0, 320, 320, 41, 0.07, 0, 0, false, false, undefined);
        this.animations.columnNum = 6;
        this.animations.rowNum = 6;
        this.updateBB();
        
    }; // end of constructor


    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x+160, this.y+200, 50, 120); 
    };
    
    update() {
        let curFrame = this.animations.currentFrame();
        this.updateBB();
        var that = this;
        that.game.entities.forEach(function (entity) {
            if (entity instanceof Mage  && entity.BB && that.BB.collide(entity.BB)) {
                that.game.camera.loadLevel(that.level, false);
                // this.game.startInput();
            }
        
           
        }); //end of forEach
              
        if(this.animations.isAlmostDone(this.game.clockTick)){
            this.animations.elapsedTime = 2.7;
        }
    };//end update() chainBot behavior and collisions

    draw(ctx) {
                   
        this.animations.drawFrame(this.game.clockTick, ctx, this.x-this.game.camera.x, this.y-this.game.camera.y, this.scale);
        if (debug) {
            //draw the boundingBox
            ctx.strokeStyle = 'white';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y-this.game.camera.y, this.BB.width , this.BB.height);
        }    
        
                                
    }; // End draw method

}; // End of chain_bot

class Flag {
    constructor(game, x, y){
        Object.assign(this, { game, x, y});
        this.velocity = { x: 0, y: 0 };
        this.spritesheet = assetMangager.getAsset("./sprites/save.png");
        this.animations = new Animator(this.spritesheet, 110, 144, 20, 20, 1, 0.07, 0, 0, false, true, false);
        this.updateBB();
        
    }; // end of constructor


    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y, 40, 40); 
    };
    
    update() {

        // this.updateBB();
        var that = this;
        that.game.entities.forEach(function (entity) {
            if ((entity instanceof Mage) && (entity.BB && that.BB.collide(entity.BB))) {
                if(that.game.camera.level === levelTwo){
                    that.game.camera.checkpoint = true;
                    that.game.camera.tempX = that.x+50;
                    that.game.camera.tempY = that.y;
                    that.removeFromWorld = true;
                }
                else if(that.game.camera.level === levelOne){
                    that.game.camera.checkpoint = true;
                    that.game.camera.tempX = that.x;
                    that.game.camera.tempY = that.y-300;
                    that.removeFromWorld = true;
                }    
            }
        
           
        });
            
        // if(this.animations.isAlmostDone(this.game.clockTick)){
        //     this.animations.elapsedTime = 2.7;
        // }
    };//end update() chainBot behavior and collisions
    // savePlayer(){
    //     this.game.camera.checkpoint = true;
    //     this.game.mage.x = this.x;
    //     this.game.mage.y = this.y;

    // }
    draw(ctx) {
                   
        this.animations.drawFrame(this.game.clockTick, ctx, this.x-this.game.camera.x, this.y-this.game.camera.y, 2);
        if (debug) {
            //draw the boundingBox
            ctx.strokeStyle = 'red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y-this.game.camera.y, this.BB.width , this.BB.height);
        }    
        
                                
    }; // End draw method

};