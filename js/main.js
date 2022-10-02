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
      debug: false
    }
  },
  scene: [
    LoadingScene,
    GameScene
  ]
};

const game = new Phaser.Game(config);

document.getElementById('easterEgg').addEventListener('click', () => {
  document.body.innerHTML = '<divs style="color:white;">PARÁBENS VOCÊ ACHOU UM EASTER EGG, O QUE ISSO MUDA NA SUA VIDA?? I DON\'T KNOW BUT YOU\'RE COOL MAN</div>';
});