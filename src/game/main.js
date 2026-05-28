import { AUTO, Game } from 'phaser';
import MainGame from './scenes/MainGame';
import MainMenu from './scenes/MainMenu';
import Register from './scenes/register';


const config = {
  type: Phaser.WEBGL,
  parent: 'game-container',
  backgroundColor: '#ffffff',
  dom: { createContainer: true },

  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: 'arcade'
  },

  scene: [
    MainMenu, 
    MainGame,
    Register,

  ]
}; 



const StartGame = (parent) => {

    return new Game({ ...config, parent });

}

export default StartGame;
