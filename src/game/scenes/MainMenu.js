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

        let username = "";
        let password = "";
        let usernameeingabe = true;
        let passwordeingabe;



        this.usernamebutton = this.add.text(700,200,"usernamebutton",{ fontFamily: 'Arial', fontSize: 32, color: '#00ff00', })
        this.usernamebutton.setInteractive();
        this.usernamebutton.on('pointerdown', () => {
            usernameeingabe = true;
            passwordeingabe = false;
            console.log("username ", usernameeingabe, "passwort ", passwordeingabe)
        });
        
        this.passwordbutton = this.add.text(700,400,"passwordbutton",{ fontFamily: 'Arial', fontSize: 32, color: '#00ff00', })
        this.passwordbutton.setInteractive();
        this.passwordbutton.on('pointerdown', () => {
            passwordeingabe = true;
            usernameeingabe = false;
            console.log("username ", usernameeingabe, "passwort ", passwordeingabe)
        });





this.input.keyboard.on("keydown", (event) => {
    if (usernameeingabe == true) {
        if (event.key === "Backspace") {
            username = username.slice(0, -1);
        } else if(event.code.startsWith("Key")){
            username += event.key;
            console.log(username)
        }
    } 
    if (passwordeingabe == true) {
        if(event.key === "Backspace"){
            password = password.slice(0, -1);
        } else if (event.code.startsWith("Key")) {
            password += event.key;
            console.log(password)
        }
    }
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

    update(){




    };
}

