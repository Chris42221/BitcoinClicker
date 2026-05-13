export function ScaleFaktor(designSize, screenSize) {
    return screenSize / designSize; // gibt den Scale-Faktor zurück
}

/**
 * @param {number} designW - Die Breite des Bildes
 * @param {number} designH - Die Höhe des Bildes
 * @param {number} screenW - screenSize / designSize
 * @param {number} screenH - screenSize / designSize
 */
export function getResponsiveSize(designW, designH, screenW, screenH) {
    const scaleX = ScaleFaktor(designW, screenW);
    const scaleY = ScaleFaktor(designH, screenH);
    const scale  = Math.min(scaleX, scaleY); // proportional bleiben

    return {
        width:  designW * scale,
        height: designH * scale,
        scale:  scale,
    };
}