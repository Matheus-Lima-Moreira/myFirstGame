export default class Enemy {
  #direction = { x: false, y: false };

  constructor(scene, widthGame, heightGame) {
    this.scene = scene;
    this.sprite = scene.physics.add.sprite(
      widthGame / 2,
      heightGame / 2,
      "spikeball",
      false
    );
    this.sprite.setBounce(1); // It's a quicking animation
    this.sprite.setCollideWorldBounds(true); // Don't permite the character go out of the screen
    // this.sprite.setGravity(100);

    setInterval(() => {
      this.changeDirection(Math.random() * 4, Math.random() * 4);
    }, 1000);
  }

  update() {
    this.sprite.rotation += 0.07;

    if (this.#direction.x) {
      this.sprite.setVelocityX(300);
    } else {
      this.sprite.setVelocityX(-300);
    }

    if (this.#direction.y) {
      this.sprite.setVelocityY(300);
    } else {
      this.sprite.setVelocityY(-300);
    }
  }

  changeDirection(directX, directY) {
    console.log(directX,'----',directY)

    if (directX > 2) {
      this.#direction.x = true;
    } else {
      this.#direction.x = false;
    }

    if (directY > 2) {
      this.#direction.y = true;
    } else {
      this.#direction.y = false;
    }
  }
}
