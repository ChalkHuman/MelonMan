const PRESSED = 1;
const RELEASED = 0;

export default class KeyboardState {
    constructor () {
        //holds current state of given key
        this.keyStates = new Map ();

        //holds callback functions for keycode
        this.keyMap = new Map ();
    }
    addMapping (keycode, callback) {
        this.keyMap.set (keycode, callback);
    }
    handleEvent (event) {
        const {keyCode} = event;
        if (!this.keyMap.has (keyCode)) {
            //key not mapped
            return;
        }
        event.preventDefault ();

        const keyState = event.type === "keydown" ? PRESSED : RELEASED;

        if (this.keyStates.get (keyCode) === keyState) {
            return;
        }

        this.keyStates.set (keyCode, keyState);
        console.log (this.keyStates);
        this.keyMap.get (keyCode) (keyState);
    }
    listenTo (window) {
        ["keydown", "keyup"].forEach (eventName => {
            window.addEventListener (eventName, event => {
                this.handleEvent (event);
            });
        });
    }
}