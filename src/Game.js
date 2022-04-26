const { Gomocu } = require('../lib/gomoku');

const {
    EMPTY_TAIL,
    FIRST_PLAYER_SELECTED_TAIL,
    SECOND_PLAYER_SELECTED_TAIL,
    FIRST_PLAYER_OCCUPIED_TAIL,
    SECOND_PLAYER_OCCUPIED_TAIL,
    SELECTED_OCCUPIED_TAIL,
    DIRECTION_UP,
    DIRECTION_RIGHT,
    DIRECTION_DOWN,
    DIRECTION_LEFT,
} = require('./constants');

class Pointer {
    constructor() {
        this.x = 0;
        this.y = 0;
    }

    moveUp() {
        const nextPosition = this.x - 1;
        this.x = nextPosition < 0 ? 15 + nextPosition : nextPosition;
    }

    moveDown() {
        const nextPosition = this.x + 1;
        this.x = nextPosition > 14 ? 0 : nextPosition;
    }

    moveLeft() {
        const nextPosition = this.y - 1;
        this.y = nextPosition < 0 ? 15 + nextPosition : nextPosition;
    }

    moveRight() {
        const nextPosition = this.y + 1;
        this.y = nextPosition > 14 ? 0 : nextPosition;
    }

    reset() {
        this.x = 0;
        this.y = 0;
    }

}

class Game {
    constructor(ui) {
        this.ui = ui;
        this.pointer = new Pointer();
        this.ui.bindHandlers(
            this.mowPointer.bind(this),
            this.quit.bind(this),
            this.select.bind(this)
        )
        this.init();
      }

      init() {
        this.gomocu = new Gomocu();
        this.render();
      }

      mowPointer(_, key) {
        if (key.name === DIRECTION_UP || key.name === 'w') {
          this.pointer.moveUp();
          this.render();
        }
        if (key.name === DIRECTION_DOWN || key.name === 's') {
          this.pointer.moveDown();
          this.render();
        }
        if (key.name === DIRECTION_LEFT || key.name === 'a') {
          this.pointer.moveLeft();
          this.render();
        }
        if (key.name === DIRECTION_RIGHT || key.name === 'd') {
          this.pointer.moveRight();
          this.render();
        }

        if (this.gomocu.gameOver && key.name === 'r') {
            this.ui.init();
            this.init();
        }
    }

    select() {
        const success = this.gomocu.move(this.pointer.x,this.pointer.y);
        if(!success) {
            return;
        }
        if(this.gomocu.gameOver) {
            const binaryPlayerNotation = this.gomocu.getCurrentPlayer() === this.gomocu.firstPlayer ? 0 : 1;
            this.ui.gameOverScreen(binaryPlayerNotation);
        }
        this.render();
    }

    quit() {
        process.exit(0)
    }

    render() {
        const state = this.gomocu.state;
        for(const [i,row] of state.entries()) {
            for(const [j, tail] of row.entries()) {
              let tailMap = EMPTY_TAIL;
              const currentPlayer = this.gomocu.getCurrentPlayer();
              if (this.pointer.x === i && this.pointer.y ===j) {
                  if(tail === this.gomocu.firstPlayer || tail == this.gomocu.secondPlayer) {
                      tailMap = SELECTED_OCCUPIED_TAIL;
                  }
                  else {
                      tailMap = currentPlayer === this.gomocu.firstPlayer ? FIRST_PLAYER_SELECTED_TAIL : SECOND_PLAYER_SELECTED_TAIL;
                  }
              } else {
                if (tail === this.gomocu.firstPlayer) {
                    tailMap = FIRST_PLAYER_OCCUPIED_TAIL;
                }
                if (tail === this.gomocu.secondPlayer) {
                    tailMap = SECOND_PLAYER_OCCUPIED_TAIL;
                }
              }
              this.ui.updateTailByCoordinates(i,j,tailMap);
            }
        }
        this.ui.render()
    }
}

module.exports = {
    Game
}