import { Scene } from 'phaser';
import { addToScore, GPUPrices, GPUScore } from './f_addScore';
import { ScaleFaktor, getResponsiveSize } from './f_update';
import { __BitcoinEXE__, __UpgradeEXE__ } from './gf_Toolbar';

export default class MainGame extends Scene {

    //Variablen
    coin;
    background;
    BitCoinEXEBackground;
    UpdateEXEBackground;

    activeZone = null;
    staticObjects;

    score = 0;
    scoreboard;

    //Json
    arrGPU = [];

    //Tollbar
    ToolbarCoin;
    ToolbarUpgrades;

    //Container
    C_BitcoinEXE = null;
    C_UpgradeEXE = null;

    //Grafikkarten
    GPU0;
    GPU1;
    GPU2;
    GPU3;
    GPU4;
    GPU5;
    GPU6;
    GPU7;
    GPU8;
    GPU9;

    arrGPUStats = {
        arrGPU0Stats: [],
        arrGPU1Stats: [],
        arrGPU2Stats: [],
        arrGPU3Stats: [],
        arrGPU4Stats: [],
        arrGPU5Stats: [],
        arrGPU6Stats: [],
        arrGPU7Stats: [],
        arrGPU8Stats: [],
        arrGPU9Stats: [],
    }

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
        this.load.image("GameBackground","GameBackground.png");
        this.load.image("coin","coin.png");
        this.load.image("BitCoinEXEBackground","BitCoinEXEBackground.png");



        //Laden der Sounds
        this.load.audio("CoinClickSound","CoinClickSound.mp3");
        this.load.audio("DeclineSound","DeclineSound.mp3");

        //Laden der JSON
        this.load.json('gpuData', 'GPU.json');

        
        this.load.once("complete", () => {
            this.arrGPU = this.cache.json.get('gpuData');
            console.log(this.arrGPU);


                this.arrGPU.forEach(( GPUStats,i) => {
                    this.arrGPUStats[`arrGPU${i}Stats`] = this.arrGPU[i];

                    this.load.image(`GPU${i}`,this.arrGPUStats[`arrGPU${i}Stats`].gpu_img);
                });

                this.load.once('complete', () => {
                this.arrGPU.forEach((GPUStats, i) => {
                    console.log(this.textures.exists(`GPU${i}`));

                    this[`GPU${i}`] = this.add.image(0, 0, `GPU${i}`).setVisible(false);
                });

            });

            this.load.start();
        });

        this.load.start();
    }

    create() {
        console.log(this.textures.list);

        // Hauptspiellogik hier

        const W = this.scale.width;
        const H = this.scale.height;
        //Setzten des Deault Courser
        this.input.setDefaultCursor("url(assets/cursors/arrow_m.cur), default");

        //Laden der Texte Bilder
        this.background = this.add.image(W*0.5,H*0.5,"GameBackground").setDisplaySize(window.innerWidth,window.innerHeight);

        this.ToolbarCoin = this.add.image(W*0.21,H*0.9777,"coin");

        this.ToolbarUpgrades = this.add.image(W*0.235,H*0.9777,"");

        // Die Objekte werden jetzt für Interactionen freigegeben
        this.ToolbarCoin.setInteractive({cursor: "url(assets/cursors/harrow.cur), pointer"});
        this.ToolbarUpgrades.setInteractive({cursor: "url(assets/cursors/harrow.cur), pointer"});

        //Reagiert wenn die Größe sich verändert
        this.scale.on('resize', this.onResize, this);

        this.events.on('shutdown', () => {
            this.scale.off('resize', this.onResize, this);
        });

        //Überprüft ob ein Game Objekt was eine Funktion hat angelickt wurde
        __BitcoinEXE__(this);
        __UpgradeEXE__(this);

        //Intervall in dem das Spiel den Punktestand (Bitcoin Stand) updatet anhand der gekauften Grafikkarten
        setInterval(() => this.UpdateTheScoreOfBitcoin(), 100);
    }
    
    UpdateTheScoreOfBitcoin(){
        this.arrGPU.forEach((GPU,i) => {
            if(this.arrGPUStats[`arrGPU${i}Stats`].status == true){
                this.score = GPUScore(this.score,this.arrGPUStats[`arrGPU${i}Stats`].production,this.arrGPUStats[`arrGPU${i}Stats`].amount);
            }
        });

        if(this.scoreboard != null){
            this.scoreboard.setText(Math.round(this.score));
        }
    }

    update(){

        //Skaliert die Objekte neu anhand der Bildschirmposition
        let SizeTBC = getResponsiveSize(this.ToolbarCoin.width,this.ToolbarCoin.height,window.innerWidth,innerHeight);
        this.ToolbarCoin = this.ToolbarCoin.setScale(SizeTBC.scale/27);

        let SizeTBU = getResponsiveSize(this.ToolbarUpgrades.width,this.ToolbarCoin.height,window.innerWidth,window.innerHeight);
        this.ToolbarUpgrades = this.ToolbarUpgrades.setScale(SizeTBU.scale/2.5);
  
        let sizeCB = getResponsiveSize(this.BitCoinEXEBackground ?.width,this.BitCoinEXEBackground ?.height,window.innerWidth,window.innerHeight);
        this.C_BitcoinEXE ?.setScale(sizeCB.scale/2);

        let sizeCU = getResponsiveSize(this.UpdateEXEBackground ?.width,this.UpdateEXEBackground ?.height,window.innerWidth);
    }

    //Setzt die Position neu anhand der Bildschirmposition
    onResize(gameSize) {
        const W = gameSize.width;
        const H = gameSize.height;

        this.background ?.setPosition(W*0.5, H*0.5).setDisplaySize(W, H);

        this.ToolbarCoin ?.setPosition(W*0.21,H*0.9777);
        this.ToolbarUpgrades ?.setPosition(W*0.235,H*0.9777);
    }
}

