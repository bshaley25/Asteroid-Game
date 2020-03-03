(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

const Ship = require('./ship')

console.log(Ship())

let canvas = document.createElement('canvas')
canvas.width = (window.innerWidth * .7)
canvas.height = (window.innerHeight * .8)
document.body.appendChild(canvas)
const c = canvas.getContext('2d')

let asteriodImg = new Image();
asteriodImg.src = './img/animated_asteroid2.png';

let shipImage = new Image()
shipImage.src = './img/spaceShip.png'


let explostionImage = new Image()
explostionImage.src = './img/boom3.png'

// console.log(document.querySelector('#quantity').value)

let asteriodArray = []
let astroidNumber = document.querySelector('#quantity').value
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
const shipMaxDxDy = 20;

const explostionScale = 1;
const explostionWidth = 128;
const explostionHeight = 128;

const e1 = new Explostion(100,100,0,0)

const controller = {
    button: undefined,
    shipX: undefined,
    shipY: undefined, 
    crashed: false,
    // gameId: undefined
}

document.addEventListener('keydown', function(event) {
    controller.button = event.key
    // console.log(controller.button)
})

function makeAsteriods() {

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

        // console.log("IN MAKE ASTERIODS",x,y,dx,dy)
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

function Explostion(x,y,frameX,frameY) {

    this.x = x
    this.y = x
    this.frameX = 0
    this.frameY = 0

    this.draw = function() {
        c.drawImage(explostionImage, explostionWidth * frameX, explostionHeight * frameY, explostionWidth, explostionHeight, (controller.shipX - 256/2), (controller.shipY - 256/2), 200, 200);
    } 

    this.update = function() {

        frameX++
        if (frameX == 7) {
            frameX = 0
            frameY++  //go to next line once the first sprite sheet row has been exhuasted
            if(frameY == 7){
                frameY = 0
            }
        }
    }
}



function clearCanvas() {
    c.clearRect(0,0,canvas.width, canvas.height)
}

function gameAnimate() {

    if (!controller.crashed) {
        asteriodArray.forEach(asteriod => {
            asteriod.draw()
            asteriod.update()
        });
        // s1.draw()
        // s1.update()

        s2.draw()
        s2.update()

    } else {
        e1.draw()
        e1.update()

    }

}

function clearController() {
    controller.button = undefined
}

function animate() {

    // let now = Date.now()*10
    
    clearCanvas()

    gameAnimate()
    clearController()

    setTimeout(animate, 20)
    
    // requestAnimationFrame(animate)

    // let then = Date.now()*10
    
    // console.log(then, now)
    
}

const restartButton = document.querySelector(".start")

restartButton.addEventListener("click", () => {

    // cancelAnimationFrame(animate)
    astroidNumber = document.querySelector('#quantity').value
    controller.crashed = false
    asteriodArray = []
    // s1 = new Ship(100, 100, 0, 0, 0, 0)
    s2 = new ship()
    makeAsteriods()
    animate()
})

},{"./ship":2}],2:[function(require,module,exports){
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


},{}]},{},[1]);
