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
        copy[i] = this.currentTurn
        moves.push(new Game(copy, nextTurn))
      }
    }
    return moves
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
  let x = 0
  let o = 0
  game.board.forEach((elem) => {
    if (elem == 'x') {
      x++
    } else {
      o++
    }
  })
  if (x > o) {
    return 10
  } else if (x < o) {
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
  game.nextMoves().forEach((element) => {
    // console.log(element)
    scores.push(minimax(element))
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

let test = new Game(['x', 'o', 'x', 'o', '', 'o', 'o', '', ''])

minimax(test)
console.log('choice=', choice)

console.log(test)
