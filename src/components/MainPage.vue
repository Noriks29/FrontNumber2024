<template>
    <div>
        <header>
            <div class="HeaderButtonList">
                <button>Кнопки</button>
                <button>Кнопки</button>
                <button>Кнопки</button>
                <button>Кнопки</button>
                <button>Кнопки</button>
                <button>Кнопки</button>
            </div>
            <div class="HeaderLogin">
                <div>Имя пользователя</div>
                <button @click="this.$emit('LoginStatus', undefined)">Выйти</button>
            </div>
        </header>
    <section class="ActiveComponents">
            <transition name="translate" mode="out-in">
                <component :is="activeComponent" :ActiveComponent="ActiveComponents" @updateParentComponent="ChangeComponents"></component> 
            </transition> 
    </section>
    
    </div> 

</template> 
<script>
import SelectParam from './SelectParam.vue';

export default {
name: 'MainPage',
props:{
  loginData:{
    type: Object
  },
},
components:{
    SelectParam
},
data() {
  return{
    activeComponent: "SelectParam",
  };
},
methods: {

},
async mounted() {
  console.log(this.loginData)

}
}
</script>

<style lang="scss">
    header{
        position: fixed;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border: 2px solid #000072;
        border-radius: 10px;
        border-top-left-radius: 0px;
        width: 98%;
        left: 1%;
        border-top-right-radius: 0px;
        top: 0px;
        padding: 0px;

        .HeaderButtonList{
            display: flex;
            flex-wrap: nowrap;
            align-items: center;
            justify-content: space-evenly;
            flex: 1;
            margin-right: 10px;
            button{
                flex: 1;
                padding: 10px;

            }
        }
        .HeaderLogin{
            display: flex;
            width: fit-content;
            padding: 1px 5px;
            min-width: min-content;
            
        }
    }
    .ActiveComponents{
        position: relative;
        height: 90vh;
        top: 7vh;
        left: 0px;
        overflow: auto;
        overflow-x: hidden;
    }
</style>