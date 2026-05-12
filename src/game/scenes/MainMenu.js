import { Scene } from "phaser";

export default class MainMenu extends Scene {

    text;
    start = null;
    constructor() {
        super('mainmenu');
    }

    preload(){
        this.load.image("loginBackground","public/assets/loginBackground.png");
        this.load.image("loginwindow","public/assets/login_fenster.png");
    }

    input(){
        
    }

    create() {

        console.log('MainMenu create called');

        // Hintergrund hinzufügen und auf Bildschirmgröße skalieren
        const bg = this.add.image(this.scale.width / 2, this.scale.height / 2, 'loginBackground')
            .setOrigin(0.499, 0.5)
            .setDisplaySize(this.scale.width, this.scale.height);

        const loginWindow = this.add.image(this.scale.width / 3, this.scale.height / 2, 'loginwindow')
            .setOrigin(0.5, 0.5)
            .setDisplaySize(this.scale.width * 0.3, this.scale.height * 0.7);

        console.log('MainMenu create called');

        //this.MainMenu = this.add.text(this.scale.width / 2, 300, 'MainMenu', { fontFamily: 'Arial', fontSize: 64, color: '#00ff00' }).setOrigin(0.5);

        this.MainMenu.setInteractive();

        let username = "";
        let password = "";
        let usernameeingabe;
        let passwordeingabe;



        //this.usernamebutton = this.add.text(this.scale.width / 2,500,"usernamebutton",{ fontFamily: 'Arial', fontSize: 32, color: '#00ff00', })
        this.usernamebutton.setInteractive();
        this.usernamebutton.on('pointerdown', () => {
            usernameeingabe = true;
            passwordeingabe = false;
            console.log("username ", usernameeingabe, "passwort ", passwordeingabe)
        });
        
        //this.passwordbutton = this.add.text(this.scale.width / 2,800,"passwordbutton",{ fontFamily: 'Arial', fontSize: 32, color: '#00ff00', })
        this.passwordbutton.setInteractive();
        this.passwordbutton.on('pointerdown', () => {
            passwordeingabe = true;
            usernameeingabe = false;
            console.log("username ", usernameeingabe, "passwort ", passwordeingabe)
        });





this.input.keyboard.on("keydown", (event) => {
    if (usernameeingabe == true) {
        if (event.key == "Backspace") {
            username = username.slice(0, -1);
            console.log("username: ", username)
        } else if(event.code.startsWith("Key")){
            username += event.key;
            console.log("username: ", username)
        }
    } 
    if (passwordeingabe == true) {
        if(event.key == "Backspace"){
            password = password.slice(0, -1);
            console.log("password: ", password)
        } else if (event.code.startsWith("Key")) {
            password += event.key;
            console.log("password: ", password)
        }
    }
});

        this.scene.start('MainGame');
        this.MainMenu.on('pointerdown', () => {
            if(username === "admin" && password === "admin"){
            this.start = true;
            console.log('MainMenu clicked');
            console.log('start: ' + this.start); 
            this.scene.start('MainGame');
            }else{
                console.log('MainMenu clicked - invalid credentials');
            }
        });



    }

    update(){




    };
}

