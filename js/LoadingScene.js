export default class LoadingScene extends Phaser.Scene {
  constructor() {
    super({
      key: "LoadingScene",
    });
  }

  preload() {
    const larguraJogo = this.sys.canvas.width;
    const progressBar = this.add.graphics();

    const widthBar = 0.7 * larguraJogo;

    // MAKING THE PROGRESS BAR
    this.load.on("progress", (progress) => {
      progressBar.clear();
      progressBar.fillStyle(0xffffffff, 1);
      progressBar.fillRect(
        (larguraJogo - widthBar) / 2,
        this.sys.game.config.height / 2,
        widthBar * progress,
        70
      );
      progressBar.lineStyle(3, 0x008f, 1);
      progressBar.strokeRect(
        (larguraJogo - widthBar) / 2,
        this.sys.game.config.height / 2,
        widthBar,
        70
      );
    });

    // ON COMPLETE
    this.load.on("complete", () => {
      this.scene.start("GameScene");
    });

    // LOADING THE IMGS
    this.load.image("dungeon", "imgs/dungeon.png");
    this.load.spritesheet("character", "imgs/nurse.png", {
      frameWidth: 90,
      frameHeight: 96,
    });
    this.load.spritesheet("spikeball", "imgs/spike_ball.png", {
      frameWidth: 120,
      frameHeight: 120,
    });
    this.load.image('spike_ball', 'imgs/spike_ball.png')
    this.load.image('heart', 'imgs/heart.png');
    // this.preload.atlas('character','imgs/character.png',)
  }

  create() {}

  update() {}
}
