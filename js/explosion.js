class Explosion {

    constructor() {
        this.x = undefined
        this.y = undefined
        this.fx = 0
        this.fy = 0
    }

    draw() {
        c.drawImage(explImage, explWidth * this.fx, explHeight * this.fy, explWidth, explHeight, (this.x - 256/2), (this.y - 256/2), 200, 200);
    }

    update() {

        this.fx++
        if (this.fx == 7) {
            this.fx = 0
            this.fy++  //go to next line once the first sprite sheet row has been exhuasted
            if(this.fy == 7){
                this.fy = 0
            }
        }
    }

}
