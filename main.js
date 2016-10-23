var game = new Phaser.Game(1300, 700, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var player1;
var player2;
var cursors;
var keyboard;
var weapon1;
var weapon2;
var player1Kills = 0;
var player2Kills = 0;
var text;
var text2;

function preload() {

  game.load.image('bg1', "res/bg1.jpg");
  game.load.image('player', "res/player.png");
  game.load.image('player1', "res/player1.png");
  game.load.image('bullet', "res/bullet.png");
  game.load.image('bullet1', "res/bullet1.png");
}

function create() {

	game.add.sprite(0,0,'bg1');

  player1 = this.add.sprite(100,350,'player1');
  player1.scale.setTo(0.035,0.035);
  game.physics.arcade.enable(player1);
  player1.anchor.set(0.5,0.5);
  player1.body.drag.set(70);
  player1.body.maxVelocity.set(500);
  player1.body.collideWorldBounds = true;

  player2 = this.add.sprite(1000,350,'player2');
  player2.scale.set(0.02,0.02);
  game.physics.arcade.enable(player2);
  player2.anchor.set(0.5,0.5);
  player2.body.drag.set(70);
  player2.body.maxVelocity.set(500);
  player2.body.collideWorldBounds = true;

  weapon1 = game.add.weapon(100, 'bullet');
  weapon1.killType = Phaser.Weapon.KILL_WORLD_BOUNDS;
  weapon1.fireRate = 20;
  weapon1.bulletSpeed = 800;
  weapon1.trackSprite(player1,20,0,true);
  game.physics.arcade.enable(weapon1);

  weapon2 = game.add.weapon(100,'bullet1');
  weapon2.killType = Phaser.Weapon.KILL_WORLD_BOUNDS;
  weapon2.fireRate = 20;
  weapon2.bulletSpeed = 800;
  weapon2.trackSprite(player2,20,0,true);


  text = game.add.text(16,16, "0");
  text2 = game.add.text(1100,16, "0");

  cursors = game.input.keyboard.createCursorKeys();

  keyboard = game.input.keyboard;

}

function update() {

  text.text = "" + player1Kills;
  text2.text = "" + player2Kills;

  if(keyboard.addKey(Phaser.KeyCode.W).isDown) {

    game.physics.arcade.accelerationFromRotation(player1.rotation, 250, player1.body.acceleration);

  } else {

    player1.body.acceleration.set(0);

  }

  if (keyboard.addKey(Phaser.KeyCode.A).isDown) {

    player1.body.angularVelocity = -250;

  } else if (keyboard.addKey(Phaser.KeyCode.D).isDown) {

    player1.body.angularVelocity = 250;

  } else {

    player1.body.angularVelocity = 0;

  }



  if(keyboard.addKey(Phaser.KeyCode.J).isDown) {

    player2.body.angularVelocity = -250;

  } else if(keyboard.addKey(Phaser.KeyCode.L).isDown) {

    player2.body.angularVelocity = 250;

  } else {

    player2.body.angularVelocity = 0;

  }

  if(keyboard.addKey(Phaser.KeyCode.I).isDown) {

    game.physics.arcade.accelerationFromRotation(player2.rotation, 250, player2.body.acceleration);

  } else {

    player2.body.acceleration.set(0);

  }

  if(keyboard.addKey(Phaser.KeyCode.SHIFT).isDown) {

    weapon1.fire();

  }
  if(keyboard.addKey(Phaser.KeyCode.SPACEBAR).isDown) {

    weapon2.fire();

  }

  game.physics.arcade.overlap(weapon1.bullets, player2, player2Die,null,this);
  game.physics.arcade.overlap(weapon2.bullets, player1, player1Die, null, this);
  game.physics.arcade.collide(player2,player1, null,null,this);

}

function player2Die() {

  player1.position.set(100,350);
  player2.position.set(1000,350);
  player1Kills += 1;
  weapon2.killAll();
  weapon1.killAll();

}


function player1Die() {

  player1.position.set(100,350);
  player2.position.set(1000,350);
  player2Kills += 1;
  weapon2.killAll();
  weapon1.killAll();

}
