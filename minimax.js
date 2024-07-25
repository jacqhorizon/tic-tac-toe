class Game {
    constructor (board, currentTurn) {
        this.over = false
        this.currentTurn = 'x'
        if (currentTurn) {
            this.currentTurn = currentTurn
        }
        this.board = ['','','','','']
        if (board) {
            this.board = board
        }
        if(!this.board.includes('')) {
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
            if(this.board[i] == '') {
                copy[i] = this.currentTurn
                moves.push(new Game(copy, nextTurn))
            }
        }
        return moves
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
    if(game.over) {
        console.log(game)
        // console.log('game over')
        return score(game)
    }
    let scores = []
    let moves = []
    game.nextMoves().forEach(element => {
        // console.log(element)
        scores.push(minimax(element))
        moves.push(element)
    });
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

let test = new Game(['x','o', '','', ''])

minimax(test)
console.log('choice=', choice)
