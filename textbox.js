class TextBox{
    constructor(game, x, y, width, height, lines, text) {
        Object.assign(this, {game, x, y, width, height, lines, text});
        this.textSize = 15;
        this.showText = false;
        this.style = 'px "Press Start 2P"';
        this.xOff = 130;
        this.opacity = 100;
        this.yOff = 0;
        this.updateBB();
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");
    };
    textCreator(){
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
        this.ctx.fillStyle = "gray";
        this.ctx.strokeStyle = "black";
      //   ctx.filter = "opacity(" + this.opacity + "%)";
        this.ctx.fillRect(this.x - this.game.camera.x - boxWidth/2 + this.width/2, this.y - this.game.camera.y - boxHeight, boxWidth, boxHeight)
        this.ctx.strokeRect(this.x - this.game.camera.x - boxWidth/2 + this.width/2, this.y - this.game.camera.y - boxHeight, boxWidth, boxHeight)

        this.ctx.font = this.textSize + this.style;
        this.ctx.fillStyle = "Black";
        this.ctx.text = "center";
          for(let i = 0; i < sentence.length; i++){
              this.ctx.fillText(sentence[i],this.x - this.game.camera.x - this.width, this.y - (boxHeight/2) - this.game.camera.y - boxHeight + (this.textSize * sentence.length) + (this.textSize * i) - this.textSize/2 );
          }
  }
  updateBB(){
    this.BB = new BoundingBox(this.x, this.y, 100, 100);
}
  update(){

  };
  draw(ctx) {
    console.log(this.ctx);
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
        this.canvas.width = boxWidth;
        this.canvas.height = boxHeight;
        this.ctx.fillStyle = "gray";
        this.ctx.strokeStyle = "black";
      //   ctx.filter = "opacity(" + this.opacity + "%)";
        this.ctx.fillRect(this.x - this.game.camera.x - boxWidth/2 + this.width/2, this.y - this.game.camera.y - boxHeight, boxWidth, boxHeight)
        this.ctx.strokeRect(this.x - this.game.camera.x - boxWidth/2 + this.width/2, this.y - this.game.camera.y - boxHeight, boxWidth, boxHeight)

        this.ctx.font = this.textSize + this.style;
        this.ctx.fillStyle = "Black";
        this.ctx.text = "center";
          for(let i = 0; i < sentence.length; i++){
              this.ctx.fillText(sentence[i],this.x - this.game.camera.x - this.width, this.y - (boxHeight/2) - this.game.camera.y - boxHeight + (this.textSize * sentence.length) + (this.textSize * i) - this.textSize/2 );
          }
    // ctx.filter = "opacity(" + this.myOpacity + "%)";
    ctx.drawImage(this.canvas, this.x - this.game.camera.x - this.canvas.width/3, this.y - this.game.camera.y - this.canvas.height * 1.2);
    // ctx.filter = "none";
    if (debug) {            
        ctx.StrokeStyle = "Red";
        ctx.strokeRect(this.BB.x-this.game.camera.x- this.canvas.width/3, this.BB.y-this.game.camera.y- this.canvas.height * 1.2, this.BB.width, this.BB.height);
        }
};
}