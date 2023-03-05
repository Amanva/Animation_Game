class triggerMusic{
    constructor(game, x, y) {
        Object.assign(this, { game, x, y});
        
        
        this.updateBB();
        this.collision = false;
        this.game = game;
        

    }
    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y-50, 20, 340);
        
    }
    update(){
        var that = this;
        this.game.entities.forEach(function (entity) {
            if (entity instanceof Mage){
                
                if(entity.BB.collide(that.BB) && !that.collision){
                    assetMangager.playAsset("./sounds/sfx/bossFight.mp3");

                }
                


            }


        });
        this.updateBB();
    };

    draw(ctx) {
        
        if(debug){
                ctx.strokeStyle = 'Red';
                ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width , this.BB.height);
                
        }     
    }; 
}


