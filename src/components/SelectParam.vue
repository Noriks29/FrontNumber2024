<template>
    <div>
        <section class="tasks" @dragstart="$event.target.classList.add('selected')" @dragend="$event.target.classList.remove('selected')">
            <h1 class="tasks__title">To do list</h1>
            <ul class="tasks__list" @dragover="DragoverEvent">
                <li v-for="index, data in datalist"
                    :key="index"
                    class="tasks__item"
                    draggable="true"
                >{{ data }}</li>
            </ul>
        </section>
        <button @click="SendPostPriority">Отправить</button>
    </div>

</template> 
<script>

export default {
name: 'SelectParam',
data() {
  return{
    datalist: ["1", "2", "3", "4", "5"],
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
            this.data.push(element.innerHTML)
        })
        console.log(this.data)
    }



},
async mounted() {
}
}
</script>

<style lang="scss">
body {
  font-family: "Tahoma", sans-serif;
  font-size: 18px;
  line-height: 25px;
  color: #164a44;

  background-color: #b2d9d0;
}

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
  border: 2px dashed #b2d9d0;
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
</style>