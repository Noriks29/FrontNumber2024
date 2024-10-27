<template>
  <div id="loadProcess" style="display: none;">
    <div>
      <svg class="spinner" width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
        <circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>
      </svg>

    </div>
  </div>
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
    statusLogin: false,
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



#loadProcess{
  width: 100vw;
    height: 100vh;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    background-color: #ffffffa8;
}
  // Here is where the magic happens

$offset: 187;
$duration: 1.4s;

.spinner {
  animation: rotator $duration linear infinite;
}

@keyframes rotator {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(270deg); }
}

.path {
  stroke-dasharray: $offset;
  stroke-dashoffset: 0;
  transform-origin: center;
  animation:
    dash $duration ease-in-out infinite, 
    colors ($duration*4) ease-in-out infinite;
}

@keyframes colors {
	0% { stroke: #4285F4; }
	25% { stroke: #DE3E35; }
	50% { stroke: #F7C223; }
	75% { stroke: #1B9A59; }
  100% { stroke: #4285F4; }
}

@keyframes dash {
 0% { stroke-dashoffset: $offset; }
 50% {
   stroke-dashoffset: calc($offset/4);
   transform:rotate(135deg);
 }
 100% {
   stroke-dashoffset: $offset;
   transform:rotate(450deg);
 }
}
</style>