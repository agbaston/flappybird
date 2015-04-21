// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(790, 400, Phaser.AUTO, 'game', stateActions);

var score = 0;
var labelScore;
var player;
var pipes;

/*
 * Loads all resources for the game and gives them names.
 */
function preload() {
    game.load.image("playerImg", "assets/jamesBond.gif");
    game.load.image("pipe", "assets/pipe.png");
}

/*
 * Initialises the game. This function is only called once.
 */
function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    // set the background colour of the scene
    game.stage.setBackgroundColor("#3083FF");
    game.add.text(500, 20, "James Bond", {
        font: "30px Arial",
        fill: "#FFFFFF"
    });

    labelScore = game.add.text(700, 20, "0");
    player = game.add.sprite(200, 270, "playerImg");

    game.physics.arcade.enable(player);

    player.body.velocity.y = -100;
    player.body.velocity.x = 100;


    game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
              .onDown.add(spaceHandler);

    pipes = game.add.group();

    generatePipe();
}

function addPipeBlock(x, y){
    var pipe = pipes.create(x, y, "pipe");
}

function generatePipe(){



    var gapStart = game.rnd.integerInRange(1, 5);
    for(var count = 0; count < 8; count = count + 1){
        if(count != gapStart && count != gapStart + 1){
            addPipeBlock(0, count * 50);
        }
    }
}
function changeScore(){
    score = score + 1;
    labelScore.setText(score.toString());
}

function spaceHandler() {
    changeScore();
}

/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {
    
}