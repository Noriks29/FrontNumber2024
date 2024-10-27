<template>
    <div class="SelectPakazetel">
      <div class="indecatorsLoatGlopal">
        <div v-for="data,index in indecatorsLoatGlopal"
          :key="index"
          @click="AddIndicators(data)"
          v-show="!data.use == true"
        >
          {{ data.name }}
        </div>
      </div>
        <section class="tasks" @dragstart="$event.target.classList.add('selected')" @dragend="$event.target.classList.remove('selected')">
            <ul class="tasks__list" @dragover="DragoverEvent">
                <li v-for="data, index in datalist"
                    :key="index"
                    class="tasks__item"
                    draggable="true"
                    :id = data.id
                >{{ data.name }}</li>
            </ul>
        </section>
        <button @click="SendPostPriority">Отправить</button>
    </div> 

</template> 
<script>

import { FetchGet, FetchPost } from '@/Js/RestFetchService';

export default {
name: 'SelectParam',
props:{
  loginData:{
    type: Object
  },
  profession: {
    type: Object
  }
},
data() {
  return{
    indecatorsLoatGlopal: undefined,
    datalist: [],
    data: []
  };
},
methods: {
    DragoverEvent(e){
        // Разрешаем сбрасывать элементы в эту область

        e.preventDefault();

        // Находим перемещаемый элемент
        const activeElement = document.querySelector(`.tasks__list`).querySelector(`.selected`);

        const currentElement = e.target;
        const isMoveable = activeElement !== currentElement &&
        currentElement.classList.contains(`tasks__item`);

        if (!isMoveable) {
        return;
        }

        // evt.clientY — вертикальная координата курсора в момент,
        // когда сработало событие
        const nextElement = this.getNextElement(e.clientY, currentElement);

        // Проверяем, нужно ли менять элементы местами
        if (
            nextElement && 
            activeElement === nextElement.previousElementSibling ||
            activeElement === nextElement
        ) {
        // Если нет, выходим из функции, чтобы избежать лишних изменений в DOM
            return;
        }

        document.querySelector(`.tasks__list`).insertBefore(activeElement, nextElement);
    },
    getNextElement(cursorPosition, currentElement){
    // Получаем объект с размерами и координатами
    const currentElementCoord = currentElement.getBoundingClientRect();
    // Находим вертикальную координату центра текущего элемента
    const currentElementCenter = currentElementCoord.y + currentElementCoord.height / 2;

    // Если курсор выше центра элемента, возвращаем текущий элемент
    // В ином случае — следующий DOM-элемент
    const nextElement = (cursorPosition < currentElementCenter) ?
        currentElement :
        currentElement.nextElementSibling;

    return nextElement;
    },
    async SendPostPriority(){

        console.log(this.loginData, this.profession)
        this.data = []
        document.querySelector(`.tasks__list`).querySelectorAll(`.tasks__item`).forEach(element =>{
            this.data.push(element.id)
        })
        console.log(this.data)
        let dataPost = {
          "indicators": this.data,
          "profession_id": this.profession.dataId,
          "staff_id": this.loginData.pk
        }

        let rezult =  await FetchPost("/hhelper/professionindicators/", dataPost)
        console.log(rezult)
        let colculate = await FetchPost("/hhelper/calculationscores/", {staff_id: this.loginData.pk, profession_id: this.profession.dataId})

        this.$emit('Colculate', colculate)
    },
    AddIndicators(data){

      console.log(data)
      if(this.datalist.length < 5){
        this.indecatorsLoatGlopal.forEach(element => {
          if(element.id == data.id){
            element.use = true
          }
        })
        this.datalist.push(data)
      }
    }



},
async mounted() {
  console.log(this.loginData)
  let indicators = await FetchGet("/hhelper/indicators/") || []
  console.log(indicators)
  this.indecatorsLoatGlopal = indicators
}
}
</script>

<style lang="scss">

.SelectPakazetel{
    position: fixed;
    height: 100vh;
    width: 100vw;
    left: 0px;
    top: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: #0000008c;
}

.tasks__title {
  margin: 50px 0 20px 0;

  text-align: center;
  text-transform: uppercase;
 }

.tasks__list {
  background-color: white;
    padding: 20px;
    margin: 5px;
    border-radius: 15px;

  list-style: none;
}

.tasks__item {
  transition: background-color 0.5s;
    margin-bottom: 10px;
    padding: 5px;
    text-align: center;
    border: 2px solid #374b46;
    border-radius: 10px;
    cursor: move;
    background-color: #dff2ef;
    transition: background-color 0.5s;
}

.tasks__item:last-child {
  margin-bottom: 0;
}

.selected {
  opacity: 0.6;
}


.indecatorsLoatGlopal{
  display: flex;
  flex-wrap: wrap;
  background-color: white;
    padding: 10px;
    border-radius: 18px;
    margin: 5px;
  div{
    padding: 4px;
    border: 2px solid black;
    border-radius: 10px;
    margin: 3px;
  }
}
</style>