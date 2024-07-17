// var xTurn = true
var winner = ''
let game

function startGame() {
  game = new Game()
  game.board.forEach((value, i) => {
    var id = 'c' + i
    document.getElementById(id).value = value
    document.getElementById(id).disabled = false
  })
  document
    .getElementById(game.currentTurn.toLowerCase() + '-turn')
    .classList.add('current-turn')
  document.getElementById('title-screen').style.display = 'none'
  document.getElementById('end-screen').style.display = 'none'
  document.getElementById('game-screen').style.display = 'block'
}

function toTitle() {
  document.getElementById('title-screen').style.display = 'flex'
  document.getElementById('end-screen').style.display = 'none'
  document.getElementById('game-screen').style.display = 'none'
}

class Game {
  constructor() {
    this.board = []
    for (let i = 0; i < 9; i++) {
      this.board.push('')
    }
    this.currentTurn = 'X'
  }

  move(position) {
    console.log('move!')
    //Update game board info
    this.board[position[1]] = this.currentTurn
    //Render move on board
    document.getElementById(position).value = this.currentTurn
    document.getElementById(position).disabled = true
    //Evaluate game status
    if (this.win(this.currentTurn)) {
      this.endGame(false)
    } else if (!this.board.includes('')) {
      this.endGame(true)
    } else {
      //Set the next turn
      document
        .getElementById(this.currentTurn.toLowerCase() + '-turn')
        .classList.remove('current-turn')
      let nextTurn = 'X'
      if (this.currentTurn == 'X') {
        nextTurn = 'O'
      }
      this.currentTurn = nextTurn
      document
        .getElementById(nextTurn.toLowerCase() + '-turn')
        .classList.add('current-turn')
    }
    console.log(this.board)
  }

  win(turn) {
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
      for (let y = 0; y < winMap[x].length; y++) {
        sum += this.board[winMap[x][y]]
      }
      if (sum == this.currentTurn.repeat(3)) {
        return true
      }
    }
    return false
  }

  endGame(tie) {
    let title = this.currentTurn + ' wins'
    if (tie) {
      title = 'Tie!'
    }
    document.getElementById('end-text').innerHTML = title
    document.getElementById('end-screen').style.display = 'flex'
  }
}
