<template>
    <div id="MainPage">
        <div>
            <header>
                <div class="HeaderButtonList">
                    <button @click="ChangeComponents('TaskTracker')" :class="(activeComponent == 'TaskTracker') ? 'active' : ''">Задачи</button>
                    <button @click="ChangeComponents('SearchComponent')" :class="(activeComponent == 'SearchComponent') ? 'active' : ''">Поиск</button>
                    <button @click="ChangeComponents('ResponsesComponent')" :class="(activeComponent == 'ResponsesComponent') ? 'active' : ''">Отклики</button>
                </div>
                <div class="HeaderLogin">
                    <button @click="this.$emit('LoginStatus', undefined)"><img src="../assets/image/BackRow.png" alt=""></button>
                    <button><img src="../assets/image/Like.png" alt=""></button>
                    <button><img src="../assets/image/Person.png" alt=""></button>
                </div>
            </header>
            <section class="ActiveComponents">
                    <transition name="translate" mode="out-in">
                        <component :is="activeComponent" :ActiveComponent="ActiveComponents" :loginData="loginData" @updateParentComponent="ChangeComponents"></component> 
                    </transition> 
            </section>
        </div>
    </div> 

</template> 
<script>
import SelectParam from './SelectParam.vue';
import TaskTracker from './TaskTracker.vue';
import SearchComponent from './SearchComponent.vue'
import ResponsesComponent from './ResponsesComponent.vue';

export default {
name: 'MainPage',
props:{
  loginData:{
    type: Object
  },
},
components:{
    SelectParam,
    TaskTracker,
    SearchComponent,
    ResponsesComponent
},
data() {
  return{
    activeComponent: "TaskTracker",
  };
},
methods: {
    ChangeComponents(newC){
        this.activeComponent = newC
    }
},
async mounted() {
  console.log(this.loginData)

}
}
</script>

<style lang="scss" scoped>

#MainPage{
    height: 100vh;
    width: 100vw;
    position: fixed;
    top: 0px;
    left: 0px;
    overflow: hidden;
    display: flex;
    flex-direction: row;

    background-image: url(http://localhost:8080/img/Vector2.30998201.png);
    background-size: cover;
    background-repeat: no-repeat;
    justify-content: center;
    align-items: center;

    header{
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 10px 0px;
    }

    .HeaderButtonList{
        button{
            padding: 13px 30px;
            background-color: white;
            margin: 0px 10px;
            border: none;
            border-radius: 10px;
            font-family: 'Aeroport';
            font-weight: lighter;
            font-size: 20px;
            transition: 0.3s all;

            &:hover{
                background-color: #e2e2e2;
                box-shadow: 0px -3px 5px 0px rgb(127 127 127 / 14%);
            }
            &.active, &:active{
                background-color: #ffffff;
                box-shadow: inset 0px 2px 5px 0px rgb(0 0 0 / 59%), 0px 4px 3px 0px #0000002e;
            }
        }
    }
    .HeaderLogin{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-evenly;

        button{
            border: none;
            border-radius: 100%;
            padding: 10px;
            background-color: white;
            height: 55px;
            margin: 0px 7px;
            box-shadow: inset 0px 2px 5px 0px rgb(0 0 0 / 33%), 0px 4px 3px 0px rgb(0 0 0 / 8%);

            img{
                width: 35px;
                height: 35px;
            }
            &:hover{
                background-color: #e2e2e2;
            }
        }
    }
    .ActiveComponents{
        margin: 20px 0px 0px;
        height: 75vh;
        width: 90vw;
    }
}

</style>