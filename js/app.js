let canvas = document.createElement('canvas')
canvas.width = (window.innerWidth * .7)
canvas.height = (window.innerHeight * .8)
document.body.appendChild(canvas)
const c = canvas.getContext('2d')

let asteriodImg = new Image();
asteriodImg.src = './img/animated_asteroid2.png';
let asteriodArray = []
let astroidNumber = document.querySelector('#quantity').value
const scale = 1;
const width = 60;
const height = 60;
const scaledWidth = scale * width;
const scaledHeight = scale * height;
const windowWidthScale = (window.innerWidth * .15)
const windowHeightScale = (window.innerHeight * .1)

let shipImage = new Image()
shipImage.src = './img/spaceShip.png'
const shipScale = 1;
const shipWidth = 64;
const shipeHeight = 64;
const shipScaledWidth =  shipScale * shipWidth;
const shipScaledHeight = shipScale * shipeHeight;
const shipMaxDxDy = 20;

let explImage = new Image()
explImage.src = './img/boom3.png'
const explScale = 1;
const explWidth = 128;
const explHeight = 128;
const shipExplosion = new Explosion()
let explArray = []

let beamImage = new Image()
beamImage.src = './img/beams.png'
let beamArray = []


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

function clearController() {
    controller.button = undefined
}

function gameAnimate() {

    asteriodArray.forEach(asteriod => {

        if (!asteriod.isHit) {
            asteriod.draw()
            asteriod.update()
        }
    });

    explArray.forEach(explosion => {
        explosion.draw()
        explosion.update()
    })

    beamArray.forEach(beam => {
        beam.draw()
        beam.update()
        beam.delete()   //deletes if lifespan of beam is greater than 60 frames
    })

    if (!controller.crashed) {
        ship.draw()
        ship.update()
    } else {
        shipExplosion.draw()
        shipExplosion.update()
    }
}

function animate() {

    clearCanvas()
    gameAnimate()
    clearController()

    localStorage.setItem('id', requestAnimationFrame(animate))

}

const restartButton = document.querySelector(".start")

restartButton.addEventListener("click", () => {

    cancelAnimationFrame(localStorage.id)
    astroidNumber = document.querySelector('#quantity').value
    controller.crashed = false
    asteriodArray = []
    beamArray = []
    ship = new Ship()
    makeAsteriods()
    animate()

})

