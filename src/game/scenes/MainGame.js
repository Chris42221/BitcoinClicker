import { Scene } from 'phaser';
import addToScore from './addScore';

export default class MainGame extends Scene {

    coin;
    score = 0;
    scoreboard;

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

        this.load.setPath('assets');

        // Ressourcen laden
        this.load.image("coin","coin.png");
    }

    create() {
        // Hauptspiellogik hier
        this.coin = this.add.image(600, 300, "coin");

        this.scoreboard = this.add.text(100,100,this.score,{ fontFamily: 'Arial', fontSize: 64, color: '#00ff00' })

        this.coin = new Phaser.Geom.Circle(this.coin.x, this.coin.y, this.coin.width/2);

        this.input.on('pointerdown', (pointer) => {
            if (Phaser.Geom.Circle.Contains(this.coin, pointer.x, pointer.y)) {
                console.log("Hit");
                this.score = addToScore(this.score,1);
                this.scoreboard.setText(this.score);
            }
        });
    }

    
}