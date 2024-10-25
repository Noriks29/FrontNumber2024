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
    </div> 

</template> 
<script>

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

},
async mounted() {
  let data = {
    "login": "test",
    "tasks": [
        {
            "id": 1,
            "description": "Менеджера найтиМенеджера найтиМенеджера найтиМенеджера найтиМенеджера найтиМенеджера найтиМенеджера найтиМенеджера найтиМенеджера найтиМенеджера найтиМенеджера найтиМенеджера найтиМенеджера найтиМенеджера найтиМенеджера найтиМенеджера найтиМенеджера найтиМенеджера найтиМенеджера найти",
            "created_at": "2024-10-25T15:34:09.894898+03:00"
        },
        {
            "id": 2,
            "description": "Менеджера найти",
            "created_at": "2024-10-25T15:34:44.196305+03:00"
        },
        {
            "id": 3,
            "description": "Менеджера найти",
            "created_at": "2024-10-25T15:40:26.146115+03:00"
        },
        {
            "id": 4,
            "description": "Менеджера найти",
            "created_at": "2024-10-25T15:40:55.550042+03:00"
        },
        {
            "id": 5,
            "description": "Менеджера найти",
            "created_at": "2024-10-25T15:40:58.973320+03:00"
        },
        {
            "id": 6,
            "description": "Менеджера найти",
            "created_at": "2024-10-25T15:41:30.914925+03:00"
        },
        {
            "id": 7,
            "description": "Менеджера найти",
            "created_at": "2024-10-25T15:41:37.715889+03:00"
        }
    ]
}
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

}

</style>