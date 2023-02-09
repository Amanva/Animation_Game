// const divisorPlatforms = 256;
var levelOne = {
    background: "./sprites/Background.png",
    ground: [
        { x: 0, y: 750, width: 3072, height:64, div: 256},
        { x: 3456, y: 750, width: 2560, height:64, div: 256},
        { x: 6400, y: 750, width: 2560, height:64, div: 256},
        { x: 9100, y: 750, width: 3328, height:64, div: 256},
        // { x:2000, y:150, width: 3328, height:64, div: 256},
    ],
    wall: [
        {x:3072 , y:-100, width:192*2, height: 308, div: 308},
        {x:3072 , y:500, width:192*2, height: 308, div: 308},
        {x:2000 , y:-158, width:192*1, height: 308, div: 308}
        
    ],
    gate: [
        {x:5 ,y:-370, wallX: 1800, wallY:-453, wallWidth: 192, wallHeight: 308, div:308}

    ],
    platforms: [
        //first area L1
        {x:100 ,y:500, width: 256, height:64, divisorPlatforms:256}, 
        {x:400, y:400, width: 256, height:64, divisorPlatforms:256},
        {x:900, y:200, width: 256, height:64, divisorPlatforms:256},
        // {x:1500, y:400, width: 256, height:64, divisorPlatforms:256},
        {x:2000, y:400, width: 1024, height:64, divisorPlatforms:256},
        {x:2000, y:150, width: 768, height:64, divisorPlatforms:256},

        //second area L1
        {x:3600 ,y:500, width: 256, height:64, divisorPlatforms:256},
        {x:3900 ,y:400, width: 128 , height:64, divisorPlatforms: 128},
        {x:4100 ,y:80, width: 128 , height:64, divisorPlatforms: 128},
        {x:4800 ,y:80, width: 128 , height:64, divisorPlatforms: 128},
        {x:5300, y:80, width: 128, height: 64, divisorPlatforms: 128},
        {x:4400 ,y:300, width: 128 , height:64, divisorPlatforms: 128},


    ],

    movingPlatforms: [
        {x:4800, y:200, width: 256, height: 64, divisorPlatforms: 256, direction: "x-axis"},
        {x:1500, y:200, width: 256, height:64, divisorPlatforms:256, direcction: "y-axis"},

    ],
    tiles:[
        {x:-298 , y:-210, width: 2304 , height:51, div: 192},
        {x:-298 , y:-159, width: 2304 , height:51, div: 192}

    ],
    lava: [
        {x: 600, y: 300, width: 200, height: 10  }
    ]
};

var levelTwo = {
    background: "./sprites/Background.png",
    ground: [
        { x: 0, y: 750, width: 3072, height:64, div: 256},
        { x: 3456, y: 750, width: 2560, height:64, div: 256},
        { x: 6400, y: 750, width: 2560, height:64, div: 256},
        { x: 9100, y: 750, width: 3328, height:64, div: 256},
    ],
    wall: [
        {x:3072 , y:-100, width:192*2, height: 308, div: 308},
        {x:3072 , y:500, width:192*2, height: 308, div: 308},
        
        
    ],
    platforms: [
        {x:100 ,y:500, width: 256, height:0}, 
        {x:400, y:400, width: 256, height:0},
        {x:900, y:200, width: 256, height:0},
        {x:1500, y:400, width: 256, height:0},
        {x:2000, y:400, width: 1024, height:0},
        // {x:2020, y:200, width: 1024, height:0},
        {x:2000, y:150, width: 768, height:0},
    ],

    lava: [
        {x: 600, y: 300, width: 200, height: 10  }
    ]
};