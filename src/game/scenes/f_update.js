export function PercentCalculator(a,p,b,r){
    let Percent = a*p/b;
    if(r){
        return(updateSize(a,Percent));
    }else{
        return(Percent);
    }
}

export function updateSize(a,p){
    let newSize = a/((p/1000)+1);
    return(newSize)
}