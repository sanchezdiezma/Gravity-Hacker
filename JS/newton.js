class Newton {
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

      this.imageInstance = undefined
  
      this.init()
  
    }

    init () {
        this.imageInstance = new Image()
        this.imageInstance.src = `Images/newton.png`
    }
  
    draw() {
        this.ctx.drawImage(
            this.imageInstance,
            this.pos.x,
            this.pos.y,
            this.size.width,
            this.size.height
          )
    }
  
}