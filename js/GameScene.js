import Player from "./Player.js";
import Enemy from "./Enemy.js";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({
      key: "GameScene",
    });
  }

  preload() {}

  create() {
    const larguraJogo = this.sys.canvas.width;
    const alturaJogo = this.sys.canvas.height;

    const backgroundImage = this.add.image(
      larguraJogo / 2,
      alturaJogo / 2,
      "dungeon"
    );

    // const walls = this.physics.add.staticGroup();
    // walls.create(200, 200,'character').setOrigin(0, 0).refreshBody();

    // this.physics.world.enable([ this.player, this.enemy ]);
    // this.physics.world.collide(this.player, this.enemy);

    this.player = new Player(this, larguraJogo, alturaJogo);

    this.enemy = new Enemy(this, 264, 250);
    this.enemy.sprite.body.onCollide = true;

    this.colliderPlayerEnemy = this.physics.add.collider(
      this.player.sprite,
      this.enemy.sprite,
      this.handlerDamage,
      undefined,
      this
    );

    this.keys = this.input.keyboard.createCursorKeys();

    this.drawHearts();
  }

  handlerDamage(obj1, obj2) {
    if (this.player.getHealthState() == "DIED") return this.physics.world.removeCollider(this.colliderPlayerEnemy);

    const enemy = obj2;

    const dx = this.player.sprite.x - enemy.x;
    const dy = this.player.sprite.y - enemy.y;

    const dir = new Phaser.Math.Vector2(dx, dy).normalize().scale(400);

    this.player.handleDamage(dir);
  }

  update(t, dt) {
    this.enemy.update();
    this.player.update(t, dt, this.keys);
  }

  drawHearts() {
    let momentX = 40;
    this.hearts = [];
    for (let i = 0; i < this.player.life; i++) {
      this.hearts.push(this.add.image(momentX, 40, "heart"));
      momentX += 30;
    }
  }

  showGameOverScreen() {
    this.add
      .text(
        this.sys.canvas.width - 515,
        this.sys.canvas.height - 410,
        "Game Over",
        { font: "65px Arial", fill: "#FFFFFF" }
      )
      .setOrigin(0, 0);
    this.add
      .text(
        this.sys.canvas.width - 465,
        this.sys.canvas.height - 340,
        "Click to Restart",
        { font: "35px Arial", fill: "#FFFFFF" }
      )
      .setOrigin(0, 0);

    this.cameras.main.on(
      "camerafadeoutcomplete",
      () => {
        this.scene.restart();
      },
      this
    );

    this.input.once(
      "pointerdown",
      () => {
        //  Get a random color
        var red = Phaser.Math.Between(50, 255);
        var green = Phaser.Math.Between(50, 255);
        var blue = Phaser.Math.Between(50, 255);
        this.cameras.main.fade(2000, red, green, blue);
      },
      this
    );
  }
}
