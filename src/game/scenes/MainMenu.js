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
        let passwordeingabe = false;



        this.usernamebutton = this.add.text(700,200,"usernamebutton",{ fontFamily: 'Arial', fontSize: 32, color: '#00ff00', })
        this.usernamebutton.setInteractive();
        this.usernamebutton.on('pointerdown', () => {
            this.usernameeingabe = true;
            this.passwordeingabe = false;
            console.log(username)
        });
        
        this.passwordbutton = this.add.text(700,400,"passwordbutton",{ fontFamily: 'Arial', fontSize: 32, color: '#00ff00', })
        this.passwordbutton.setInteractive();
        this.passwordbutton.on('pointerdown', () => {
            this.passwordeingabe = true;
            this.usernameeingabe = false;
            console.log(password)
        });






        this.usernameScene = this.add.text(300,200,"username",{ fontFamily: 'Arial', fontSize: 32, color: '#00ff00', });
        
        if(usernameeingabe == true){
                this.input.keyboard.on("keydown", (event) => {
                    if (event.key === "Backspace") {
                        username = username.slice(0, -1);
                    } else if(event.code.startsWith("Key")){

                        username += event.key;
                    }else {
                        console.log("keine gültige taste")
                    }
                    this.usernameScene.setText(username);
                    console.log('username: ' , username);
                });
        };




        this.passwordScene = this.add.text(300,400,"password",{ fontFamily: 'Arial', fontSize: 32, color: '#00ff00' });

        if(passwordeingabe == true){
                this.input.keyboard.on("keydown", (event) => {
                    if (event.key === "Backspace") {
                        password = password.slice(0, -1);
                    } else if(event.code.startsWith("Key")){

                        password += event.key;
                    }else {
                        console.log("keine gültige taste")
                    }
                    console.log('passwort: ' , password );
                });
        };
        



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

