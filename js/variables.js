export const gameObjects = [];
export const GAME_TIMER_INTERVAL = 16; // задаёт интервал времени, за который будет выполняться один шаг в игре

export const $gameMap = document.getElementById('game-map');
export const $enemyLifeCounter = document.getElementById('enemy_life_counter')
export const $playerLifeCounter = document.getElementById('player_life_counter')
export const $modal = document.getElementById('modal');
export const $modalText = document.getElementById('modal-text');


export const PLAYER_BASE = {}
export const ENEMY_BASES = []
export const DIRECTIONS = [
    {
        rotation: 360,
        axis: 'y',
        mark: -1,
        name: 'TOP',
        keyCode: 'ArrowUp'
    },
    {
        rotation: 90,
        axis: 'x',
        mark: 1,
        name: 'RIGHT',
        keyCode: 'ArrowRight'
    },
    {
        rotation: 180,
        axis: 'y',
        mark: 1,
        name: 'DOWN',
        keyCode: 'ArrowDown'
    },
    {
        rotation: 270,
        axis: 'x',
        mark: -1,
        name: 'LEFT',
        keyCode: 'ArrowLeft'
    }]