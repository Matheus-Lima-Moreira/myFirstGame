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

    this.physics.add.collider(
      this.player.sprite,
      this.enemy.sprite,
      this.handlerDamage,
      undefined,
      this
    );

    this.keys = this.input.keyboard.createCursorKeys();
  }

  handlerDamage(obj1, obj2) {
    const enemy = obj2;

    const dx = this.player.sprite.x - enemy.x;
    const dy = this.player.sprite.y - enemy.y;

    const dir = new Phaser.Math.Vector2(dx, dy).normalize().scale(400);

    this.player.handleDamage(dir);
    // const enemy = obj2;
  }

  update(t, dt) {
    this.player.preUpdate(t, dt);
    this.enemy.update();
    this.player.update(this.keys);
  }
}
