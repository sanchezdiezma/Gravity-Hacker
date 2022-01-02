class Floor {
    constructor(ctx, canvasSize, posX, posY, width, height) {

      this.ctx = ctx

      this.canvasSize = canvasSize
  
      this.pos = {
        x: posX,
        y: posY
      }
  
      this.size = {
        width: width,
        height: height
      }
  
    }
  
    draw() {
        this.ctx.fillStyle = "#b4afaf";
        this.ctx.fillRect(this.pos.x, this.pos.y, this.size.width, this.size.height)
    }
  
}