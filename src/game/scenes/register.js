import { Scene } from "phaser";
import { getResponsiveSize } from "./f_update";


export default class register extends Scene {
 constructor() {
        super('register');
    }

}
/*
import { Scene } from "phaser";
import { getResponsiveSize } from "./f_update";

export default class register extends Scene {

    text;
    start = null;

    bg;
    loginWindow;

    constructor() {
        super('register');
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

        let usernametext = this.add.text(-67, -63, "username", {fontFamily: 'tahoma', fontSize: 32, color: '#000000ff'} )
        let passwordtext = this.add.text(-67, 12, "password", {fontFamily: 'tahoma', fontSize: 32, color: '#000000ff'} )

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

        this.logincontainer.addAt(this.loginWindow,0);
        this.logincontainer.addAt(usernametext, 1);
        this.logincontainer.addAt(passwordtext, 2)

        this.logincontainer.setInteractive({
            hitArea: {},
            hitAreaCallback: (area, x, y) => {
                if (Phaser.Geom.Rectangle.Contains(new Phaser.Geom.Rectangle(-72, -65, 265, 39), x, y)) {
                    this.activeZone = "user";
                    return true;

                };
                if (Phaser.Geom.Rectangle.Contains(new Phaser.Geom.Rectangle(-72, 13, 265, 39), x, y)) {
                    this.activeZone = "password";
                    return true;
                    
                };
                if (Phaser.Geom.Rectangle.Contains(new Phaser.Geom.Rectangle(-72, 13, 265, 39), x, y)) {
                    this.activeZone = "password";
                    return true;
                    
                };
                if (Phaser.Geom.Rectangle.Contains(new Phaser.Geom.Rectangle(50, 57, 154, 67), x, y)) {
                this.activeZone = "continue";
                return true;
                };
                if (Phaser.Geom.Rectangle.Contains(new Phaser.Geom.Rectangle(-208, 215, 154, 67), x, y)) {
                this.activeZone = "Register";
                return true;
                };
                if (Phaser.Geom.Rectangle.Contains(new Phaser.Geom.Rectangle(50, 215, 154, 67), x, y)) {
                this.activeZone = "Guestlogin";
                return true;
                };

        }});

this.input.on('pointerdown', (pointer) => {
    if (!this.logincontainer) return;
    // Welt-Koordinaten des Pointers
    const worldX = pointer.x;
    const worldY = pointer.y;
    // Lokale Koordinaten relativ zum Container (einfacher Fall: kein Scale/Rotation)
    const localX = worldX - this.logincontainer.x;
    const localY = worldY - this.logincontainer.y;
    console.log('world:', worldX, worldY, 'container local:', localX, localY);
});

        this.logincontainer.on("pointerdown", ()=>{
            switch (this.activeZone) {
                case "user":
                    usernameeingabe = true;
                    passwordeingabe = false;
                    console.log("username ", usernameeingabe, "passwort ", passwordeingabe)
                    break;
                case "password":
                    usernameeingabe = false;
                    passwordeingabe = true;
                    console.log("password", usernameeingabe, "passwort ", passwordeingabe)
                    break;
                case "continue":
                    if(username === "admin" && password === "admin"){
                    this.start = true;
                    console.log('MainMenu clicked - valid credentials'); 
                    this.scene.start('MainGame');
                    }else{
                    console.log('MainMenu clicked - invalid credentials');
                    }
                    break;
                case "Register":
                    this.scene.start('register');
                    
                    break;   
                case "Guestlogin":
                    this.scene.start('MainGame')
                    
                    break; 
                default:
                    break;

            }
        })
        
        


/*  usernameeingabe = true;
                    passwordeingabe = false;
                    console.log("username ", usernameeingabe, "passwort ", passwordeingabe)
        invisibleZone.on('pointerdown', () => {
            passwordeingabe = true;
            usernameeingabe = false;
            console.log("username ", usernameeingabe, "passwort ", passwordeingabe)
        });
*



this.input.keyboard.on("keydown", (event) => {
    if (usernameeingabe == true) {
        if (event.key == "Backspace") {
            username = username.slice(0, -1);
            console.log("username: ", username)
            usernametext.setText(username);
        } else if(event.code.startsWith("Key")){
            username += event.key;
            console.log("username: ", username)
            usernametext.setText(username);
        }
    } 
    if (passwordeingabe == true) {
        if(event.key == "Backspace"){
            password = password.slice(0, -1);
            console.log("password: ", password)
            passwordtext.setText(password)
        } else if (event.code.startsWith("Key")) {
            password += event.key;
            console.log("password: ", password)
            passwordtext.setText(password)
        }
    }
});

        //this.scene.start('MainGame');
        this.MainMenu.on('pointerdown', () => {
            if(username === "admin" && password === "admin"){
            this.start = true;
            console.log('MainMenu clicked - valid credentials'); 
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
*/
