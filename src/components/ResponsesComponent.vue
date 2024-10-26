<template>
    <div id="SearchComponent">
        <div class="SearchDiv">
            <button @click="ShowPocazat">Показатели</button>
            <div class="inputSearch">
                <input type="text" id="SearchData">
                <img src="../assets/image/Search.png" alt="" @click="StartSerach">
            </div>
        </div>
     <div class="SearchRezult">
        fsdfsdfsdf

     </div>
        
    </div> 

</template> 
<script>
import { FetchGet } from '@/Js/RestFetchService';



export default {
name: 'ResponsesComponent',
props:{
  loginData:{
    type: Object
  },

},
data() {
  return{
    dataRequest: []
  };
},
methods: {
    async StartSerach(){
        const text = document.getElementById("SearchData").value
        console.log(text)
        let dataS = await FetchGet("/hhelper/showresponses/")
        console.log(dataS)
        alert(JSON.stringify(dataS))
    },
    async ShowPocazat(){
        let dataS = await FetchGet("/hhelper/indicators/")
        console.log(dataS)
        alert(JSON.stringify(dataS))
    }
},
async mounted() {

}
}
</script>

<style lang="scss" scoped>

#SearchComponent{
    padding: 10px;



    .SearchDiv{
        display: flex;
        align-items: center;

        button{
            border: none;
            border-radius: 20px;
            padding: 10px;
            background-color: white;
            margin: 0px 7px;
            box-shadow: inset 0px 2px 5px 0px rgba(0, 0, 0, 0.33), 0px 4px 3px 0px rgba(0, 0, 0, 0.08);
            &:hover{
                background-color: #eeeeee;
            }
        }

        .inputSearch{
            background-color: white;
            padding: 0px 5px;
            flex: 1;
            display: flex;
            height: 40px;
            align-items: center;
            border-radius: 10px 25px;
            box-shadow: inset 0px 2px 5px 0px rgba(0, 0, 0, 0.33), 0px 4px 3px 0px rgba(0, 0, 0, 0.08);

            input{
                background: none;
                outline:none;
                border: none;
                height: 100%;
                flex: 1;
            }
            img{
                width: 30px;
                padding: 15px;
            }


        }
    }

    .SearchRezult{
        margin-top: 20px;
        background-color: white;
        border-radius: 10px;
        padding: 20px;
    }
    

}

</style>