<template>
    <div>
      <div class="indecatorsLoatGlopal">
        <div v-for="data,index in indecatorsLoatGlopal"
          :key="index"
          @click="AddIndicators(data)"
          v-show="!data.use == true"
        >
          {{ data.name }}
        </div>
      </div>
      <div>
        <input type="text" name="requestSearch" id="requestSearch">
      </div>
        <section class="tasks" @dragstart="$event.target.classList.add('selected')" @dragend="$event.target.classList.remove('selected')">
            <h1 class="tasks__title">To do list</h1>
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

import { FetchGet } from '@/Js/RestFetchService';

export default {
name: 'SelectParam',
props:{
  loginData:{
    type: Object
  },
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
    SendPostPriority(){
        this.data = []
        document.querySelector(`.tasks__list`).querySelectorAll(`.tasks__item`).forEach(element =>{
            this.data.push(element.id)
        })
        console.log(this.data)
        let job_title = document.getElementById("requestSearch").value
        let dataPost = {
          "indicators": this.data,
          "job_title": job_title
        }
        console.log(JSON.stringify(dataPost, null, 2))
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
  let indicators = await FetchGet("/hhelper/indicators") || []
  console.log(indicators)
  this.indecatorsLoatGlopal = indicators
}
}
</script>

<style lang="scss">

.tasks__title {
  margin: 50px 0 20px 0;

  text-align: center;
  text-transform: uppercase;
 }

.tasks__list {
  margin: 0;
  padding: 0;

  list-style: none;
}

.tasks__item {
  transition: background-color 0.5s;
  margin-bottom: 10px;
  padding: 5px;

  text-align: center;
  border: 2px line #374b46;
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
  div{
    padding: 4px;
    border: 2px solid black;
    border-radius: 10px;
    margin: 3px;
  }
}
</style>