class Beam {

    constructor() {
        this.x = 100
        this.y = 100
        this.dx = undefined
        this.dy = undefined

    }

    draw() {
        c.drawImage(beamImage, 300, 45, width, height+20, (this.x - width/2), (this.y - height/2) , scaledWidth, scaledHeight);
    }

    update{

        if (controller.button === "Space") {
            
        }

    }


}