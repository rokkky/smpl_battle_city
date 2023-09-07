import { MAP, MAP_LEGEND } from "./map.js";
import { Wall } from "./wall.js";
import { gameObjects, GAME_TIMER_INTERVAL, $gameMap, $enemyLifeCounter, $playerLifeCounter, $modal, $modalText, PLAYER_BASE, ENEMY_BASES} from "./variables.js";
import { EnemyTank } from "./enemyTank.js";
import { PlayerTank } from "./playerTank.js";

let PLAYER_LIFE_COUNT = 3;
let ENEMY_TANKS_COUNT = 21;
let IS_GAME_OVER = false;


document.addEventListener('click', restart);

gameInitialization();

gameLoop();


function gameInitialization() {
    let mapX = 0;
    let mapY = 0;
    let BASE_NUMBER = 0;
    for (let i = 0; i < MAP.length; i++) {
        for (let j = 0; j < MAP[i].length; j++) {
            switch (MAP[i][j]) {
                case MAP_LEGEND.PLAYER_BASE:
                    PLAYER_BASE.x = mapX;
                    PLAYER_BASE.y = mapY;
                    $gameMap.append(new PlayerTank(mapX, mapY, PLAYER_BASE).HTMLLayout);
                    break;
                case MAP_LEGEND.ENEMY_BASE:
                    ENEMY_BASES.push({x: mapX, y: mapY});
                    $gameMap.append(new EnemyTank(mapX, mapY, ENEMY_BASES[BASE_NUMBER]).HTMLLayout);
                    ++BASE_NUMBER;
                    break;
                case MAP_LEGEND.WALL:
                    $gameMap.append(new Wall(mapX, mapY).HTMLLayout);
                    break;
                default:
                    break;
                }
            mapX += 64;
        }
        mapX = 0;
        mapY += 64;
    }
    for (let i = 0; i < PLAYER_LIFE_COUNT; i++) {
        $playerLifeCounter.innerHTML += '<img class="player_life" src="img/player_life.png">'
    }
    for (let i = 0; i < ENEMY_TANKS_COUNT; i++) {
        $enemyLifeCounter.innerHTML += '<img class="enemy_life" src="img/enemy-tank.png">'
    }
}

function gameLoop() {
    if (IS_GAME_OVER !== true) {
        gameStep();

    setTimeout(function() {
        gameLoop()
    }, GAME_TIMER_INTERVAL);
    }
}

function gameStep() {
    if (!PLAYER_LIFE_COUNT) {
        IS_GAME_OVER = true;
        $modal.style.display = "flex";
        $modalText.innerHTML = "you lose!"
    } else if (!ENEMY_TANKS_COUNT) {
        IS_GAME_OVER = true;
        $modal.style.display = "flex";
        $modalText.innerHTML = "you win!"

    }
    for (let obj of gameObjects) {
        if (obj.speed > 0) {
            obj.move();
        }
        obj.render();
    }
}

function restart(e) {
    if(e.target.id === "modal-button") {
        $modal.style.display = "none";
        PLAYER_LIFE_COUNT = 3;
        ENEMY_TANKS_COUNT = 21;
        gameObjects.length = 0;
        $gameMap.innerHTML = '';
        $enemyLifeCounter.innerHTML = '';
        $playerLifeCounter.innerHTML = '';
        IS_GAME_OVER = false;
        gameInitialization();
        gameLoop();
    }
}

export function updatePlayerLifeCount() {
    --PLAYER_LIFE_COUNT
    $playerLifeCounter.lastChild.remove()
}

export function updateEnemyTanksCount() {
    --ENEMY_TANKS_COUNT
    $enemyLifeCounter.lastChild.remove()
}

