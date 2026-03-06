---
title: "Создание нескольких планировщиков на странице"
sidebar_label: "Создание нескольких планировщиков на странице"
---

# Создание нескольких планировщиков на странице

:::info
Эта функция доступна только в версии Scheduler PRO (Commercial с 6 октября 2021, Enterprise и Ultimate лицензии).
:::

Изначально при работе с библиотекой вы могли заметить, что dhtmlxScheduler - это статический объект, то есть _только один экземпляр_ dhtmlxScheduler может существовать на странице.

Однако в версии PRO это меняется: теперь _несколько экземпляров_ dhtmlxScheduler могут сосуществовать на одной странице. По-прежнему доступен стандартный экземпляр планировщика через глобальный объект **scheduler**, но вы также можете создавать дополнительные объекты планировщика.

## Конфигурация экземпляра Scheduler {#schedulerinstanceconfiguration}

Чтобы создать новый экземпляр dhtmlxScheduler, используйте метод **Scheduler.getSchedulerInstance()**:

~~~js
// Обратите внимание, что 'Scheduler' начинается с заглавной буквы
const scheduler = Scheduler.getSchedulerInstance();
~~~

Этот метод может принимать объект конфигурации в качестве аргумента:

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
            { id:1, start_date: "2022-04-18 09:00", end_date: "2022-04-18 12:00", 
                text:"English lesson", subject: 'english' },
            { id:2, start_date: "2022-04-20 10:00", end_date: "2022-04-21 16:00", 
                text:"Math exam", subject: 'math' },
            { id:3, start_date: "2022-04-21 10:00", end_date: "2022-04-21 14:00", 
                text:"Science lesson", subject: 'science' },
            { id:4, start_date: "2022-04-23 16:00", end_date: "2022-04-23 17:00", 
                text:"English lesson", subject: 'english' },
            { id:5, start_date: "2022-04-22 09:00", end_date: "2022-04-22 17:00", 
                text:"Usual event" }
        ]
    }
});
~~~

Объект конфигурации может включать следующие свойства:

- **container** - (*string|HTMLElement*) HTML-контейнер (или его id), в котором будет отображаться Scheduler. Если не указано, Scheduler будет инициализирован без контейнера.
- **config** - (*object*) настройки конфигурации Scheduler
- **xy** - (*object*) размеры элементов планировщика, см. [](api/other/xy.md)
- **templates** - (*object*) конфигурация шаблонов
- **events** - (*object*) обработчики событий. 


При указании обработчиков событий для нового экземпляра Scheduler используйте следующий формат:

~~~js
const scheduler = Scheduler.getSchedulerInstance({
    events: {
        onEventCreated: function(id, e){
            var task = scheduler.getEvent(id);
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

- **data** - (*object|string*) данные для загрузки или URL для получения данных
- **plugins** - (*object*) расширения для активации
- **locale** - (*string|object*) двухбуквенный код языка или объект локализации для активации

**Обратите внимание**, что вызов **Scheduler.getSchedulerInstance()** без параметров возвращает объект планировщика с настройками по умолчанию. Вам все равно необходимо сконфигурировать, инициализировать и загрузить данные в новый экземпляр как обычно.

Вот простой пример с двумя планировщиками, расположенными друг под другом:


~~~js
window.addEventListener("DOMContentLoaded", function(){
    var scheduler1  = Scheduler.getSchedulerInstance();
    scheduler1.init('scheduler_here',new Date(2019,5,30),"week");
    scheduler1.load("/data/events");
    
    var scheduler2 = Scheduler.getSchedulerInstance();
    scheduler2.init('scheduler_here_2',new Date(2019,5,30),"month");
    scheduler2.load("/data/events");    
});

<body>
    <div id="scheduler_here"></div>
    <div id="scheduler_here_2"></div>    
</body>
~~~

## Деструктор экземпляров Scheduler и DataProcessor {#destructorofscheduleranddataprocessorinstances}

Начиная с версии 6.0, dhtmlxScheduler предоставляет [destructor](api/method/destructor.md) для удаления ненужных экземпляров Scheduler.

Вы можете использовать деструктор экземпляра планировщика следующим образом:

~~~js
var myScheduler = Scheduler.getSchedulerInstance();
 
// уничтожить экземпляр планировщика
myScheduler.destructor();
~~~

Деструктор выполняет следующие действия:

- очищает данные, загруженные в экземпляр планировщика
- уничтожает dataProcessor, если он был подключён
- отсоединяет планировщик от DOM
- удаляет все DOM-события, добавленные через метод [scheduler.event()](api/method/event.md)

### Использование деструктора с Angular

Вот как можно использовать деструктор для очистки экземпляра планировщика при работе с Angular:

~~~js
@Component({selector: 'app-scheduler', template: `...`})
class MySchedulerComponent implements OnDestroy {
  ngOnInit() {
     this.$gantt = Scheduler.getSchedulerInstance();

     // настройка и инициализация
  }
  
  ngOnDestroy() {
     this.$scheduler.destructor();
     this.$scheduler = null;
  }
}
~~~

### Отсоединение dataProcessor

Вызов деструктора dataProcessor очищает экземпляр и отсоединяет его от планировщика. Например:

~~~js
var scheduler = Scheduler.getSchedulerInstance();
var dp = new scheduler.DataProcessor("url");
dp.init(scheduler);

// уничтожает dataProcessor и отсоединяет его от планировщика
dp.destructor();
~~~

:::note
Если вы используете пакет, который не поддерживает несколько экземпляров планировщика (например, GPL или Commercial издания), вызов деструктора планировщика сделает планировщик недоступным до перезагрузки страницы.
:::

## Связанные статьи


- [Интеграция с dhtmlxLayout](integrations/other/dhxlayout-integration.md)
