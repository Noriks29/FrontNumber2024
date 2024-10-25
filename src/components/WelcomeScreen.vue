<template>
 <div id="WelcomeScreen">
    <div class="ContainerPage">
        <button id="infoButton" class="ButtonGray" @click="console.log">О сервисе</button>
        <button id="ByttonStartProject" class="ButtonGray" @click="StartWort">Присоединиться</button>
        <div id="ListInfo">
            <p><span class="Ellipse"></span>Помощь в подборе</p>
            <p><span class="Ellipse"></span>Структурированные отклики</p>
            <p><span class="Ellipse"></span>Удобная карта компетенций</p>
        </div>
        <p id="TextLable1">AI помощник, созданный <br> специально для HR-менеджеров</p>
        <h1>Сервис умного подбора<br>специалистов</h1>
        <div id="PhotoHR"><img src="../assets/image/HRWekcomePhoto.png" alt=""></div>
    </div>
 </div>

</template> 
<script>

export default {
name: 'WelcomeScreen',
data() {
  return{
    
  };
},
methods: {
    StartWort(){
        this.$emit('WorkStatus', 1)
    }

}
}
</script>

<style lang="scss" scoped>

@keyframes ani {
    0% {transform: translateX(-150%);}
    100% {transform: translateY(0);}
}

#WelcomeScreen{
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .ContainerPage{
        margin: 20px;
        background-image: url("../assets/image/WelcomeFon.png");
        width: 70vw;
        aspect-ratio: 167/100;
        background-repeat: no-repeat;
        background-size: contain;
        position: relative;

        .ButtonGray{
            background-color: #222222;
            border: none;
            border-radius: 15px;
            font-family: "Aeroport";
            font-size: 20px;
            color: white;
            font-weight: bold;
            box-shadow: -2px 3px 5px 0px #00000042;
            &:hover{
                background-color: #2a2a2a;
                border: 1px solid #414141;
                box-shadow: -2px 3px 9px 0px rgb(0 0 0 / 70%);
            }
            &:active{
                background-color: #131313;
                transform: scale(0.95);
                box-shadow: -2px 3px 9px 0px rgba(0, 0, 0, 0.884);
            }
            transform: translateY(-150%);
            animation: ani 1s forwards;
        }

        #infoButton{
            width: 24.62%;
            height: 11.99%;
        }
        #ByttonStartProject{
            width: 26.43%;
            height: 11.99%;
            position: absolute;
            bottom: 8px;
            right: 5px;
        }
        #ListInfo{
            position: absolute;
            bottom: 15%;
            left: 8%;
            p{
                display: flex;
                align-items: center;
                margin: 25px 0px;

                font-family: "Aeroport";
                font-size: 20px;
                font-weight: lighter;
                .Ellipse{
                    display: block;
                    background-color: white;
                    width: 20px;
                    border-radius: 100%;
                    aspect-ratio: 1 / 1;
                    box-shadow: inset 0px 2px 4px #00000030, -1px 2px 3px #00000047;
                    margin-right: 10px;
                }
            }
        }
        #TextLable1{
            top: 2%;
            position: absolute;
            left: 33%;
            font-family: "Aeroport";
            font-size: 20px;
            font-weight: lighter;
        }
        h1{
            position: absolute;
            top: 19%;
            left: 5%;
            font-family: "Aeroport";
            font-size: 47px;
            font-weight: bold;
        }
        #PhotoHR{
            position: absolute;
            width: fit-content;
            display: flex;
            flex-direction: row-reverse;
            top: 18%;
            right: 3%;

            img{
                width: 28%;
            }
        }
    }
}
</style>