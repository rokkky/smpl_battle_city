import { GameObject} from "./abstract_classes/GameObject.js";
import { gameObjects, $gameMap } from "./variables.js";


export class Bullet extends GameObject {
    size = 8;
    constructor(x, y, direction, shooter) {
        super(x, y);
        this.direction = direction;
        this.shooter = shooter;
        this.HTMLLayout.classList.add('game-object__bullet');
        this.HTMLLayout.style.transform = `rotate(${direction.rotation}deg)`;
        this.speed = 5;
        this.render();
        $gameMap.append(this.HTMLLayout);        
    }
    hit() {        
        if (this.mapLimit()) {
            this.destruction();
            return true
        }

        const target = this.collision();
        
        if (target) {
            if (this.shooter.constructor.name === target.constructor.name) {
                this.destruction();
                return true
            } else {                
                target.destruction();
                this.destruction();
                return true
            }
        }
    }
    move() {
        if (!this.hit()) {
            this[this.direction.axis] = this[this.direction.axis] + (this.speed*this.direction.mark);
        }
    }
    collision() {
        const AXIS = this.direction.axis;
        const objectsOnPath = gameObjects.filter(object => {
            if (object != this.shooter && object != this) {
                return this[AXIS] + (this.speed * this.direction.mark) >= object[AXIS] &&
                this[AXIS] + (this.speed * this.direction.mark) < object[AXIS] + object.size
            }
        });
        return this.checkCoordsCollision(objectsOnPath)
    }
    destruction() {
        super.destruction();
        if (this.shooter.alive) {
            this.shooter.canShot = true;
        }
    }
}