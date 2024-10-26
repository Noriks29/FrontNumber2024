<template>
  <WelcomeScreen v-if="StartWort==0" @WorkStatus="StartWortEvent"/>
  <LoginPage v-if="!statusLogin && StartWort==1" @LoginStatus="GetStartetMain"/>
  <MainPage v-if="statusLogin && StartWort==1" :loginData="loginData" @LoginStatus="GetStartetMain" />

</template> 
<script>
import LoginPage from "./components/LoginPage.vue";
import MainPage from "./components/MainPage.vue";
import scss from './assets/css/MainSCSS.scss'
import WelcomeScreen from "./components/WelcomeScreen.vue";


export default {
name: 'App',
data() {
  return{
    statusLogin: true,
    loginData: undefined,
    StartWort: 0
  };
},
css:{
  scss
},
components:{
  LoginPage,
  MainPage,
  WelcomeScreen
},
methods: {
  StartWortEvent(event){
    let app = document.getElementById("app")
    if(event == 1){
      app.classList.add("greenBG")
      this.StartWort = 1
    }
    if (event == 0) {
      app.classList.remove("greenBG")
      this.StartWort = 0
    }
  },
  GetStartetMain(data){
    if(data !== undefined){
      this.loginData = data
      this.statusLogin = true
    }
    else{
      this.loginData = undefined
      this.statusLogin = false
    }
    
  }


},
async mounted() {
  
}
}
</script>

<style lang="scss">
  
</style>