import Player from "./Player.js";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'GameScene',
    });
  }

  preload() {

  }

  create() {
    const larguraJogo = this.sys.canvas.width;
    const alturaJogo = this.sys.canvas.height;

    const backgroundImage = this.add.image(larguraJogo / 2, alturaJogo / 2, 'dungeon');

    // const walls = this.physics.add.staticGroup();
    // walls.create(alturaJogo/2, larguraJogo/2).setOrigin(0, 0).refreshBody();

    this.player = new Player(this, larguraJogo, alturaJogo);
    this.keys = this.input.keyboard.createCursorKeys();
  }

  update() {
    const player = this.player.sprite;

    if (this.keys.left.isDown) {
      player.setVelocityX(-160);
      player.setFlip(true, false);
      player.anims.play('left', true);
    }
    else if (this.keys.right.isDown) {
      player.setVelocityX(160);
      player.setFlip(false, false);
      player.anims.play('right', true);
    }    
    else if (this.keys.up.isDown) {
      player.setVelocityY(-160);
      player.anims.play('up', true);
    }
    else if (this.keys.down.isDown) {
      player.setVelocityY(160);
      player.anims.play('down', true);
    }
    else {
      player.setVelocityX(0);
      player.anims.play('stop');
    }
  }
}