import { Scene } from 'phaser';
import { addToScore, GPUPrices, GPUScore } from './f_addScore';
import { ScaleFaktor, getResponsiveSize } from './f_update';
import { __BitcoinEXE__, __UpgradeEXE__ } from './gf_Toolbar';

export default class MainGame extends Scene {

    //Variablen
    coin;
    background;
    BitCoinEXEBackground;
    activeZone = null;
    staticObjects;

    score = 0;
    scoreboard;

    //Tollbar
    ToolbarCoin;
    ToolbarUpgrades;

    //Container
    C_BitcoinEXE = null;

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

    //Grafikkarten Stats
    GPU1Stats = {
        status: false,
        amount: 0,
        level: 1,
        name: "GPU1",
        prices: 10,
        production: 1
    };
    GPU2Stats = {
        status: false,
        amount: 0,
        level: 2,
        name: "GPU2",
        prices: 100,
        production: 10
    };
    GPU3Stats = {
        status: false,
        amount: 0,
        level: 3,
        name: "GPU3",
        prices: 1000,
        production: 80
    };
    GPU4Stats = {
        status: false,
        amount: 0,
        level: 4,
        name: "GPU4",
        prices: 10000,
        production: 500
    };
    GPU5Stats = {
        status: false,
        amount: 0,
        level: 5,
        name: "GPU5",
        prices: 100000,
        production: 3000
    };
    GPU6Stats = {
        status: false,
        amount: 0,
        level: 6,
        name: "GPU6",
        prices: 500000,
        production: 15000
    };
    GPU7Stats = {
        status: false,
        amount: 0,
        level: 7,
        name: "GPU7",
        prices: 1500000,
        production: 60000
    };
    GPU8Stats = {
        status: false,
        amount: 0,
        level: 8,
        name: "GPU8",
        prices: 3000000,
        production: 200000
    };
    GPU9Stats = {
        status: false,
        amount: 0,
        level: 9,
        name: "GPU9",
        prices: 6000000,
        production: 600000
    };
    GPU10Stats = {
        status: false,
        amount: 0,
        level: 10,
        name: "GPU10",
        prices: 10000000,
        production: 2000000
    };

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
        this.load.image("BitCoinEXEBackground","BitCoinEXEBackground.png")

        //Laden der Sounds
        this.load.audio("CoinClickSound","CoinClickSound.mp3");
        this.load.audio("DeclineSound","DeclineSound.mp3");
    }

    create() {
        // Hauptspiellogik hier

        const W = this.scale.width;
        const H = this.scale.height;
        //Setzten des Deault Courser
        this.input.setDefaultCursor("url(assets/cursors/arrow_m.cur), default");

        //Laden der Texte Bilder
        this.background = this.add.image(W*0.5,H*0.5,"GameBackground").setDisplaySize(window.innerWidth,window.innerHeight);

        this.ToolbarCoin = this.add.image(W*0.21,H*0.9777,"coin");

        this.ToolbarUpgrades = this.add.image(W*0.235,H*0.9777,"");

        this.GPU1 = this.add.text(100,200,'GPU1',{ fontFamily: 'Arial', fontSize: 32, color: '#00ff00' });
        this.GPU2 = this.add.text(100,250,"GPU2",{fontFamily: 'Arial', fontSize: 32, color: '#00ff00'});
        this.GPU3 = this.add.text(100,300,"GPU3",{fontFamily: 'Arial', fontSize: 32, color: '#00ff00'});
        this.GPU4 = this.add.text(100,350,"GPU4",{fontFamily: 'Arial', fontSize: 32, color: '#00ff00'});
        this.GPU5 = this.add.text(100,400,"GPU5",{fontFamily: 'Arial', fontSize: 32, color: '#00ff00'});
        this.GPU6 = this.add.text(100,450,"GPU6",{fontFamily: 'Arial', fontSize: 32, color: '#00ff00'});
        this.GPU7 = this.add.text(100,500,"GPU7",{fontFamily: 'Arial', fontSize: 32, color: '#00ff00'});
        this.GPU8 = this.add.text(100,550,"GPU8",{fontFamily: 'Arial', fontSize: 32, color: '#00ff00'});
        this.GPU9 = this.add.text(100,600,"GPU9",{fontFamily: 'Arial', fontSize: 32, color: '#00ff00'});
        this.GPU10 = this.add.text(100,650,"GPU10",{fontFamily: 'Arial', fontSize: 32, color: '#00ff00'});

        // Die Objekte werden jetzt für Interactionen freigegeben
        this.ToolbarCoin.setInteractive({cursor: "url(assets/cursors/harrow.cur), pointer"});

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

        //Reagiert wenn die Größe sich verändert
        this.scale.on('resize', this.onResize, this);

        this.events.on('shutdown', () => {
            this.scale.off('resize', this.onResize, this);
        });

        //Überprüft ob ein Game Objekt was eine Funktion hat angelickt wurde
        __BitcoinEXE__(this);
        __UpgradeEXE__(this);

        this.GPU1.on("pointerdown", ()=>{
            if (this.score >= this.GPU1Stats.prices){
                console.log("GPU1");

                this.score -=  this.GPU1Stats.prices;

                this.GPU1Stats.prices = GPUPrices(this.GPU1Stats.prices);
                
                this.scoreboard.setText(Math.round(this.score));

                this.GPU1Stats.status = true;
                this.GPU1Stats.amount++;
            }else{
                this.sound.play("DeclineSound");
            }
        })
        this.GPU2.on("pointerdown", ()=>{
            if (this.score >= this.GPU2Stats.prices){
                console.log("GPU2")

                this.score -= this.GPU2Stats.prices;

                this.GPU2Stats.prices = GPUPrices(this.GPU2Stats.prices);

                this.scoreboard.setText(Math.round(this.score));

                this.GPU2Stats.status = true;
                this.GPU2Stats.amount++;
            }else{
                this.sound.play("DeclineSound");
            }
        })
        this.GPU3.on("pointerdown", ()=>{
            if (this.score >= this.GPU3Stats.prices){
                console.log("GPU3")

                this.score -= this.GPU3Stats.prices;

                this.GPU3Stats.prices = GPUPrices(this.GPU3Stats.prices);

                this.scoreboard.setText(Math.round(this.score));

                this.GPU3Stats.status = true;
                this.GPU3Stats.amount++;
            }else{
                this.sound.play("DeclineSound");
            }
        })
        this.GPU4.on("pointerdown", ()=>{
            if (this.score >= this.GPU4Stats.prices){
                console.log("GPU4")

                this.score -= this.GPU4Stats.prices;

                this.GPU4Stats.prices = GPUPrices(this.GPU4Stats.prices);

                this.scoreboard.setText(Math.round(this.score));

                this.GPU4Stats.status = true;
                this.GPU4Stats.amount++;
            }else{
                this.sound.play("DeclineSound");
            }
        })
        this.GPU5.on("pointerdown", ()=>{
            if (this.score >= this.GPU5Stats.prices){
                console.log("GPU5")

                this.score -= this.GPU5Stats.prices;

                this.GPU5Stats.prices = GPUPrices(this.GPU5Stats.prices);

                this.scoreboard.setText(Math.round(this.score));

                this.GPU5Stats.status = true;
                this.GPU5Stats.amount++;
            }else{
                this.sound.play("DeclineSound");
            }
        })
        this.GPU6.on("pointerdown", ()=>{
            if (this.score >= this.GPU6Stats.prices){
                console.log("GPU6")

                this.score -= this.GPU6Stats.prices;

                this.GPU6Stats.prices = GPUPrices(this.GPU6Stats.prices);

                this.scoreboard.setText(Math.round(this.score));

                this.GPU6Stats.status = true;
                this.GPU6Stats.amount++;
            }else{
                this.sound.play("DeclineSound");
            }
        })
        this.GPU7.on("pointerdown", ()=>{
            if (this.score >= this.GPU7Stats.prices){
                console.log("GPU7")

                this.score -= this.GPU7Stats.prices;

                this.GPU7Stats.prices = GPUPrices(this.GPU7Stats.prices);

                this.scoreboard.setText(Math.round(this.score));

                this.GPU7Stats.status = true;
                this.GPU7Stats.amount++;
            }else{
                this.sound.play("DeclineSound");
            }
        })
        this.GPU8.on("pointerdown", ()=>{
            if (this.score >= this.GPU8Stats.prices){
                console.log("GPU8")

                this.score -= this.GPU8Stats.prices;

                this.GPU8Stats.prices = GPUPrices(this.GPU8Stats.prices);

                this.scoreboard.setText(Math.round(this.score));

                this.GPU8Stats.status = true;
                this.GPU8Stats.amount++;
            }else{
                this.sound.play("DeclineSound");
            }
        })
        this.GPU9.on("pointerdown", ()=>{
            if (this.score >= this.GPU9Stats.prices){
                console.log("GPU9")

                this.score -= this.GPU9Stats.prices;

                this.GPU9Stats.prices = GPUPrices(this.GPU9Stats.prices);

                this.scoreboard.setText(Math.round(this.score));

                this.GPU9Stats.status = true;
                this.GPU9Stats.amount++;
            }else{
                this.sound.play("DeclineSound");
            }
        })
        this.GPU10.on("pointerdown", ()=>{
            if (this.score >= this.GPU10Stats.prices){
                console.log("GPU10")

                this.score -= this.GPU10Stats.prices;

                this.GPU10Stats.prices = GPUPrices(this.GPU10Stats.prices);

                this.scoreboard.setText(Math.round(this.score));

                this.GPU10Stats.status = true;
                this.GPU10Stats.amount++;
            }else{
                this.sound.play("DeclineSound");
            }
        })

        //Intervall in dem das Spiel den Punktestand (Bitcoin Stand) updatet anhand der gekauften Grafikkarten
        setInterval(() => this.UpdateTheScoreOfBitcoin(), 100);
    }
    
    UpdateTheScoreOfBitcoin(){
        if(this.GPU1Stats.status == true){
            this.score = GPUScore(this.score,this.GPU1Stats.production,this.GPU1Stats.amount);
        }
        if(this.GPU2Stats.status == true){
            this.score = GPUScore(this.score,this.GPU2Stats.production,this.GPU2Stats.amount);
        }
        if(this.GPU3Stats.status == true){
            this.score = GPUScore(this.score,this.GPU3Stats.production,this.GPU3Stats.amount);
        }
        if(this.GPU4Stats.status == true){
            this.score = GPUScore(this.score,this.GPU4Stats.production,this.GPU4Stats.amount);
        }
        if(this.GPU5Stats.status == true){
            this.score = GPUScore(this.score,this.GPU5Stats.production,this.GPU5Stats.amount);
        }
        if(this.GPU6Stats.status == true){
            this.score = GPUScore(this.score,this.GPU6Stats.production,this.GPU6Stats.amount);
        }
        if(this.GPU7Stats.status == true){
            this.score = GPUScore(this.score,this.GPU7Stats.production,this.GPU7Stats.amount);
        }
        if(this.GPU8Stats.status == true){
            this.score = GPUScore(this.score,this.GPU8Stats.production,this.GPU8Stats.amount);
        }
        if(this.GPU9Stats.status == true){
            this.score = GPUScore(this.score,this.GPU9Stats.production,this.GPU9Stats.amount);
        }
        if(this.GPU10Stats.status == true){
            this.score = GPUScore(this.score,this.GPU10Stats.production,this.GPU10Stats.amount);
        }

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
        console.log(SizeTBU.scale)
  
        let sizeB = getResponsiveSize(this.BitCoinEXEBackground ?.width,this.BitCoinEXEBackground ?.height,window.innerWidth,window.innerHeight);
        this.C_BitcoinEXE ?.setScale(sizeB.scale/2);
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

