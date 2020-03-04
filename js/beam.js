class Beam {

    constructor() {
        this.x = ship.x
        this.y = ship.y
        this.theta = ship.theta
        this.time = 0
        this.dx = 10
        this.dy = 10

    }

    draw() {
        c.drawImage(beamImage, 169 , 167, 20, 40, (this.x - width/2), (this.y - height/2) , scaledWidth, scaledHeight);
    }

    update() {
        this.x += Math.sin(this.theta)*this.dx
        this.y -= Math.cos(this.theta)*this.dy
        
        this.time++
    }

    delete() {
        if(this.time > 60) {
            this.x = undefined
            this.y = undefined
        }
    }

} 