import { adress } from "./ServerConfig";
import DebugData from "../assets/resource/DebugDataFetch.json"
const ShowFetchData = true
const DEBUGMODE = true
/*
function DisplayLoad(status){
    const element = document.getElementById("loadProcess");
    if(status){
        element.style.display = "flex"
    }
    else{
        element.style.display = "none"
    }
}*/
async function FetchGet(http){
    if (DEBUGMODE) return DebugData[http]
    try {
        const response = await fetch(adress+http);
        if (!response.ok) {
            let rezult = await response.json()
            if(ShowFetchData) console.log(http,rezult)
            throw new Error(rezult.MESSAGE);
        }
        else{
            let rezult = await response.json()
            if(ShowFetchData) console.log(http, rezult)
            return rezult;
        }
    } catch (error) {
        console.log('Error during fetch:', error);
        alert("Ошибка запроса, дальнейшая работа может быть некорректной!" + error)
        return undefined
    }

}

async function FetchPost(http,datapost){
    if (DEBUGMODE) return DebugData[http]
    if(ShowFetchData) console.log(JSON.stringify(datapost))
    try {
        const response = await fetch(adress+http,{
          method:  'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(datapost)
        })
        if (!response.ok) {
            let rezult = await response.json()
            if(ShowFetchData) console.log(http,rezult)
            throw new Error(rezult.MESSAGE);
        }
        else{
            let rezult = await response.json()
            if(ShowFetchData) console.log(http, rezult)
            return rezult;
        }
        } catch (error) {
            console.log('Error save:', error);
            alert("ОШИБКА ОТПРАВКИ  " + error)
            return undefined;
        }
}



export{
    FetchGet,
    FetchPost
}