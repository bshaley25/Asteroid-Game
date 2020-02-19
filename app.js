const canvas = document.createElement('canvas')
canvas.width = (window.innerWidth * .7)
canvas.height = (window.innerHeight * .8)
document.body.appendChild(canvas)
const c = canvas.getContext('2d')

let img = new Image();
img.src = './img/animated_asteroid2.png';
img.onload = function() {
    animate();
};

const asteriodArray = []
const astroidNumber = 20
const scale = 1;
const width = 60;
const height = 60;
const scaledWidth = scale * width;
const scaledHeight = scale * height;
const windowWidthScale = (window.innerWidth * .15)
const windowHeightScale = (window.innerHeight * .1)

const mouse = {
    x: undefined,
    y: undefined
}

canvas.addEventListener('mousemove', function(event){
    mouse.x = (event.x - windowWidthScale);
    mouse.y = (event.y - windowHeightScale)
    console.log(mouse.x, mouse.y)
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


function clearCanvas() {
    c.clearRect(0,0,canvas.width, canvas.height)
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
        c.drawImage(img, width * frameX, height*frameY, width, height, (x - width/2), (y - height/2) , scaledWidth, scaledHeight);
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

function asteriodAnimate() {

    asteriodArray.forEach(asteriod => {
        asteriod.draw()
        asteriod.update()
    });

    a2.draw()
    a2.update()

}

const a2 = new Asteriod(100,100,0,0,0,0,0)


function animate() {

    clearCanvas()

    asteriodAnimate()

    // c.drawImage(img, 0, 0, width, height, 100, 100, scaledWidth, scaledHeight);
    // c.drawImage(img, 0, 60, width, height, 100, 100, scaledWidth, scaledHeight);
    


    requestAnimationFrame(animate)
}
























// const canvas = document.createElement('canvas')
// canvas.width = window.innerWidth
// canvas.height = window.innerHeight
// document.body.appendChild(canvas)
// const c = canvas.getContext('2d')

// let img = new Image();
// img.src = "animated_asteroid2.png";

// c.beginPath()
// c.drawImage(img, 0, 0, 60, 60, 200, 200, 60, 60);
// c.stroke()


// function BallImg (x, y, dx, dy, img) {
//     this.x = x
//     this.y = x
//     this.dx = dx
//     this.dy = dy
//     this.img = img

//     this.drawImage = function() {
//         c.beginPath()
//         // c.drawImage(img, 0, 0, 60, 60, 200, 200, 60, 60);
//         // c.drawImage(img, x, y) //This is for the img
//         c.arc(x, y, 20, 0, 2 * Math.PI)
//         // c.fill()
//         c.stroke()
//     }

//     this.update = function() {
//         x += dx
//         y += dy
        
//         if(x < (0 + 20) || x > (canvas.width - 20)) {
//             dx *= -1
//         }  else if(y < (0 + 20) || y > (canvas.height - 20)) {
//             dy *= -1
//         }
//     }

// }

// let butt = new BallImg(500,400,4,2,1)

// const mouse = {
//     x: undefined,
//     y: undefined
// }
// canvas.addEventListener('mousemove', function(event) {
//     mouse.x = event.x;
//     mouse.y = event.y;
// })

// function clearCanvas() {
//     c.clearRect(0,0,canvas.width, canvas.height)
// }

// function boxAnimation() {
//     butt.drawImage()
//     butt.update()
// }


// function mouseAnimation() {
//     c.beginPath()
//     c.drawImage(mouseImg, mouse.x-(mouseImg.width/2), mouse.y-(mouseImg.height/2))
//     c.stroke()
// }






// function animate() {

//     clearCanvas()

//     boxAnimation()

//     requestAnimationFrame(animate)

//     c.beginPath()
//     c.drawImage(img, 0, 0, 60, 60, 200, 200, 60, 60);
//     c.stroke()
// }

// animate()