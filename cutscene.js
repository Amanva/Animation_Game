class CutScene {
    constructor(game, textArray, x, y, color, offsetX, offsetY) {
        Object.assign(this, { game, textArray, x, y, color, offsetX, offsetY });
        this.font = '25px "Press Start 2P"'; // Font size and type
    this.padding = 10; // Padding around text
    this.boxWidth = 400; // Width of text box
    this.boxHeight = 100; // Height of text box
    this.show = 0;
  }

  update() {
  //   const TICK = this.game.clockTick;
  //   show += TICK;
  //   if(this.showTime > 5) {
  //     this.removeFromWorld = true;
  // }
  }

  draw(ctx) {
    
    ctx.font = this.font;
    ctx.fillStyle = "Black";
    ctx.fillRect(0, 0, 1800, 800);
    // Calculate position of text box in the middle of the canvas
    const boxX = (PARAMS.CANVAS_WIDTH - this.boxWidth) / 2;
    const boxY = (PARAMS.CANVAS_HEIGHT - this.boxHeight) / 2;

    // Calculate position of text within box
    const lineHeight = ctx.measureText("M").width * 3; // Get height of a single line of text
    const textX = boxX + this.padding; // X coordinate for first line of text
    let textY = boxY + this.padding; // Y coordinate for first line of first line of text

    ctx.fillStyle = this.color;
    // Draw box
    ctx.fillText("Click To Continue",1370,800);


    // Draw each line of text
    for (let i = 0; i < this.textArray.length; i++) {
      const line = this.textArray[i];
      const textWidth = ctx.measureText(line).width;
      const lineX = textX + (this.boxWidth - this.padding * 2 - textWidth) / 2;
      ctx.fillText(line, lineX+this.offsetX, textY+this.offsetY);
      textY += lineHeight;
    }
    // ctx.fillRect(boxX, boxY, this.boxWidth, this.boxHeight);
      }
}

class CutScene2 {
  constructor(game, textArray, x, y, color, offsetX, offsetY) {
      Object.assign(this, { game, textArray, x, y, color, offsetX, offsetY });
      this.font = '60px "Press Start 2P"'; // Font size and type
  this.padding = 10; // Padding around text
  this.boxWidth = 400; // Width of text box
  this.boxHeight = 100; // Height of text box
  this.show = 0;
}

update() {
//   const TICK = this.game.clockTick;
//   show += TICK;
//   if(this.showTime > 5) {
//     this.removeFromWorld = true;
// }
}

draw(ctx) {
  
  ctx.font = this.font;
  ctx.fillStyle = "Black";
  ctx.fillRect(0, 0, 1800, 800);
  // Calculate position of text box in the middle of the canvas
  const boxX = (PARAMS.CANVAS_WIDTH - this.boxWidth) / 2;
  const boxY = (PARAMS.CANVAS_HEIGHT - this.boxHeight) / 2;

  // Calculate position of text within box
  const lineHeight = ctx.measureText("M").width * 3; // Get height of a single line of text
  const textX = boxX + this.padding; // X coordinate for first line of text
  let textY = boxY + this.padding; // Y coordinate for first line of first line of text

  ctx.fillStyle = this.color;
  // Draw box
  // ctx.fillText("Click To Continue",1370,800);


  // Draw each line of text
  for (let i = 0; i < this.textArray.length; i++) {
    const line = this.textArray[i];
    const textWidth = ctx.measureText(line).width;
    const lineX = textX + (this.boxWidth - this.padding * 2 - textWidth) / 2;
    ctx.fillText(line, lineX+this.offsetX, textY+this.offsetY);
    textY += lineHeight;
  }
  // ctx.fillRect(boxX, boxY, this.boxWidth, this.boxHeight);
    }
}
   // constructor(game, text, x, y, color) {
    //     Object.assign(this, {game, text, x, y, color});
    //     this.showTime = 0;
    // }
    // update() {
    //     // console.log(this.game.click);
    //     if(this.game.click){

    //     }
    // }
    // draw(ctx) {
    //     ctx.fillStyle = 'Black';
    //     ctx.fillRect(0, 0, 1800, 800);
    //     ctx.fillStyle = this.color;
    //     ctx.font = '15px "Press Start 2P"';
    //     ctx.fillText(this.text[0],1800/2,500);
    //     ctx.fillText(this.text[1],1800/2,700);

    // }