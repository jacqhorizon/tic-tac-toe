let game

// Used for start button and play again button
function startGame() {
  //Create a new game instance
  let emptyBoard = ['', '', '', '', '', '', '', '', '']
  game = new Game(emptyBoard, 'x')

  //Set UI to reflect new game instance
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

// Used for return to title screen button
function toTitle() {
  document.getElementById('title-screen').style.display = 'flex'
  document.getElementById('end-screen').style.display = 'none'
  document.getElementById('game-screen').style.display = 'none'
}

let choice //Used to store the bot's choice to move

class Game {
  constructor(board, currentTurn) {
    //Default
    this.over = false
    this.currentTurn = 'x'
    this.board = ['', '', '', '', '', '', '', '', '']
    //Update with params
    if (currentTurn) {
      this.currentTurn = currentTurn
    }
    if (board) {
      this.board = board
    }
    //Evaluate if game is over
    if (this.checkWin('x') || this.checkWin('o') || !this.board.includes('')) {
      this.over = true
    }
  }

  move(index) {
    //Update board with given index
    this.board[index] = this.currentTurn
    //Update UI
    var id = 'c' + index
    document.getElementById(id).value = this.currentTurn
    document.getElementById(id).disabled = false
    //Evaluate if game is over
    if (this.checkWin(this.currentTurn)) {
      this.over = true
      document.getElementById('end-text').innerHTML =
        this.currentTurn + ' wins!'
      document.getElementById('end-screen').style.display = 'flex'
    } else {
      //If game is not over, toggle next turn
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
  //After each user move, bot waits 1 second, then moves
  turn(index) {
    this.move(index)
    setTimeout(() => {
      if (!this.over) {
        minimax(this, 0) //Calculates bot move and saves to choice
        this.move(choice) //Bot moves
      }
    }, 1000)
  }

  //Evaluate all possible next moves, used for minimax
  nextMoves() {
    let moves = []
    let nextTurn = 'o'
    if (this.currentTurn == 'o') {
      nextTurn = 'x'
    }
    for (let i = 0; i < this.board.length; i++) {
      if (this.board[i] == '') {
        moves.push(i)
      }
    }
    return moves //return array of indexes
  }

  //Evaluate if player has won
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

//Calculate score of game outcome
const score = (game, depth) => {
  if (game.checkWin('x')) {
    return depth - 10
  } else if (game.checkWin('o')) {
    return 10 - depth
  } else {
    return 0
  }
}

//Calculate optimal move for bot
const minimax = (game, depth) => {
  if (game.over) {
    return score(game, depth)
  }
  depth += 1
  let scores = []
  let moves = []

  let nextTurn = 'o'
  if (game.currentTurn == 'o') {
    nextTurn = 'x'
  }

  game.nextMoves().forEach((element) => {
    //Simulate next move
    let tmp = new Game([...game.board], nextTurn)
    tmp.board[element] = game.currentTurn
    if (tmp.checkWin(tmp.currentTurn)) {
      tmp.over = true
    }
    //Recursively simulate game outcomes and save scores
    scores.push(minimax(tmp, depth))
    moves.push(element)
  })
  //Minimax scores
  if (game.currentTurn == 'o') {
    let max = scores[0]
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
    let min = scores[0]
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
