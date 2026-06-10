import { Scene } from "phaser";
import { getResponsiveSize } from "./f_update";

export default class credits extends Scene {

    text;
    start = null;

    bg;
    
    
    constructor() {
        super('credits');
    }

    preload(){
        this.load.image("loginBackground","assets/loginBackground.png");

        this.load.audio("BackgroundSound","assets/PCSound.mp3");
        this.load.audio("MouseClickSound","assets/MouseClickSound.mp3");
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

        //Reagiert wenn die Größe sich verändert
        this.scale.on('resize', this.onResize, this);

        this.events.on('shutdown', () => {
            this.scale.off('resize', this.onResize, this);
        });
        
        this.bg = this.add.image(W*0.5, H*0.5, 'loginBackground').setDisplaySize(window.innerWidth,window.innerHeight);

        // Container
        const legalContainer = this.add.container(40, 40);

        // Text Content
        const legalTextContent = `
BITCOIN CLICKER

========================
IMPRINT
========================

Developers:
- Timo Höglinger
- Christian Lucaci

Purpose:
This website was created as a small non-commercial
educational project for learning and practicing
web development and programming.

Disclaimer:
This website is not intended for commercial use.
It is an independent project and is not affiliated
with or endorsed by any official Bitcoin organizations
or companies.


========================
PRIVACY POLICY
========================

General Information:
This website is operated by Timo Höglinger
and Christian Lucaci.

The project is intended for educational and
demonstration purposes only.

Data Collection:
This website does not intentionally collect
personal data from visitors.

No registration, payment system, or user
account functionality is provided.

Cookies and Local Storage:
The website may use cookies or browser local
storage to save game progress and improve
functionality.

These files are only used for technical
purposes related to the game.

Third-Party Services:
No advertising services or external tracking
tools are intentionally used on this website.

Data Security:
No sensitive personal information is intentionally
stored or processed.

Changes to This Policy:
This Privacy Policy may be updated or changed
at any time if necessary for the project.
`;

        // Text
        const legalText = this.add.text(40, 40, legalTextContent, {
            fontFamily: "Arial",
            fontSize: "22px",
            color: "#ffffff",
            wordWrap: { width: 1050 }
        });

        // Add to container
        legalContainer.add([legalText]);

        // Scroll
        this.input.on("wheel", (pointer, gameObjects, deltaX, deltaY) => {
            legalContainer.y -= deltaY * 0.5;

            legalContainer.y = Phaser.Math.Clamp(
                legalContainer.y,
                -1000,
                40
            );
        });

    }

    update(){
        //Skaliert die Objekte neu anhand der Bildschirmposition

     }
 
     //Setzt die Position neu anhand der Bildschirmposition
     onResize(gameSize) {
         const W = gameSize.width;
         const H = gameSize.height;
 
         this.bg ?.setPosition(W*0.5, H*0.5).setDisplaySize(W, H);

     }
}