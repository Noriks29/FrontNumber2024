<template>
<LoginPage v-if="!statusLogin"/>
<SelectParam v-else/>

</template> 
<script>
import SelectParam from "./components/SelectParam.vue"
import LoginPage from "./components/LoginPage.vue";

export default {
name: 'App',
data() {
  return{
    statusLogin: false
  };
},
components:{
  SelectParam,
  LoginPage
},
methods: {



},
async mounted() {
  
}
}
</script>

<style lang="scss">
  
</style>