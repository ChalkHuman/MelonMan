import SpriteSheet from "./SpriteSheet.js";
import {loadImage} from "./loaders.js";


export function loadPlayerSprite () {
    return loadImage ("/img/characters.png")
    .then  (image => {
        const sprites = new SpriteSheet (image, 16, 16);
        sprites.define ("idle", 0, 0, 16, 16);
        //276, 44
        return sprites;
    });
}

export function loadBackgroundSprites () {
    return loadImage ("/img/tiles.png")
    .then  (image => {
        const sprites = new SpriteSheet (image, 16, 16);
        sprites.defineTile ("ground", 0, 0);
        sprites.defineTile ("sky", 1, 0);
        return sprites;
    });
}