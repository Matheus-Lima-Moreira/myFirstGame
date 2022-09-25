import LoadingScene from './LoadingScene.js';
import GameScene from './GameScene.js';

const config = {
  type: Phaser.AUTO,
  width: 700,
  height: 700,
  parent: 'myFirstGameProject',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: true
    }
  },
  scene: [
    LoadingScene,
    GameScene
  ]
};

const game = new Phaser.Game(config);