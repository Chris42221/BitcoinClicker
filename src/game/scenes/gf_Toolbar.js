import { addToScore, GPUPrices, GPUScore } from './f_addScore';

export function __BitcoinEXE__(scene) {
    scene.ToolbarCoin.on("pointerdown", () => {
        if (scene.C_BitcoinEXE === null) {
            console.log("Bitcoin.exe");
            scene.BitCoinEXEBackground = scene.add.image(0, 0, "BitCoinEXEBackground");
            scene.coin = scene.add.image(0, 75, "coin");
            scene.scoreboard = scene.add.text(-10, -200, scene.score, { 
                fontFamily: '"Tiny5"', 
                fontSize: 64, 
                color: '#ffffff' 
            });
            scene.C_BitcoinEXE = scene.add.container(
                scene.scale.width / 2,
                scene.scale.height / 2
            );
            scene.C_BitcoinEXE.addAt(scene.BitCoinEXEBackground, 0);
            scene.C_BitcoinEXE.addAt(scene.coin, 1);
            scene.C_BitcoinEXE.addAt(scene.scoreboard, 1);

            scene.C_BitcoinEXE.setInteractive({
                hitArea: {},
                hitAreaCallback: (area, x, y) => {
                    if (Phaser.Geom.Rectangle.Contains(new Phaser.Geom.Rectangle(-350, -300, 610, 50), x, y)) {
                        scene.activeZone = "drag";
                        return true;
                    }
                    if (Phaser.Geom.Rectangle.Contains(new Phaser.Geom.Rectangle(300, -290, 40, 40), x, y)) {
                        scene.activeZone = "close";
                        return true;
                    }
                    if (Phaser.Geom.Rectangle.Contains(new Phaser.Geom.Rectangle(250, -290, 40, 40), x, y)) {
                        scene.activeZone = "help";
                        return true;
                    }
                    if (Phaser.Geom.Circle.Contains(new Phaser.Geom.Circle(0,75,190),x,y)){
                        scene.activeZone = "coin";
                        return true;
                    }
                    scene.activeZone = null;
                    return false;
                },
                cursor: "url(assets/cursors/harrow.cur), pointer",
                draggable: true,
            });

            scene.C_BitcoinEXE.on("dragstart", () => {
                if (scene.activeZone === "drag") {
                    scene.input.setDefaultCursor("url(assets/cursors/hnesw.cur), pointer");
                }
            });

            scene.C_BitcoinEXE.on("drag", (pointer, dragX, dragY) => {
                if (scene.activeZone === "drag") {
                    scene.C_BitcoinEXE.x = dragX;
                    scene.C_BitcoinEXE.y = dragY;
                }
            });

            scene.C_BitcoinEXE.on("dragend", () => {
                scene.input.setDefaultCursor("url(assets/cursors/arrow_m.cur), pointer");
            });

            scene.C_BitcoinEXE.on("pointerdown", () => {
                switch (scene.activeZone) {
                    case "coin":
                        scene.score = addToScore(scene.score, 1);
                        scene.scoreboard.setText(Math.round(scene.score));
                        scene.sound.play("CoinClickSound");
                        break;
                    case "close":
                        scene.C_BitcoinEXE.destroy();
                        scene.BitCoinEXEBackground = null;
                        scene.coin = null;
                        scene.scoreboard = null;
                        scene.C_BitcoinEXE = null;
                        break;
                    case "help":
                        console.log("Help");
                        break;
                }
            });

            scene.C_BitcoinEXE.on("pointerover",() => {
                if(scene.activeZone === "coin"){
                    scene.input.setDefaultCursor("url(assets/cursors/harrow.cur), pointer");
                }
            })

            scene.C_BitcoinEXE.on("pointerout",() => {
                if(scene.activeZone != "coin"){
                    scene.input.setDefaultCursor("url(assets/cursors/arrow_m.cur), default");
                }
            })

        } else {
            scene.C_BitcoinEXE.destroy();
            scene.BitCoinEXEBackground = null;
            scene.coin = null;
            scene.scoreboard = null;
            scene.C_BitcoinEXE = null;
            console.log("closed");
        }
    });
}

export function __UpgradeEXE__(scene) {
    scene.ToolbarUpgrades.on("pointerdown", () => {
        if(scene.C_UpgradeEXE === null){
            console.log("Upgrade.exe");
            scene.UpdateEXEBackground = scene.add.image(0,0,"BitCoinEXEBackground");

            scene.C_BitcoinEXE = scene.add.container(
                scene.scale.width / 2,
                scene.scale.height / 2
            );

            scene.C_BitcoinEXE.addAt(scene.UpdateEXEBackground, 0);

        }else{
            scene.C_UpgradeEXE.destroy();
            scene.UpdateEXEBackground = null;
            scene.C_UpgradeEXE = null;
        }
    })
}