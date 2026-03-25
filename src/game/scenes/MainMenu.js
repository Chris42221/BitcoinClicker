import { Scene } from 'phaser';

export class MainMenu extends Scene
{

    player;

    constructor ()
    {
        super('MainMenu');
    }

    create () {
        this.add.image(screen.width, screen.height, 'background');
        this.add.image(512, 300, 'logo');

        // Spieler erstellen, bevor update() ihn benutzt
        this.player = this.physics.add.sprite(100, 300, 'player');

        this.input.once('pointerdown', () => {
            this.scene.start('Game');
        });
    }

    update ()
    {
        if (!this.player) return; //  sicher abfangen
        const speed = 3;
        this.player.x -= speed;
    }

}
