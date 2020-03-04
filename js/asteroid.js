class Asteriod {

    constructor() {
        this.x = (Math.random() * (canvas.width - (width*2)) + (width*2))
        this.y = (Math.random() * (canvas.height- (height*3)) + (height*2))
        this.dx = (Math.random() * 10) - 5 
        this.dy = (Math.random() * 10) - 5 
        this.frameX = Math.floor( Math.random() * 6 )
        this.frameY = Math.floor( Math.random()* 1.99 )
        this.spinSpeed = Math.floor( Math.random()* 10 ) + 3
        this.frameNumber = Math.floor( Math.random()* 6 )
        this.isHit = false
    }

    draw() {
        c.drawImage(asteriodImg, width * this.frameX, height * this.frameY, width, height, (this.x - width/2), (this.y - height/2) , scaledWidth, scaledHeight);
    }

    update() {

        if (this.frameNumber % this.spinSpeed == 0) {
            if(this.frameX == 15) {
                this.frameX = 0
            } else {
                this.frameX++
            }
        }
        
        if(this.x < (width/2) || this.x > (canvas.width - (width/2))) {
            this.dx *= -1
        }
        if(this.y < (height/2) || this.y > (canvas.height - (height/2))) {
            this.dy *= -1
        }
        
        this.frameNumber++
        this.x += this.dx
        this.y += this.dy
     
        if( (Math.abs(ship.x - this.x) < 40) && (Math.abs(ship.y - this.y) < 40) ) {
            shipExplosion.x = ship.x
            shipExplosion.y = ship.y
            controller.crashed = true
        } 

        beamArray.forEach(beam => {

            if ( (Math.abs(beam.x - this.x) < 40) && (Math.abs(beam.y - this.y) < 40) ) {
                this.isHit = true
                let e = new Explosion()
                e.x = this.x
                e.y = this.y
                explArray.push(e)
            } 

        })


    }

}
