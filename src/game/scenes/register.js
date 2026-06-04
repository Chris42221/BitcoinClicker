import { Scene } from "phaser";
import { getResponsiveSize } from "./f_update";


export default class Register extends Scene {
    constructor() {
        super("Register");
    }

    preload() {
        this.load.image("loginBackground", "assets/loginBackground.png");
        this.load.image("SignupWindow", "assets/Signup_window.png");
    }

    create() {

        //Setzten des Deault Courser
        this.input.setDefaultCursor("url(assets/cursors/arrow_m.cur), default");

        const W = this.scale.width;
        const H = this.scale.height;

        // Hintergrund hinzufügen und auf Bildschirmgröße skalieren
        this.bg = this.add.image(W * 0.5, H * 0.5, 'loginBackground').setDisplaySize(window.innerWidth, window.innerHeight);

        this.SignupWindow = this.add.image(0, 0, 'SignupWindow')

        let usernametext = this.add.text(-50, -45, "username", { fontFamily: 'tahoma', fontSize: 22, color: '#000000ff' })
        let passwordtext = this.add.text(-50, 8, "password", { fontFamily: 'tahoma', fontSize: 22, color: '#000000ff' })

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
        this.RegistContainer.addAt(passwordtext, 2)

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

        this.input.on('pointerdown', (pointer) => {
            if (!this.RegistContainer) return;
            // Welt-Koordinaten des Pointers
            const worldX = pointer.x;
            const worldY = pointer.y;
            // Lokale Koordinaten relativ zum Container (einfacher Fall: kein Scale/Rotation)
            const localX = worldX - this.RegistContainer.x;
            const localY = worldY - this.RegistContainer.y;
            console.log('world:', worldX, worldY, 'container local:', localX, localY);
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
                        const ExisUser = await fetch(`http://localhost:3000/player/acount/login/${username}`);
                        if(!ExisUser.ok){
                            console.log("Benutzername oder Passwort ungültig");
                            return;
                        }
                        const ExisUserJson = await ExisUser.json();

                        console.log(ExisUserJson);

                        if(ExisUserJson.length != 0){
                            console.log("Benutzername bereits vergeben");
                            return;
                        }

                        if(username.trim == "" || password.trim == ""){
                            console.log("Benutzername oder Passwort ungültig");
                            return;
                        }

                        const User = await fetch(`http://localhost:3000/player/acount/create`,{
                            method: "POST",
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify({
                                Username: username,
                                Password: password
                            })
                        });
                        if(!User.ok){
                            console.log("Fehler beim Erstellen des Benutzers");
                            return;
                        }else{
                            scene.scene.start("MainMenu");
                        }
                    }
                    break;
                case "Login":
                    this.scene.start('MainMenu');

                    break;
                case "Guestlogin":
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
                    console.log("username: ", username)
                    usernametext.setText(username);
                } else if (event.code.startsWith("Key")) {
                    username += event.key;
                    console.log("username: ", username)
                    usernametext.setText(username);
                }
            }

            if (passwordeingabe == true) {
                if (event.key == "Backspace") {
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