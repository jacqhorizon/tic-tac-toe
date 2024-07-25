let game

function startGame() {
  let emptyBoard = []
  for (let i = 0; i < 9; i++) {
    emptyBoard.push('')
  }
  game = new Game(emptyBoard, 'X')
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
  constructor(board, currentTurn) {
    this.board = board
    this.currentTurn = currentTurn
  }

  move(position) {
    console.log('move!')
    //Update game board info
    this.board[position[1]] = this.currentTurn
    //Render move on board
    document.getElementById(position).value = this.currentTurn
    document.getElementById(position).disabled = true
    // this.nextMoves()
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
      let nextTurn = this.nextTurn()
      this.currentTurn = nextTurn
      document
        .getElementById(nextTurn.toLowerCase() + '-turn')
        .classList.add('current-turn')
    }
    console.log(this.board)
    this.minimax()
    // console.log(this.minimax(new Game(this.board, this.currentTurn)).bind(this))
  }
  nextTurn() {
    if (this.currentTurn == 'X') {
      return 'O'
    } else {
      return 'X'
    }
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
      if (sum == turn.repeat(3)) {
        return true
      }
    }
    return false
  }

  score() {
    if(this.game.win('X')) {
      return 10
    } else if (this.game.win('O')) {
      return -10
    } else {
      return 0
    }
  }

  nextMoves() {
    let arr = []
    for (let i = 0; i < 9; i++) {
      if (this.board[i] == '') {
        let newBoard = [...this.board]
        newBoard[i] = this.currentTurn // O
        let nextMove = new Game(newBoard, this.nextTurn()) //O
        arr.push(nextMove)
      } 
    }
    return arr
  }

  test() {
    if(!this.board.includes('')) {
      return 10
    } else {
      for(let i = 0; i < this.board.length; i++) {
        if (this.board[i] == '') {
          let board = [...this.board]
          board[i] = 'X'
          return new Game(board, 'X')
        }
      }
    }
  }
  minimax() {
    console.log(this)
    // console.log(game)
    if (!this.board.includes('')) { //game over
      return 10
      // return game.score
    } else {
      let arr = []
      // let game = new Game(this.board, this.currentTurn)
      let nextMoves = this.nextMoves() //fix
      nextMoves.forEach((move, index) => {
        console.log(move)
        // arr.push(move.minimax())
        return move.minimax()
      }) //index will be inccorect
      // if (game.currentTurn = 'X') {
        return arr[0] //change to max later
      // }
    }
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

let emptyBoard = []
for (let i = 0; i < 9; i++) {
  emptyBoard.push('')
}
game = new Game(emptyBoard, 'X')
console.log(game.nextMoves())
