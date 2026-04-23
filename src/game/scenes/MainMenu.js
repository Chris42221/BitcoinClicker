import { Scene } from "phaser";

export default class MainMenu extends Scene {

    text;
    start = null;
    constructor() {
        super('mainmenu');
    }

    preload(){

    }

    input(){
        
    }

    create() {

        console.log('MainMenu create called');

        this.MainMenu = this.add.text(this.scale.width / 2, this.scale.height / 2, 'MainMenu', { fontFamily: 'Arial', fontSize: 64, color: '#00ff00' }).setOrigin(0.5);

        this.MainMenu.setInteractive();

        let text = "";
        let display = this.add.text(100, 100, "", { fontSize: "32px" });

        this.input.keyboard.on("keydown", (event) => {
            if (event.key === "Backspace") {
                text = text.slice(0, -1);
            } else {
                text += event.key;
            }
            display.setText(text);
            console.log('MainMenu ' , text ,' created');
        });

        

        this.MainMenu.on('pointerdown', () => {
            this.start = true;
            console.log('MainMenu clicked');
            console.log('start: ' + this.start); 

        if(this.start === true){
            this.scene.start('MainGame');
        }
        });


    }
}