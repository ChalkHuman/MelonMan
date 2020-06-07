import Entity from "./Entity.js";
import {loadPlayerSprite} from "./sprites.js";

export function createMelon () {
    return loadPlayerSprite ()
    .then (sprite => {
        const melon = new Entity ();

        melon.draw = function drawMelon (context) {
            sprite.draw ("idle", context, this.pos.x, this.pos.y);
        }

        melon.update = function updateMelon (deltaTime) {
            this.pos.x += this.vel.x * deltaTime;
            this.pos.y += this.vel.y * deltaTime;
        }
        return melon;
    })
}