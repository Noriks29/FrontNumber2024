<template>
    <div class="loginDiv">
        <div v-if="loginmode == 0" class="loginForm" id="LoginHR">
            <h1>Вход в аккаунт</h1>

            <div class="LableDiv">
                <label for="login">login</label>
                <div id="loginERR" class="ErrInputLable" style="display: none;">Пустое поле</div>
            </div>
            <input type="text" id="login">
            
            <div class="LableDiv">
                <label for="password">password</label>
                <div id="passwordERR" class="ErrInputLable" style="display: none;">Пустое поле</div>
            </div>
            <input type="password" name="password" id="password">
            <div class="buttonDiv">
                <button v-on:click="StartLogin">Войти</button>
                <button @click="loginmode = 1">Создать аккаунт</button>
            </div>
        </div>
        <div v-if="loginmode == 1" class="loginForm" id="createHR">
            <h1>Регистрация</h1>
            <div class="LableDiv">
                <label for="full_name">ФИО</label>
                <div id="full_nameERR" class="ErrInputLable" style="display: none;">Пустое поле</div>
            </div>
            <input type="text" id="full_name">

            <div class="LableDiv">
                <label for="email">Email</label>
                <div id="emailERR" class="ErrInputLable" style="display: none;">Пустое поле</div>
            </div>
            <input type="email" id="email">

            <div class="LableDiv">
                <label for="login">login</label>
                <div id="loginERR" class="ErrInputLable" style="display: none;">Пустое поле</div>
            </div>
            <input type="text" id="login">

            <div class="LableDiv">
                <label for="password">password</label>
                <div id="passwordERR" class="ErrInputLable" style="display: none;">Пустое поле</div>
            </div>
            <input type="password" name="password" id="password">
            <div class="buttonDiv">
                <button v-on:click="StartCreate">Создать аккаунт</button>
                <button @click="loginmode = 0">Вернутся к входу</button>
            </div>
        </div>
    </div>

</template> 
<script>

import { FetchPost } from '@/Js/RestFetchService';

export default {
name: 'LoginPage',
data() {
  return{
    loginmode: 0
  };
},
methods: {
    async StartCreate(){
        const form = document.getElementById("createHR").querySelectorAll("input")
        console.log(form)
        let flagValidate = false
        let data = {}
        form.forEach(input => {
            if(input.value == "") {
                document.getElementById("createHR").querySelector("#"+input.id+"ERR").style.display = "block"
                flagValidate = true
                
            }
            else{
                data[input.id] = input.value
            }
        })
        if (!flagValidate) {
            console.log(JSON.stringify(data, null, 2))
            await FetchPost("/hhelper/registration", data)
        }
    },
    async StartLogin(){
        const form = document.getElementById("LoginHR").querySelectorAll("input")
        console.log(form)
        let flagValidate = false
        let data = {}
        form.forEach(input => {
            if(input.value == "") {
                document.getElementById("LoginHR").querySelector("#"+input.id+"ERR").style.display = "block"
                flagValidate = true
            }
            else{
                data[input.id] = input.value
            }
        })
        if (!flagValidate) {
            console.log(JSON.stringify(data, null, 2))
            await FetchPost("/hhelper/stafflog", data)
        }
    }

},
async mounted() {

}
}
</script>

<style lang="scss">
.loginDiv{
    height: 100vh;
    width: 100vw;
    position: fixed;
    top: 0px;
    left: 0px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: nowrap;
    flex-direction: column;

    .loginForm{
        display: flex;
        flex-direction: column;
        background-color: #a8a8a8;
        padding: 14px;
        border: 2px solid #6d6d6d;
        border-radius: 15px;
        box-shadow: inset 0px 0px 8px 0px #6001da;
        height: 50vh;
        width: 30vw;


        .LableDiv{
            display: flex;
            .ErrInputLable{
                margin: 0px 0px 0px 15px;
                color: red;
            }
        }

        input{
            height: 15px;
            padding: 5px;
            background: none;
            border: 2px solid #343475;
            margin: 5px 0px 10px;
        }
        .buttonDiv{
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex: 1;

            button{
                background: none;
                border: 2px solid black;
                padding: 7px;
                border-radius: 5px;
                background-color: #a690db;
            }
        }
    }
}
</style>