let canvas = document.createElement('canvas')
canvas.width = (window.innerWidth * .7)
canvas.height = (window.innerHeight * .8)
document.body.appendChild(canvas)
const c = canvas.getContext('2d')

let asteriodImg = new Image();
asteriodImg.src = './img/animated_asteroid2.png';

let shipImage = new Image()
shipImage.src = './img/spaceShip.png'

let explImage = new Image()
explImage.src = './img/boom3.png'

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

const explScale = 1;
const explWidth = 128;
const explHeight = 128;

const e1 = new Explosion()

const controller = {
    button: undefined,
    shipX: undefined,
    shipY: undefined, 
    crashed: false,
}

document.addEventListener('keydown', function(event) {
    controller.button = event.key
})

function makeAsteriods() {
    for(let i=0;i<astroidNumber;i++) {
        asteriodArray.push( new Asteriod() )
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

    if (!controller.crashed) {
        ship.draw()
        ship.update()
    } else {
        e1.draw()
        e1.update()
    }
}

function clearController() {
    controller.button = undefined
}

function animate() {

    clearCanvas()
    gameAnimate()
    clearController()
    requestAnimationFrame(animate)

}

const restartButton = document.querySelector(".start")

restartButton.addEventListener("click", () => {

    cancelAnimationFrame(animate)
    astroidNumber = document.querySelector('#quantity').value
    controller.crashed = false
    asteriodArray = []
    ship = new Ship()
    makeAsteriods()
    animate()
})
