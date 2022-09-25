export default class Player {
  constructor(scene, widthGame, heightGame) {
    this.scene = scene;
    this.sprite = scene.physics.add.sprite(widthGame / 2, heightGame / 2, 'character');
    // this.sprite.setBounce(0.2); // It's a quicking animation
    this.sprite.setCollideWorldBounds(true); // Don't permite the character go out of the screen

    scene.anims.create({
      key: 'right',
      frames: scene.anims.generateFrameNumbers('character', { start: 8, end: 11 }),
      frameRate: 10,
      repeat: -1
    });

    scene.anims.create({
      key: 'stop',
      frames: scene.anims.generateFrameNumbers('character', { start: 0, end: 0 }),
      frameRate: 10,
      repeat: -1
    });

    scene.anims.create({
      key: 'left',
      frames: scene.anims.generateFrameNumbers('character', { start: 8, end: 11 }),
      frameRate: 10,
      repeat: -1
    });

    scene.anims.create({
      key: 'up',
      frames: scene.anims.generateFrameNumbers('character', { start: 12, end: 14 }),
      frameRate: 10,
      repeat: -1
    });

    scene.anims.create({
      key: 'down',
      frames: scene.anims.generateFrameNumbers('character', { start: 0, end: 4 }),
      frameRate: 10,
      repeat: -1
    });
  }
};