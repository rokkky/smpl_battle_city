import { gameObjects, $gameMap } from "../variables.js";

export class GameObject {
    HTMLLayout = document.createElement('div');
    size = 64;
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.speed = 2;
        this.HTMLLayout.classList.add('game-object');
        gameObjects.push(this);
    }
    render() { //отрисовка
        this.HTMLLayout.style.left = `${this.x}px`;
        this.HTMLLayout.style.top = `${this.y}px`;
    }
    move() { //движение
        this.HTMLLayout.style.transform = `rotate(${this.direction.rotation}deg)`;
        if (this.collision() || this.mapLimit()) {
            return false
        }
        this[this.direction.axis] += (this.speed*this.direction.mark);
    }
    collision() { //возврат объекта с которым пересеклись
        const AXIS = this.direction.axis;
        const objectsOnPath = gameObjects.filter(object => {
            return object[AXIS] === (this[AXIS] + this.size * this.direction.mark);
        })
        return this.checkCoordsCollision(objectsOnPath);
    }
    checkCoordsCollision(objectsOnPath) { //проверка пересечения координат
        const AXIS2 = this.direction.axis === 'x' ? 'y' : 'x';
        for (let obj of objectsOnPath) {
            if (
                (obj[AXIS2] + obj.size >= this[AXIS2] + this.size && this[AXIS2] + this.size > obj[AXIS2]) ||
                (obj[AXIS2] <= this[AXIS2] && this[AXIS2] < obj[AXIS2] + obj.size)
               ) {return obj}
        }
        return false
    }
    mapLimit() {    //Выход за пределы
        switch (this.direction.name) {
            case 'TOP':
                return this.y <= 0 
            case 'RIGHT':
                return this.x + this.size >= $gameMap.offsetWidth 
            case 'DOWN':
                return this.y + this.size >= $gameMap.offsetHeight
            case 'LEFT':
                return this.x <= 0 
        }
    }
    destruction() { //уничтожение
        gameObjects.splice(gameObjects.indexOf(this), 1);
        this.alive = false;
        this.HTMLLayout.remove();
        if (this.constructor.name != 'Bullet') {
            this.explosion();
        }   
    }
    explosion() { //анимация взрыва
        const explosion = document.createElement('div');
        explosion.style.left = `${this.x}px`;
        explosion.style.top = `${this.y}px`;
        explosion.classList.add('explosion');
        $gameMap.append(explosion);
        setTimeout(() => {
            explosion.remove();
        }, 500);
    }
}   
