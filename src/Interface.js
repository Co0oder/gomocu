const blessed = require('blessed');


class Interface {
    constructor() {
        this.blessed = blessed;
        this.screen = blessed.screen();
        this.init();
    }

    init() {
        if (this.gameBox) {
            this.gameBox.detach();
        }
        this.gameBox = this.createGameBox();
        this.tails = this.createTails();
    }

    createTails() {
        return [...new Array(15)].map(
            (_,i) => [...new Array(15)].map (
                (_,j) => this.blessed.box({
                    parent: this.gameBox,
                    top: i*5,
                    left: j*10,
                    width: 10,
                    height: 5
                })
            )
        );
    }

    clearTail(tail) {
        tail.children.map(child => child.detach());
    }

    fillTail(tail, tailMap) {
        for(const [i,row] of tailMap.entries()) {
            for(const [j,color] of row.entries()) {
                blessed.box({
                    parent: tail,
                    top: i,
                    left: 2*j,
                    width: 2,
                    height: 1,
                    style: {
                      fg: color,
                      bg: color,
                    },
                });
            }
        }
    }

    updateTailByCoordinates(x,y, taleMap) {
        const tail = this.tails[x][y];
        this.clearTail(tail);
        this.fillTail(tail, taleMap);
    }


    createGameBox() {
        return this.blessed.box({
            parent: this.screen,
            top: 1,
            left: 0,
            width: '100%',
            height: '100%-1',
            style: {
                fg: 'black',
                bg: 'black',
            },
        });
    }

    createGameOverBox(content, color) {
        return {
            parent: this.screen,
            top: 'center',
            left: 'center',
            width: 40,
            height: 12,
            tags: true,
            valign: 'middle',
            content: content,
            border: {
              type: 'line',
            },
            style: {
              fg: 'black',
              bg: color,
              border: {
                fg: 'black',
              },
            },
          };
      }

    bindHandlers(keyPressHandler, quitHandler, enterHandler) {
        this.screen.on('keypress', keyPressHandler);
        this.screen.key(['escape', 'q', 'C-c'], quitHandler);
        this.screen.key(['enter'], enterHandler);
    }

    gameOverScreen(winner) {
        this.gameBox.detach();
        const content = `{center}User ${winner ? 'Two' : 'One'} won!!!\n\nPress "R" to restart{/center}`;
        const color = winner ?  'yellow' : 'cyan';
        const gameOverBox = this.createGameOverBox(content, color);
        this.gameBox = this.blessed.box(gameOverBox);

      }

    render() {
        this.screen.render();
    }
}

module.exports = {
    Interface,
}