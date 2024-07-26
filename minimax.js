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
    if(game.checkWin('x') || game.checkWin('o') || !game.board.includes('')) {
        return 10
    } else if (game.checkWin('o')) {
        return -10
    } else {
        return 0
    }
}

let choice
const minimax = (game) => {
  if (game.over) {
    console.log(game)
    // console.log('game over')
    return score(game)
  }
  let scores = []
  let moves = []

  let nextTurn = 'o'
  if (game.currentTurn == 'o') {
    nextTurn = 'x'
  }

  game.nextMoves().forEach((element) => { //indexes
    // console.log(element)
    let tmp = new Game([...game.board], nextTurn)
    tmp.board[element] = game.currentTurn
    scores.push(minimax(tmp))
    moves.push(element)
  })
  // console.log(scores)
  if (game.currentTurn == 'x') {
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

let test = new Game(['x', 'o', 'x', 'o', '', 'o', 'o', 'x', ''])

minimax(test)
console.log('choice=', choice)

console.log(test)
