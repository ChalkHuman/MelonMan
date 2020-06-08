import Entity from "./Entity.js";
import Velocity from "./traits/Velocity.js";
import {loadPlayerSprite} from "./sprites.js";

export function createMelon () {
    return loadPlayerSprite ()
    .then (sprite => {
        const melon = new Entity ();

        melon.addTrait (new Velocity ());

        melon.draw = function drawMelon (context) {
            sprite.draw ("idle", context, this.pos.x, this.pos.y);
        }
        return melon;
    })
}