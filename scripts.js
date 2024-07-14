var xTurn = true
var winner = ''

function startGame() {
  document.getElementById('title-screen').style.display = 'none'
  document.getElementById('game-screen').style.display = 'block'
}

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

function evaluateGame() {
  var arr = []
  for (let i = 0; i < 9; i++) {
    var id = 'b' + i
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
  let winFound = false
  let winMap = [
    //horizontals
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    //verticals
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    //diagonals
    [0, 4, 8],
    [6, 4, 2]
  ]

  for (let x = 0; x < winMap.length && !winFound; x++) {
    let sum = ''
    for (let i = 0; i < winMap[x].length; i++) {
      sum += arr[winMap[x][i]]
    }
    if (sum === value) {
      console.log(winner + ' wins!')
      winFound = true
      document.getElementById('end-text').innerHTML = winner + ' wins'
      document.getElementById('end-screen').style.display = 'flex'
    }
  }
  if (!winFound && !arr.includes('')) {
    document.getElementById('end-text').innerHTML = 'Tie!'
    document.getElementById('end-screen').style.display = 'grid'
  }
  console.log(arr)
}

function reset() {
  for (let i = 0; i < 9; i++) {
    var id = 'b' + i
    document.getElementById(id).value = ''
    document.getElementById(id).disabled = false
  }
  xTurn = true
  document.getElementById('end-screen').style.display = 'none'
  document.getElementById('x-turn').classList.add('current-turn')
  document.getElementById('o-turn').classList.remove('current-turn')
}

function toTitle() {
  reset()
  document.getElementById('title-screen').style.display = 'flex'
  document.getElementById('game-screen').style.display = 'none'
}
