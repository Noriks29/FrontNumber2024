<template>
<LoginPage v-if="!statusLogin" @LoginStatus="GetStartetMain"/>
<MainPage :loginData="loginData" @LoginStatus="GetStartetMain" v-else/>

</template> 
<script>
import LoginPage from "./components/LoginPage.vue";
import MainPage from "./components/MainPage.vue";

export default {
name: 'App',
data() {
  return{
    statusLogin: true,
    loginData: undefined
  };
},
components:{
  LoginPage,
  MainPage
},
methods: {
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