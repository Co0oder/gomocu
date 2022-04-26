const DIRECTION_UP = 'up';
const DIRECTION_RIGHT = 'right';
const DIRECTION_DOWN = 'down';
const DIRECTION_LEFT = 'left';
const EMPTY_TAIL = createEmptyTail('white', '');
const FIRST_PLAYER_SELECTED_TAIL = createEmptyTail('white','yellow');
const SECOND_PLAYER_SELECTED_TAIL = createEmptyTail('white','cyan');
const FIRST_PLAYER_OCCUPIED_TAIL = createOccupiedTail('white', '','yellow');
const SECOND_PLAYER_OCCUPIED_TAIL = createOccupiedTail('white','','cyan');
const SELECTED_OCCUPIED_TAIL = createOccupiedTail('white','red','white');

function createEmptyTail(c1, c2) {
    return [
        [c2,c2,c1,c2,c2],
        [c2,c2,c1,c2,c2],
        [c1,c1,c2,c1,c1],
        [c2,c2,c1,c2,c2],
        [c2,c2,c1,c2,c2]
    ];
}

function createOccupiedTail(c1, c2, c3) {
    return [
        [c2,c2,c1,c2,c2],
        [c2,c3,c3,c3,c2],
        [c1,c3,c3,c3,c1],
        [c2,c3,c3,c3,c2],
        [c2,c2,c1,c2,c2]
    ];
}

module.exports = {
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
}