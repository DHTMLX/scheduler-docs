---
title: "Создание нескольких планировщиков на странице"
sidebar_label: "Создание нескольких планировщиков на странице"
---

# Создание нескольких планировщиков на странице

:::info
Эта функция доступна только в версии Scheduler PRO (Commercial с 6 октября 2021, Enterprise и Ultimate лицензии).
:::

Как вы, вероятно, заметили в самом начале работы с библиотекой, dhtmlxScheduler — это статический объект, то есть _только один экземпляр_ dhtmlxScheduler может существовать на странице.

Теперь, для версии PRO, следует переформулировать это утверждение и сказать: _более чем один экземпляр_ dhtmlxScheduler может существовать на странице. У вас по-прежнему есть один экземпляр Scheduler по умолчанию, который доступен через глобальный объект **scheduler**, но вы также можете создавать новые экземпляры Scheduler.

## Конфигурация экземпляра Scheduler

Чтобы создать новый экземпляр dhtmlxScheduler, используйте метод **Scheduler.getSchedulerInstance()**:

~~~js
// Обратите внимание, что 'Scheduler' начинается с заглавной буквы
const scheduler = Scheduler.getSchedulerInstance();
~~~

Метод может принимать объект конфигурации в качестве параметра:

~~~js
const scheduler = Scheduler.getSchedulerInstance({
    plugins: {
        recurring: true,
    },
    container: "scheduler_here",
    config: {
        hour_date: "%h:%i",
        details_on_create: true
    },
    data: {
        events: [
            { id:1, start_date: "2027-04-18 09:00", end_date: "2027-04-18 12:00", 
                text:"English lesson", subject: 'english' },
            { id:2, start_date: "2027-04-20 10:00", end_date: "2027-04-21 16:00", 
                text:"Math exam", subject: 'math' },
            { id:3, start_date: "2027-04-21 10:00", end_date: "2027-04-21 14:00", 
                text:"Science lesson", subject: 'science' },
            { id:4, start_date: "2027-04-23 16:00", end_date: "2027-04-23 17:00", 
                text:"English lesson", subject: 'english' },
            { id:5, start_date: "2027-04-22 09:00", end_date: "2027-04-22 17:00", 
                text:"Usual event" }
        ]
    }
});
~~~

Объект config может содержать следующие свойства:

- **container** - (*string|HTMLElement*) HTML-контейнер (или его id), в котором будет отображаться Scheduler. Если не указан, Scheduler будет инициализирован без контейнера.
- **config** - (*object*) объект с настройками конфигурации Scheduler
- **xy** - (*object*) объект с [размерами элементов Scheduler](api/other/xy.md)
- **templates** - (*object*) объект с шаблонами
- **events** - (*object*) объект с обработчиками событий.

Необходимо использовать следующий формат при указании обработчиков событий для нового экземпляра Scheduler:

~~~js
const scheduler = Scheduler.getSchedulerInstance({
    events: {
        onEventCreated: function(id, e){
            const task = scheduler.getEvent(id);
            task.owner = null;
            return true;
        },
        onClick: function(id, e){
            alert(scheduler.getEvent(id).text);
            return true;
        }
    }
});
~~~

- **data** - (*object|string*) объект с данными для загрузки или URL, по которому нужно загрузить данные
- **plugins** - (*object*) расширения, которые нужно активировать
- **locale** - (*string|object*) двухбуквенный код языка или объект локали, который нужно активировать

**Примечание**, что вызов метода **Scheduler.getSchedulerInstance()** без параметров вернет объект Scheduler с настройками конфигурации по умолчанию. Поэтому вам нужно настроить ваш новый экземпляр, инициализировать его и заполнить данными обычным образом.

Рассмотрим простой пример: 2 Scheduler, один под другим:

~~~js
window.addEventListener("DOMContentLoaded", function(){
    const scheduler1  = Scheduler.getSchedulerInstance();
    scheduler1.init('scheduler_here',new Date(2027,5,30),"week");
    scheduler1.load("/data/events")
    
    const scheduler2 = Scheduler.getSchedulerInstance();
    scheduler2.init('scheduler_here_2',new Date(2027,5,30),"month");
    scheduler2.load("/data/events")    
)};

<body>
    <div id="scheduler_here" style="width:100%; height: 50%;"></div>
    <div id="scheduler_here_2" style="width:100%; height: 50%;"></div>    
</body>
~~~

## Деструктор экземпляров Scheduler и DataProcessor

Начиная с версии 6.0, объект dhtmlxScheduler имеет [деструктор](api/method/destructor.md), который можно использовать для уничтожения неиспользуемых экземпляров Scheduler.

Деструктор экземпляра Scheduler можно использовать так:

~~~js
const myScheduler = Scheduler.getSchedulerInstance();
 
//уничтожение экземпляра scheduler
myScheduler.destructor();
~~~

Деструктор реализует следующие задачи:

- очистка данных, загруженных в экземпляр scheduler
- уничтожение dataProcessor (если он привязан к scheduler)
- отсоединение scheduler от DOM
- отсоединение всех обработчиков DOM, привязанных через метод [scheduler.event()](api/method/event.md)

### Использование деструктора с Angular

Ниже приведён пример использования деструктора для освобождения экземпляра scheduler при работе с фреймворком Angular:

~~~js
@Component({selector: 'app-scheduler', template: `...`})
class MySchedulerComponent implements OnDestroy {
  ngOnInit() {
     this.$gantt = Scheduler.getSchedulerInstance();

     // сконфигурировать и инициализировать
  }
  
  ngOnDestroy() {
     this.$scheduler.destructor();
     this.$scheduler = null;
  }
}
~~~

### Отсоединение dataProcessor

Вызов деструктора dataProcessor очистит экземпляр dataProcessor и отсоединит его от Scheduler. Например:

~~~js
const scheduler = Scheduler.getSchedulerInstance();
const dp = new scheduler.DataProcessor("url");
dp.init(scheduler);

// уничтожает data processor и отсоединяет его от Scheduler
dp.destructor();
~~~

:::note
Если вы используете пакет, который не поддерживает несколько экземпляров планировщика (например, GPL или Commercial издания), вызов деструктора планировщика сделает планировщик недоступным до перезагрузки страницы.
:::

