// const divisorPlatforms = 256; //divizor = size of the one platform
var levelOne = {
    background: "./sprites/Background.png",
    floor: "./sprites/Lava64.png",

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
        {x:2000 , y:-158, width:192, height: 308, div: 308},
        {x:3264 , y:-400, width:192, height: 308, div: 308},
        {x:800 , y:500, width:192, height: 308, div: 308} //test wall
        
    ],
    gate: [
        {x:5 ,y:-370, wallX: 3072, wallY:206, wallWidth: 192, wallHeight: 308, div:308}

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
        {x:4800 ,y:40, width: 128 , height:64, divisorPlatforms: 128},
        {x:5500, y:40, width: 128, height: 64, divisorPlatforms: 128},
        {x:6100, y:40, width: 128, height: 64, divisorPlatforms: 128},

        {x:4400 ,y:300, width: 128 , height:64, divisorPlatforms: 128},



    ],

    smallPlatforms: [
        {x:7127 ,y:300, width: 63 , height:17, div: 63},
        {x:7127 ,y:600, width: 63 , height:17, div: 63},
        {x:7300 ,y:300, width: 63 , height:17, div: 63},
        {x:7500 ,y:400, width: 63 , height:17, div: 63},
        {x:7127 ,y:200, width: 63 , height:17, div: 63},
        {x:7450 ,y:0, width: 63 , height:17, div: 63},
        {x:7750 ,y:150, width: 63 , height:17, div: 63},
        {x:7200 ,y:100, width: 63 , height:17, div: 63},

        {x:7600 ,y:700, width: 63 , height:17, div: 63},
        {x:7450 ,y:700, width: 63 , height:17, div: 63},
        {x:7450 ,y:200, width: 63 , height:17, div: 63},

        {x:7700 ,y:670, width: 63 , height:17, div: 63},
        {x:7700 ,y:250, width: 63 , height:17, div: 63},

        {x:7700 ,y:0, width: 63 , height:17, div: 63},
        {x:8000 ,y:-50, width: 63 , height:17, div: 63},
        {x:8200 ,y:-10, width: 63 , height:17, div: 63},
        {x:8250 ,y:60, width: 63 , height:17, div: 63},


        {x:8000 ,y:500, width: 63 , height:17, div: 63},
        {x:8200 ,y:400, width: 63 , height:17, div: 63},
        {x:8200 ,y:600, width: 63 , height:17, div: 63},
        {x:8500 ,y:500, width: 63 , height:17, div: 63},
        {x:8300 ,y:300, width: 63 , height:17, div: 63},
    ],

    movingPlatforms: [
        {x:4700, y:150, width: 256, height: 64, divisorPlatforms: 256, direction: "x-axis", distance: 6500},
        {x:1500, y:200, width: 256, height:64, divisorPlatforms:256, direcction: "y-axis", distance: 400},


        //second stage/area
        // {x:7400, y:150, width: 256, height: 64, divisorPlatforms: 256, direction: "x-axis", distance: 8100},


    ],
    tiles:[
        {x:-298 , y:-210, width: 2304 , height:51, div: 192},
        {x:-298 , y:-159, width: 2304 , height:51, div: 192}

    ],
    lava: [
        {x: 600, y: 300, width: 200, height: 10  }
    ],

    verticalWall: [
        {x: 6750, y: 250, width: 127, height: 127, div: 127 },
        {x: 6750, y: 377, width: 127, height: 127, div: 127 },
        {x: 6750, y: 504, width: 127, height: 127, div: 127 },
        {x: 6750, y: 631, width: 127, height: 127, div: 127 },


        {x: 7000, y: -385, width: 127, height: 127, div: 127 },
        {x: 7000, y: -512, width: 127, height: 127, div: 127 },
        {x: 7000, y: -258, width: 127, height: 127, div: 127 },
        {x: 7000, y: -131, width: 127, height: 127, div: 127 },
        {x: 7000, y: -4, width: 127, height: 127, div: 127 },
        {x: 7000, y: 123, width: 127, height: 127, div: 127 },

        {x: 7000, y: 250, width: 127, height: 127, div: 127 },
        {x: 7000, y: 377, width: 127, height: 127, div: 127 },
        {x: 7000, y: 504, width: 127, height: 127, div: 127 },


        {x: 8000, y: -131, width: 127, height: 127, div: 127 },
        {x: 8000, y: -258, width: 127, height: 127, div: 127 },
        {x: 8000, y: -385, width: 127, height: 127, div: 127 },
        {x: 8000, y: -512, width: 127, height: 127, div: 127 },

    ],

    ChainBot: [
        // {x: 50, y: 300},
        // {x: 350, y: 300},
        {x: 1000, y: 400},
        // {x: 1500, y: 0},
        // {x:2000, y: 0},
        // {x: 2300, y: 0},
    ],

    // Monster: [
    //     {x: 50, y: 300},
        
    // ]
};

var levelTwo = {
    background: "./sprites/waterLevel/underWater.png",
    floor: "./sprites/waterLevel/boulderTiles.png",

    ground: [
        { x: 0, y: 750, width: 3080, height:110, div: 110},
        { x: 3456, y: 750, width: 2530, height:110, div: 110},
        { x: 6400, y: 750, width: 2530, height:110, div: 110},
        { x: 9100, y: 750, width: 3300, height:110, div: 110},
    ],
    // wall: [
    //     {x:3072 , y:-100, width:192*2, height: 308, div: 308},
    //     {x:3072 , y:500, width:192*2, height: 308, div: 308},
        
    // ],
    platforms: [
        {x:100 ,y:500, width: 220, height:64, divisorPlatforms:110}, 
        {x:490, y:400, width: 220, height:64, divisorPlatforms:110},
        {x:900, y:300, width: 220, height:64, divisorPlatforms:110},
        // {x:1500, y:400, width: 256, height:64, divisorPlatforms:256},
        {x:1500, y:300, width: 770, height:64, divisorPlatforms:110},
        {x:2500, y:450, width: 880, height:64, divisorPlatforms:110},
        {x:4000, y:300, width: 550, height:64, divisorPlatforms:110},
        {x:5300, y:350, width: 220, height:64, divisorPlatforms:110},
        {x:5700 ,y:500, width: 220, height:64, divisorPlatforms:110}, 
        {x:6200, y:400, width: 220, height:64, divisorPlatforms:110},
        {x:8500, y:450, width: 770, height:64, divisorPlatforms:110},
        {x:9200, y:250, width: 660, height:64, divisorPlatforms:110},
        {x:10000, y:450, width: 880, height:64, divisorPlatforms:110},
        
    ],

    ChainBot: [
        {x: 50, y: 300},
        {x: 440, y: 300},
        {x: 440, y: 500},
        {x: 800, y: 400},
        {x: 850, y: 200},
        {x: 1500, y: 0},
        {x:2000, y: 0},
        {x: 2300, y: 0},
        {x:1200, y:300},
        {x:2700, y:450},
        {x:4000, y:300},
        {x:4300, y:300},
        {x:4600, y:300},
        {x:5600 ,y:350}, 
        {x:5700, y:550},
        {x:6500, y:400},
        {x:8700, y:450},
        {x:8700, y:500},
        {x:9200, y:250},
        {x:9600, y:250},
        {x:10200, y:500},
        {x:10500, y:500}
    ],

    bomb: [
        {x: 50, y:800},
        {x: 540, y: 800},
        {x: 1000, y: 800},
        {x: 1500, y: 800},
        {x: 2300, y: 800},
        {x:2700, y: 800},
        {x:3700, y: 800},
        {x:4300, y: 800},
        {x:5000, y: 800},
        {x:5600 ,y: 800}, 
        {x:6300, y: 800},
        {x:8700, y :800},
        {x:9200, y: 800},
        {x:9900, y: 800},
        {x:10200, y: 800},
        {x:10800, y: 800}
    ],

        
    // cave: [
    //     {x:11000 ,y:500, width: 256, height:64}, 
        
    // ],

    // lava: [
    //     {x: 600, y: 300, width: 200, height: 10  }
    // ],


};