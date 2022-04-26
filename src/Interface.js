const blessed = require('blessed');


class Interface {
    constructor() {
        this.blessed = blessed;
        this.screen = blessed.screen();

        this.gameOverBox = this.createGameBox();

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

    createGameOverBox() {
        return {
            parent: this.screen,
            top: 1,
            left: 0,
            width: '100%',
            height: '100%-1',
            content: `text`,
            border: {
                type: 'line',
            },
            style: {
                fg: 'black',
                bg: 'black',
            }
        };
      }

    bindHandlers(keyPressHandler, quitHandler, enterHandler) {
        this.screen.on('keypress', keyPressHandler);
        this.screen.key(['escape', 'q', 'C-c'], quitHandler);
        this.screen.key(['enter'], enterHandler);
    }

    gameOverScreen(winner) {
        // const content = `{center}User ${winner ? 'One': 'Two'} won!!!\n\nPress enter to try again{/center}`;
        // const gameOverBox = this.createGameBox(content);
        this.gameBox = this.blessed.box(this.gameOverBox);
        this.render();
      }

    render() {
        this.screen.render();
    }
}

module.exports = {
    Interface,
}