const BOARD_WIDTH = 15;
const BOARD_HEIGHT = 15;
const FIRST_PLAYER_INDICATOR = '0';
const SECOND_PLAYER_INDICATOR = '1';
const EMPTY_NOTATION = '';
const WIN_SCORE = 5;

class Gomocu {
	#width = BOARD_WIDTH;
	#height = BOARD_HEIGHT;
    movesCounter = 0;
    gameOver = false;
    firstPlayer = FIRST_PLAYER_INDICATOR;
    secondPlayer = SECOND_PLAYER_INDICATOR;

	constructor() {
		this.state = this.initBoard();
	}

	initBoard() {
		return [...new Array(this.#height)].map(() => [...new Array(this.#width)].map (() => EMPTY_NOTATION));
	}

    getCurrentPlayer() {
        return this.movesCounter % 2 ? this.firstPlayer : this.secondPlayer;
    }

    move(y,x) {
        if (this.gameOver || x < 0 || x > this.#width || y < 0 || y > this.#height || this.state[y][x] !== EMPTY_NOTATION) {
            return false;
        }
        this.state[y][x] = this.movesCounter % 2 ? this.firstPlayer : this.secondPlayer;
        this.gameOver = this.checkForWinner(y,x);
        this.movesCounter++;
        return true;
    }


    checkForWinner(y,x) {
        if (this.rowWinner(y,x)) return true;
        if (this.columnWinner(y,x)) return true;
        if (this.upDiagWinner(y,x)) return true;
        if (this.downDiagWinner(y,x)) return true;
        return false;
      }
    
      rowWinner(y,x) {
        const currentPlayer = this.state[y][x];
    
        let counter = 0;
    
        for (let col = x-4; col <= x+4; col++) {
          if (col < 0) continue;
          if (col >= this.#height) break;
    
          if (this.state[y][col] === currentPlayer) {
            counter += 1;
          } else {
            counter = 0;
          }
    
          if (counter === WIN_SCORE) return true;
        }
      }
    
      columnWinner(y,x) {
        const currentPlayer = this.state[y][x];
    
        let counter = 0;
    
        for (let row = y-4; row <= y+4; row++) {
          if (row < 0) continue;
          if (row >= this.#width) break;
    
          if (this.state[row][x] === currentPlayer) {
            counter += 1;
          } else {
            counter = 0;
          }
    
          if (counter === WIN_SCORE) return true;
        }
      }
    
      upDiagWinner(y,x) {
        const currentPlayer = this.state[y][x];
    
        let counter = 0;
    
        for (let offset = -4; offset <= 4; offset++) {
          const checkRow = y - offset;
          const checkCol = x + offset;
    
          if (checkRow >= this.#height || checkCol < 0) continue;
          if (checkRow < 0 || checkCol >= this.#height) break;
    
          if (this.state[checkRow][checkCol] === currentPlayer) {
            counter += 1;
          } else {
            counter = 0;
          }
    
          if (counter === WIN_SCORE) return true;
        }
      }
    
      downDiagWinner(y,x) {
        const currentPlayer = this.state[y][x];
    
        let counter = 0;
    
        for (let offset = -4; offset <= 4; offset++) {
          const checkRow = y + offset;
          const checkCol = x + offset;
    
          if (checkRow >= this.#height || checkCol >= this.#height) break;
          if (checkRow < 0 || checkCol < 0) continue;
    
          if (this.state[checkRow][checkCol] === currentPlayer) {
            counter += 1;
          } else {
            counter = 0;
          }
    
          if (counter === WIN_SCORE) return true;
        }
      }

}

module.exports = {
    Gomocu
}