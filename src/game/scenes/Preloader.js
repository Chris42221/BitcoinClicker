
import { Scene } from 'phaser';

export class Preloader extends Scene
{
    constructor ()
    {
        super('Preloader');
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

    preload ()
    {
        // Assets-Pfad anpassen falls nötig
        this.load.setPath('assets');

        // Lade Background hier sicher mit (falls Boot das nicht gemacht hat)
        this.load.image('background', 'background.png');

        // Logo laden
        this.load.image('logo', 'logo.png');
    }

    create ()
    {
        // Jetzt sind alle geladenen Assets verfügbar
        this.scene.start('MainMenu');
    }
}
