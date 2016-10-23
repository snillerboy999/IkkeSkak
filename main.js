var game = new Phaser.Game(1300, 700, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var player1;
var player2;
var keys;
var weapon; 


function preload() {

	game.load.image('bg1', "bg1.jpg");
	game.load.image('player', "player.png");
  game.load.image('player1', "player1.png");
  game.load.image('bullet', "bullet.png");
  game.load.image('bullet1', "bullet1.png");

	//game.load.image('player2', "player2.png");
}

function create() {
	game.add.sprite(0,0,'bg1');

	player1 = this.add.sprite(100,350,'player');
	player1.scale.setTo(0.035,0.035);
  game.physics.arcade.enable(player1);
  player1.anchor.set(0.5,0.5);
  player1.body.drag.set(70);
  player1.body.maxVelocity.set(500);

  

	player2 = this.add.sprite(200,350,'player1');
	player2.scale.set(0.02,0.02);
	game.physics.arcade.enable(player2);
	player2.anchor.set(0.5,0.5);
  player2.body.drag.set(70);
  player2.body.maxVelocity.set(500);

	cursors = game.input.keyboard.createCursorKeys();

}

function update() {

	if(cursors.up.isDown) {

		game.physics.arcade.accelerationFromRotation(player1.rotation, 300, player1.body.acceleration);

	} else {

    player1.body.acceleration.set(0);

  }

  if (cursors.left.isDown) {

    player1.body.angularVelocity = -250;

  } else if (cursors.right.isDown) {

    player1.body.angularVelocity = 250;

  } else {

    player1.body.angularVelocity = 0;

  }

  if(cursors.left.isDown) {

    player2.body.angularVelocity = -250;

  } else if(cursors.right.isDown) {

    player2.body.angularVelocity = 250;

  } else {

    player2.body.angularVelocity = 0;

  }

  if(cursors.up.isDown) {

    game.physics.arcade.accelerationFromRotation(player2.rotation, 300, player2.body.acceleration);

  } else {

    player2.body.acceleration.set(0);

  }
}
