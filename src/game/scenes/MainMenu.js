import { Scene } from "phaser";

export default class MainMenu extends Scene {

    text;

    constructor() {
        super('MainMenu');
    }

    preload(){

    }

    create() {

        console.log('MainMenu create called');

        this.text = this.add.text(this.scale.width / 2, this.scale.height / 2, 'Main Menu', { fontFamily: 'Arial', fontSize: 64, color: '#00ff00' }).setOrigin(0.5);

        if(true){
            this.scene.start('MainGame');
        }
    }
}