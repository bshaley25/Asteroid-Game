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
    }

}



// function Asteriod( x, y, dx, dy, frameX, frameY, spinSpeed, frameNumber) {
    
//     this.x = x
//     this.y = y
//     this.dx = dx
//     this.dy = dy
//     this.frameX = frameX
//     this.frameY = frameY
//     this.spinSpeed = spinSpeed
//     this.frameNumber = frameNumber
    
//     this.draw = function() {
//         c.drawImage(asteriodImg, width * frameX, height * frameY, width, height, (x - width/2), (y - height/2) , scaledWidth, scaledHeight);
//     }
    
//     this.update = function() {        
        
//         if (frameNumber % spinSpeed == 0) {
//             if(frameX == 15) {
//                 frameX = 0
//             } else {
//                 frameX++
//             }
//         }
        
//         if(x < (width/2) || x > (canvas.width - (width/2))) {
//             dx = -dx
            
//         }
//         if(y < (height/2) || y > (canvas.height - (height/2))) {
//             dy = -dy
//         }

//         if( (Math.abs(controller.shipX - x) < 40) && (Math.abs(controller.shipY - y) < 40) ) {
//             controller.crashed = true
//         }
        
//         frameNumber++
//         x+=dx
//         y+=dy

//         console.log("IN UPDATE",dx,dy)
        
//     }
// }