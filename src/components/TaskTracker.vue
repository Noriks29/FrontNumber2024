<template>
    <div id="TaskTracker">
        <div class="AddTaskButton" v-if="!addTask"><Button @click="addTask = true" class="ButtonWhite1">Добавить задачу</Button></div>
        <div class="AddTaskForm" v-if="addTask"><input id="AddTaskInput" class="InputWhite1" type="text"><button class="ButtonWhite1" @click="AddTask">Добавить</button></div>
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
                <button @click="DeleteRow(dataTask.id)" class="ButtonWhite1">Удалить</button>
            </div>
            
        </div>
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
    dataTask: [],
    addTask: false
  };
},
methods: {
    async AddTask(){
        let text = document.getElementById("AddTaskInput").value || "nonetext"
        let data = {
            staff_pk: this.loginData.pk,
            description: text
        }
        await FetchPost("/hhelper/createtask/", data)
        this.addTask = false
        await this.ReFetch()
    },
    async DeleteRow(id){
        await FetchPost("/hhelper/deletetask/", {task_id: Number(id)})
        await this.ReFetch()
    },
    async ReFetch(){
        let data = await FetchPost("/hhelper/tasks/", {staff_id : this.loginData.pk})
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
    }
},
async mounted() {
    await this.ReFetch()
    console.log(this.dataTask)
}
}
</script>

<style lang="scss" scoped>

#TaskTracker{
    padding: 15px;
    margin: 10px;
    color: black;
    font-family: "Aeroport";
    background-color: white;
    height: 95%;
    border-radius: 15px;
    overflow-y: auto;
    overflow-x: hidden;

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
            height: 40px;
        }
        display: flex;
        flex-direction: row-reverse;
    }
    .AddTaskForm{
        display: flex;
        align-items: center;
        input{
            height: 25px;
            background-color: rgba(214, 214, 214, 0.3490196078);
            border-radius: 4px;
            flex: 1;
            font-size: 20px;
        }
        button{
            height: 40px;
        }
    }

}

</style>