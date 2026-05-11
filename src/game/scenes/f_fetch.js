export async function fetchData(url) {
    const DataReq = await fetch(url);
    if(!DataReq.ok){
        console.log("Error");
        return(null);
    }
    
    const Data = await DataReq.json();
    console.log(Data);

    return(Data);
}