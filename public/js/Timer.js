export default class Timer {
    constructor (deltaTime = 1 / 60) {
        let accTime = 0;
        let lastTime = 0;
    
        this.updateProxy = (time) => {
            accTime += (time - lastTime) / 1000;
    
            while (accTime > deltaTime) {
                this.update (deltaTime)
                accTime -= deltaTime;
            }
            lastTime = time;
            this.enqueue ();
        }
    }
    enqueue () {
        requestAnimationFrame (this.updateProxy);
    }
    start () {
        this.enqueue ();
    }
}