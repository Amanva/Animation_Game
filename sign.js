class Sign {
    constructor(game, x, y, lines, text) {
        Object.assign(this, {game, x, y, lines, text});
        this.spritesheet = assetMangager.getAsset("./sprites/04.png");
        this.scale = 2;
        this.textSize = 15;
        this.showText = false;
        this.updateBB();
    };
updateBB(){
    this.BB = new BoundingBox(this.x, this.y, 38 * this.scale, 35 * this.scale);
}
    update() {
       
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
          let boxlen = (this.textSize * maxlen) /1.5;
          let boxwidth =  this.textSize + this.textSize * sentence.length; 
          //set properties of rect
          ctx.fillStyle = "white";
          ctx.strokeStyle = "black";
          ctx.fillRect(
            this.BB.x - this.game.camera.x,
            this.BB.y - this.game.camera.y - boxwidth ,
            boxlen,
            boxwidth)
            ctx.strokeRect(
                this.BB.x - this.game.camera.x,
                this.BB.y - this.game.camera.y - boxwidth ,
                boxlen,
                boxwidth)

          ctx.font = this.textSize + "px Courier New ";
          ctx.fillStyle = "Black";
          ctx.textAlign = "center";
          //draw all lines of text
            for(let i = 0; i < sentence.length; i++){
                ctx.fillText(sentence[i],
                    this.BB.x - this.game.camera.x + boxlen/2,
                    this.BB.y - (boxwidth/2) -this.game.camera.y - boxwidth + (this.textSize * sentence.length) + (this.textSize * i) - this.textSize/2 );
            }
    }
    draw(ctx) {
        ctx.drawImage(this.spritesheet, 5, 5, 37, 43, this.x-this.game.camera.x, this.y-this.game.camera.y, 37 * this.scale, 43 * this.scale);
        this.textCreator(ctx);
        
        if (debug) {            
        ctx.StrokeStyle = "Red";
        ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
        }
    };

}