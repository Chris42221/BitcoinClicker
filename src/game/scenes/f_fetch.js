export async function fetchData(url) {
    const DataReq = await fetch(url);
    if(!DataReq.ok){
        return(console.log("Error"));
    }
    
    const Data = DataReq.json();

    return(console.log(Data));
}