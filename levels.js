// const divisorPlatforms = 256; //divizor = size of the one platform
var levelOne = {
    background: "./sprites/Background.png",
    music: "./sounds/music/background.wav",
    floor: "./sprites/Lava64.png",

    ground: [
        { x: 0, y: 750, width: 3072, height:64, div: 256},
        { x: 3456, y: 750, width: 2560, height:64, div: 256},
        { x: 6700, y: 750, width: 768, height:64, div: 256},
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
        {x:7300 ,y:-300, width: 63 , height:17, div: 63},
        {x:7450 ,y:200, width: 63 , height:17, div: 63},
        {x:7400 ,y:-250, width: 63 , height:17, div: 63},    
        {x:7600 ,y:-380, width: 63 , height:17, div: 63},    

        {x:7700 ,y:670, width: 63 , height:17, div: 63},
        {x:7700 ,y:250, width: 63 , height:17, div: 63},


        {x:7700 ,y:-100, width: 63 , height:17, div: 63},    
        {x:7800 ,y:-100, width: 63 , height:17, div: 63},    

        {x:7700 ,y:0, width: 63 , height:17, div: 63},
        // {x:8000 ,y:-50, width: 63 , height:17, div: 63},
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

        {x:7200, y:-600, width: 256, height: 64, divisorPlatforms: 256, direction: "x-axis", distance: 8980},

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

        {x: 7000, y: -639, width: 127, height: 127, div: 127 },
        {x: 7000, y: -512, width: 127, height: 127, div: 127 },
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

        //boss area

        {x: 11000, y: -254, width: 127, height: 127, div: 127 },
        {x: 11000, y: -127, width: 127, height: 127, div: 127 },
        {x: 8975, y: 0, width: 127, height: 127, div: 127 },
        {x: 8975, y: 127, width: 127, height: 127, div: 127 },
        {x: 8975, y: 254, width: 127, height: 127, div: 127 },
        {x: 8975, y: 381, width: 127, height: 127, div: 127 },
        {x: 8975, y: 508, width: 127, height: 127, div: 127 },
        {x: 8975, y: 635, width: 127, height: 127, div: 127 },
        {x: 8975, y: 762, width: 127, height: 127, div: 127 },


        {x: 11000, y: 0, width: 127, height: 127, div: 127 },
        {x: 11000, y: 127, width: 127, height: 127, div: 127 },
        {x: 11000, y: 254, width: 127, height: 127, div: 127 },
        {x: 11000, y: 381, width: 127, height: 127, div: 127 },
        {x: 11000, y: 508, width: 127, height: 127, div: 127 },
        {x: 11000, y: 635, width: 127, height: 127, div: 127 },
        {x: 11000, y: 762, width: 127, height: 127, div: 127 },
        


    // ChainBot: [
    //     // {x: 50, y: 300},
    //     // {x: 350, y: 300},
    //     {x: 1000, y: 400},
    //     // {x: 1500, y: 0},
    //     // {x:2000, y: 0},
    //     // {x: 2300, y: 0},
    // ],


    ],

    ChainBot: [
        {x: 2629, y:507 },
        {x: 2586, y:207 },
        {x: 703, y:-453},
    ],

    Monster: [
        {x: 690, y: 250},
    ]
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
        // {x: 50, y: 300},
        // {x: 440, y: 300},
        // {x: 600, y: 500},
        // {x: 800, y: 400},
        // {x: 850, y: 200},
        // {x: 1500, y: 0},
        // {x:2000, y: 0},
        // {x: 2300, y: 0},
        // {x:1200, y:300},
        // {x:2700, y:450},
        // {x:3900, y:300},
        // {x:4300, y:300},
        // {x:4600, y:300},
        // {x:5600 ,y:350}, 
        // {x:5700, y:550},
        // {x:6500, y:400},
        // {x:8700, y:450},
        // {x:8700, y:500},
        // {x:9200, y:250},
        // {x:9600, y:250},
        // {x:10200, y:500},
        // {x:10500, y:500}
    ],

};

var levelThree = {
    background1: "./sprites/Background layers/Background1.png",
    background2: "./sprites/Background layers/Background2.png",
    background3: "./sprites/Background layers/Background3.png",
    ground: [
        // { x: 0, y: 750, width: 73*191, height:25*3, div: 73*3},
        { x: 0, y: 750, width: 219*6, height:25*3, div: 73*3},
        { x: 4300, y: 750, width: 219*22, height:25*3, div: 73*3.7},
    ],
    // halfGround: [
    //     { x: 500, y: 670, width: 120*5, height:23*5, div: 120*5},
        
    // ],
    // dirt: [
    //     { x: 550, y: 730, width: 58*7.5, height:14*5, div: 58*7.5},
        
    // ],
    // wall: [
    //     {x:3072 , y:-100, width:192*2, height: 308, div: 308},
    //     {x:3072 , y:500, width:192*2, height: 308, div: 308},
    //     {x:2000 , y:-158, width:192, height: 308, div: 308},
    //     {x:3264 , y:-400, width:192, height: 308, div: 308}
        
    // ],
    gate: [
        {x:3450 ,y:-525, wallX: 4655, wallY:70, wallWidth: 47*2, wallHeight: 119*2, div:47*2},
        {x:4490 ,y:90, wallX: 6050, wallY:400, wallWidth: 47*3, wallHeight: 119*3, div:47*3}

    ],
    trigger: [
        {x: 5931, y: 0, wallX: 3320, wallY: -600, wallWidth: 47*2, wallHeight:119*2, div:47*2 },
        
    ],
    platforms: [
        //first area L1
        {x:300 ,y:500, width: 71*3, height:23*3, divisorPlatforms:71*3}, 
        {x:700, y:400, width: 71*3, height:23*3, divisorPlatforms:71*3},
        {x:1400, y:500, width: 71*3, height:23*3, divisorPlatforms:71*3},

        {x:2400, y:400, width: 71*3, height:23*3, divisorPlatforms:71*3},
        {x:2613, y:400, width: 71*3, height:23*3, divisorPlatforms:71*3},
        {x:2826, y:400, width: 71*3, height:23*3, divisorPlatforms:71*3},
        {x:3039, y:400, width: 71*3, height:23*3, divisorPlatforms:71*3},
        {x:3252, y:400, width: 71*3, height:23*3, divisorPlatforms:71*3},
        {x:3465, y:400, width: 71*3, height:23*3, divisorPlatforms:71*3},

        {x:3500, y:-671, width: 71*3, height:23*3, divisorPlatforms:71*3},
        {x:3287, y:-671, width: 71*3, height:23*3, divisorPlatforms:71*3},
        {x:3074, y:-671, width: 71*3, height:23*3, divisorPlatforms:71*3},
        {x:2861, y:-671, width: 71*3, height:23*3, divisorPlatforms:71*3},
        {x:2648, y:-671, width: 71*3, height:23*3, divisorPlatforms:71*3},
        {x:2435, y:-671, width: 71*3, height:23*3, divisorPlatforms:71*3},
        {x:2222, y:-671, width: 71*3, height:23*3, divisorPlatforms:71*3},


        
        {x:4440, y:-671, width: 71*3, height:23*3, divisorPlatforms:71*3},
        {x:4653, y:-671, width: 71*3, height:23*3, divisorPlatforms:71*3},
        {x:4866, y:-671, width: 71*3, height:23*3, divisorPlatforms:71*3},
        {x:5079, y:-671, width: 71*3, height:23*3, divisorPlatforms:71*3},
        {x:5292, y:-671, width: 71*3, height:23*3, divisorPlatforms:71*3},
        {x:5505, y:-671, width: 71*3, height:23*3, divisorPlatforms:71*3},
        {x:5718, y:-671, width: 71*3, height:23*3, divisorPlatforms:71*3},


        {x:4640-80, y:-371, width: 71*3, height:23*3, divisorPlatforms:71*3},
        {x:4853-80, y:-371, width: 71*3, height:23*3, divisorPlatforms:71*3},
        {x:5066-80, y:-371, width: 71*3, height:23*3, divisorPlatforms:71*3},
        {x:5279-80, y:-371, width: 71*3, height:23*3, divisorPlatforms:71*3},
        {x:5492-80, y:-371, width: 71*3, height:23*3, divisorPlatforms:71*3},
        {x:5705-80, y:-371, width: 71*3, height:23*3, divisorPlatforms:71*3},
        {x:5918-80, y:-371, width: 71*3, height:23*3, divisorPlatforms:71*3},

        {x:4440, y:-0, width: 71*3, height:23*3, divisorPlatforms:71*3},
        {x:4653, y:-0, width: 71*3, height:23*3, divisorPlatforms:71*3},
        {x:4866, y:-0, width: 71*3, height:23*3, divisorPlatforms:71*3},
        {x:5079, y:-0, width: 71*3, height:23*3, divisorPlatforms:71*3},
        {x:5292, y:-0, width: 71*3, height:23*3, divisorPlatforms:71*3},
        {x:5505, y:-0, width: 71*3, height:23*3, divisorPlatforms:71*3},
        {x:5718, y:-0, width: 71*3, height:23*3, divisorPlatforms:71*3},
        //gate platform
        {x:4440 ,y:250, width: 71*3, height:23*3, divisorPlatforms:71*3},
    ],

    smallPlatforms: [
        // {x:400 ,y:300, width: 23 , height:23*3, div: 23*3},
         {x:1700 ,y:350, width: 23*3 , height:23*3, div: 23*3},
         {x:1900 ,y:450, width: 23*3 , height:23*3, div: 23*3},

         {x:2150 ,y:-615, width: 23*3 , height:23*3, div: 23*3},
         {x:1985 ,y:-335, width: 23*3 , height: 23*3, div: 23*3},

         {x:2222 ,y:-335, width: 23*3 , height: 23*3, div: 23*3},

         {x:2522 ,y:-315, width: 23*3 , height: 23*3, div: 23*3},

         {x:2922 ,y:-325, width: 23*3 , height: 23*3, div: 23*3},
         {x:3222 ,y:-305, width: 23*3 , height: 23*3, div: 23*3},

         {x:3481 ,y:-365, width: 23*3 , height: 23*3, div: 23*3},
         {x:3550 ,y:-365, width: 23*3 , height: 23*3, div: 23*3},
         {x:3412 ,y:-365, width: 23*3 , height: 23*3, div: 23*3},

         {x:3800 ,y:450, width: 23*3 , height:23*3, div: 23*3},
         {x:3700 ,y:200, width: 23*3 , height:23*3, div: 23*3},

         {x:3720 ,y:-50, width: 23*3 , height:23*3, div: 23*3},

         {x:3970 ,y:640, width: 23*3 , height: 23*3, div: 23*3},

         {x:4120 ,y:-115, width: 23*3 , height: 23*3, div: 23*3},

        
         {x:3960 ,y:-335, width: 23*3 , height: 23*3, div: 23*3},


         {x:3800 ,y:-340, width: 23*3 , height: 23*3, div: 23*3},

         {x:3960 ,y:-525, width: 23*3 , height: 23*3, div: 23*3},

        //gate platform
         

        //  {x:3500, y:-671, width: 71*3, height:23*3, divisorPlatforms:71*3},
        //  {x:3287, y:-671, width: 71*3, height:23*3, divisorPlatforms:71*3},
        //  {x:3074, y:-671, width: 71*3, height:23*3, divisorPlatforms:71*3},
        //  {x:2861, y:-671, width: 71*3, height:23*3, divisorPlatforms:71*3},
        //  {x:2648, y:-671, width: 71*3, height:23*3, divisorPlatforms:71*3},
        //  {x:2435, y:-671, width: 71*3, height:23*3, divisorPlatforms:71*3},
        //  {x:2222, y:-671, width: 71*3, height:23*3, divisorPlatforms:71*3},





    ],

    // movingPlatforms: [
    //     {x:4700, y:150, width: 256, height: 64, divisorPlatforms: 256, direction: "x-axis", distance: 6500},
    //     {x:1500, y:200, width: 256, height:64, divisorPlatforms:256, direcction: "y-axis", distance: 400},

    //     {x:7200, y:-600, width: 256, height: 64, divisorPlatforms: 256, direction: "x-axis", distance: 8980},

    //     //second stage/area
    //     // {x:7400, y:150, width: 256, height: 64, divisorPlatforms: 256, direction: "x-axis", distance: 8100},


    // // ],
    // tiles:[
    //     {x:-298 , y:-210, width: 2304 , height:51, div: 192},
    //     {x:-298 , y:-159, width: 2304 , height:51, div: 192}

    // ],
    // lava: [
    //     {x: 600, y: 300, width: 200, height: 10  }
    // ],

    verticalWall: [
        // {x: 1000, y: -671, width: 47*3, height: 119*3   , div: 47*3 },
        {x: 1000, y: -314, width: 47*3, height: 119*3   , div: 47*3 },
        // {x: 1000, y: 43, width: 47*3, height: 119*3   , div: 47*3 },
        {x: 1000, y: 400, width: 47*3, height: 119*3   , div: 47*3 },
        {x: 2100, y: 400, width: 47*3, height: 119*3   , div: 47*3 },

        {x:1843, y:-1028, width: 47*3, height:119*3, div:47*3},
        {x:1843, y:-671, width: 47*3, height:119*3, div:47*3},
        {x:1843, y:-314, width: 47*3, height:119*3, div:47*3},
        {x:3620, y:-605, width: 47*2, height:119*2, div:47*2},

        {x: 4300, y: -671, width: 47*3, height: 119*3   , div: 47*3 },
        {x: 4300, y: -314, width: 47*3, height: 119*3   , div: 47*3 },
        {x: 4300, y: 43, width: 47*3, height: 119*3   , div: 47*3 },
        // {x: 4300, y: 400, width: 47*3, height: 119*3   , div: 47*3 },

        {x:6050, y:-1385, width: 47*3, height:119*3, div:47*3},
        {x:6050, y:-1028, width: 47*3, height:119*3, div:47*3},
        {x:6050, y:-671, width: 47*3, height:119*3, div:47*3},
        {x: 6050, y: -314, width: 47*3, height: 119*3, div: 47*3 },
        {x: 6050, y: 43, width: 47*3, height: 119*3   , div: 47*3 },
        {x: 9000, y: 400, width: 47*3, height: 119*3, div: 47*3 },
        {x: 8999, y: 43, width: 47*3, height: 119*3   , div: 47*3 },
        // {x: 6050, y: -314, width: 47*3, height: 119*3, div: 47*3 },
    ],
    
    ChainBot: [
        {x: 2629, y:507 },
        {x: 2586, y:207 },
        {x: 703, y:-453},
    ],
    boar: [
        {x: 600, y: 650}
    ],
    slimeEarth: [
        {x: 700, y: 400}
    ],
    bat: [
        {x: 774, y: -100},
    ]
};