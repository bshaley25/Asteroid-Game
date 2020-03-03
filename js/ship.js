class Ship {

    constructor() {
        this.x = 200 // x position
        this.y = 200 // y position
        this.dx = 0 // change in x
        this.dy = 0 // change in y
        this.fx = 0 // frame 
        this.fy = 0
        this.theta = undefined
    }

    draw() {
        c.drawImage(shipImage, shipWidth * this.fx, shipWidth * this.fy, shipWidth, shipeHeight, (this.x - shipWidth/2), (this.y - shipeHeight/2), shipScaledWidth, shipScaledHeight);
    }

    update() {

        this.theta = (((5 * this.fx) + (30 * this.fy)) * Math.PI/180)
        
        this.x += this.dx
        this.y -= this.dy

        if (controller.button === "ArrowRight") {

            this.fx++
            if (this.fx == 6) {
                this.fx = 0
                this.fy++   //go to next line in sprite sheet once the first sprite sheet row has been exhuasted
                if(this.fy == 12){
                    this.fy = 0
                }
            }

        } else if (controller.button === "ArrowLeft") {
            this.fx--
            if (this.fx ==  -1) {
                this.fx = 5
                this.fy--   //go to previous line once the first sprite sheet row has been exhuasted
                if(this.fy == -1){
                    this.fy = 11
                }
            }
        } else if(controller.button === "ArrowUp") {
            
            this.dx += Math.sin(this.theta) * .3
            this.dy += Math.cos(this.theta) * .3

            if(Math.sign(this.dx) === 1 && this.dx > shipMaxDxDy) {
                this.dx = shipMaxDxDy
            } else if (Math.sign(this.dx) === -1 && this.dx < -shipMaxDxDy) {
                this.dx = -shipMaxDxDy
            }

            if(Math.sign(this.dy) === 1 && this.dy > shipMaxDxDy) {
                this.dy = shipMaxDxDy
            } else if (Math.sign(this.dy) === -1 && this.dy < -shipMaxDxDy) {
                this.dy = -shipMaxDxDy
            }
            
        } else if(controller.button === "ArrowDown") {

            this.dx *= .9
            this.dy *= .9

        }

        if (this.x > window.innerWidth * .7 ) {
            this.x = 0
        } else if (this.x < 0) {
            this.x = window.innerWidth * .7
        }
        
        if (this.y > window.innerHeight * .8) {
            this.y = 0
        } else if (this.y < 0) {
            this.y = window.innerHeight * .8
        }

        
    }
}

