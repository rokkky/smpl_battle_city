import { GameObject } from "./abstract_classes/GameObject.js";

export class Wall extends GameObject {
    constructor(x, y) {
        super(x, y);
        this.speed = 0;
        this.HTMLLayout.classList.add('game-object__wall');
    }
}