import { AUTO, Game } from 'phaser';
import MainGame from './scenes/MainGame';
import MainMenu from './scenes/MainMenu';


//  Find out more information about the Game Config at:
//  https://docs.phaser.io/api-documentation/typedef/types-core#gameconfig
const config = {
  type: Phaser.WEBGL,
  parent: 'game-container',
  backgroundColor: '#ffffff',
  dom: { createContainer: true },

  scale: {
    mode: Phaser.Scale.RESIZE,         // Canvas = immer Browsergröße
    autoCenter: Phaser.Scale.CENTER_BOTH, // Automatisch zentrieren
  },
  physics: {
    default: 'arcade'
  },

  scene: [MainMenu, MainGame]
}; 



const StartGame = (parent) => {

    return new Game({ ...config, parent });

}

export default StartGame;
