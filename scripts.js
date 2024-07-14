// alert('You successfully linked your JavaScript file!');

function startGame(params) {
  let container = document.getElementById('container')
  let turns = document.createElement('div')
  turns.id='turns'
  let xTurn = document.createElement('p')
  xTurn.id ='x-turn'
  xTurn.className = 'current-turn'
  xTurn.innerHTML = 'X Turn'
  turns.appendChild(xTurn)
  let oTurn = document.createElement('p')
  oTurn.innerHTML = 'O Turn'
  oTurn.id = 'o-turn'
  turns.appendChild(oTurn)
  container.appendChild(turns)
  for (let i = 0; i < 9; i++) {
    let id = 'b' + i
    let newButton = document.createElement('input')
    newButton.id = id
    newButton.className = 'cell'
    newButton.type = 'text'
    newButton.addEventListener('click', (e) => {
      move(e.target.id)
      evaluateGame()
    })
    container.appendChild(newButton)
  }
}

var xTurn = true
function move(id) {
  var value
  if (xTurn) {
    value = 'X'
  } else {
    value = 'O'
  }
  document.getElementById(id).value = value
  document.getElementById(id).disabled = true
  xTurn = !xTurn

  if (xTurn) {
    document.getElementById('x-turn').classList.add('current-turn')
    document.getElementById('o-turn').classList.remove('current-turn')
  } else {
    document.getElementById('o-turn').classList.add('current-turn')
    document.getElementById('x-turn').classList.remove('current-turn')
  }
}

var winner
function evaluateGame() {
    console.log('evaluate')
  var arr = []
  for (let i = 0; i < 9; i++) {
    var id = 'b' + i
    // console.log(id)
    arr.push(document.getElementById(id).value)
  }
  var value
  if (xTurn) {
    value = 'OOO'
    winner = 'O'
  } else {
    value = 'XXX'
    winner = 'X'
  }
  let winMap = [
    //horizontals
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    //verticals
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
  ]
  for (let x = 0; x < winMap.length; x++) {
    let sum = ''
    for (let i = 0; i < winMap[x].length; i++) {
      sum += arr[winMap[x][i]]
    }
    if (sum === value) {
      console.log(winner + ' wins!')
      const node = document.createTextNode(winner + ' wins')
      document.getElementById('end-text').appendChild(node)
      document.getElementById('end').style.visibility = 'visible'
    }
  }

  console.log(arr)
  //   console.log('this will check if the game is won')
}

function reset() {
  for (let i = 0; i < 9; i++) {
    var id = 'b' + i
    // console.log(id)
    document.getElementById(id).value = ''
    document.getElementById(id).disabled = false
    document.getElementById('end').style.visibility = 'hidden'
  }
}

function toTitle() {
  reset()
  window.location.href = '../index.html'
}
