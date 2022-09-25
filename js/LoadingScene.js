export default class LoadingScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'LoadingScene',
    });
  }

  preload() {
    const larguraJogo = this.sys.canvas.width;
    const progressBar = this.add.graphics();

    const widthBar = 0.7 * larguraJogo;
    this.load.on('progress', (progress) => {
      progressBar.clear();
      progressBar.fillStyle(0xffffffff, 1);
      progressBar.fillRect((larguraJogo - widthBar) / 2, this.sys.game.config.height / 2, widthBar * progress, 70);
      progressBar.lineStyle(3, 0x008f, 1);
      progressBar.strokeRect((larguraJogo - widthBar) / 2, this.sys.game.config.height / 2, widthBar, 70);
    });

    this.load.on('complete', () => {
      this.scene.start('GameScene');
    });

    this.load.image('dungeon', 'imgs/dungeon.png');
    this.load.spritesheet('character', 'imgs/nurse.png', { frameWidth: 30, frameHeight: 32 });
    // this.preload.atlas('character','imgs/character.png',)
    this.load.image('spikeball', 'imgs/spikeball.png');
  }

  create() {

  }

  update() {

  }
}