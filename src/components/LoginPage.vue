<template>
    <div class="loginDiv">
        <h1 class="TitleText">Создаем возможности для вашего роста!</h1>

        <div class="loginForm">
            <h1 v-if="loginmode == 0">Вход</h1>
            <h1 v-if="loginmode == 1">Регистрация</h1>

            <div class="LableDiv">
                <label for="login">Имя пользователя</label>
                <div id="loginERR" class="ErrInputLable" style="display: none;">Пустое поле</div>
            </div>
            <input type="text" id="login">

            <div class="LableDiv">
                <label for="password">Пароль</label>
                <div id="passwordERR" class="ErrInputLable" style="display: none;">Пустое поле</div>
            </div>
            <input type="password" name="password" id="password">

            <div class="LableDiv" v-if="loginmode == 1">
                <label for="email">Email</label>
                <div id="emailERR" class="ErrInputLable" style="display: none;">Пустое поле</div>
            </div>
            <input type="email" id="email" v-if="loginmode == 1">

            <div class="LableDiv" v-if="loginmode == 1">
                <label for="full_name">ФИО</label>
                <div id="full_nameERR" class="ErrInputLable" style="display: none;">Пустое поле</div>
            </div>
            <input type="text" id="full_name" v-if="loginmode == 1">

            <div class="buttonDiv">
                <button v-if="loginmode == 0" @click="loginmode = 1">Создать аккаунт</button>
                <button v-if="loginmode == 0" v-on:click="StartLogin">Войти</button>
                <button v-if="loginmode == 1" @click="loginmode = 0">Войти</button>
                <button v-if="loginmode == 1" v-on:click="StartCreate">Зарегистрироваться</button>
            </div>
        </div>
    </div>

</template> 
<script>

import {FetchPost } from '@/Js/RestFetchService';

export default {
name: 'LoginPage',
data() {
  return{
    loginmode: 0,
    PersonData: undefined
  };
},
methods: {
    async StartCreate(){
        const form = document.querySelectorAll("input")
        console.log(form)
        let flagValidate = false
        let data = {}
        form.forEach(input => {
            if(input.value == "") {
                document.querySelector("#"+input.id+"ERR").style.display = "block"
                flagValidate = true
                
            }
            else{
                data[input.id] = input.value
            }
        })
        if (!flagValidate) {
            console.log(JSON.stringify(data, null, 2))
            let responce =  await FetchPost("/hhelper/registration", data)
            try {
                if(responce.success){
                    alert("Аккаунт создвн")
                    this.loginmode = 0
                }
                else{
                    alert("аккант не создан ошибка")
                }
            } catch (error) {
                console.log(error)
            }
            
        }
    },
    async StartLogin(){
        const form = document.querySelectorAll("input")
        console.log(form)
        let flagValidate = false
        let data = {}
        form.forEach(input => {
            if(input.value == "") {
                document.querySelector("#"+input.id+"ERR").style.display = "block"
                flagValidate = true
            }
            else{
                data[input.id] = input.value
            }
        })
        if (!flagValidate) {
            console.log(JSON.stringify(data, null, 2))
            this.PersonData = await FetchPost("/hhelper/stafflog", data) || {}
            console.log(this.PersonData)
            if(this.PersonData.pk != undefined) this.EndLoginPage()
            
        }
    },
    EndLoginPage(){
        this.$emit('LoginStatus', this.PersonData)
    }

},
async mounted() {

}
}
</script>

<style lang="scss" scoped>
.loginDiv{
    height: 100vh;
    width: 100vw;
    position: fixed;
    top: 0px;
    left: 0px;
    overflow: hidden;
    display: flex;
    justify-content: space-around;
    flex-direction: row;


    background-image: url("../assets/image/Vector1.png");
    background-size: cover;
    background-repeat: no-repeat;
    align-items: center;


    .TitleText{
        font-family: 'Aeroport';
        font-weight: bold;
        font-size: 40px;
        white-space: pre-wrap;
        margin: 30px;
        max-width: 35%;
        position: relative;
        top: -80px;
    }

    .loginForm{
        display: flex;
        flex-direction: column;
        border-radius: 30px;
        padding: 10px 65px 45px;
        background-color: white;
        box-shadow: inset 0px 2px 6px rgba(0, 0, 0, 0.1882352941), 0px 3px 2px rgba(0, 0, 0, 0.2784313725);
        border: none;
        min-width: 500px;
        margin: 30px;
        position: relative;

        h1{
            text-align: center;
            font-size: 30px;
            font-family: 'Aeroport';
            font-weight: bold;
        }


        .LableDiv{
            label{
                font-size: 19px;
                font-family: "Aeroport";
                font-weight: lighter;
                color: black;
                margin-left: 5px;
            }
            display: flex;
            .ErrInputLable{
                margin: 0px 0px 0px 15px;
                color: red;
            }
        }

        input{
            height: 30px;
            padding: 5px;
            margin: 5px 0px 10px;
            background: none;
            border: none;
            border-bottom: 1px solid #000000;
            font-size: 25px;
            font-family: 'Aeroport';
            font-weight: bold;
        }
        .buttonDiv{
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            flex: 1;
            padding: 5px 20px;

            button{
                border: none;
                margin: 0px 10px;
                padding: 10px 20px;
                border-radius: 10px;
                background-color: #D9FA72;
                flex: 1;
                font-family: 'Aeroport';
                font-weight: lighter;
                font-size: 20px;
                color: black;
                box-shadow: inset 0px 3px 3px rgba(0, 0, 0, 0.1882352941), 0px 2px 4px rgba(0, 0, 0, 0.2784313725);
            }
        }
    }
}
</style>