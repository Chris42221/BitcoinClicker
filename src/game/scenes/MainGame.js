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
    GPU4;
    GPU5;
    GPU6;
    GPU7;
    GPU8;
    GPU9;
    GPU10;

    //Grafikkarten Level status
    GPU1Status = 0;
    GPU2Status = 0;
    GPU3Status = 0;
    GPU4Status = 0;
    GPU5Status = 0;
    GPU6Status = 0;
    GPU7Status = 0;
    GPU8Status = 0;
    GPU9Status = 0;
    GPU10Status = 0;

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
        this.GPU3 = this.add.text(100,300,"GPU2",{fontFamily: 'Arial', fontSize: 32, color: '#00ff00'});
        this.GPU4 = this.add.text(100,350,"GPU2",{fontFamily: 'Arial', fontSize: 32, color: '#00ff00'});
        this.GPU5 = this.add.text(100,400,"GPU2",{fontFamily: 'Arial', fontSize: 32, color: '#00ff00'});
        this.GPU6 = this.add.text(100,450,"GPU2",{fontFamily: 'Arial', fontSize: 32, color: '#00ff00'});
        this.GPU7 = this.add.text(100,500,"GPU2",{fontFamily: 'Arial', fontSize: 32, color: '#00ff00'});
        this.GPU8 = this.add.text(100,550,"GPU2",{fontFamily: 'Arial', fontSize: 32, color: '#00ff00'});
        this.GPU9 = this.add.text(100,600,"GPU2",{fontFamily: 'Arial', fontSize: 32, color: '#00ff00'});
        this.GPU10 = this.add.text(100,650,"GPU2",{fontFamily: 'Arial', fontSize: 32, color: '#00ff00'});


        // Die Objekte werden jetzt für Interactionen freigegeben
        this.coin.setInteractive();
        this.GPU1.setInteractive();
        this.GPU2.setInteractive();
        this.GPU3.setInteractive();
        this.GPU4.setInteractive();
        this.GPU5.setInteractive();
        this.GPU6.setInteractive();
        this.GPU7.setInteractive();
        this.GPU8.setInteractive();
        this.GPU9.setInteractive();
        this.GPU10.setInteractive();

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
                this.GPU1Status = 1;
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

        //Intervall in dem das Spiel den Punktestand (Bitcoin Stand) updatet anhand der gekauften Grafikkarten
        setInterval(() => this.UpdateTheScoreOfBitcoin(), 100);
    }
    
    UpdateTheScoreOfBitcoin(){
        console.log(this.GPU1Status);
        if(this.GPU1Status > 0){
            this.score = GPUScore(this.score,1);
            this.scoreboard.setText(Math.round(this.score));
        }
        
    }

}

