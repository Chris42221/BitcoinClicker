import { Scene } from "phaser";
import { getResponsiveSize } from "./f_update";


export default class Register extends Scene {

    text;

    constructor() {
        super("Register");
    }

    preload() {
        this.load.image("loginBackground", "assets/loginBackground.png");
        this.load.image("SignupWindow", "assets/Signup_window.png");

        this.load.audio("BackgroundSound","assets/PCSound.mp3");
        this.load.audio("MouseClickSound","assets/MouseClickSound.mp3");
        this.load.audio("LoginSound","assets/LoginSound.mp3");
        this.load.audio("ErrorSound","assets/ErrorSound.mp3");
        this.load.audio("KeyboardSound","assets/KeyboardSound.mp3");
    }

    create() {

        //Setzten des Deault Courser
        this.input.setDefaultCursor("url(assets/cursors/arrow_m.cur), default");

        //Mouse Click Sound
        this.input.on("pointerdown",()=>{
            this.sound.play("MouseClickSound");
        });

        //BackgroundSound
        this.sound.add("BackgroundSound", {
            loop: true,
            volume: 0.3,
        }).play();

        const W = this.scale.width;
        const H = this.scale.height;

        // Hintergrund hinzufügen und auf Bildschirmgröße skalieren
        this.bg = this.add.image(W * 0.5, H * 0.5, 'loginBackground').setDisplaySize(window.innerWidth, window.innerHeight);

        this.SignupWindow = this.add.image(0, 0, 'SignupWindow')

        let usernametext = this.add.text(-50, -45, "username", { fontFamily: 'tahoma', fontSize: 22, color: '#000000ff' })
        let passwordtext = this.add.text(-50, 8, "password", { fontFamily: 'tahoma', fontSize: 22, color: '#000000ff' })

        this.text = this.add.text(-150, 110,"",{fontFamily: 'tahoma', fontSize: 22, color: 'rgb(255, 0, 0)'}).setVisible(false);


        let username = "";
        let password = "";
        let usernameeingabe;
        let passwordeingabe;

        this.RegistContainer = this.add.container(
            W * 0.25,
            H * 0.5
        );

        this.RegistContainer.addAt(this.SignupWindow, 0);
        this.RegistContainer.addAt(usernametext, 1);
        this.RegistContainer.addAt(passwordtext, 2);
        this.RegistContainer.addAt(this.text,3);

        this.RegistContainer.setInteractive({
            hitArea: {},
            hitAreaCallback: (area, x, y) => {
                if (Phaser.Geom.Rectangle.Contains(new Phaser.Geom.Rectangle(-55, -47, 197, 30), x, y)) {
                    this.activeZone = "user";
                    return true;

                };
                if (Phaser.Geom.Rectangle.Contains(new Phaser.Geom.Rectangle(-55, 6, 197, 30), x, y)) {
                    this.activeZone = "password";
                    return true;

                };
                if (Phaser.Geom.Rectangle.Contains(new Phaser.Geom.Rectangle(35, 57, 110, 40), x, y)) {
                    this.activeZone = "continue";
                    return true;
                };
                if (Phaser.Geom.Rectangle.Contains(new Phaser.Geom.Rectangle(-155, 155, 110, 40), x, y)) {
                    this.activeZone = "Login";
                    return true;
                };
                if (Phaser.Geom.Rectangle.Contains(new Phaser.Geom.Rectangle(35, 155, 110, 40), x, y)) {
                    this.activeZone = "Guestlogin";
                    return true;
                };
            },
            cursor: "url(assets/cursors/harrow.cur), pointer",
        });

        this.RegistContainer.on("pointerdown", () => {
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
                    UserPost(this);
                    async function UserPost(scene) {
                        const ExisUser = await fetch(`https://bitcoinclicker.site/api/player/acount/login/${username}`);
                        if(!ExisUser.ok){
                            scene.text.setVisible(true);
                            scene.text.setText("Invalid username or password");
                            scene.sound.play("ErrorSound");
                            return;
                        }
                        const ExisUserJson = await ExisUser.json();

                        console.log(ExisUserJson);

                        if(ExisUserJson.length != 0){
                            scene.text.setVisible(true);
                            scene.text.setText("Username already in use");
                            scene.sound.play("ErrorSound");
                            return;
                        }

                        if(username.trim() == "" || password.trim() == ""){
                            scene.text.setVisible(true);
                            scene.text.setText("Invalid username or password");
                            scene.sound.play("ErrorSound");
                            return;
                        }

                        const User = await fetch(`https://bitcoinclicker.site/api/player/acount/create`,{
                            method: "POST",
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify({
                                Username: username,
                                Password: password
                            })
                        });
                        if(!User.ok){
                            scene.text.setVisible(true);
                            scene.text.setText("Error creating the user");
                            scene.sound.play("ErrorSound");
                            return;
                        }else{
                            scene.scene.start("MainMenu");
                        }
                    }
                    break;
                case "Login":
                    this.sound.stopByKey("BackgroundSound");
                    this.scene.start('MainMenu');
                    break;
                case "Guestlogin":
                    this.sound.stopByKey("BackgroundSound");
                    this.sound.play("LoginSound");  
                    this.scene.start('MainGame')
                    break;
                default:
                    break;

            }
        })

        this.input.keyboard.on("keydown", (event) => {
            if (usernameeingabe == true) {
                if (event.key == "Backspace") {
                    username = username.slice(0, -1);
                    this.sound.play("KeyboardSound");
                    console.log("username: ", username)
                    usernametext.setText(username);
                } else if (event.code.startsWith("Key")) {
                    username += event.key;
                    this.sound.play("KeyboardSound");
                    console.log("username: ", username)
                    usernametext.setText(username);
                }
            }

            if (passwordeingabe == true) {
                if (event.key == "Backspace") {
                    password = password.slice(0, -1);
                    this.sound.play("KeyboardSound");
                    console.log("password: ", password)
                    passwordtext.setText(password)
                } else if (event.code.startsWith("Key")) {
                    password += event.key;
                    this.sound.play("KeyboardSound");
                    console.log("password: ", password)
                    passwordtext.setText(password)
                }
            }
        });

        //Reagiert wenn die Größe sich verändert
        this.scale.on('resize', this.onResize, this);

        this.events.on('shutdown', () => {
            this.scale.off('resize', this.onResize, this);
        });
    }

    update() {
        //Skaliert die Objekte neu anhand der Bildschirmposition
        let SizeLogin = getResponsiveSize(this.SignupWindow.width, this.SignupWindow.height, window.innerWidth, innerHeight);
        this.RegistContainer = this.RegistContainer.setScale(SizeLogin.scale / 1.5);
    }

    //Setzt die Position neu anhand der Bildschirmposition
    onResize(gameSize) {
        const W = gameSize.width;
        const H = gameSize.height;

        this.bg?.setPosition(W * 0.5, H * 0.5).setDisplaySize(W, H);

        this.RegistContainer?.setPosition(W * 0.25, H * 0.5);
    }
}