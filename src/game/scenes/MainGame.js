import { GameObjects, Scene } from 'phaser';
import { addToScore, GPUPrices, GPUScore } from './f_addScore';
import { ScaleFaktor, getResponsiveSize } from './f_update';
import { __BitcoinEXE__, __Settings__, __UpgradeEXE__ } from './gf_Toolbar';

export default class MainGame extends Scene {

    //Variablen
    coin;
    background;
    BitCoinEXEBackground;
    UpdateEXEBackground;
    UpdateEXEFrontBackground;
    SettingsBackground;
    SettingsFunctions;

    arrSettingsText = {
        User: "anonymous",
        Date: "undefined",
        Text: ""
    }
    SettingsText1;
    SettingsText2;
    SettingsText3;

    activeWindow = null;
    activeZone = null;
    staticObjects;
    windowDepth = 0;

    score = 0;
    scoreboard;

    //Json
    arrGPU = [];

    //Tollbar
    ToolbarCoin;
    ToolbarUpgrades;
    Settings;

    //Container
    C_BitcoinEXE = null;
    C_UpgradeEXE = null;
    C_Settings = null;

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

    GPUText0;
    GPUText1;
    GPUText2;
    GPUText3;
    GPUText4;
    GPUText5;
    GPUText6;
    GPUText7;
    GPUText8;
    GPUText9;

    GPUText0Content = {
        GPUamount: 0,
        GPUprices: 0,
        GPUproduction: 0
    };
    GPUText1Content = {
        GPUamount: 0,
        GPUprices: 0,
        GPUproduction: 0
    };
    GPUText2Content = {
        GPUamount: 0,
        GPUprices: 0,
        GPUproduction: 0
    };
    GPUText3Content = {
        GPUamount: 0,
        GPUprices: 0,
        GPUproduction: 0
    };
    GPUText4Content = {
        GPUamount: 0,
        GPUprices: 0,
        GPUproduction: 0
    };
    GPUText5Content = {
        GPUamount: 0,
        GPUprices: 0,
        GPUproduction: 0
    };
    GPUText6Content = {
        GPUamount: 0,
        GPUprices: 0,
        GPUproduction: 0
    };
    GPUText7Content = {
        GPUamount: 0,
        GPUprices: 0,
        GPUproduction: 0
    };
    GPUText8Content = {
        GPUamount: 0,
        GPUprices: 0,
        GPUproduction: 0
    };
    GPUText9Content = {
        GPUamount: 0,
        GPUprices: 0,
        GPUproduction: 0
    };

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

    SavePlayerprogressJSON;
    SaveGpuprogressJSON;
    SaveGPUPlayerSlotJSON;

    onBeforeUnload;

    constructor() {
        super('MainGame');
    }

    init (data)
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

        this.userData = data.userData;
        if(this.userData != undefined){
            this.arrSettingsText.User = this.userData.Username;
            this.arrSettingsText.Date = this.userData.Created_At;
        }
    }

    preload() {
        // Ressourcen laden

        //Laden der Bilder
        this.load.image("GameBackground","assets/GameBackground.png");
        this.load.image("coin","assets/coin.png");
        this.load.image("upgrade","assets/Upgrade.png");
        this.load.image("BitCoinEXEBackground","assets/BitCoinEXEBackground.png");
        this.load.image("UpdateEXEBackground","assets/UpdateEXEBackground.png");
        this.load.image("UpdateEXEFrontBackground","assets/FrontBackground.png");
        this.load.image("Settings","assets/Settings.png");


        //Laden der Sounds
        this.load.audio("CoinClickSound","assets/CoinClickSound.mp3");
        this.load.audio("DeclineSound","assets/DeclineSound.mp3");
        this.load.audio("BackgroundSound","assets/PCSound.mp3");
        this.load.audio("MouseClickSound","assets/MouseClickSound.mp3");
        this.load.audio("BuySound","assets/BuySound.mp3");

        
        this.load.once("complete", async() => {

            const GPUFetch = await fetch('https://bitcoinclicker.site/api/gpudata');
            this.arrGPU = await GPUFetch.json();


            console.log(this.arrGPU);       ///////


                this.arrGPU.forEach(( GPUStats,i) => {
                    this.arrGPUStats[`arrGPU${i}Stats`] = this.arrGPU[i];

                    this.load.image(`GPU${i}`,this.arrGPUStats[`arrGPU${i}Stats`].GPU_img_src);
                });

                this.load.once('complete', () => {
                this.arrGPU.forEach((GPUStats, i) => {
                    console.log(this.textures.exists(`GPU${i}`));       ///////

                    this[`GPU${i}`] = this.add.image(0, 0, `GPU${i}`).setVisible(false);
                });

            });

            this.load.start();
        });

        console.log(this.userData);         //////

        if(this.userData != undefined){
            this.load.once("complete", async () => {
                const SavePlayerprogress = await fetch(`https://bitcoinclicker.site/api/player/progress/getdata/${this.userData.Player_ID}`);
                if(!SavePlayerprogress.ok){
                    console.log("Fehler beim Abrufen des Spielerfortschritts");
                }
                this.SavePlayerprogressJSON = await SavePlayerprogress.json();
                console.log(this.SavePlayerprogressJSON);                   ///////
                if(this.SavePlayerprogressJSON.length != 0){
                    this.score = this.SavePlayerprogressJSON[0] ?.BTC;
                    const SaveGpuprogress = await fetch(`https://bitcoinclicker.site/api/player/progress/gpuprogress/getdata/${this.SavePlayerprogressJSON[0].PlayerProgress_ID}`);
                    if(!SaveGpuprogress.ok){
                        console.log("Fehler beim Abrufen des Spielerfortschritts");
                    }
                    this.SaveGpuprogressJSON = await SaveGpuprogress.json();
                    console.log(this.SaveGpuprogressJSON);          ///////
                    if(this.SaveGpuprogressJSON.lenght != 0){
                        const SaveGPUPlayerSlot = await fetch(`https://bitcoinclicker.site/api/player/progress/gpuslot/getdata/${this.SaveGpuprogressJSON[0].GPUProgress_ID}`);
                        if(!SaveGPUPlayerSlot.ok){
                            console.log("Fehler beim Abrufen des Spielerfortschritts");
                        }
                        this.SaveGPUPlayerSlotJSON = await SaveGPUPlayerSlot.json();
                        console.log(this.SaveGPUPlayerSlotJSON);        //////
                        this.SaveGPUPlayerSlotJSON.forEach((GPUSolt, i) => {
                            this.arrGPUStats[`arrGPU${GPUSolt.GPU_ID-1}Stats`].GPU_Prices = GPUSolt.GPU_Prices;
                            this.arrGPUStats[`arrGPU${GPUSolt.GPU_ID-1}Stats`].GPU_Amount = GPUSolt.GPU_Amount;
                            this.arrGPUStats[`arrGPU${GPUSolt.GPU_ID-1}Stats`].GPU_Status = GPUSolt.GPU_Status === `true`;
                        });
                    }
                }else{
                    const PlayerProgress = await fetch ("https://bitcoinclicker.site/api/player/progress", {
                        method: "POST",
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            Player_ID: this.userData.Player_ID,
                            BTC: this.score
                        })
                    });
                    if(!PlayerProgress.ok){
                        console.log("Fehler beim Erstellen des Spielerfortschritts");
                    }

                    const SavePlayerprogress = await fetch(`https://bitcoinclicker.site/api/player/progress/getdata/${this.userData.Player_ID}`);
                    if(!SavePlayerprogress.ok){
                        console.log("Fehler beim Abrufen des Spielerfortschritts");
                    }
                    this.SavePlayerprogressJSON = await SavePlayerprogress.json();

                    const GPUProgress = await fetch ("https://bitcoinclicker.site/api/player/progress/gpuprogress", {
                        method: "POST",
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            PlayerProgress_ID: this.SavePlayerprogressJSON[0].PlayerProgress_ID
                        })
                    });
                    if(!GPUProgress.ok){
                        console.log("Fehler beim Erstellen des GPU Fortschritts");
                    }

                    const SaveGpuprogress = await fetch(`https://bitcoinclicker.site/api/player/progress/gpuprogress/getdata/${this.SavePlayerprogressJSON[0].PlayerProgress_ID}`);
                    if(!SaveGpuprogress.ok){
                        console.log("Fehler beim Abrufen des GPU Fortschritts");
                    }
                    this.SaveGpuprogressJSON = await SaveGpuprogress.json();
                }
            })
        }

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

        this.ToolbarUpgrades = this.add.image(W*0.235,H*0.9777,"upgrade");

        // Die Objekte werden jetzt für Interactionen freigegeben
        this.ToolbarCoin.setInteractive({cursor: "url(assets/cursors/harrow.cur), pointer"});
        this.ToolbarUpgrades.setInteractive({cursor: "url(assets/cursors/harrow.cur), pointer"});

        this.Settings = this.add.zone(W * 0.0225, H * 0.9777, 40, 40);
        this.Settings.setInteractive({cursor: "url(assets/cursors/harrow.cur), pointer"});

        // Funktion die jedes Fenster aufruft wenn es angeklickt wird
        this.bringToFront = function(container) {
            this.windowDepth++;
            container.setDepth(this.windowDepth);
            this.activeWindow = container;
        }

        //Mouse Click Sound
        this.input.on("pointerdown",()=>{
            this.sound.play("MouseClickSound");
        });

        //BackgroundSound
        this.sound.add("BackgroundSound", {
            loop: true,
            volume: 0.3,
        }).play();

        //Reagiert wenn die Größe sich verändert
        this.scale.on('resize', this.onResize, this);

        this.events.on('shutdown', () => {
            this.scale.off('resize', this.onResize, this);
        });

        //Überprüft ob ein Game Objekt was eine Funktion hat angelickt wurde
        __BitcoinEXE__(this);
        __UpgradeEXE__(this);
        this.SettingsFunctions = __Settings__(this);

        //Intervall in dem das Spiel den Punktestand (Bitcoin Stand) updatet anhand der gekauften Grafikkarten
        setInterval(() => this.UpdateTheScoreOfBitcoin(), 100);

        //Fortschrit Speichern
        this.onBeforeUnload = () => {
            if(this.userData != undefined){
                fetch ("https://bitcoinclicker.site/api/player/progress", {
                    method: "POST",
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        Player_ID: this.userData.Player_ID,
                        BTC: this.score
                    }),
                    keepalive: true
                });
                this.arrGPU.forEach((GPUStats, i) => {
                    if(this.arrGPUStats[`arrGPU${i}Stats`].GPU_Status == true){
                        const alreadySaved = this.SaveGPUPlayerSlotJSON?.some(slot => slot.GPU_ID == i + 1);
                        if(!alreadySaved){
                            fetch ("https://bitcoinclicker.site/api/player/progress/gpuslot", {
                                method: "POST",
                                headers: {'Content-Type': 'application/json'},
                                body: JSON.stringify({
                                    GPUProgress_ID: this.SaveGpuprogressJSON[0].GPUProgress_ID,
                                    GPU_ID: i+1,
                                    GPU_Status: this.arrGPUStats[`arrGPU${i}Stats`].GPU_Status,
                                    GPU_Amount: this.arrGPUStats[`arrGPU${i}Stats`].GPU_Amount,
                                    GPU_Prices: this.arrGPUStats[`arrGPU${i}Stats`].GPU_Prices
                                }),
                                keepalive: true
                            });
                        }else{
                            const savedSlot = this.SaveGPUPlayerSlotJSON.find(slot => slot.GPU_ID == i + 1);
                            fetch ("https://bitcoinclicker.site/api/player/progress/gpuslot/upgrade", {
                                method: "POST",
                                headers: {'Content-Type': 'application/json'},
                                body: JSON.stringify({
                                    GPUSlot: savedSlot?.GPUSlot,
                                    GPUProgress_ID: this.SaveGpuprogressJSON[0].GPUProgress_ID,
                                    GPU_ID: i+1,
                                    GPU_Status: this.arrGPUStats[`arrGPU${i}Stats`].GPU_Status,
                                    GPU_Amount: this.arrGPUStats[`arrGPU${i}Stats`].GPU_Amount,
                                    GPU_Prices: this.arrGPUStats[`arrGPU${i}Stats`].GPU_Prices
                                }),
                                keepalive: true
                            });
                        };
                    };
                });
                console.log("Fortschrit gespeichert");
                this.sound.play("LoginSound");
            }else{
                this.sound.play("ErrorSound");
                //this.SettingsFunctions.SetSettingsText("To save, you need an account",3);
            }
        };

        window.addEventListener('beforeunload', this.onBeforeUnload);

        this.events.on('shutdown', () => {
            window.removeEventListener('beforeunload', this.onBeforeUnload);
        });
    };

    
    UpdateTheScoreOfBitcoin(){
        this.arrGPU.forEach((GPU,i) => {
            if(this.arrGPUStats[`arrGPU${i}Stats`].GPU_Status == true || 1){
                this.score = GPUScore(this.score,this.arrGPUStats[`arrGPU${i}Stats`].GPU_Production,this.arrGPUStats[`arrGPU${i}Stats`].GPU_Amount);
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

        let sizeCU = getResponsiveSize(this.UpdateEXEBackground?.width,this.UpdateEXEBackground?.height,window.innerWidth,window.innerHeight);
        this.C_UpgradeEXE ?.setScale(sizeCU.scale/1.4);

        let sizeCS = getResponsiveSize(this.SettingsBackground?.width,this.SettingsBackground?.height,window.innerWidth,window.innerHeight);
        this.C_Settings ?.setScale(sizeCS.scale/5);
    }

    //Setzt die Position neu anhand der Bildschirmposition
    onResize(gameSize) {
        const W = gameSize.width;
        const H = gameSize.height;

        this.background ?.setPosition(W*0.5, H*0.5).setDisplaySize(W, H);

        this.ToolbarCoin ?.setPosition(W*0.21,H*0.9777);
        this.ToolbarUpgrades ?.setPosition(W*0.235,H*0.9777);
        this.Settings ?.setPosition(W * 0.0225, H * 0.9777);
    };
}

