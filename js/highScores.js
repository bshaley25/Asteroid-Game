const ul = document.querySelector('ul')
const a = document.querySelector('a')
a.innerText = '<-- Go Back To Game'

fetch('https://asteroid-backend.herokuapp.com/')
.then(res => res.json())
.then(highScoreListItems)

function highScoreListItems(data) {
    sortHighScores(data)
    .map(createHighScoreList)
}

function sortHighScores(data) {
    return data.map(obj => obj.score)
}

function createHighScoreList(score) {
    const li = document.createElement('li')
    li.innerText = score
    ul.appendChild(li)
}



