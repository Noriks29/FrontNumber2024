<template>
    <div id="SearchComponent">
        <div class="SearchDiv">
            <div class="inputSearch">
                <input type="text" id="SearchData" placeholder="Введите запрос...">
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
            </div>
            <div><button @click="console.log">+</button></div>
        </div>

     </div>
        
    </div> 

</template> 
<script>
import { FetchGet } from '@/Js/RestFetchService';



export default {
name: 'SearchComponent',
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
        this.dataRequest = []
        let dataS = await FetchGet("/hhelper/searchprofiles/") || {categories: []}
        if(text == ""){
            dataS.categories.forEach(title => {
                title.profiles.forEach(profiles => {
                    this.dataRequest.push({title: title.title, hh_url: profiles.hh_url, name: profiles.name})
                })
            });
        }
        else{
            dataS.categories.forEach(title => {
                if (title.title == text) {
                    title.profiles.forEach(profiles => {
                        this.dataRequest.push({title: title.title, hh_url: profiles.hh_url, name: profiles.name})
                    })
                }
            });
        }
        
        //console.log(dataS)
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