const canvas = document.createElement('canvas')
canvas.width = (window.innerWidth * .7)
canvas.height = (window.innerHeight * .8)
document.body.appendChild(canvas)
const c = canvas.getContext('2d')

let asteriodImg = new Image();
asteriodImg.src = './img/animated_asteroid2.png';

let shipImage = new Image()
shipImage.src = './img/spaceShip.png'

const asteriodArray = []
const astroidNumber = 3
const scale = 1;
const width = 60;
const height = 60;
const scaledWidth = scale * width;
const scaledHeight = scale * height;
const windowWidthScale = (window.innerWidth * .15)
const windowHeightScale = (window.innerHeight * .1)

const shipScale = 1;
const shipWidth = 64;
const shipeHeight = 64;
const shipScaledWidth =  shipScale * shipWidth;
const shipScaledHeight = shipScale * shipeHeight;
const shipMaxDxDy = 5;


const controller = {
    button: undefined
}

document.addEventListener('keydown', function(event) {
    controller.button = event.key
    // console.log(controller.button)
})

for(let i=0;i<astroidNumber;i++) {
    let x = (Math.random() * (canvas.width - (width*2)) + (width*2))
    let y = (Math.random() * (canvas.height- (height*3)) + (height*2))
    let dx = (Math.random() * 10) - 5 
    let dy = (Math.random() * 10) - 5
    let frameX = Math.floor( Math.random() * 6 )
    let frameY = Math.floor( Math.random()* 1.99 )
    let spinSpeed = Math.floor( Math.random()* 10 ) + 3
    let frameNumber = Math.floor( Math.random()* 6 )
    
    asteriodArray.push( new Asteriod(x,y,dx,dy,frameX,frameY, spinSpeed, frameNumber) )
    
}


function Asteriod( x, y, dx, dy, frameX, frameY, spinSpeed, frameNumber) {
    
    this.x = x
    this.y = y
    this.dx = dx
    this.dy = dy
    this.frameX = frameX
    this.frameY = frameY
    this.spinSpeed = spinSpeed
    this.frameNumber = frameNumber
    
    this.draw = function() {
        c.drawImage(asteriodImg, width * frameX, height * frameY, width, height, (x - width/2), (y - height/2) , scaledWidth, scaledHeight);
    }
    
    this.update = function() {
        
        
        if (frameNumber % spinSpeed == 0) {
            if(frameX == 15) {
                frameX = 0
            } else {
                frameX++
            }
        }
        
        if(x < (width/2) || x > (canvas.width - (width/2))) {
            dx = -dx
            
        }
        if(y < (height/2) || y > (canvas.height - (height/2))) {
            dy = -dy
        }
        
        frameNumber++
        x+=dx
        y+=dy
        
    }
}


function Ship(x,y,dx,dy, frameX, frameY) {
    
    
    this.x = x
    this.y = y
    this.dx = dx 
    this.dy = dy
    this.frameX = frameX
    this.frameY = frameY
    
    this.draw = function() {
        c.drawImage(shipImage, shipWidth * frameX, shipWidth * frameY, shipWidth, shipeHeight, (x - shipWidth/2), (y - shipeHeight/2), shipScaledWidth, shipScaledHeight);
    }
    
    this.update = function () {
        
        let theta = (((5 * frameX) + (30 * frameY)) * Math.PI/180)
        
        x+=dx
        y+=dy
        
        
        if (controller.button === "ArrowRight") {
            frameX++
            if (frameX == 6) {
                frameX = 0
                frameY++  //go to next line once the first sprite sheet row has been exhuasted
                if(frameY == 12){
                    frameY = 0
                }
            }
        }
        
        if (controller.button === "ArrowLeft") {
            frameX--
            if (frameX ==  -1) {
                frameX = 5
                frameY--   //go to previous line once the first sprite sheet row has been exhuasted
                if(frameY == -1){
                    frameY = 11
                }
            }
        }
        
        if(controller.button === "ArrowUp") {
            console.log(theta, Math.sin(theta), Math.cos(theta), dx, dy)
            dx += Math.sin(theta) * .2
            dy -= Math.cos(theta) * .2

            if(Math.sign(dx) === 1 && dx > 5) {
                dx = 5
            } else if (Math.sign(dx) === -1 && dx < -5) {
                dx = -5
            }

            if(Math.sign(dy) === 1 && dy > 5) {
                dy = 5
            } else if (Math.sign(dy) === -1 && dy < -5) {
                dy = -5
            }

        }
        
        if(controller.button === "ArrowDown") {

            if(Math.sign(dx) === 1) {
                dx -= .5
            } else if (Math.sign(dx) === -1) {
                dx += .5
            }

            if(Math.sign(dy) === 1) {
                dy *= .5
            } else if (Math.sign(dy) === -1) {
                dy *= .5
            }

        }
        
        
        if (x > window.innerWidth ) {
            x = 0
        } else if (x < 0) {
            x = window.innerWidth - 200
        }
        
        if (y > window.innerHeight) {
            y = 0
        } else if (y < 0) {
            y = window.innerHeight - 100
        }
        
    }
}



function clearCanvas() {
    c.clearRect(0,0,canvas.width, canvas.height)
}

function gameAnimate() {
    
    asteriodArray.forEach(asteriod => {
        asteriod.draw()
        asteriod.update()
    });
    
    s1.draw()
    s1.update()
    
}

function clearController() {
    controller.button = undefined
}

const s1 = new Ship(100,100,0,0,0,0)

function animate() {
    
    
    clearCanvas()
    
    gameAnimate()
    clearController()
    
    requestAnimationFrame(animate)
}

document.body.onload = function() {
    animate();
};


