const HealthState = {
  IDLE: "IDLE",
  DAMAGE: "DAMAGE",
  DIED: "DIED",
};

export default class Player extends Phaser.GameObjects.Sprite {
  #healthState = HealthState.IDLE;
  #damageTime = 0;
  
  constructor(scene, x, y) {
    super(scene, x / 2, y / 2);
    
    this.setTexture("character");
    this.setPosition(x, y);
    this.createAnimations(scene);
    
    this.sizeScreen = {x, y};
    this.life = 5;
    this.sprite = scene.physics.add.sprite(x / 2, y / 2, "character", false);
    this.sprite.setSize(50, 100);
    this.sprite.setCollideWorldBounds(true); // Don't permite the character go out of the screen
  }

  handleDamage(dir) {
    if (this.#healthState === HealthState.DAMAGE) {
      return;
    }

    this.sprite.setVelocity(dir.x, dir.y);
    this.sprite.setTint(0xff0000);

    this.#healthState = HealthState.DAMAGE;
    this.#damageTime = 0;

    this.life -= 1;
    const lastLife = this.scene.hearts.pop();
          lastLife.destroy();
    if (this.life <= 0) {
      this.#healthState = HealthState.DIED;
      this.sprite.anims.play("death", true);
      this.scene.showGameOverScreen();
    }
  }

  preUpdate(time, dt) {
    switch (this.#healthState) {
      case HealthState.IDLE:
        break;
      case HealthState.DAMAGE:
        this.#damageTime += dt;
        if (this.#damageTime >= 250) {
          this.#healthState = HealthState.IDLE;
          this.sprite.setTint(0xffffff);
          this.#damageTime = 0;
        }
        break;
      case HealthState.DIED:
        this.sprite.setVelocity(0, 0);
        this.sprite.setTint(0xffffff);    
        break;
    }
  }

  update(t, dt, key) {
    this.preUpdate(t, dt);

    if (
      this.#healthState === HealthState.DAMAGE ||
      this.#healthState === HealthState.DIED
    ) {
      return;
    }

    this.sprite.setVelocity(0);

    const velocity = 200;

    // LEFT UPPER
    if (key.left.isDown && key.up.isDown) {
      this.sprite.setVelocity(-velocity, -velocity);
      this.sprite.anims.play("upper left", true);
    }
    // RIGHT UPPER
    else if (key.right.isDown && key.up.isDown) {
      this.sprite.setVelocity(velocity, -velocity);
      this.sprite.anims.play("upper right", true);
    }
    // LEFT DOWN
    else if (key.left.isDown && key.down.isDown) {
      this.sprite.setVelocity(-velocity, velocity);
      this.sprite.anims.play("down left", true);
    }
    // RIGHT DOWN
    else if (key.right.isDown && key.down.isDown) {
      this.sprite.setVelocity(velocity, velocity);
      this.sprite.anims.play("down right", true);
    }
    // LEFT
    else if (key.left.isDown) {
      this.sprite.setVelocity(-velocity, 0);
      this.sprite.anims.play("left", true);
    }
    // RIGHT
    else if (key.right.isDown) {
      this.sprite.setVelocity(velocity, 0);
      this.sprite.anims.play("right", true);
    }
    // UP
    else if (key.up.isDown) {
      this.sprite.setVelocity(0, -velocity);
      this.sprite.anims.play("up", true);
    }
    // DOWN
    else if (key.down.isDown) {
      this.sprite.setVelocity(0, velocity);
      this.sprite.anims.play("down", true);
    }

    // STOPPED
    if (this.sprite.body.velocity.x == 0 && this.sprite.body.velocity.y == 0) {
      this.sprite.anims.play("stop", true);
    }
  }

  getHealthState(){
    return this.#healthState;
  }

  createAnimations(scene) {
    // STOPPED ANIMATION
    scene.anims.create({
      key: "stop",
      frames: scene.anims.generateFrameNumbers("character", {
        start: 0,
        end: 0,
      }),
      frameRate: 10,
      repeat: -1,
    });

    // RIGHT ANIMATION
    scene.anims.create({
      key: "right",
      frames: scene.anims.generateFrameNumbers("character", {
        start: 9,
        end: 12,
      }),
      frameRate: 10,
      repeat: -1,
    });

    // UPPER RIGHT ANIMATION
    scene.anims.create({
      key: "upper right",
      frames: scene.anims.generateFrameNumbers("character", {
        start: 13,
        end: 16,
      }),
      frameRate: 10,
      repeat: -1,
    });

    // UP ANIMATION
    scene.anims.create({
      key: "up",
      frames: scene.anims.generateFrameNumbers("character", {
        start: 12,
        end: 14,
      }),
      frameRate: 10,
      repeat: -1,
    });

    // UPPER LEFT ANIMATION
    scene.anims.create({
      key: "upper left",
      frames: scene.anims.generateFrameNumbers("character", {
        start: 21,
        end: 24,
      }),
      frameRate: 10,
      repeat: -1,
    });

    // LEFT ANIMATION
    scene.anims.create({
      key: "left",
      frames: scene.anims.generateFrameNumbers("character", {
        start: 25,
        end: 28,
      }),
      frameRate: 10,
      repeat: -1,
    });

    // DOWN LEFT ANIMATION
    scene.anims.create({
      key: "down left",
      frames: scene.anims.generateFrameNumbers("character", {
        start: 29,
        end: 32,
      }),
      frameRate: 10,
      repeat: -1,
    });

    // DOWN ANIMATION
    scene.anims.create({
      key: "down",
      frames: scene.anims.generateFrameNumbers("character", {
        start: 0,
        end: 4,
      }),
      frameRate: 10,
      repeat: -1,
    });

    // DOWN RIGHT ANIMATION
    scene.anims.create({
      key: "down right",
      frames: scene.anims.generateFrameNumbers("character", {
        start: 5,
        end: 8,
      }),
      frameRate: 10,
      repeat: -1,
    });

    // DEATH ANIMATION
    scene.anims.create({
      key: "death",
      frames: scene.anims.generateFrameNumbers("character", {
        start: 33,
        end: 36,
      }),
      frameRate: 10
    });
  }


}
