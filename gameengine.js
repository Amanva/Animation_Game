class GameEngine {
    constructor(options) {
        // What you will use to draw
        // Documentation: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
        this.ctx = null;

        // Everything that will be updated and drawn each frame
        this.entities = [];
        // Information on the input
        this.left = false;
        this.right = false;
        this.up = false;
        this.down = false;
        this.E = false;
        this.digit1 = false;
        this.digit2 = false;
        this.digit3 = false;
        this.digit4 = false;
        this.attack = false;
        this.jump = false;
        this.Q = false;
        this.click = null;
        this.mouse = null;
        this.wheel = null;
        this.activeCanvas = true;
        this.keys = {};
        // Options and the Details
        this.options = options || {
            debugging: false,
        };
        
    };
    init(ctx) {
        this.ctx = ctx;
        document.getElementById("gameWorld").style.cursor = "none";
        this.startInput();
        this.timer = new Timer();
    };

    start() {
        var that = this;
        const gameLoop = () => {
            this.loop();
            requestAnimFrame(gameLoop, that.ctx.canvas);
        };
        gameLoop();
    };

    startInput() {
        const getXandY = e => ({
            x: e.clientX - this.ctx.canvas.getBoundingClientRect().left,
            y: e.clientY - this.ctx.canvas.getBoundingClientRect().top
        });
        
        this.ctx.canvas.addEventListener("mousemove", e => {
            if (this.options.debugging) {
                console.log("MOUSE_MOVE", getXandY(e));
            }
            this.mouse = getXandY(e);
        });

        this.ctx.canvas.addEventListener("click", e => {
            if (this.options.debugging) {
                console.log("CLICK", getXandY(e));
            }
            this.click = getXandY(e);

            this.attack = true;
        });
        this.ctx.canvas.addEventListener("mouseup", e => {
            if (this.options.debugging) {
                console.log("CLICK", getXandY(e));
            }
            // this.click = getXandY(e);
           this.attack = false;


        });
        this.ctx.canvas.addEventListener("wheel", e => {
            if (this.options.debugging) {
                console.log("WHEEL", getXandY(e), e.wheelDelta);
            }
            e.preventDefault(); // Prevent Scrolling
            this.wheel = e;
        });
        this.ctx.canvas.addEventListener("contextmenu", e => {
            if (this.options.debugging) {
                console.log("RIGHT_CLICK", getXandY(e));
            }
            e.preventDefault(); // Prevent Context Menu
            this.rightclick = getXandY(e);
        });

        // this.ctx.canvas.addEventListener("keydown", event => this.keys[event.key] = true);
        // this.ctx.canvas.addEventListener("keyup", event => this.keys[event.key] = false);
        var that = this;

        this.ctx.canvas.addEventListener("keydown", function (e) {
            switch (e.code) {
                case "ArrowLeft":
                case "KeyA":
                    that.left = true;
                    break;
                case "ArrowRight":
                case "KeyD":
                    that.right = true;
                    break;
                case "ArrowUp":
                case "KeyW":
                    that.up = true;
                    break;
                case "ArrowDown":
                case "KeyS":
                    that.down = true;
                    break;
                case "KeyE":
                    that.E = true;
                    break;
                case "KeyQ":
                    that.Q = true;
                    break;
                case "Digit1":
                    that.digit1 = true;
                    break;
                case "Digit2":
                    that.digit2 = true;
                    break;
                case "Digit3":
                    that.digit3 = true;
                    break;
                case "Digit4":
                    that.digit4 = true;
                    break;
                case "Space":
                    that.jump= true;
                    break;
            }
        }, false);
        this.ctx.canvas.addEventListener("keyup", function (e) {
            switch (e.code) {
                case "ArrowLeft":
                case "KeyA":
                    that.left = false;
                    break;
                case "ArrowRight":
                case "KeyD":
                    that.right = false;
                    break;
                case "ArrowUp":
                case "KeyW":
                    that.up = false;
                    break;
                case "ArrowDown":
                case "KeyS":
                    that.down = false;
                    break;
                case "KeyE":
                    that.E = false;
                    break;
                case "KeyQ":
                    that.Q = false;
                    break;
                case "Digit1":
                    that.digit1 = false;
                    break;
                case "Digit2":
                    that.digit2 = false;
                    break;
                case "Digit3":
                    that.digit3 = false;
                    break;
                case "Digit4":
                    that.digit4 = false;
                    break;
                case "Space":
                    that.jump = false;
                    break;
            }
        }, false);
        
        function isFocused() {
            if (document.getElementById("gameWorld") === document.activeElement) {
                that.activeCanvas = true;
            }
            else {
                that.activeCanvas = false;
            }
        }
        setInterval(isFocused, 300);
    };
     

    addEntity(entity) {
        this.entities.push(entity);
    };
    addEntityToBegin(entity) {
        this.entities.unshift(entity);
    };

    draw() {
        // Clear the whole canvas with transparent color (rgba(0, 0, 0, 0))
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        // Draw latest things first
        for (let i = this.entities.length - 1; i >= 0; i--) {
            this.entities[i].draw(this.ctx, this);
            // console.log(this.entities[i]); //TODO  remove test
            // console.log('i = ' , +i);
            // console.log(this.entities.length);
        }
        this.camera.draw(this.ctx);
    };

    update() {
        if(!this.activeCanvas){
            this.gamePaused();
        }
        else{
        let entitiesCount = this.entities.length;

        for (let i = 0; i < entitiesCount; i++) {
            let entity = this.entities[i];

            if (!entity.removeFromWorld) {
                entity.update();
            }
        }
        this.camera.update();
        for (let i = this.entities.length - 1; i >= 0; --i) {
            if (this.entities[i].removeFromWorld) {
                this.entities.splice(i, 1);
            }
        }
    }

    };

    gamePaused(){
        this.up = false;
        this.down = false;
        this.left = false;
        this.right = false;
    }

    loop() {
        this.clockTick = this.timer.tick();
        this.update();
        this.draw();
    };

};
