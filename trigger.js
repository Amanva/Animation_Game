class trigger{
    constructor(game, x, y) {
        Object.assign(this, { game, x, y});
       
        
        this.updateBB();
        this.collision = false;
        this.game = game;
        this.spawned = false;
        this.boar = new Boar(this.game, 5000, 680);
        this.game.addEntity(this.boar);
    }
    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y, 213, 69);
       
    }
    update(){
        var that = this;
        this.game.entities.forEach(function (entity) {
            if (entity instanceof Mage){
                if(entity.BB.collide(that.BB) && !that.collision){
                    console.log("spawn mobs");
                    that.collision = true;
                }
                if(that.collision && !that.spawned){
                    that.game.addEntity(new Boar(that.game, 5000, 680)); 
                    that.spawned = true;
                }
            }
        });
        this.updateBB();
    }

    draw(ctx) {
        
        if(debug){
              ctx.strokeStyle = 'Red';
              ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width , this.BB.height);
        }     
    }; 
}