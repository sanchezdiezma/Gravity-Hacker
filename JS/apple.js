class Player {
    constructor(ctx, canvasSize, posX, posY, width, height, floors) {
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

      this.floors = floors
  
      this.speed = {
        x: 0,
        y: 0
      }

      this.gravitySwitch = false
      this.isGrown = false

      this.frames = 4
      this.framesIndex = 0

      this.imageInstance = undefined
  
      this.init()
    }

    init () {
        this.imageInstance = new Image()
        this.imageInstance.src = `Images/apple.png`
    }
  
    draw() {
        this.ctx.drawImage(
        this.imageInstance,
        this.framesIndex * this.imageInstance.width / this.frames,  //inicio de recorte x
        0,                                                          //inicio de recorte y
        this.imageInstance.width / this.frames,                     //ancho de recorte
        this.imageInstance.height,                                  //alto de recorte
        this.pos.x,
        this.pos.y,
        this.size.width,
        this.size.height
      )
    }

    moveLeft(gravity) {
        //CON LA GRAVITY HACIA ABAJO O ARRIBA --> FLECHA IZQUIERDA PARA ANDAR HACIA IZQUIERDA
        if (gravity === "DOWN" || gravity === "UP") {
            if (this.pos.x > 0) {
                this.pos.x -= 20
            } else {
                null
            }
        //CON LA GRAVITY HACIA LA DERECHA --> FLECHA IZQUIERDA PARA SALTAR
        } else if (gravity === "RIGHT") {
            if (this.pos.x >= this.floors[3].pos.x - this.size.width) {
                this.pos.x -= 30
                this.speed.x = -15
                bounce.play()
            }
        }
    }
    
    moveRight(gravity) {
        //CON LA GRAVITY HACIA ABAJO O ARRIBA --> FLECHA DERECHA PARA ANDAR HACIA DERECHA
        if (gravity === "DOWN" || gravity === "UP") {
            if (this.pos.x + this.size.width < this.canvasSize.width) {
                this.pos.x += 20
            } else {
                null
            }
        //CON LA GRAVITY HACIA LA IZQUIERDA --> FLECHA DERECHA PARA SALTAR
        } else if (gravity === "LEFT") {
            if (this.pos.x <= this.floors[1].pos.x + this.floors[1].size.width) {
                this.pos.x += 30
                this.speed.x = 15
                bounce.play()
                
            }
        } 
    }

    moveDown(gravity) {
        //CON LA GRAVITY HACIA LOS LADOS --> FLECHA ABAJO PARA ANDAR HACIA ABAJO (LÍMITE SUELO)
        if (gravity === "LEFT" || gravity === "RIGHT") {
            if (this.pos.y + this.size.height < this.canvasSize.height) {
                this.pos.y += 20
            } else {
                null
            }
        //CON LA GRAVITY HACIA AARRIBA --> FLECHA ABAJO PARA SALTAR
        } else if (gravity === "UP") {
            if (this.pos.y <= this.floors[2].pos.y + this.floors[2].size.height) {
                this.pos.y += 30
                this.speed.y = 15
                bounce.play()
            }
        }
    }

    moveUp(gravity) {
        //CON LA GRAVITY HACIA ABAJO --> FLECHA ARRIBA PARA SALTAR
        if (gravity === "DOWN") {
            if (this.pos.y >= this.floors[0].pos.y - this.size.height) {
                this.pos.y -= 30
                this.speed.y = -15
                bounce.play()
            }
        //CON LA GRAVITY HACIA LOS LADOS --> FLECHA ARRIBA PARA ANDAR HACIA ARRIBA (LÍMITE TECHO)
        } else if (gravity === "LEFT" || gravity === "RIGHT") {
            if (this.pos.y > 0) {
                this.pos.y -= 20
            } else {
                null
            }
        }
    }
    acceleration(gravity) {
        if (gravity === "DOWN") {
            //ESTÁ CAYENDO
            if (this.pos.y < this.floors[0].pos.y - this.size.height || this.pos.x + this.size.width/2 < this.floors[0].pos.x || this.pos.x + this.size.width/2 > this.floors[0].pos.x + this.floors[0].size.width) {
                //Si tenía velocidad hacia el otro lado sin resetar (no había tocado el suelo), se resetea la velocidad
                if(this.speed.y < 0 && this.gravitySwitch) {
                    this.speed.y = 0
                    this.gravitySwitch = false
                }
                //GRAVEDAD
                this.pos.y += this.speed.y
                this.speed.y += 0.8
            } else {
                //ESTÁ TOCANDO EL SUELO O POR DEBAJO, LO FIJAMOS AL SUELO PARA EVITAR DESAJUSTES VISUALES
                this.pos.y = this.floors[0].pos.y - this.size.height
                //Reseteamos velocidad para no acumular
                this.speed = {x: 0, y: 0}
                //PONEMOS EL GRAVITY SWITCH EN FALSE PARA EVITAR EL IF INTERNO DE ARRIBA
                this.gravitySwitch = false
            }
        } else if (gravity === "LEFT") {
            if (this.pos.x > this.floors[1].pos.x + this.floors[1].size.width || this.pos.y + this.size.height/2 < this.floors[1].pos.y || this.pos.y + this.size.height/2 > this.floors[1].pos.y + this.floors[1].size.height) {
                if(this.speed.x > 0 && this.gravitySwitch) {
                    this.speed.x = 0
                    this.gravitySwitch = false
                }
                this.pos.x += this.speed.x
                this.speed.x -= 0.8
            } else {
                this.pos.x = this.floors[1].pos.x + this.floors[1].size.width
                this.speed = {x: 0, y: 0}
                this.gravitySwitch = false
            }
        } else if (gravity === "UP") {
            if (this.pos.y > this.floors[2].pos.y + this.floors[2].size.height || this.pos.x + this.size.width/2 < this.floors[2].pos.x || this.pos.x + this.size.width/2 > this.floors[2].pos.x + this.floors[2].size.width) {
                if(this.speed.y > 0 && this.gravitySwitch) {
                    this.speed.y = 0
                    this.gravitySwitch = false
                }
                this.pos.y += this.speed.y
                this.speed.y -= 0.8
            } else {
                this.pos.y = this.floors[2].pos.y + this.floors[2].size.height
                this.speed = {x: 0, y: 0}
                this.gravitySwitch = false
            }
        } else if (gravity === "RIGHT") {
            if (this.pos.x < this.floors[3].pos.x - this.size.width || this.pos.y + this.size.height/2 < this.floors[3].pos.y || this.pos.y + this.size.height/2 > this.floors[3].pos.y + this.floors[3].size.height) {
                if(this.speed.x < 0 && this.gravitySwitch) {
                    this.speed.x = 0
                    this.gravitySwitch = false
                }
                this.pos.x += this.speed.x
                this.speed.x += 0.8
            } else {
                this.pos.x = this.floors[3].pos.x - this.size.width
                this.speed = {x: 0, y: 0}
                this.gravitySwitch = false
            }
        }
    }
  }