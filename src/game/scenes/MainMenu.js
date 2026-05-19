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
        this.load.image("loginBackground","assets/loginBackground.png");
        this.load.image("loginwindow","assets/login_fenster.png");
    }

    input(){
        
    }

    create() {

        const W = this.scale.width;
        const H = this.scale.height;


        // Hintergrund hinzufügen und auf Bildschirmgröße skalieren
        this.bg = this.add.image(W*0.5, H*0.5, 'loginBackground').setDisplaySize(window.innerWidth,window.innerHeight);

        this.loginWindow = this.add.image(0, 0, 'loginwindow')

        this.MainMenu = this.add.text(this.scale.width / 2, 300, 'MainMenu', { fontFamily: 'Arial', fontSize: 64, color: '#0026ff' });

       this.MainMenu.setInteractive();

        let username = "";
        let password = "";
        let usernameeingabe;
        let passwordeingabe;

        this.logincontainer = this.add.container(
            W * 0.25,
            H * 0.5
        );

        this.logincontainer.add(this.loginWindow,0);

        this.logincontainer.setInteractive({
                hitArea: {},
                hitAreaCallback: (area, x, y) => {
                    if (Phaser.Geom.Rectangle.Contains(new Phaser.Geom.Rectangle(-350, -300, 610, 50), x, y)) {
                        this.activeZone = "drag";
                        return true;
                        usernameeingabe = true;
                        passwordeingabe = false;
                        console.log("username ", usernameeingabe, "passwort ", passwordeingabe)
                    }
                }
            });

        invisibleZone1.on('pointerdown', () => {

        });




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

        //this.scene.start('MainGame');
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

         this.logincontainer ?.setPosition(W*0.25,H*0.5);
     }
}

