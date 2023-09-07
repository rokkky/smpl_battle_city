import { Tank } from "./abstract_classes/Tank.js";
import { DIRECTIONS } from "./variables.js";
import { updateEnemyTanksCount } from "./main.js";

export class EnemyTank extends Tank {
    constructor(x, y, base) {
        super(x, y, base);
        this.HTMLLayout.classList.add('game-object__enemy-tank');
        this.direction = DIRECTIONS[2];
    }
    move() {
        if (super.move() === false) {
            this.direction = DIRECTIONS[this.AIGenerator()];
        }
        this.shot()
    }
    AIGenerator() {
        let min = 0;
        let max = 3;
        let rand = min + Math.random() * (max + 1 - min);
        return Math.floor(rand)
    }
    destruction() {
        super.destruction();
        updateEnemyTanksCount();
    }
    respawn() {
        this.direction = DIRECTIONS[this.AIGenerator()];
        super.respawn();
    }
}