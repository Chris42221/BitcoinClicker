export function addToScore(score,a){
    score += a;
    console.log(score);
    return score;
} 

export function GPUScore(score,BTCsec){
    let ReturnScore;
    ReturnScore = score + BTCsec;
    return ReturnScore;
}