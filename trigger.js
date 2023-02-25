class trigger{
    constructor(game, x, y, wallX, wallY, wallWidth, wallHeight, div) {
        Object.assign(this, { game, x, y, wallX, wallY, wallWidth, wallHeight, div});
       
        
        this.updateBB();
        this.collision = false;
        this.game = game;
        this.spawned = false;
        this.enemiesDead = false;
        this.boarOne = new Boar(this.game, 6000,680);
        this.wall = new verticalWall(this.game, this.wallX, this.wallY, this.wallWidth, this.wallHeight, this.div);
        this.wall2 = new verticalWall(this.game, 4300, 400, 47*3, 119*3, 47*3);

        this.game.addEntity(this.wall);
        this.game.addEntity(this.wall2);

    }
    updateBB() {
        this.lastBB = this.BB;
        this.lastAreaBB = this.AreaBB;
        this.BB = new BoundingBox(this.x, this.y, 213, 69);
        this.AreaBB = new BoundingBox(this.x-1490, this.y, 1660,800);
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
                    console.log("SPAWNED")
                    that.game.addEntityToBegin(that.boarOne); 
                    that.spawned = true;
                }


            }
            if(( entity instanceof Boar) && that.spawned){
                if(that.AreaBB.collide(that.boarOne.BB) && !that.boarOne.dead){
                    console.log("MONSTERS in area");
                }
                else if(that.boarOne.dead){
                    console.log("NO MONSTERS IN AREA");
                    that.wall2.removeFromWorld = true;
                }
            }


        });
        this.updateBB();
    }

    draw(ctx) {
        
        if(debug){
              ctx.strokeStyle = 'Red';
              ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width , this.BB.height);
              ctx.strokeStyle = 'yellow';
              ctx.strokeRect(this.AreaBB.x - this.game.camera.x, this.AreaBB.y - this.game.camera.y, this.AreaBB.width , this.AreaBB.height);
        }     
    }; 
}