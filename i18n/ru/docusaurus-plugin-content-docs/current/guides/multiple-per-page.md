---
title: "Создание нескольких планировщиков на странице"
sidebar_label: "Создание нескольких планировщиков на странице"
---

# Создание нескольких планировщиков на странице

:::info
Эта функциональность доступна в версии Scheduler PRO (Commercial (с 6 октября 2021 года), лицензии Enterprise и Ultimate) только.
:::

Как, скорее всего, вы заметили в начале работы с библиотекой, dhtmlxScheduler — статический объект, т.е. _только один экземпляр_ dhtmlxScheduler может существовать на странице.

Теперь, для версии PRO, мы должны переформулировать это утверждение и сказать: _более чем один экземпляр_ dhtmlxScheduler может существовать на странице. У вас по-прежнему есть один экземпляр планировщика по умолчанию, доступ к которому осуществляется через глобальный объект **scheduler**, но вы также можете создавать новые экземпляры планировщика.

## Конфигурация экземпляра Scheduler

Чтобы создать новый экземпляр dhtmlxScheduler, используйте метод `Scheduler.getSchedulerInstance()`:

~~~js
// Обратите внимание, в команде 'Scheduler' пишется с заглавной буквой
const scheduler = Scheduler.getSchedulerInstance();
~~~

Метод может принимать в качестве параметра объект конфигурации:

~~~js
const scheduler = Scheduler.getSchedulerInstance({
    plugins: {
        recurring: true
    },
    container: "scheduler_here",
    config: {
        hour_date: "%h:%i",
        details_on_create: true
    },
    data: {
        events: [
            { id: 1, start_date: "2027-04-18 09:00", end_date: "2027-04-18 12:00", text: "English lesson", subject: 'english' },
            { id: 2, start_date: "2027-04-20 10:00", end_date: "2027-04-21 16:00", text: "Math exam", subject: 'math' },
            { id: 3, start_date: "2027-04-21 10:00", end_date: "2027-04-21 14:00", text: "Science lesson", subject: 'science' },
            { id: 4, start_date: "2027-04-23 16:00", end_date: "2027-04-23 17:00", text: "English lesson", subject: 'english' },
            { id: 5, start_date: "2027-04-22 09:00", end_date: "2027-04-22 17:00", text: "Usual event" }
        ]
    }
});
~~~

Объект конфигурации может содержать следующие свойства:

- `container` - (*string|HTMLElement*) HTML-контейнер (или его id), в который будет отображаться Scheduler. Если не указан, Scheduler будет инициализирован без контейнера
- `config` - (*object*) объект с настройками конфигурации Scheduler
- `xy` - (*object*) объект с [размерами элементов Scheduler](api/other/xy.md)
- `templates` - (*object*) объект с шаблонами
- `events` - (*object*) объект с обработчиками событий

При указании обработчиков для нового экземпляра Scheduler используйте следующий формат:

~~~js
const scheduler = Scheduler.getSchedulerInstance({
    events: {
        onEventCreated: (id) => {
            const createdEvent = scheduler.getEvent(id);
            createdEvent.owner = null;
            return true;
        },
        onClick: (id) => {
            alert(scheduler.getEvent(id).text);
            return true;
        }
    }
});
~~~

- `data` - (*object|string*) объект с данными для загрузки или URL-адрес, с которого загрузить данные
- `plugins` - (*object*) расширения, которые необходимо активировать
- `locale` - (*string|object*) двухсимвольный код языка или объект локали, которую нужно активировать

**Примечание**, вызов метода `Scheduler.getSchedulerInstance()` без параметров вернет объект планировщика с настройками конфигурации по умолчанию. Поэтому вам нужно настроить ваш новый экземпляр, инициализировать его и заполнить данными, как обычно.

Давайте рассмотрим простой пример: 2 планировщика, один под другим:

~~~js
window.addEventListener("DOMContentLoaded", () => {
    const firstScheduler = Scheduler.getSchedulerInstance();
    firstScheduler.init("scheduler_here", new Date(2027, 5, 30), "week");
    firstScheduler.load("/data/events");

    const secondScheduler = Scheduler.getSchedulerInstance();
    secondScheduler.init("scheduler_here_2", new Date(2027, 5, 30), "month");
    secondScheduler.load("/data/events");
});
~~~

~~~html
<body>
    <div id="scheduler_here" style="width:100%; height: 50%;"></div>
    <div id="scheduler_here_2" style="width:100%; height: 50%;"></div>
</body>
~~~

## Уничтожение экземпляров Scheduler и DataProcessor

Начиная с версии 6.0, объект dhtmlxScheduler имеет метод [`destructor()`](api/method/destructor.md), который можно использовать для удаления ненужных экземпляров Scheduler.

Экземпляр планировщика можно уничтожить следующим образом:

~~~js
const schedulerInstance = Scheduler.getSchedulerInstance();

// уничтожение экземпляра Scheduler
schedulerInstance.destructor();
~~~

Деструктор выполняет следующие задачи:

- очистить данные, загруженные в экземпляр планировщика
- удалить dataProcessor (если он подключен к планировщику)
- отсоединить планировщик от DOM
- отсоединить все DOM-события, привязанные через метод [scheduler.event()](api/method/event.md)

### Использование деструктора с Angular

Пример использования деструктора для уничтожения экземпляра планировщика при работе с фреймворком Angular:

~~~js
@Component({selector: 'app-scheduler', template: `...`})
class MySchedulerComponent implements OnDestroy {
    ngOnInit() {
        this.$scheduler = Scheduler.getSchedulerInstance();

        // конфигурация и инициализация
    }

    ngOnDestroy() {
        this.$scheduler.destructor();
        this.$scheduler = null;
    }
}
~~~

### Отсоединение dataProcessor

Вызов деструктора dataProcessor очистит экземпляр dataProcessor и отделит его от Scheduler. Например:

~~~js
const schedulerInstance = Scheduler.getSchedulerInstance();
const dataProcessor = schedulerInstance.createDataProcessor({
    url: "url",
    mode: "REST"
});

// уничтожает dataProcessor и отсоединяет его от Scheduler
dataProcessor.destructor();
~~~

:::note
Если вы используете пакет, который не позволяет создавать несколько экземпляров объекта scheduler (GPL или коммерческие версии), вызов деструктора планировщика сделает планировщик недоступным до перезагрузки страницы.
:::