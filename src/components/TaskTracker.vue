<template>
    <div id="TaskTracker">
        <div v-for="data, index in dataTask"
            :key="index"
            
        >
            <h1>Задачи на {{ data.created_at }}</h1>
           <div class="Div_description" v-for="dataTask, indexTask in data.list"
                :key="indexTask"
                :id="dataTask.id"
            >
                <span></span>
                <p>{{ dataTask.description}} </p>
            </div>
            
        </div>
        <div class="AddTaskButton"><Button @click="AddTask">Добавить задачу</Button></div>
    </div> 

</template> 
<script>
import { FetchPost } from '@/Js/RestFetchService';


export default {
name: 'TaskTracker',
props:{
  loginData:{
    type: Object
  },

},
data() {
  return{
    dataTask: []
  };
},
methods: {
    AddTask(){
        alert("Тут будет добавление задачи")
    }
},
async mounted() {
  let data = await FetchPost("/hhelper/tasks/", {staff_id : this.loginData.pk})
    
    console.log(data)
    this.dataTask = []
    data.tasks.forEach(element => {
        element.created_at = element.created_at.split("T")[0].split("-")
        element.created_at = element.created_at[2]+"."+element.created_at[1]+"."+element.created_at[0]
        let flagadd = false
        this.dataTask.forEach(Task => {
            if (Task.created_at == element.created_at) {
                Task.list.push({id: element.id, description: element.description})
                flagadd = true
            }
        })
        if(!flagadd){
            this.dataTask.push({created_at: element.created_at, list: [{id: element.id, description: element.description}]})
        }
    });
    console.log(this.dataTask)
}
}
</script>

<style lang="scss" scoped>

#TaskTracker{
    margin: 20px;
    color: black;
    font-family: 'Aeroport';

    h1{
       // font-weight: normal;
    }
    .Div_description{
        display: flex;
        flex-direction: row;
        align-items: center;
        p{
            font-weight: lighter;
            margin: 0px 0px 0px 20px;
        }
        span{
            display: block;
            width: 10px;
            height: 10px;
            background-color: black;
            border-radius: 100%;
            min-width: 10px;
        }
    }

    .AddTaskButton{
        button{
            width: 100%;
            height: 40px;
            background-color: #d6d6d6;
            border-radius: 30px;
        }
    }

}

</style>