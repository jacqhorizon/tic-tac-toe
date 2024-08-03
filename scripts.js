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
    document.getElementById(id).disabled = false
    //Evaluate if game is over
    if (this.checkWin()) {
      document.getElementById('end-text').innerHTML =
        this.currentTurn + ' wins!'
      document.getElementById('end-screen').style.display = 'flex'
      return true
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
      return false
    }
  }
  //After each user move, bot waits 1 second, then moves
  turn(index) {
    let userWin = this.move(index)
    console.log(this.nextMoves())
    setTimeout(() => {
      if (!userWin) {
        //is maximizing when o plays
        let bestScore = -Infinity
        let bestMove
        let nextMoves = this.nextMoves() // array of next moves
        for (const move of nextMoves) {
          let tmpBoard = [...this.board] //copy current board
          tmpBoard[move] = 'o'
          // console.log(tmpBoard)
          let nextGame = new Game(tmpBoard, 'o')
          let score = minimax(nextGame, 0, false)
          // console.log(score)
          if (score > bestScore) {
            bestScore = score
            bestMove = move
          }
        }
        // console.log(bestScore)
        // return bestScore
        // let score = minimax(this, 0) //Calculates bot move and saves to choice
        // console.log(score)
        this.move(bestMove) //Bot moves
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

//Calculate score of game outcome
// const score = (game, depth) => {
//   if (game.checkWin('x')) {
//     return depth - 10
//   } else if (game.checkWin('o')) {
//     return 10 - depth
//   } else {
//     return 0
//   }
// }

let scores = {
  x: -10,
  o: 10,
  tie: 0
}

const score = (result, depth) => {
  if (result == 'x') {
  }
}

//Calculate optimal move for bot
// const minimax = (game, depth) => {
//   if (game.over) {
//     return score(game, depth)
//   }
//   depth += 1
//   let scores = []
//   let moves = []

//   let nextTurn = 'o'
//   if (game.currentTurn == 'o') {
//     nextTurn = 'x'
//   }

//   game.nextMoves().forEach((element) => {
//     //Simulate next move
//     let tmp = new Game([...game.board], nextTurn)
//     tmp.board[element] = game.currentTurn
//     if (tmp.checkWin(tmp.currentTurn)) {
//       tmp.over = true
//     }
//     //Recursively simulate game outcomes and save scores
//     scores.push(minimax(tmp, depth))
//     moves.push(element)
//   })
//   //Minimax scores
//   if (game.currentTurn == 'o') {
//     let max = 0
//     let index = 0
//     scores.forEach((score, i) => {
//       if (score > max) {
//         max = score
//         index = i
//       }
//     })
//     if (max > bestScore) {
//       choice = moves[index]
//       bestScore = max
//     }
//     return max
//   } else {
//     let min = 100
//     let index = 0
//     scores.forEach((score, i) => {
//       if (score < min) {
//         min = score
//         index = i
//       }
//     })
//     // choice = moves[index]
//     return min
//   }
// }

function minimax(tmpGame, depth, isMaximizing) {
  let result = tmpGame.checkWin()
  if (result == 'x') {
    return depth - 10
  } else if (result == 'o') {
    return 10 - depth
  } else if (result == 'tie') {
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
      let score = minimax(nextGame, depth + 1, false)
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
      let score = minimax(nextGame, depth + 1, true)
      bestScore = Math.min(score, bestScore)
    }
    return bestScore
  }
}
