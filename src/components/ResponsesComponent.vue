<template>
    <SelectParam v-if="displayPocaz" :loginData="loginData" :profession="{dataId: dataId}" @Colculate="UppDateColculate" />
    <div id="SearchComponent">
        <div class="SearchDiv">
            <button @click="displayPocaz = true">Показатели</button>
            <div class="inputSearch">
                <input type="text" id="SearchData" value="Менеджер">
                <img src="../assets/image/Search.png" alt="" @click="StartSerach">
            </div>
        </div>
    <div class="SearchRezult">
        <div v-for="data, index in dataRequest"
            :key="index"
            class="DataRezult"
        >
            <div class="DivIcon"><img src="../assets/image/IconPerson.png" alt=""></div>
            <div>
                <h1>{{ data.name }}</h1>
                <div>{{ data.title }}</div>
                <div><a :href="data.hh_url">HH.ru</a></div>
                <div><a :href="data.vk_id">VK.ru</a></div>
                <div>Баллов после оценки - {{ data.score }}</div>
            </div>
            <div><button @click="console.log">+</button></div>
        </div>

     </div>
        
    </div> 

</template> 
<script>
import { FetchPost } from '@/Js/RestFetchService';
import SelectParam from './SelectParam.vue';


export default {
name: 'ResponsesComponent',
props:{
  loginData:{
    type: Object
  },

},
components: {
    SelectParam
},
data() {
  return{
    dataRequest: [],
    dataId: 1,
    displayPocaz: false
  };
},
methods: {
    async StartSerach(){
        const text = document.getElementById("SearchData").value
        this.dataRequest = []
        let dataS = await FetchPost("/hhelper/showresponses/", {profession_title: text}) || []
        this.dataId = dataS[0].id
        dataS[0].profiles.forEach(profiles => {
                    this.dataRequest.push({title: dataS[0].title, hh_url: profiles.hh_url, name: profiles.name, vk_id: profiles.vk_url, score: profiles.score, id: profiles.id})
                });
        //console.log(dataS)
        console.log(this.dataRequest)
    },
    UppDateColculate(data){
        this.displayPocaz = false
        console.log(data)
        data.created_scores.forEach(element => {
            for (let index = 0; index < this.dataRequest.length; index++) {
                const Request = this.dataRequest[index];
                if(Request.id == element.profile_id){
                    Request.score = element.score
                    break
                }
                
            }
        })
        console.log(this.dataRequest)
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
        display: flex;
        flex-wrap: wrap;
        max-height: 60vh;
        overflow: auto;

        .DataRezult{
            display: flex;
            background-color: #EBFFAC;
            border-radius: 15px;
            box-shadow: inset 0px 2px 5px 0px rgba(0, 0, 0, 0.33), 0px 4px 3px 0px rgba(0, 0, 0, 0.08);
            padding: 10px;
            width: 350px;
            justify-content: space-between;
            margin: 15px;

            .DivIcon{
                img{
                    width: 50px;
                }
            }
        }
    }
    

}

</style>