import { adress } from "./ServerConfig";

const ShowFetchData = true
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
    let AcsessKey = localStorage.data
    try {
        const response = await fetch(adress+http+'?accessKey='+AcsessKey);
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

async function FetchPost(http,datapost,dopparamhttp){
    if(ShowFetchData) console.log(JSON.stringify(datapost))
    let AcsessKey = localStorage.data
    try {
        const response = await fetch(adress+http+'?accessKey='+AcsessKey,{
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