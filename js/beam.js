class Beam {

    constructor() {
        this.x = undefined
        this.y = undefined
        this.dx = undefined
        this.dy = undefined

    }

    draw() {
        c.drawImage(beamImage, 300, 45, width, height+20, (this.x - width/2), (this.y - height/2) , scaledWidth, scaledHeight);
    }

    update() {

        if (controller.button === " ") { // if the space button is presses
            this.x = Ship.x
            this.y = Ship.y
            console.log("butts")
        }
    }
}