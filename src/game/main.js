import { AUTO, Game } from 'phaser';
import MainGame from './scenes/MainGame';


//  Find out more information about the Game Config at:
//  https://docs.phaser.io/api-documentation/typedef/types-core#gameconfig
const config = {
    type: AUTO,
    width: screen.width,
    height: screen.height,
    parent: 'game-container',
    backgroundColor: '#ffffff',
    scene: [
        MainGame
    ]
};



const StartGame = (parent) => {

    return new Game({ ...config, parent });

}

export default StartGame;
