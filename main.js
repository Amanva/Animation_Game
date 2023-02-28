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
assetMangager.queueDownload("./sprites/enemies/mudGuard/idle.png");
assetMangager.queueDownload("./sprites/enemies/Attack.png");
assetMangager.queueDownload("./sprites/enemies/Attack2.png");
assetMangager.queueDownload("./sprites/enemies/Death.png");
assetMangager.queueDownload("./sprites/enemies/Flight.png");
assetMangager.queueDownload("./sprites/enemies/Min.png");



assetMangager.queueDownload(levelThree.background1);
assetMangager.queueDownload(levelThree.background2);
assetMangager.queueDownload(levelThree.background3 );

assetMangager.queueDownload("./sprites/potion.png");
// Load chain_bot sprites.
assetMangager.queueDownload("./sprites/enemies/chain_bot_idle.png");
assetMangager.queueDownload("./sprites/enemies/chain_bot_run_right.png");
assetMangager.queueDownload("./sprites/enemies/chain_bot_run_left.png");
assetMangager.queueDownload("./sprites/enemies/chain_bot_attack_right.png");
assetMangager.queueDownload("./sprites/enemies/chain_bot_attack_left.png");
assetMangager.queueDownload("./sprites/enemies/chain_bot_hit.png");
assetMangager.queueDownload("./sprites/enemies/chain_bot_death.png");
assetMangager.queueDownload("./sprites/Lava64.png");
assetMangager.queueDownload("./sprites/Background.png");
assetMangager.queueDownload("./sprites/monsterLeft.png");
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
// sounds
assetMangager.queueDownload("./sounds/sfx/playerhit.mp3");
assetMangager.queueDownload("./sounds/sfx/zombiehit.wav");
assetMangager.downloadAll(() => {
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