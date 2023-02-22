// const divisorPlatforms = 256;
var levelOne = {
    background: "./sprites/Background.png",
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
        {x:3264 , y:-400, width:192, height: 308, div: 308}
        
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

var levelThree = {
    background1: "./sprites/Background layers/Background1.png",
    background2: "./sprites/Background layers/Background2.png",
    background3: "./sprites/Background layers/Background3.png",
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
        {x:3264 , y:-400, width:192, height: 308, div: 308}
        
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