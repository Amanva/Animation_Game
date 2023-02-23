function distanceBetween(A, B) {
    return Math.sqrt((B.x - A.x) * (B.x - A.x) + (B.y - A.y) * (B.y - A.y));
};
function getAngle(velocity) {
    let change = Math.atan2(velocity.y, velocity.x);
    // let degree = radian * (180 / Math.PI);
    if (change < 0) change += Math.PI * 2;
    let degrees = Math.floor(change / Math.PI / 2 * 360);
    let bot = degrees / 360 * 2 * Math.PI;
    // console.log(bot);
    return bot;
};
function randomInt(n) {
    return Math.floor(Math.random() * n);
};
// returns a string that can be used as a rgb web color
function rgb(r, g, b) {
    return "rgb(" + r + "," + g + "," + b + ")";
};

// returns a string that can be used as a hsl web color
function hsl(h, s, l) {
    return "hsl(" + h + "," + s + "%," + l + "%)";
};

// creates an alias for requestAnimationFrame for backwards compatibility
window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (/* function */ callback, /* DOMElement */ element) {
            window.setTimeout(callback, 1000 / 60);
        };
})();


// add global parameters here
const PARAMS = {
    SCALE: 2.5,
    BITWIDTH: 25,
    BITHEIGHT: 45
};
let debug = true;
function debugOn() {
    debug = !debug;
}
