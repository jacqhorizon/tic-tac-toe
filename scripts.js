let game

function startGame() {
  let emptyBoard = []
  for (let i = 0; i < 9; i++) {
    emptyBoard.push('')
  }
  game = new Game(emptyBoard, 'x')
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

let choice
class Game {
  constructor(board, currentTurn) {
    this.over = false
    this.currentTurn = 'x'
    if (currentTurn) {
      this.currentTurn = currentTurn
    }
    this.board = ['', '', '', '', '']
    if (board) {
      this.board = board
    }
    if (this.checkWin('x') || this.checkWin('o') || !this.board.includes('')) {
      this.over = true
    }
  }

  move(index) {
    this.board[index] = this.currentTurn
    var id = 'c' + index
    document.getElementById(id).value = this.currentTurn
    document.getElementById(id).disabled = false
    if (this.checkWin(this.currentTurn)) {
      this.over = true
      document.getElementById('end-text').innerHTML =
        this.currentTurn + ' wins!'
      document.getElementById('end-screen').style.display = 'flex'
    } else {
      document
        .getElementById(game.currentTurn.toLowerCase() + '-turn')
        .classList.remove('current-turn')
      if (this.currentTurn == 'x') {
        this.currentTurn = 'o'
      } else {
        this.currentTurn = 'x'
      }
      document
        .getElementById(game.currentTurn.toLowerCase() + '-turn')
        .classList.add('current-turn')
    }
  }

  turn(index) {
    this.move(index)
    setTimeout(() => {
      if (!this.over) {
        minimax(this)
        this.move(choice)
      }
      console.log(this)
    }, 1000)
  }
  nextMoves() {
    let moves = []
    let nextTurn = 'o'
    if (this.currentTurn == 'o') {
      nextTurn = 'x'
    }
    for (let i = 0; i < this.board.length; i++) {
      let copy = [...this.board]
      if (this.board[i] == '') {
        // copy[i] = this.currentTurn
        // moves.push(new Game(copy, nextTurn))
        moves.push(i)
      }
    }
    return moves //return array of indexes
  }

  checkWin(currentPlayer) {
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
    for (let i = 0; i < winMap.length; i++) {
      const [a, b, c] = winMap[i]
      if (
        this.board[a] === currentPlayer &&
        this.board[b] === currentPlayer &&
        this.board[c] === currentPlayer
      ) {
        return true
      }
    }
    return false
  }
}

//game must be over to score
const score = (game) => {
  if (game.checkWin('x')) {
    return 10
  } else if (game.checkWin('o')) {
    return -10
  } else {
    return 0
  }
}

const minimax = (game) => {
  if (game.over) {
    return score(game)
  }
  let scores = []
  let moves = []

  let nextTurn = 'o'
  if (game.currentTurn == 'o') {
    nextTurn = 'x'
  }

  game.nextMoves().forEach((element) => {
    //indexes
    let tmp = new Game([...game.board], nextTurn)
    tmp.board[element] = game.currentTurn
    scores.push(minimax(tmp))
    moves.push(element)
  })
  if (game.currentTurn == 'o') {
    let max = 0
    let index = 0
    scores.forEach((score, i) => {
      if (score > max) {
        max = score
        index = i
      }
    })
    choice = moves[index]
    return max
  } else {
    let min = 0
    let index = 0
    scores.forEach((score, i) => {
      if (score < min) {
        min = score
        index = i
      }
    })
    choice = moves[index]
    return min
  }
}

function endGame(tie) {
  let title = this.currentTurn + ' wins'
  if (tie) {
    title = 'Tie!'
  }
  document.getElementById('end-text').innerHTML = title
  document.getElementById('end-screen').style.display = 'flex'
}
