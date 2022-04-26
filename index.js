const { Game } = require('./src/Game');
const { Interface } = require('./src/Interface');

const ui = new Interface();
const game = new Game(ui)