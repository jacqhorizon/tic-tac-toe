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
  document.getElementById('x-turn').className = 'badge text-bg-dark'
  document.getElementById('o-turn').className = 'badge text-bg-light'
  document.getElementById('title-screen').style.display = 'none'
  document.getElementById('end-screen').style.display = 'none'
  document.getElementById('game-screen').style.display = 'block'
  document.getElementById('game-screen').style.pointerEvents = 'auto'
  document.body.style.backgroundColor = ''
  document.getElementById(
    'probability'
  ).innerHTML = 'Click a square to begin'
}

// Used for return to title screen button
function toTitle() {
  document.getElementById('title-screen').style.display = 'flex'
  document.getElementById('end-screen').style.display = 'none'
  document.getElementById('game-screen').style.display = 'none'
  document.body.style.backgroundColor = ''
}

let choice = 3 //Used to store the bot's choice to move
let bestScore = -1000

class Game {
  constructor(board, currentTurn) {
    //Default
    this.currentTurn = 'x'
    this.board = ['', '', '', '', '', '', '', '', '']
    //Update with params
    if (currentTurn) {
      this.currentTurn = currentTurn
    }
    if (board) {
      this.board = board
    }
  }

  // returns true if continue, false if game over
  move(index) {
    //Update board with given index
    this.board[index] = this.currentTurn
    //Update UI
    var id = 'c' + index
    document.getElementById(id).value = this.currentTurn
    document.getElementById(id).disabled = true
    //Evaluate if game is over
    let win = this.checkWin()
    if (win) {
      if (win == 'tie') {
        document.getElementById('end-text').innerHTML = 'You Lose!'
      } else {
        document.getElementById('end-text').innerHTML = 'You Lose!'
      }

      document.getElementById('end-screen').style.display = 'flex'
      document.getElementById('game-screen').classList.remove('losing')
      return true
    } else {
      //If game is not over, toggle next turn
      document.getElementById(
        game.currentTurn.toLowerCase() + '-turn'
      ).className = 'badge text-bg-light'
      if (this.currentTurn == 'x') {
        this.currentTurn = 'o'
      } else {
        this.currentTurn = 'x'
      }
      document.getElementById(
        game.currentTurn.toLowerCase() + '-turn'
      ).className = 'badge text-bg-dark'
      return false
    }
  }
  //After each user move, bot waits 1 second, then moves
  turn(index) {
    let userWin = this.move(index)
    console.log(this.nextMoves())
    document.getElementById('game-screen').style.pointerEvents = 'none'
    setTimeout(() => {
      if (!userWin) {
        //is maximizing when o plays
        let bestScore = -Infinity
        let bestMove
        let nextMoves = this.nextMoves() // array of next moves
        let outcomes = { x: -1, o: 0, tie: 0 }
        for (const move of nextMoves) {
          let tmpBoard = [...this.board] //copy current board
          tmpBoard[move] = 'o'
          let nextGame = new Game(tmpBoard, 'o')
          let score = minimax(nextGame, 0, false, outcomes)
          if (score > bestScore) {
            bestScore = score
            bestMove = move
          }
        }
        this.move(bestMove) //Bot moves
        console.log(
          outcomes,
          outcomes.x / (outcomes.x + outcomes.o + outcomes.tie)
        )
        let probability =
          (outcomes.o + outcomes.tie) / (outcomes.o + outcomes.tie + outcomes.x)
        let winningPercent = probability < 1 ? Math.floor((1 - probability) * 100) : 0

        document.getElementById(
          'probability'
        ).innerHTML = `${winningPercent}% chance of winning`
        if (probability > 0.5) {
          document.body.style.backgroundColor = `rgba(255,0,0,${probability})`
          document.getElementById('game-screen').classList.add('losing')
        }
        document.getElementById('game-screen').style.pointerEvents = 'auto'
      }
    }, 1000)
  }

  //Evaluate all possible next moves, used for minimax
  nextMoves() {
    let moves = []
    // let nextTurn = 'o'
    // if (this.currentTurn == 'o') {
    //   nextTurn = 'x'
    // }
    for (let i = 0; i < this.board.length; i++) {
      if (this.board[i] == '') {
        moves.push(i)
      }
    }
    return moves //return array of indexes
  }

  //Evaluate if player has won
  checkWin() {
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
    let options = ['x', 'o']
    let winnerFound = false
    let winner = null
    for (const opt of options) {
      for (let i = 0; i < winMap.length; i++) {
        const [a, b, c] = winMap[i]
        if (
          this.board[a] === opt &&
          this.board[b] === opt &&
          this.board[c] === opt
        ) {
          winnerFound = true
          winner = opt
        }
      }
    }
    if (!winnerFound && !this.board.includes('')) {
      return 'tie'
    } else {
      return winner
    }
  }
}

//Calculate optimal move for bot
function minimax(tmpGame, depth, isMaximizing, outcomes) {
  let result = tmpGame.checkWin()
  if (result == 'x') {
    outcomes.x += 1
    return depth - 10
  } else if (result == 'o') {
    outcomes.o += 1
    return 10 - depth
  } else if (result == 'tie') {
    outcomes.tie += 1
    return 0
  }
  if (isMaximizing) {
    //is maximizing when o plays
    let bestScore = -Infinity
    let nextMoves = tmpGame.nextMoves() // array of next moves
    for (const move of nextMoves) {
      let tmpBoard = [...tmpGame.board] //copy current board
      tmpBoard[move] = 'o'
      // console.log(tmpBoard)
      let nextGame = new Game(tmpBoard, 'x')
      let score = minimax(nextGame, depth + 1, false, outcomes)
      // console.log(score)
      bestScore = Math.max(score, bestScore)
    }
    return bestScore
  } else {
    //minimizing when 'x' plays
    let bestScore = Infinity
    let nextMoves = tmpGame.nextMoves() // array of next moves
    for (const move of nextMoves) {
      let tmpBoard = [...tmpGame.board] //copy current board
      tmpBoard[move] = 'x'
      let nextGame = new Game(tmpBoard, 'o')
      let score = minimax(nextGame, depth + 1, true, outcomes)
      bestScore = Math.min(score, bestScore)
    }
    return bestScore
  }
}
