let canvas = document.createElement('canvas')
canvas.width = (window.innerWidth * .9)
canvas.height = (window.innerHeight * .85)
document.body.appendChild(canvas)
const c = canvas.getContext('2d')

const score = document.querySelector('h1')

let asteriodImg = new Image();
asteriodImg.src = '../img/animated_asteroid2.png';
let asteriodArray = []
let astroidNumber = 5
const scale = 1;
const width = 60;
const height = 60;
const scaledWidth = scale * width;
const scaledHeight = scale * height;
const windowWidthScale = (window.innerWidth * .15)
const windowHeightScale = (window.innerHeight * .1)

let shipImage = new Image()
shipImage.src = '../img/spaceShip.png'
const shipScale = 1;
const shipWidth = 64;
const shipeHeight = 64;
const shipScaledWidth =  shipScale * shipWidth;
const shipScaledHeight = shipScale * shipeHeight;
const shipMaxDxDy = 20;

let explImage = new Image()
explImage.src = '../img/boom3.png'
const explScale = 1;
const explWidth = 128;
const explHeight = 128;
const shipExplosion = new Explosion()
let explArray = []

let beamImage = new Image()
beamImage.src = '../img/beams.png'
let beamArray = []


const controller = {
    leftArrow: undefined,
    rightArrow: undefined,
    upArrow: undefined,
    downArrow: undefined,
    spaceButton: undefined,
    shipX: undefined,
    shipY: undefined, 
    crashed: false,
    gameEnd: 0,
    score: 0
}

document.addEventListener('keydown', function(event) {  //event listener for up arrow.
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

function updateScore() {
    c.font = "50px Oxanium";
    c.fillText(`${ship.score}`, 50, 70)
    c.fillStyle = 'White'
    
}

function displayScore() {
    c.font = "100px Oxanium";
    c.fillText(`Your Score: ${ship.score}`, canvas.width/3, canvas.height/2.2)
    c.fillText('Click to save score', canvas.width/3.7, canvas.height/1.7)
    c.fillText('and play again!', canvas.width/3.2, canvas.height/1.4)
    c.fillStyle = 'White'
}

function gameAnimate() {
    
    asteriodArray.forEach(asteriod => {
        if (!asteriod.isHit) {
            asteriod.draw()
            asteriod.update()
        } 
    });
    
    explArray.forEach(explosion => {
        
        if (!explosion.isDone) {
            explosion.draw()
            explosion.update()
        }
    })
    
    beamArray.forEach(beam => {
        beam.draw()
        beam.update()
        beam.delete()   //deletes if lifespan of beam is greater than 60 frames
    })
    
    if (!controller.crashed) {
        ship.draw()
        ship.update()
        updateScore()
    } else {
        shipExplosion.draw()
        shipExplosion.update()
        displayScore()
        
        controller.gameEnd === 0 ? controller.gameEnd++ : null
        controller.gameEnd === 1 ? fire() : null
    }

}

function fire() {
    controller.gameEnd++
}


function animate() {
    
    clearCanvas()
    gameAnimate()
    clearController()
    localStorage.setItem('id', requestAnimationFrame(animate))
}


canvas.addEventListener("click", () => {
    
    if (controller.crashed === true) {
        saveGame()
    } else {
        startgame()
    }
    
})

function saveGame() {

    let currentScore = ship.score

    fetch('https://asteroid-backend.herokuapp.com/')
    .then(res => res.json())
    .then(data => {
        console.log(currentScore)
        let lowestRankedScore = data[data.length - 1].score
        console.log(lowestRankedScore)
        if (currentScore > lowestRankedScore) {
            console.log('highscore threshold met')
            fetch('https://asteroid-backend.herokuapp.com/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({score: currentScore}),
                })
                .then(res => res.json())
        }
    })
    startgame()
}

function startgame() {
    cancelAnimationFrame(localStorage.id)
    astroidNumber = 5
    controller.crashed = false
    controller.gameEnd = 0
    controller.score = 0
    asteriodArray = []
    beamArray = []
    ship = new Ship()
    makeAsteriods()
    animate()
    frontDisplay(false)
}

function frontDisplay(boolean) {
    if (boolean) {
        c.font = "100px Oxanium";
        c.fillStyle = 'White';
        c.fillText(`Click to Start The Game!`, canvas.width/5, canvas.height/2.2)
        c.fill()
    }
}

frontDisplay(true)

