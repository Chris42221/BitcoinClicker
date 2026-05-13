export function addToScore(score,a){
    score += a;
    console.log(score);
    return score;
} 

export function GPUScore(score,BTCsec,amount){
    let ReturnScore;
    ReturnScore = score + (BTCsec/10)*amount;
    return ReturnScore;
}

export function GPUPrices(prices){
    let ReturnPrices;
    ReturnPrices = Math.round(prices*1.15);
    return ReturnPrices;
}