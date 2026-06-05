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

            scene.bringToFront(scene.C_BitcoinEXE);

            scene.C_BitcoinEXE.setInteractive({
                hitArea: {},
                hitAreaCallback: (area, x, y) => {
                    // Prüfen ob ein anderes Fenster mit höherer Depth darüber liegt
                    const windows = [scene.C_BitcoinEXE, scene.C_UpgradeEXE]
                        .filter(w => w !== null && w !== scene.C_BitcoinEXE);

                    const isBlocked = windows.some(w => {
                        if(w.depth <= scene.C_BitcoinEXE.depth) return false;
                        // Prüfen ob der Klickpunkt innerhalb des anderen Fensters liegt
                        const bounds = w.getBounds();
                        return bounds.contains(
                            scene.C_BitcoinEXE.x + x,
                            scene.C_BitcoinEXE.y + y
                        );
                    });

                    if(isBlocked) return false;


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
                    scene.bringToFront(scene.C_BitcoinEXE);
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
                scene.bringToFront(scene.C_BitcoinEXE);
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
            scene.UpdateEXEBackground = scene.add.image(0,0,"UpdateEXEBackground");
            scene.UpdateEXEFrontBackground = scene.add.image(0,5,"UpdateEXEFrontBackground");

            scene.C_UpgradeEXE = scene.add.container(
                scene.scale.width / 2,
                scene.scale.height / 2
            );

            scene.C_UpgradeEXE.addAt(scene.UpdateEXEBackground, 0);
            scene.C_UpgradeEXE.addAt(scene.UpdateEXEFrontBackground,0);

            scene.physics.add.existing(scene.UpdateEXEFrontBackground);

            scene.bringToFront(scene.C_UpgradeEXE);

            let Poy = -190;
            scene.arrGPU.forEach((GPU,i) => {
                scene[`GPU${i}`].setScale(0.2);
                scene.C_UpgradeEXE.addAt(scene[`GPU${i}`],10);
                scene[`GPU${i}`].setVisible(false);

                scene[`GPU${i}`].y = Poy;
                scene[`GPU${i}`].x = -70;
                scene[`GPUText${i}Content`].GPUprices = scene.arrGPUStats[`arrGPU${i}Stats`].GPU_Prices;
                scene[`GPUText${i}Content`].GPUamount = scene.arrGPUStats[`arrGPU${i}Stats`].GPU_Amount;
                scene[`GPUText${i}Content`].GPUproduction = scene.arrGPUStats[`arrGPU${i}Stats`].GPU_Production;
                
                scene[`GPUText${i}`] = scene.add.text(30, 0,`Owned: ${scene[`GPUText${i}Content`].GPUamount}\nPrices: ${scene[`GPUText${i}Content`].GPUprices}\nBtc/s: ${scene[`GPUText${i}Content`].GPUproduction}`,{ fontFamily: 'Tahoma Regular', fontSize: 20, color: '#ffffff' });
                scene.C_UpgradeEXE.addAt(scene[`GPUText${i}`],10);
                scene[`GPUText${i}`].setVisible(false);
                scene[`GPUText${i}`].y = Poy - 36;

                Poy += 100;
                
                scene.physics.add.existing(scene[`GPU${i}`]);

                if(scene.physics.world.overlap(scene.UpdateEXEFrontBackground, scene[`GPU${i}`])){
                    scene[`GPU${i}`].setVisible(true);
                    scene[`GPUText${i}`].setVisible(true);
                }

            });

              scene.C_UpgradeEXE.setInteractive({
                hitArea: {},
                hitAreaCallback: (area, x, y) => {

                // Prüfen ob ein anderes Fenster mit höherer Depth darüber liegt
                const windows = [scene.C_BitcoinEXE, scene.C_UpgradeEXE]
                    .filter(w => w !== null && w !== scene.C_UpgradeEXE);

                const isBlocked = windows.some(w => {
                    if(w.depth <= scene.C_UpgradeEXE.depth) return false;
                    // Prüfen ob der Klickpunkt innerhalb des anderen Fensters liegt
                    const bounds = w.getBounds();
                    return bounds.contains(
                        scene.C_UpgradeEXE.x + x,
                        scene.C_UpgradeEXE.y + y
                    );
                });

                if(isBlocked) return false;

                    if (Phaser.Geom.Rectangle.Contains(new Phaser.Geom.Rectangle(-197, -345, 300, 50), x, y)) {
                        scene.activeZone = "drag";
                        return true;
                    }
                    if (Phaser.Geom.Rectangle.Contains(new Phaser.Geom.Rectangle(147, -342, 40, 36), x, y)) {
                        scene.activeZone = "close";
                        return true;
                    }
                    if (Phaser.Geom.Rectangle.Contains(new Phaser.Geom.Rectangle(105, -342, 40, 36), x, y)) {
                        scene.activeZone = "help";
                        return true;
                    }
                    if (Phaser.Geom.Rectangle.Contains(new Phaser.Geom.Rectangle(-187, -300, 380, 635), x, y)) {
                        scene.activeZone = "scroll";
                        return true;
                    }
                    scene.activeZone = null;
                    return false;
                },
                cursor: "url(assets/cursors/harrow.cur), pointer",
                draggable: true,
            });

            scene.C_UpgradeEXE.on("dragstart", () => {
                scene.bringToFront(scene.C_UpgradeEXE);
                if (scene.activeZone === "drag") {
                    scene.input.setDefaultCursor("url(assets/cursors/hnesw.cur), pointer");
                }
            });

            scene.C_UpgradeEXE.on("drag", (pointer, dragX, dragY) => {
                if (scene.activeZone === "drag") {
                    scene.C_UpgradeEXE.x = dragX;
                    scene.C_UpgradeEXE.y = dragY;
                }
            });

            scene.C_UpgradeEXE.on("dragend", () => {
                scene.input.setDefaultCursor("url(assets/cursors/arrow_m.cur), pointer");
            });

            scene.C_UpgradeEXE.on("pointerdown", () => {
                scene.bringToFront(scene.C_UpgradeEXE);
                switch (scene.activeZone) {
                    case "close":
                        scene.arrGPU.forEach((GPU, i) => {
                            scene.C_UpgradeEXE.remove(scene[`GPU${i}`]);
                            scene[`GPU${i}`].removeInteractive();
                            scene[`GPU${i}`].off('pointerdown');
                            scene[`GPU${i}`].setVisible(false);
                        });
                        scene.C_UpgradeEXE.destroy();
                        scene.UpdateEXEBackground = null;
                        scene.C_UpgradeEXE = null;
                        break;
                    case "help":
                        console.log("Help");
                        break;
                }
            });

            scene.C_UpgradeEXE.on("pointerover", () => {
                if(scene.activeZone === "scroll"){
                    scene.input.setDefaultCursor("url(assets/cursors/arrow_m.cur),default")
                }
            })

            let Progress = 10;
            scene.C_UpgradeEXE.on("wheel",(pointer, deltaX, deltaY, deltaZ, event) => {
                if(scene.activeZone === "scroll"){
                    scene.arrGPU.forEach((GPU,i) => {

                        if(deltaY < 0 && Progress < 10){
                            scene[`GPU${i}`].y += 50;
                            scene[`GPUText${i}`].y += 50;
                            Progress += 10
                        }else if(deltaY > 0 && Progress > -1000){
                            scene[`GPU${i}`].y -=  50;
                            scene[`GPUText${i}`].y -= 50;
                            Progress -= 10
                        }

                        if(scene.physics.world.overlap(scene.UpdateEXEFrontBackground, scene[`GPU${i}`])){
                            scene[`GPU${i}`].setVisible(true);
                            scene[`GPUText${i}`].setVisible(true);
                        }else if(!scene.physics.world.overlap(scene.UpdateEXEFrontBackground, scene[`GPU${i}`])){
                            scene[`GPU${i}`].setVisible(false); 
                            scene[`GPUText${i}`].setVisible(false);      
                        }
                    })
                }
            })

            //Aktivieren vom Interaktiv bei den GPUs
            scene.arrGPU.forEach((GPU,i) => {
                scene[`GPU${i}`].setInteractive();

                scene[`GPU${i}`].on("pointerdown", () => {
                    if (scene.score >= scene.arrGPUStats[`arrGPU${i}Stats`].GPU_Prices){
                        console.log("GPU1");

                        scene.score -=  scene.arrGPUStats[`arrGPU${i}Stats`].GPU_Prices;

                        scene.arrGPUStats[`arrGPU${i}Stats`].GPU_Status = true;
                        scene.arrGPUStats[`arrGPU${i}Stats`].GPU_Amount++;
                        scene.arrGPUStats[`arrGPU${i}Stats`].GPU_Prices = GPUPrices(scene.arrGPUStats[`arrGPU${i}Stats`].GPU_Prices);

                        scene[`GPUText${i}Content`].GPUprices = scene.arrGPUStats[`arrGPU${i}Stats`].GPU_Prices;
                        scene[`GPUText${i}Content`].GPUamount = scene.arrGPUStats[`arrGPU${i}Stats`].GPU_Amount;
                        scene[`GPUText${i}Content`].GPUproduction = scene.arrGPUStats[`arrGPU${i}Stats`].GPU_Production;

                        scene[`GPUText${i}`].setText(`Owned: ${scene[`GPUText${i}Content`].GPUamount}\nPrices: ${scene[`GPUText${i}Content`].GPUprices}\nBtc/s: ${scene[`GPUText${i}Content`].GPUproduction}`);

                        if(scene.scoreboard !== null){
                            scene.scoreboard.setText(Math.round(scene.score));
                        }

                    }else if(scene.score < scene.arrGPUStats[`arrGPU${i}Stats`].GPU_Prices){
                        scene.sound.play("DeclineSound");
                    }
                });
            });

        }else{
            scene.arrGPU.forEach((GPU, i) => {
                scene.C_UpgradeEXE.remove(scene[`GPU${i}`]);
                scene[`GPU${i}`].removeInteractive();
                scene[`GPU${i}`].off('pointerdown');
                scene[`GPU${i}`].setVisible(false);
            });
            scene.C_UpgradeEXE.destroy();
            scene.UpdateEXEBackground = null;
            scene.C_UpgradeEXE = null;
            scene.UpdateEXEFrontBackground = null;
        }
    })
}