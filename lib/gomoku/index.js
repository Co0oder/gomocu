const BOARD_WIDTH = 15;
const BOARD_HEIGHT = 15;
const FIRST_PLAYER_INDICATOR = '0';
const SECOND_PLAYER_INDICATOR = '1';
const EMPTY_NOTATION = '';
const WIN_SCORE = 5;

const DIRECTIONS = {
    horizontal: [0,1],
    vertical: [1,0],
    rightToLeft: [-1,1],
    LeftToRight: [1,1]
}

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
        this.gameOver = this.checkForGameOver(y,x);
        this.movesCounter++;
        return true;
    }

    checkForGameOver(y,x) {
        const identifier = this.state[y][x];
        const minX = x > WIN_SCORE - 1 ? x - (WIN_SCORE-1) : 0;
        const maxX = this.#width - x < WIN_SCORE ? this.#width - 1 : x + WIN_SCORE - 1;
        const minY = y > WIN_SCORE - 1 ? y - (WIN_SCORE-1) : 0;
        const maxY = this.#height - y < WIN_SCORE ? this.#height - 1 : y + WIN_SCORE - 1;
        let i = minY, j = minX;
        while (i < maxY && j < maxX) {
            let acc = [0, 0, 0, 0];
            for(let q = 0; q < WIN_SCORE*2; q++) {
                if (i === minY && j === minX && maxY - q >= 0 && maxX - q >= 0) {
                    if(this.state[maxY-q][minX+q] === identifier) {
                        acc[2] += 1;
                    }else if(acc[2] < 5) {
                        acc[2] = 0;
                    } else {
                        return true;
                    }
                    if (this.state[maxY-q][maxX-q] === identifier) {
                        acc[3] += 1;
                    } else if(acc[3] < 5) {
                        acc[3] = 0;
                    } else {
                        return true;
                    }
                }
                if (i === y){
                    if (this.state[i][minX+q] === identifier) {
                        acc[0] += 1;
                    } else if(acc[0] < 5) {
                        acc[0] = 0
                    } else {
                        return true;
                    }
                }
                if (j === x){
                    if (this.state[minY+q][j] === identifier) {
                        acc[1] += 1;
                    } else if(acc[1] < 5) {
                        acc[1] = 0
                    } else {
                        return true;
                    }
                }
            }
            if(acc.includes(5)) {
                return true
            }
            i++;
            j++;
        }
        return false;
    }
}

module.exports = {
    Gomocu
}