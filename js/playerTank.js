import { Tank } from "./abstract_classes/Tank.js";
import { DIRECTIONS } from "./variables.js";
import { updatePlayerLifeCount } from "./main.js";

export class PlayerTank extends Tank {
    keyPressed = false;
    constructor(x, y, base) {
        super(x, y, base);
        this.HTMLLayout.classList.add('game-object__player-tank');
        this.direction = DIRECTIONS[0];
        this.handleMoveEvent();
    }
    handleMoveEvent() {
        document.addEventListener('keydown', (e) => this.handleKeyDown(e));
        document.addEventListener('keyup', (e) => this.handleKeyup(e));
    }
    move() {
        if (this.keyPressed) super.move()
    }
    handleKeyDown(e) {
        for (let elem of DIRECTIONS) {
            if (e.code === elem.keyCode) {
                e.preventDefault();
                this.direction = elem;
                this.HTMLLayout.style.transform = `rotate(${this.direction.rotation}deg)`;
                this.keyPressed = true;
            } 
        }
        if (e.code === 'Space' && !e.repeat) {
            e.preventDefault()
            this.shot();
        }
    }
    handleKeyup(e) {
        if (e.code === this.direction.keyCode) {
            this.keyPressed = false;
        } else {return}
    }
    destruction() {
        super.destruction();
        updatePlayerLifeCount();
    }
}