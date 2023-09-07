import { GameObject} from "./GameObject.js";
import { gameObjects, $gameMap } from "../variables.js";
import { Bullet } from "../bullet.js";

export class Tank extends GameObject {
    GUN_POSITION = 28;
    constructor(x, y, base) {
        super(x, y);
        this.base = base;
        this.canShot = true;
        this.alive = true;
        this.respawn = this.respawn.bind(this);
    }
    shot() {
        if (this.alive && this.canShot && gameObjects.includes(this)) {
            switch (this.direction.name) {
                case 'TOP':
                    new Bullet(this.x + this.GUN_POSITION, this.y, this.direction, this);
                    this.canShot = false;
                    break;
                case 'RIGHT':
                    new Bullet(this.x + this.size, this.y + this.GUN_POSITION, this.direction, this);
                    this.canShot = false;
                    break;
                case 'DOWN':
                    new Bullet(this.x + this.GUN_POSITION, this.y + this.size, this.direction, this);
                    this.canShot = false;
                    break;
                case 'LEFT':
                    new Bullet(this.x, this.y + this.GUN_POSITION, this.direction, this);
                    this.canShot = false;
                    break;
            }
        }
    }
    destruction() {
        super.destruction();
        setTimeout(this.respawn, 1500);
    }
    respawn() {
        this.x = this.base.x;
        this.y = this.base.y;
        this.alive = true;
        this.canShot = true;
        gameObjects.push(this);
        this.render();
        $gameMap.append(this.HTMLLayout);
    }
}