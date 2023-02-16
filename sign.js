class Sign {
    constructor(game, x, y, lines, text) {
        Object.assign(this, {game, x, y, lines, text});
        this.spritesheet = assetMangager.getAsset("./sprites/04.png");
        this.scale = 2;
        this.textSize = 15;
        this.showText = false;
        this.style = 'px "Press Start 2P"';
        this.xOff = 130;
        this.opacity = 100;
        this.yOff = 0;
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.updateBB();
        // this.game.addEntityToBegin(new TextBox(this.game, this.BB.x, this.BB.y, this.BB.width, this.BB.height, this.lines, this.text););
        
    };
updateBB(){
    this.BB = new BoundingBox(this.x, this.y, 38 * this.scale, 35 * this.scale);
}
    update() {
        let dist = distanceBetween(this, this.game.mage);
        // console.log(dist);
        if(dist <= 280){
            this.showText = true;
        }
        else {
            this.showText = false;
        }
        // console.log(this.showText);
    };
    textCreator(ctx){
          let sentence = [];
          let write = "";
          let maxlen = 0;
          let splitText = this.text.split(" ");
          for(let i = 0; i < splitText.length; i++){
              if(write.length >= this.text.length/this.lines){
                  if(write.length > maxlen) maxlen = write.length;
                  sentence.push(write);
                  write = splitText[i];
                //   console.log(write);
              } else {
                  write = write + " " + splitText[i];
                
              }
          }
          if(write.length  > 0) sentence.push(write);
          if(write.length > maxlen) maxlen = write.length;
        //   console.log(sentence.length);
          let boxWidth = (this.textSize * maxlen) / 2;
          let boxHeight =  this.textSize + (this.textSize * sentence.length); 
          ctx.fillStyle = "gray";
          ctx.strokeStyle = "black";
        //   ctx.filter = "opacity(" + this.opacity + "%)";
          ctx.fillRect(this.BB.x - this.game.camera.x - boxWidth/2 + this.BB.width/2, this.BB.y - this.game.camera.y - boxHeight, boxWidth, boxHeight);
          ctx.strokeRect(this.BB.x - this.game.camera.x - boxWidth/2 + this.BB.width/2, this.BB.y - this.game.camera.y - boxHeight, boxWidth, boxHeight);

          ctx.font = this.textSize + this.style;
          ctx.fillStyle = "Black";
        //   ctx.textAlign = "center";
            for(let i = 0; i < sentence.length; i++){
                ctx.fillText(sentence[i],this.BB.x - this.game.camera.x - this.BB.width + 50, this.BB.y - (boxHeight/2) - this.game.camera.y - boxHeight + (this.textSize * sentence.length) + (this.textSize * i) - this.textSize/2 );
            }
    }
    draw(ctx) {
        ctx.drawImage(this.spritesheet, 5, 5, 37, 43, this.x-this.game.camera.x, this.y-this.game.camera.y, 37 * this.scale, 43 * this.scale);
        if(this.showText){
        this.textCreator(ctx);
        }
        if (debug) {            
        ctx.StrokeStyle = "Red";
        ctx.strokeRect(this.BB.x-this.game.camera.x, this.BB.y-this.game.camera.y, this.BB.width, this.BB.height);
        }
    };

}