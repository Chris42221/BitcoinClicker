import { Scene } from 'phaser';
import { addToScore, GPUPrices, GPUScore } from './f_addScore';
import { ScaleFaktor, getResponsiveSize } from './f_update';

export default class MainGame extends Scene {

    //Variablen
    coin;
    background;
    BitCoinEXEBackground;
    activeZone = null;

    score = 0;
    scoreboard;

    //Tollbar
    ToolbarCoin;

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

        //Setzten des Deault Courser
        this.input.setDefaultCursor("url(assets/cursors/arrow_m.cur), default");

        //Laden der Texte Bilder
        this.background = this.add.image(this.game.config.width/2,this.game.config.height/2,"GameBackground").setDisplaySize(window.innerWidth,window.innerHeight);



        this.ToolbarCoin = this.add.image(400, /*993*/400,"");

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

        //Überprüft ob ein Game Objekt was eine Funktion hat angelickt wurde
        this.ToolbarCoin.on("pointerdown", () =>{
            if(this.C_BitcoinEXE === null){
                console.log("Bitcoin.exe");
                this.BitCoinEXEBackground = this.add.image(0,0,"BitCoinEXEBackground");
                this.coin = this.add.image(0, 0, "coin");
                this.scoreboard = this.add.text(-10,-300,this.score,{ fontFamily: '"Tiny5"', fontSize: 64, color: '#ffffff' });

                this.C_BitcoinEXE = this.add.container(this.game.config.width/2,this.game.config.height/2);
                this.C_BitcoinEXE.addAt(this.BitCoinEXEBackground,0);
                this.C_BitcoinEXE.addAt(this.coin,1);
                this.C_BitcoinEXE.addAt(this.scoreboard,2);

                this.coin.setInteractive({cursor: "url(assets/cursors/harrow.cur), pointer",});

                this.coin.on('pointerdown', () => {
                    this.score = addToScore(this.score,1);
                    this.scoreboard.setText(Math.round(this.score));
                    
                    this.sound.play("CoinClickSound");
            });

            this.C_BitcoinEXE.setInteractive({
                hitArea:{},
                hitAreaCallback: (area, x, y,) => {
                    if(Phaser.Geom.Rectangle.Contains(new Phaser.Geom.Rectangle(-350,-400,610,50),x,y)){
                        this.activeZone = "drag";
                        return true;
                    }
                    if(Phaser.Geom.Rectangle.Contains(new Phaser.Geom.Rectangle(300,-395,40,40),x,y)){
                        this.activeZone = "close";
                        return true;
                    }
                    if(Phaser.Geom.Rectangle.Contains(new Phaser.Geom.Rectangle(250,-395,40,40),x,y)){
                        this.activeZone = "help";
                        return true;
                    }
                    this.activeZone = null;
                    return false;
            },
                
                //Phaser.Geom.Rectangle.Contains,
                cursor: "url(assets/cursors/harrow.cur), pointer",
                draggable: true,
            });


            this.C_BitcoinEXE.on("dragstart",() => {
                if(this.activeZone === "drag"){
                    this.input.setDefaultCursor("url(assets/cursors/hnesw.cur), pointer");
                }
            })
            this.C_BitcoinEXE.on("drag", (pointer, dragX, dragY) => {
                if(this.activeZone === "drag"){
                    this.C_BitcoinEXE.x = dragX;
                    this.C_BitcoinEXE.y = dragY;
                }
            })
            this.C_BitcoinEXE.on("dragend",() => {
                this.input.setDefaultCursor("url(assets/cursors/arrow_m.cur), pointer");
            })

            this.C_BitcoinEXE.on("pointerdown", () => {
                switch(this.activeZone){
                    case "close":
                        this.C_BitcoinEXE.destroy();
                        this.BitCoinEXEBackground = null;
                        this.coin = null;
                        this.scoreboard = null;
                        this.C_BitcoinEXE = null;
                    case "help":
                        //Help Screen   
                        console.log("Help");
                }
            })
            }else{
                this.C_BitcoinEXE.destroy();
                this.BitCoinEXEBackground = null;
                this.coin = null;
                this.scoreboard = null;
                this.C_BitcoinEXE = null;
                console.log("cloes");
            }
        });

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

        //Überprüft ob über etwas gehovert wurde
        /*this.GPU1.on("pointerover", (pointer)=>{
            let contentText = `Amount: ${this.GPU1Stats.amount} </br> Prices: ${this.GPU1Stats.prices} <br> Production: ${this.GPU1Stats.production}`;
            text = scene.add.dom(pointer.x, pointer.y, 'div', 'background-color: rgba(0, 0, 0, 0.5); width: 220px; height: 100px; font: 16px Arial; color: #fff; display: none', 'Phaser');
        });
        this.GPU1.on("pointerout", ()=>{
            thtext.destroy();
        });*/

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
        this.background = this.background.setDisplaySize(window.innerWidth,window.innerHeight);
        if(this.C_BitcoinEXE != null){
            let sizeB = getResponsiveSize(this.BitCoinEXEBackground.width,this.BitCoinEXEBackground.height,window.innerWidth,window.innerHeight);
            //this.BitCoinEXEBackground = this.BitCoinEXEBackground.setDisplaySize(sizeB.width,sizeB.height);
            this.BitCoinEXEBackground.setScale(sizeB.scale);
            
            let sizeC = getResponsiveSize(this.coin.width,this.coin.height,window.innerWidth,window.innerHeight);
            //this.coin = this.coin.setDisplaySize(sizeC.width,sizeC.height);
            this.coin.setScale(sizeC.scale);

            this.scoreboard.setFontSize(64*sizeC.scale);
        }

    }

}

