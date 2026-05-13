import { Scene } from "phaser";
import { getResponsiveSize } from "./f_update";

export default class MainMenu extends Scene {

    text;
    start = null;

    bg;
    loginWindow;

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

        const W = this.scale.width;
        const H = this.scale.height;

        console.log('MainMenu create called');

        // Hintergrund hinzufügen und auf Bildschirmgröße skalieren
        this.bg = this.add.image(W*0.5, H*0.5, 'loginBackground').setDisplaySize(window.innerWidth,window.innerHeight);

        this.loginWindow = this.add.image(W*0.3333333333, H*0.5, 'loginwindow')

        console.log('MainMenu create called');

        this.MainMenu = this.add.text(this.scale.width / 2, 300, 'MainMenu', { fontFamily: 'Arial', fontSize: 64, color: '#00ff00' }).setOrigin(0.5);

       this.MainMenu.setInteractive();

        let username = "";
        let password = "";
        let usernameeingabe;
        let passwordeingabe;



        this.usernamebutton = this.add.container(this.scale.width / 2, 500);

        const uwWidth = 300;
        const uwHeight = 50;
        // unsichtbare Zone als interaktives Kind (kein sichtbarer Text)
        const invisibleZone1 = this.add.zone(0, 0, uwWidth, uwHeight).setOrigin(0.5);
        this.usernamebutton.add(invisibleZone1);

        invisibleZone1.setInteractive();
        invisibleZone1.on('pointerdown', () => {
            usernameeingabe = true;
            passwordeingabe = false;
            console.log("username ", usernameeingabe, "passwort ", passwordeingabe)
        });


this.passwordbutton = this.add.container(this.scale.width / 2, 600);

        const pwWidth = 300;
        const pwHeight = 50;
        // unsichtbare Zone als interaktives Kind (kein sichtbarer Text)
        const invisibleZone = this.add.zone(0, 0, pwWidth, pwHeight).setOrigin(0.5);
        this.passwordbutton.add(invisibleZone);
        // setInteractive auf die lokale Variable anwenden (nicht this.invisibleZone)
        invisibleZone.setInteractive();
        invisibleZone.on('pointerdown', () => {
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
        

        //Reagiert wenn die Größe sich verändert
        this.scale.on('resize', this.onResize, this);

        this.events.on('shutdown', () => {
            this.scale.off('resize', this.onResize, this);
        });


    }

    update(){
 
        //Skaliert die Objekte neu anhand der Bildschirmposition
        let SizeLogin = getResponsiveSize(this.loginWindow.width,this.loginWindow.height,window.innerWidth,innerHeight);
        this.loginWindow = this.loginWindow.setScale(SizeLogin.scale/1.5);
     }
 
     //Setzt die Position neu anhand der Bildschirmposition
     onResize(gameSize) {
         const W = gameSize.width;
         const H = gameSize.height;
 
         this.bg ?.setPosition(W*0.5, H*0.5).setDisplaySize(W, H);
 
         this.loginWindow ?.setPosition(W*0.3333333333,H*0.5);
     }
}

