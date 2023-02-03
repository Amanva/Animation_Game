var levelOne = {
    background: "./sprites/Background.png",
    ground: [
        { x: 0, y: 750, width: 3072, height:0 },
        { x: 3456, y: 750, width: 2560, height:0 },

    ],
    wall: [
        {x:3072 , y:-100, width:192, height: 308 },
        {x:3072 , y:500, width:192, height: 308 },
        
    ],
    platforms: [
        {x:100 ,y:500, width: 256, height:0}, 
        {x:400, y:400, width: 256, height:0},
        {x:900, y:200, width: 256, height:0},
        {x:1500, y:400, width: 256, height:0},
        {x:2000, y:400, width: 1024, height:0},
        {x:2000, y:150, width: 768, height:0},
    ],

    lava: [
        {x: 600, y: 300, width: 200, height: 10  }
    ]
};