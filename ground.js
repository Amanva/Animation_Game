const GSCALE = 1;
const WSCALE = 2;
class Ground {
    constructor(game, x, y, width, height, div) {
        Object.assign(this, { game, x, y, width, height, div});
        if(this.game.camera.level === levelOne){
        this.spritesheet = assetMangager.getAsset("./sprites/Lava64.png");
        }
        else if(this.game.camera.level === levelTwo){
            this.spritesheet = assetMangager.getAsset(levelTwo.floor);
        }
        else if(this.game.camera.level === levelThree){
        this.spritesheet = assetMangager.getAsset("./sprites/earthlevel.png");
        }
        // this.animations = [];
        // this.animations.push(new Animator(this.spritesheet, 0, 0, 48, 48, 1, 0.1, 0,0,false, true, false));
        this.updateBB();
    };
    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y, this.width, this.height);
        this.leftBB = new BoundingBox(this.x, this.y, 0, this.height);
        this.rightBB = new BoundingBox(this.x + this.width, this.y, 0, this.height);
        this.bottomBB = new BoundingBox(this.x, this.y+this.height, this.width, 0);
        
    };
    update() {
    };
    draw(ctx) {
        let brickWidth = this.width / (this.div);
        for (var i = 0; i < brickWidth; i++) {
            if(this.game.camera.level === levelOne){
                ctx.drawImage(this.spritesheet, 0, 255, 256, 64, this.x + i * (this.div)-this.game.camera.x, this.y-this.game.camera.y, this.div, this.height);
            }
            else if(this.game.camera.level === levelTwo){
                ctx.drawImage(this.spritesheet, 689, 624, 110, 110, this.x + i * (this.div)-this.game.camera.x, this.y-this.game.camera.y, this.div, this.height);
            }
            else if(this.game.camera.level === levelThree){
                // console.log("g");
                ctx.drawImage(this.spritesheet, 120, 168, 72, 25, this.x + i * (this.div)-this.game.camera.x, this.y-this.game.camera.y, this.div, this.height);
            }
        }
        if(debug){
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x-this.game.camera.x, this.BB.y-this.game.camera.y, this.BB.width, this.BB.height);
            }
    };
};

class HalfGround {
    constructor(game, x, y, width, height, div) {
        Object.assign(this, { game, x, y, width, height, div});
        if(this.game.camera.level === levelOne){
        this.spritesheet = assetMangager.getAsset("./sprites/Lava64.png");
        }
        else if(this.game.camera.level === levelThree){
        this.spritesheet = assetMangager.getAsset("./sprites/earthlevel.png");
        }
        // this.animations = [];
        // this.animations.push(new Animator(this.spritesheet, 0, 0, 48, 48, 1, 0.1, 0,0,false, true, false));
        this.updateBB();
    };
    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y, this.width, this.height);
        this.leftBB = new BoundingBox(this.x, this.y, 0, this.height);
        this.rightBB = new BoundingBox(this.x + this.width, this.y, 0, this.height);
        this.bottomBB = new BoundingBox(this.x, this.y+this.height, this.width, 0);
    };
    update() {
    };
    draw(ctx) {
        let brickWidth = this.width / (this.div);
        for (var i = 0; i < brickWidth; i++) {
            if(this.game.camera.level === levelOne){
                ctx.drawImage(this.spritesheet, 0, 255, 256, 64, this.x + i * (this.div)-this.game.camera.x, this.y-this.game.camera.y, this.div, this.height);
            }
            else if(this.game.camera.level === levelThree){
                // console.log("g");
                ctx.drawImage(this.spritesheet, 120, 0, 86, 23, this.x + i * (this.div)-this.game.camera.x, this.y-this.game.camera.y, this.div, this.height);
            }
        }
        if(debug){
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x-this.game.camera.x, this.BB.y-this.game.camera.y, this.BB.width, this.BB.height);
            }
    };
};
class Dirt {
    constructor(game, x, y, width, height, div) {
        Object.assign(this, { game, x, y, width, height, div});
        if(this.game.camera.level === levelOne){
        this.spritesheet = assetMangager.getAsset("./sprites/Lava64.png");
        }
        else if(this.game.camera.level === levelThree){
        this.spritesheet = assetMangager.getAsset("./sprites/earthlevel.png");
        }
        this.updateBB();
    };
    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y, this.width, this.height);
        this.leftBB = new BoundingBox(this.x, this.y, 0, this.height);
        this.rightBB = new BoundingBox(this.x + this.width, this.y, 0, this.height);
        this.bottomBB = new BoundingBox(this.x, this.y+this.height, this.width, 0);
    };
    update() {
    };
    draw(ctx) {
        let brickWidth = this.width / (this.div);
        for (var i = 0; i < brickWidth; i++) {
            if(this.game.camera.level === levelOne){
                ctx.drawImage(this.spritesheet, 0, 255, 256, 64, this.x + i * (this.div)-this.game.camera.x, this.y-this.game.camera.y, this.div, this.height);
            }
            else if(this.game.camera.level === levelThree){
                ctx.drawImage(this.spritesheet, 37, 288, 58, 14, this.x + i * (this.div)-this.game.camera.x, this.y-this.game.camera.y, this.div, this.height);
            }
        }
        if(debug){
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x-this.game.camera.x, this.BB.y-this.game.camera.y, this.BB.width, this.BB.height);
            }
    };
};
class Wall {
    constructor(game, x, y, width, height, div) {
        Object.assign(this, { game, x, y, width, height, div});

        this.spritesheet = assetMangager.getAsset("./sprites/Lava64.png");
        this.updateBB();
    };
    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y, this.width, this.height);
        this.leftBB = new BoundingBox(this.x, this.y, 0, this.height);
        this.rightBB = new BoundingBox(this.x + this.width, this.y, 0, this.height);
        this.bottomBB = new BoundingBox(this.x, this.y+this.height, this.width, 0);
        this.topBB = new BoundingBox(this.x, this.y, this.width, 0);
        
    };
    update() {
    };
    draw(ctx) {
        let brickHeight = this.height / this.div;
        for (var i = 0; i < brickHeight; i++) {
            if(this.game.camera.level === levelOne){
                ctx.drawImage(this.spritesheet, 0, 11, 192, 154, this.x - this.game.camera.x, this.y + i * this.div-this.game.camera.y, this.width, this.div);
            }
            else if(this.game.camera.level === levelThree){
                ctx.drawImage(this.spritesheet, 119, 168, 73, 25, this.x - this.game.camera.x, this.y + i * this.div-this.game.camera.y, this.width, this.div);
            }
        // ctx.drawImage(this.spritesheet, 0, 11, 192, 154, this.x +192 - this.game.camera.x, this.y - i * (154*WSCALE), (192*WSCALE), (154*WSCALE));
        // ctx.drawImage(this.spritesheet, 0, 11, 192, 154, this.x +384 - this.game.camera.x, this.y - i * (154*WSCALE), (192*WSCALE), (154*WSCALE));
        }
        if(debug){
            ctx.strokeStyle = 'white';
             ctx.strokeRect(this.BB.x-this.game.camera.x, this.BB.y-this.game.camera.y, this.BB.width, this.BB.height);
            // ctx.strokeRect(this.leftBB.x-this.game.camera.x, this.leftBB.y-this.game.camera.y, this.leftBB.width, this.leftBB.height);
            // ctx.strokeRect(this.rightBB.x-this.game.camera.x, this.rightBB.y-this.game.camera.y, this.rightBB.width, this.rightBB.height);
        }
    };
}; //end of wall

class BackGround {
    constructor(game, x, y, w, h, level) {
        Object.assign(this, { game, x, y, w, h, level});
        if(this.level === levelOne){
        this.spritesheet = assetMangager.getAsset(levelOne.background);
        }
        else if(this.level === levelThree){
        this.background1 = assetMangager.getAsset(levelThree.background1);
        this.background2 = assetMangager.getAsset(levelThree.background2);
        this.background3 = assetMangager.getAsset(levelThree.background3);
        }

    };

    update() {
    };
    draw(ctx) {
        if(this.level === levelOne){
        ctx.drawImage(this.spritesheet,this.x ,this.y, this.w, this.h);
        }
        else if(this.level === levelThree){
            ctx.drawImage(this.background1,this.x ,this.y, this.w, this.h);
            ctx.drawImage(this.background2,this.x ,this.y, this.w, this.h);
            ctx.drawImage(this.background3,this.x ,this.y, this.w, this.h);
           
        }
    };
};


class Platform {
    constructor(game, x, y, width, height, divisor, level) {
        Object.assign(this, { game, x, y, width, height, divisor, level});

        if(this.game.camera.level === levelOne){
            this.spritesheet = assetMangager.getAsset("./sprites/Lava64.png");
        }
        else if(this.game.camera.level === levelTwo){
            this.spritesheet = assetMangager.getAsset(levelTwo.floor);
        }
        else if(this.game.camera.level === levelThree){

            this.spritesheet = assetMangager.getAsset("./sprites/earthlevel.png")
        }
        this.updateBB();
    };
    
    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y, this.width, this.height);
        this.leftBB = new BoundingBox(this.x, this.y, 0, this.height);
        this.rightBB = new BoundingBox(this.x + this.width, this.y, 0, this.height);
        this.bottomBB = new BoundingBox(this.x, this.y+this.height, this.width, 0);
        this.topBB = new BoundingBox(this.x, this.y, this.width, 0);
        
    };
    update() {
    };
    draw(ctx) {
    
        let brickWidth = this.width / (this.divisor);
        for (var i = 0; i < brickWidth; i++) {
            if(this.game.camera.level === levelOne){
                ctx.drawImage(this.spritesheet, 322, 256, 127, 31, this.x + i * (this.divisor)-this.game.camera.x, this.y-this.game.camera.y, this.divisor, this.height);
            }
            else if (this.level === levelTwo){
                ctx.drawImage(this.spritesheet, 689, 624, 110, 110, this.x + i * (this.divisor)-this.game.camera.x, this.y-this.game.camera.y, this.divisor, this.height);

            }
            else if(this.game.camera.level === levelThree){
                ctx.drawImage(this.spritesheet, 120, 216, 71, 23, this.x + i * (this.divisor)-this.game.camera.x, this.y-this.game.camera.y, this.divisor, this.height);

            }
        }

        if(debug){
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x-this.game.camera.x, this.BB.y-this.game.camera.y, this.BB.width, this.BB.height);
            // ctx.strokeRect(this.rightBB.x-this.game.camera.x, this.rightBB.y-this.game.camera.y, this.rightBB.width, this.rightBB.height);
            // ctx.strokeRect(this.topBB.x-this.game.camera.x, this.topBB.y-this.game.camera.y, this.topBB.width, this.topBB.height);
            }
        
        
    };
};
class Tiles {
    constructor(game, x, y, width, height, divisor) {
        Object.assign(this, { game, x, y, width, height, divisor});

        this.spritesheet = assetMangager.getAsset("./sprites/Lava64.png");
        // this.animations = [];
        // this.animations.push(new Animator(this.spritesheet, 0, 0, 48, 48, 1, 0.1, 0,0,false, true, false));
        this.updateBB();
    };
    updateBB() {
        
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y, this.width, this.height);
        this.leftBB = new BoundingBox(this.x, this.y, 0, this.height);
        this.rightBB = new BoundingBox(this.x + this.width, this.y, 0, this.height);
        this.bottomBB = new BoundingBox(this.x, this.y+this.height, this.width, 0);
        this.topBB = new BoundingBox(this.x, this.y, this.width, 0);
        
    };
    update() {
    };
    draw(ctx) {
        let brickWidth = this.width / (192);
        for (var i = 0; i < brickWidth; i++) {
            ctx.drawImage(this.spritesheet, 0, 191, 192, 51, this.x + i * (this.divisor)-this.game.camera.x, this.y-this.game.camera.y, this.divisor, this.height);
        }

        if(debug){
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x-this.game.camera.x, this.BB.y-this.game.camera.y, this.BB.width, this.BB.height);
            // ctx.strokeRect(this.rightBB.x-this.game.camera.x, this.rightBB.y-this.game.camera.y, this.rightBB.width, this.rightBB.height);
            // ctx.strokeRect(this.topBB.x-this.game.camera.x, this.topBB.y-this.game.camera.y, this.topBB.width, this.topBB.height);
            }
    };
};



class movingPlatforms {
    constructor(game, x, y, width, height, divisor, direction, distance, level) {
        Object.assign(this, { game, x, y, width, height, divisor, direction, distance, level});
        this.velocity = { x: 0, y: 0 };

        if(this.game.camera.level === levelOne){
            this.spritesheet = assetMangager.getAsset("./sprites/Lava64.png");
        }
        else if(this.game.camera.level === levelTwo){
            this.spritesheet = assetMangager.getAsset("./sprites/waterLevel/boulderTiles.png");
        }
        else if(this.game.camera.level === levelThree){

            this.spritesheet = assetMangager.getAsset("./sprites/earthlevel.png")
        }

        this.updateBB();
        this.xStart = x;
        this.yStart = y;
    };
    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y, this.width, this.height);
        this.leftBB = new BoundingBox(this.x, this.y, 0, this.height);
        this.rightBB = new BoundingBox(this.x + this.width, this.y, 0, this.height);
        this.bottomBB = new BoundingBox(this.x, this.y+this.height, this.width, 0);
        this.topBB = new BoundingBox(this.x, this.y, this.width, 0);
        
    };

    update() {
        // update position
        this.x += this.velocity.x * this.game.clockTick;
        this.y += this.velocity.y * this.game.clockTick;
        this.updateBB();

        if(this.direction === "x-axis"){ // Horizontal
            if(this.x <= this.xStart){
                this.velocity.x = 100;
            }
            else if (this.x >=  this.distance){
                this.velocity.x = - 100;
            }
        } else {                         // Vertical
            if(this.y <= this.yStart){
                this.velocity.y = 80;
                
            } else if (this.y >=  this.distance){   
                this.velocity.y = -80;                             
            }
        }

    };
   
    draw(ctx) {
        let brickWidth = this.width / (this.divisor);
        for (var i = 0; i < brickWidth; i++) {
            if(this.game.camera.level === levelOne){
                ctx.drawImage(this.spritesheet, 322, 256, 127, 31, this.x + i * (this.divisor)-this.game.camera.x, this.y-this.game.camera.y, this.divisor, this.height);
            }
            else if (this.level === levelTwo){
                ctx.drawImage(this.spritesheet, 689, 624, 110, 110, this.x + i * (this.divisor)-this.game.camera.x, this.y-this.game.camera.y, this.divisor, this.height);

            }
            else if(this.game.camera.level === levelThree){
                ctx.drawImage(this.spritesheet, 120, 216, 71, 23, this.x + i * (this.divisor)-this.game.camera.x, this.y-this.game.camera.y, this.divisor, this.height);

            }
        }

        if(debug){
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x-this.game.camera.x, this.BB.y-this.game.camera.y, this.BB.width, this.BB.height);
            // ctx.strokeRect(this.rightBB.x-this.game.camera.x, this.rightBB.y-this.game.camera.y, this.rightBB.width, this.rightBB.height);
            }
    };
};




// class movingPlatforms {
//     constructor(game, x, y, width, height, divisor, direction, distance, level) {
//         Object.assign(this, { game, x, y, width, height, divisor, direction, distance, level});
//         this.velocity = { x: 0, y: 0 };

//         if(this.game.camera.level === levelOne){
//             this.spritesheet = assetMangager.getAsset("./sprites/Lava64.png");
//         }
//         else if(this.game.camera.level === levelTwo){
//             this.spritesheet = assetMangager.getAsset("./sprites/waterLevel/boulderTiles.png");
//         }
//         else if(this.game.camera.level === levelThree){

//             this.spritesheet = assetMangager.getAsset("./sprites/earthlevel.png")
//         }

//         this.updateBB();
//         this.x = x;
//         this.y = y;
//         this.reverse = false;
//     };
//     updateBB() {
//         this.lastBB = this.BB;
//         this.BB = new BoundingBox(this.x, this.y, this.width, this.height);
//         this.leftBB = new BoundingBox(this.x, this.y, 0, this.height);
//         this.rightBB = new BoundingBox(this.x + this.width, this.y, 0, this.height);
//         this.bottomBB = new BoundingBox(this.x, this.y+this.height, this.width, 0);
//         this.topBB = new BoundingBox(this.x, this.y, this.width, 0);
        
//     };
//     update() {
//         // update position
//         this.x += this.velocity.x * this.game.clockTick;
//         this.y += this.velocity.y * this.game.clockTick;
//         this.updateBB();
        
//         if(this.direction === "x-axis"){
//             if(this.x < this.distance ){
//                 this.velocity.x = 100;
//                 // this.updateBB();
//                 if(this.x >= this.distance){
//                     // this.reverse = true;
//                 }
//             }
//             else if(this.x > this.distance ){    
//                 this.velocity.x = -100;
//                 if(this.x <= this.originalX){
//                 this.reverse = false;
//                 }
//                 // this.updateBB();
                    
                
//             }

//     }
//     else {
//         if(this.y < this.distance && this.reverse === false){

//             this.velocity.y = 50* this.game.clockTick;
//             this.updateBB();
//             if(this.y >= 400){
//                 this.reverse = true;
//             }
//             // console.log(this.y + "testing");

//         }
//         else{
                
//             this.velocity.y = -(50* this.game.clockTick);
//                 if(this.y <= this.originalY){
//                     this.reverse = false;
//                 }
//                 this.updateBB();
                
            
//         }
//     }
        
        

//     };
   
//     draw(ctx) {
//         let brickWidth = this.width / (this.divisor);
//         for (var i = 0; i < brickWidth; i++) {
//             if(this.game.camera.level === levelOne){
//                 ctx.drawImage(this.spritesheet, 322, 256, 127, 31, this.x + i * (this.divisor)-this.game.camera.x, this.y-this.game.camera.y, this.divisor, this.height);
//             }
//             else if (this.level === levelTwo){
//                 ctx.drawImage(this.spritesheet, 689, 624, 110, 110, this.x + i * (this.divisor)-this.game.camera.x, this.y-this.game.camera.y, this.divisor, this.height);

//             }
//             else if(this.game.camera.level === levelThree){
//                 ctx.drawImage(this.spritesheet, 120, 216, 71, 23, this.x + i * (this.divisor)-this.game.camera.x, this.y-this.game.camera.y, this.divisor, this.height);

//             }
//         }

//         if(debug){
//             ctx.strokeStyle = 'Red';
//             ctx.strokeRect(this.BB.x-this.game.camera.x, this.BB.y-this.game.camera.y, this.BB.width, this.BB.height);
//             // ctx.strokeRect(this.rightBB.x-this.game.camera.x, this.rightBB.y-this.game.camera.y, this.rightBB.width, this.rightBB.height);
//             }
//     };
// };



class lava {
    constructor(game, x, y, width, height) {
        Object.assign(this, { game, x, y, width, height});

        this.spritesheet = assetMangager.getAsset("./sprites/Lava64.png");
        // this.animations = [];
        // this.animations.push(new Animator(this.spritesheet, 0, 0, 48, 48, 1, 0.1, 0,0,false, true, false));
        this.updateBB();
    };
    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y, this.width, (64*GSCALE));
        
    };
    update() {
    };
    draw(ctx) {
        let brickWidth = this.width / ((256*GSCALE));
        for (var i = 0; i < brickWidth; i++) {
            ctx.drawImage(this.spritesheet, 188, 196, 10, 20, this.x + i * (10*GSCALE)-this.game.camera.x, this.y, (10*GSCALE), (64*GSCALE));
        }
        ctx.strokeStyle = 'Red';
        ctx.strokeRect(this.BB.x-this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
    };
};

class verticalWall {
    constructor(game, x, y, width, height, divisor) {
        Object.assign(this, { game, x, y, width, height, divisor});

        if(this.game.camera.level === levelOne){
            this.spritesheet = assetMangager.getAsset("./sprites/Lava64.png");
        }
        else if(this.game.camera.level === levelThree){
            this.spritesheet = assetMangager.getAsset("./sprites/earthlevel.png");
        }
        this.updateBB();
    };
    updateBB() {
        
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y, this.width, this.height);
        this.leftBB = new BoundingBox(this.x, this.y, 0, this.height);
        this.rightBB = new BoundingBox(this.x + this.width, this.y, 0, this.height);
        this.bottomBB = new BoundingBox(this.x, this.y+this.height, this.width, 0);
        this.topBB = new BoundingBox(this.x, this.y, this.width, 0);
        
    };
    update() {
    };
    draw(ctx) {
        let brickWidth = this.width / (this.divisor);
        for (var i = 0; i < brickWidth; i++) {
            if(this.game.camera.level === levelOne){
                ctx.drawImage(this.spritesheet, 448, 128, 127, 127, this.x + i * (this.divisor)-this.game.camera.x, this.y-this.game.camera.y, this.divisor, this.height);
            }
            else if(this.game.camera.level === levelThree){
                
                ctx.drawImage(this.spritesheet, 216, 144, 47, 119, this.x + i * (this.divisor)-this.game.camera.x, this.y-this.game.camera.y, this.divisor, this.height);

            }
        }

        if(debug){
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x-this.game.camera.x, this.BB.y-this.game.camera.y, this.BB.width, this.BB.height);
            }
    };
};

class smallPlatforms {
    constructor(game, x, y, width, height, divisor) {
        Object.assign(this, { game, x, y, width, height, divisor});
        if(this.game.camera.level === levelOne){
            this.spritesheet = assetMangager.getAsset("./sprites/Lava64.png");
        }
        else if(this.game.camera.level === levelThree){
            this.spritesheet = assetMangager.getAsset("./sprites/earthlevel.png");  
        }
        this.updateBB();
    };
    updateBB() {
        
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y, this.width, this.height);
        this.leftBB = new BoundingBox(this.x, this.y, 0, this.height);
        this.rightBB = new BoundingBox(this.x + this.width, this.y, 0, this.height);
        this.bottomBB = new BoundingBox(this.x, this.y+this.height, this.width, 0);
        this.topBB = new BoundingBox(this.x, this.y, this.width, 0);
        
    };
    update() {
    };
    draw(ctx) {
        let brickWidth = this.width / (this.divisor);
        for (var i = 0; i < brickWidth; i++) {
            if(this.game.camera.level === levelOne){
                ctx.drawImage(this.spritesheet, 256, 238, 63, 17, this.x + i * (this.divisor)-this.game.camera.x, this.y-this.game.camera.y, this.divisor, this.height);
            }
            else if(this.game.camera.level === levelThree){
                ctx.drawImage(this.spritesheet, 144, 48, 23, 23, this.x + i * (this.divisor)-this.game.camera.x, this.y-this.game.camera.y, this.divisor, this.height);
            }
        }

        if(debug){
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x-this.game.camera.x, this.BB.y-this.game.camera.y, this.BB.width, this.BB.height);
        }
    };
};

/**     ********************                     Level Two classes are below        ********************       */
class LevelTwoBackGround {
    constructor(game, x, y, w, h) {
        Object.assign(this, { game, x, y, w, h});
        this.spritesheet = assetMangager.getAsset(levelTwo.background);

    };

    update() {
    };
    draw(ctx) {
        ctx.drawImage(this.spritesheet,this.x ,this.y, this.w, this.h);
    };
};





