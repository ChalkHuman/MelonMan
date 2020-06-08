import Compositor from "./Compositor.js";
import Entity from "./Entity.js"
import Timer from "./Timer.js";
import {loadLevel} from "./loaders.js";
import {loadBackgroundSprites} from "./sprites.js";
import {createMelon} from "./entities.js";
import {createBackgroundLayer, createSpriteLayer} from "./layers.js";

import KeyboardState from "./KeyboardState.js";

const canvas = document.getElementById ("screen");
const context = canvas.getContext ("2d");

Promise.all ([
    createMelon (),
    loadBackgroundSprites (),
    loadLevel ("1-1")
])
.then (([melon, backgroundSprites, level]) => {
    const comp = new Compositor
    const backgroundLayer = createBackgroundLayer (level.backgrounds, backgroundSprites);

    comp.layers.push (backgroundLayer);

    const gravity = 2000;
    melon.pos.set (64, 180);
    melon.vel.set (200, -600);

    const SPACE = 32;
    const input = new KeyboardState ();
    input.addMapping (SPACE, keyState => {
        if (keyState) {
            melon.jump.start ();
        }
        else {
            melon.jump.cancel ();
        }
        console.log (keyState);
    });
    input.listenTo (window);

    const spriteLayer = createSpriteLayer (melon);
    
    comp.layers.push (spriteLayer);

    const timer = new Timer (1 / 60);

    timer.update = function update (deltaTime) {
        melon.update (deltaTime);
        comp.draw (context);
        melon.vel.y += gravity * deltaTime; 
    }
    timer.start ();
});