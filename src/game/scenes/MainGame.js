import { Scene } from 'phaser';
import { addToScore, GPUScore } from './f_addScore';

export default class MainGame extends Scene {

    //Variablen
    coin;

    score = 0;
    scoreboard;

    //Grafikkarten
    GPU1;
    GPU2;
    GPU3;

    //Grafikkarten Level status
    GPU1Status;

    constructor() {
        super('MainGame');
    }

    init ()
    {
        // Wenn texture bereits existiert, anzeigen, sonst nicht (wird in preload geladen)
        if (this.textures.exists('background')) {
            this.add.image(this.scale.width/2, this.scale.height/2, 'background');
        }

        // Outline der Ladeleiste
        this.add.rectangle(this.scale.width/2, this.scale.height/2, 468, 32).setStrokeStyle(1, 0xffffff);

        // Die eigentliche Leiste: Ursprung links mittig, startet bei Breite 0
        this.loadingBar = this.add.rectangle(this.scale.width/2 - 230, this.scale.height/2, 0, 28, 0xffffff).setOrigin(0, 0.5);

        // Progress-Event (wird schon im preload ausgelöst, hier ist ok)
        this.load.on('progress', (progress) => {
            // 460px max
            this.loadingBar.width = Math.max(0, 460 * progress);
        });

        // Fehler / Debug anzeigen
        this.load.on('loaderror', (file) => {
            console.warn('Load error', file);
        });
    }

    preload() {
        // Ressourcen laden
        //Laden der Pfade
        this.load.setPath('assets');

        //Laden der Bilder
        this.load.image("coin","coin.png");

        //Laden der Sounds
        this.load.audio("CoinClickSound","CoinClickSound.mp3");
        this.load.audio("DeclineSound","DeclineSound.mp3");
    }

    create() {
        // Hauptspiellogik hier
        this.coin = this.add.image(600, 300, "coin");
        this.scoreboard = this.add.text(100,100,this.score,{ fontFamily: 'Arial', fontSize: 64, color: '#00ff00' });
        this.GPU1 = this.add.text(100,200,'GPU1',{ fontFamily: 'Arial', fontSize: 32, color: '#00ff00' });
        this.GPU2 = this.add.text(100,250,"GPU2",{fontFamily: 'Arial', fontSize: 32, color: '#00ff00'});


        // Die Objekte werden jetzt für Interactionen freigegeben
        this.coin.setInteractive();
        this.GPU1.setInteractive();
        this.GPU2.setInteractive();

        //Überprüft ob ein Game Objekt was eine Funktion hat angelickt wurde
        this.coin.on('pointerdown', () => {
            this.score = addToScore(this.score,1);
            this.scoreboard.setText(this.score);
            
            this.sound.play("CoinClickSound");
        });
        this.GPU1.on("pointerdown", ()=>{
            if (this.score >= 10){
                console.log("GPU1");

                this.score -=  10;
                this.scoreboard.setText(this.score);

                setInterval(() => {
                    this.score = GPUScore(this.score,1);
                    this.scoreboard.setText(Math.round(this.score));
                }, 100);

                this.GPU1.disableInteractive();
            }else{
                this.sound.play("DeclineSound");
            }
        })
        this.GPU2.on("pointerdown", ()=>{
            if (this.score >= 100){
                console.log("GPU2")

                this.score -= 100;
                this.scoreboard.setText(this.score);

                setInterval(()=>{
                    this.score = GPUScore(this.score,10);
                    this.scoreboard.setText(Math.round(this.score));
                },100)
            }else{
                this.sound.play("DeclineSound");
            }
        })
    }

    update(){
       if(this.GPU1Status == true){
        
       }
    }
    
}

