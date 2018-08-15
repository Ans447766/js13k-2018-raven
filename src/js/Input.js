
function distance(p1, p2) {
    return Math.sqrt(distfast(p1, p2));
}

function distfast(p1, p2) {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    return dx * dx + dy * dy;
}

function r2d(r) {
    return Math.floor(r * 3600 / Math.PI / 2) / 10;
}

function d2r(d) {
    return d * Math.PI * 2 / 360;
}

class Input {
    constructor(handlers) {
        // Raw key code state
        this.keys = [];

        // Map keys to in-game inputs
        this.map = [];
        this.map[87] = 'up';       // W
        this.map[83] = 'down';     // A
        this.map[65] = 'left';     // S
        this.map[68] = 'right';    // D
        this.map[38] = 'up';       // UpArrow
        this.map[40] = 'down';     // DownArrow
        this.map[37] = 'left';     // LeftArrow
        this.map[39] = 'right';    // RightArrow

        // Toggle mouse lock
        this.map[80] = 'mouselock';

        // Key press handlers
        this.handlers = handlers;

        // Mouse location
        this.virtualMove = [];
        this.virtualX = 0;
        this.virtualY = 0;
        this.mouseAngle = 0;
    }

    init() {
        document.addEventListener('keydown', event => {
            var k = this.map[event.keyCode];

            console.log(event.keyCode);

            // Raw key state (let's delete this)
            this.keys[event.keyCode] = true;

            if (k) {
                // Some keys are "stateful" (we evaluate each frame whether they are stil
                // held down), other keys are more like events (we want to do something
                // specific one time on key press). Provide an API for both.
                //
                // Note: this is not only useful, it's also required in some cases -- for
                // example, the requestPointerLock() API call is ignored unless it is
                // triggered by a user input event.
                this[k] = true;
                if (this.handlers[k]) {
                    this.handlers[k]();
                }
            }
        });

        document.addEventListener('keyup', event => {
            this.keys[event.keyCode] = undefined;

            if (this.map[event.keyCode]) {
                this[this.map[event.keyCode]] = undefined;
            }
        });

        document.addEventListener('mousemove', event => {
            this.handlers['mousemove'](event.movementX, event.movementY);
        });

        return this;
    }
}
