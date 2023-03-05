var assetMangager = new AssetManager();
assetMangager.queueDownload("./sprites/mageRight.png");
assetMangager.queueDownload("./sprites/mageLeft.png");
assetMangager.queueDownload("./sprites/blackFireball.png");
assetMangager.queueDownload("./demonFire.png");
assetMangager.queueDownload("./demonFireLeft.png");
assetMangager.queueDownload("./slime_demonboss_specialmoves.png");
assetMangager.queueDownload("./slime_demonboss_specialmovesLeft.png");
assetMangager.queueDownload("./sprites/Hearts.png");
assetMangager.queueDownload("./sprites/Mana.png");
assetMangager.queueDownload("./sprites/cursor.png");
assetMangager.queueDownload("./sprites/gate.png");
assetMangager.queueDownload("./sprites/FB001.png");
assetMangager.queueDownload("./sprites/earth.png");
assetMangager.queueDownload("./sprites/04.png");
assetMangager.queueDownload("./sprites/book.png");
assetMangager.queueDownload("./sprites/earthlevel.png");
assetMangager.queueDownload("./sprites/enemies/Run-Sheet.png");
assetMangager.queueDownload("./sprites/enemies/Idle-Sheet.png");
assetMangager.queueDownload("./sprites/enemies/Hit-Sheet.png");
assetMangager.queueDownload("./sprites/enemies/Walk-Base-Sheet.png");
assetMangager.queueDownload("./sprites/icons.png");
assetMangager.queueDownload("./sprites/enemies/earthslime.png");
assetMangager.queueDownload("./sprites/enemies/slime.png");




assetMangager.queueDownload("./sprites/enemies/Attack.png");
assetMangager.queueDownload("./sprites/enemies/Attack2.png");
assetMangager.queueDownload("./sprites/enemies/Death.png");
assetMangager.queueDownload("./sprites/enemies/Flight.png");
assetMangager.queueDownload("./sprites/enemies/Min.png");

assetMangager.queueDownload(levelTwo.background1);
assetMangager.queueDownload(levelTwo.background2);
assetMangager.queueDownload(levelTwo.background3);




assetMangager.queueDownload(levelThree.background1);
assetMangager.queueDownload(levelThree.background2);
assetMangager.queueDownload(levelThree.background3);

assetMangager.queueDownload(levelFour.background1);
assetMangager.queueDownload(levelFour.background2);
assetMangager.queueDownload(levelFour.background3);
assetMangager.queueDownload(levelFour.background4);



assetMangager.queueDownload("./sprites/potion.png");
// Load chain_bot sprites.
assetMangager.queueDownload("./sprites/enemies/chain_bot_idle.png");
assetMangager.queueDownload("./sprites/enemies/chain_bot_run_right.png");
assetMangager.queueDownload("./sprites/enemies/chain_bot_run_left.png");
assetMangager.queueDownload("./sprites/enemies/chain_bot_attack_right.png");
assetMangager.queueDownload("./sprites/enemies/chain_bot_attack_left.png");
assetMangager.queueDownload("./sprites/enemies/chain_bot_hit.png");
assetMangager.queueDownload("./sprites/enemies/chain_bot_death.png");
// assetMangager.queueDownload("./sprites/enemies/slime.png")
assetMangager.queueDownload("./sprites/airLevel/air.png");
assetMangager.queueDownload("./sprites/Lava64.png");
assetMangager.queueDownload("./sprites/Background.png");
assetMangager.queueDownload("./sprites/monsterRight.png");
assetMangager.queueDownload("./sprites/monster-Riight-Attack.png");
assetMangager.queueDownload("./sprites/monster-Left-Fly.png");
assetMangager.queueDownload("./sprites/monster-idle.png");
assetMangager.queueDownload("./sprites/monster-Right-Fly.png");
assetMangager.queueDownload("./sprites/portal.png");
assetMangager.queueDownload("./sprites/demon-idleRight.png");
assetMangager.queueDownload("./sprites/seaMonster/monsterLeft.png");
assetMangager.queueDownload("./sprites/seaMonster/monster-Riight-Attack.png");
assetMangager.queueDownload("./sprites/seaMonster/monster-Left-Swim.png");
assetMangager.queueDownload("./sprites/seaMonster/monster-idle.png");
assetMangager.queueDownload("./sprites/seaMonster/monster-Right-Swim.png");
assetMangager.queueDownload("./sprites/enemies/snake.png");
assetMangager.queueDownload("./sprites/tornado.png");
assetMangager.queueDownload("./sprites/save.png");
assetMangager.queueDownload("./sprites/waterLevel/cannonBall.png");
assetMangager.queueDownload("./sprites/waterLevel/cannon.png"); 
// sounds
assetMangager.queueDownload("./sounds/sfx/bossFight.mp3");
assetMangager.queueDownload("./sounds/music/background.wav");
assetMangager.queueDownload("./sounds/sfx/playerhit.mp3");
assetMangager.queueDownload("./sounds/sfx/minAttack.mp3");
assetMangager.queueDownload("./sounds/sfx/minRage.mp3");
assetMangager.queueDownload("./sounds/sfx/drink.mp3");
assetMangager.queueDownload("./sounds/sfx/fire.mp3");
assetMangager.queueDownload("./sounds/sfx/earth.mp3");

assetMangager.queueDownload("./sounds/sfx/zombiehit.wav");

//Load water level assets
assetMangager.queueDownload("./sprites/waterLevel/underWater.png");
assetMangager.queueDownload("./sprites/waterLevel/bomb.png");
assetMangager.queueDownload("./sprites/waterLevel/boulderTiles.png");
assetMangager.queueDownload("./sprites/waterLevel/hydra_left.png");
assetMangager.queueDownload("./sprites/waterLevel/pirate.png");
assetMangager.queueDownload("./sprites/waterLevel/squid.png");
assetMangager.queueDownload("./sprites/waterLevel/squidRight.png");
assetMangager.queueDownload("./sprites/waterLevel/cave.png");
assetMangager.queueDownload("./sprites/enemies/slime_blue.png");

//sounds
assetMangager.queueDownload("./sounds/blood_splash.wav");
assetMangager.queueDownload("./sounds/slash_swoosh.mp3");
assetMangager.queueDownload("./sounds/metal_hit_woosh.wav");


assetMangager.downloadAll(() => {
assetMangager.autoRepeat("./sounds/music/background.wav");
assetMangager.autoRepeat("./sounds/sfx/bossFight.mp3");
var canvas = document.getElementById('gameWorld');
var ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;
var gameEngine = new GameEngine();
PARAMS.PLAYERWIDTH = (PARAMS.BITWIDTH * PARAMS.SCALE);
PARAMS.PLAYERHEIGHT = (PARAMS.BITHEIGHT * PARAMS.SCALE);
PARAMS.CANVAS_WIDTH = canvas.width;
PARAMS.CANVAS_HEIGHT = canvas.height;

gameEngine.init(ctx);
new SceneManager(gameEngine);
gameEngine.start();

});