import Timer from "./Timer.js";
import KeyboardState from "./KeyboardState.js";
import {loadLevel} from "./loaders.js";
import {createMelon} from "./entities.js";
import {createCollisionLayer} from "./layers.js"

const canvas = document.getElementById ("screen");
const context = canvas.getContext ("2d");

Promise.all ([
    createMelon (),
    loadLevel ("1-1")
])
.then (([melon, level]) => {
    const gravity = 2000;
    melon.pos.set (64, 180);

    createCollisionLayer (level);

    level.entities.add (melon);

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

    ["mousedown", "mousemove"].forEach (eventName => {
        canvas.addEventListener (eventName, event => {
            if (event.buttons === 1) {
                melon.vel.set (0, 0);
                melon.pos.set (event.offsetX, event.offsetY);
            }
        });
    });

    const timer = new Timer (1 / 60);

    timer.update = function update (deltaTime) {
        level.update (deltaTime);
        level.comp.draw (context);
        melon.vel.y += gravity * deltaTime; 
    }
    timer.start ();
});