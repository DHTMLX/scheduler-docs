--- 
title: "Цвет пользовательского события" 
sidebar_label: "Цвет пользовательского события" 
---

# Цвет пользовательского события

Существует три способа задать произвольный цвет для события:

1. [Установить значения цвета в свойствах объекта события](guides/custom-events-color.md#specifying-colors-in-properties-of-the-event-object);
2. [Применить дополнительные CSS‑классы к событию](guides/custom-events-color.md#attaching-additional-css-classes-to-an-event).
2. [Генерировать стили из данных](guides/custom-events-color.md#loading-colors-with-data).

![custom_event_color](/img/custom_event_color.png)

## Указание цвета в свойствах объекта события

Чтобы задать произвольный цвет для события, достаточно добавить в объект данных два дополнительных свойства (или только одно из них):

- **textColor** - задаёт цвет текста события;
- **color** - задаёт цвет фона события.

![custom_color_model](/img/custom_color_model.png)

Установка цвета события в объекте данных:
~~~js
scheduler.parse([
   {id:1, start_date:"2027-05-21",end_date:"2027-05-25",text:"Task1", color:"red"},
   {id:2, start_date:"2027-06-02",end_date:"2027-06-05",text:"Task2", color:"blue"}
],"json");
...
scheduler.getEvent(1).color = "yellow";
scheduler.updateEvent(1);
~~~

Примечание: это особые свойства. По умолчанию планировщик всегда проверяет наличие таких свойств у события и, если они есть, применяет соответствующие значения к контейнеру события и тексту. В противном случае планировщик использует предопределённые цвета для события.

Свойства могут принимать любое допустимое значение цвета CSS, например, все перечисленные ниже обозначения валидны:

~~~js
ev.color = "#FF0000";
ev.color = "red";
ev.color = "rgb(255,0,0)";
~~~

## Применение дополнительных CSS‑классов к событию
Второй способ окрасить событие — применить к нему дополнительные CSS‑классы.

### Метод

Чтобы применить CSS‑класс к событию, используйте шаблон [event_class](api/template/event_class.md).


Стандартная реализация шаблона:

~~~js
scheduler.templates.event_class = function(start, end, ev){
     return "";
}
~~~
*Функция возвращает строку, которая будет добавлена к классу события. Таким образом, можно возвращать разные классы в зависимости от состояния события.*


[Coloring events](https://docs.dhtmlx.com/scheduler/samples/02_customization/01_events_coloring.html)


### Пример
Предположим, что вы хотите, чтобы события, назначенные менеджерам и сотрудникам, имели разные цвета: для менеджеров — зелёный цвет, для сотрудников — оранжевый. В таком случае нужно выполнить 2 шага:

1. Добавьте в модель дополнительное свойство данных и назовите его, например, 'type'. Это свойство будет хранить тип пользователя: 'manager' или 'employee'. 

 ![extended_data_model](/img/extended_data_model.png)
2. Укажите связанные CSS‑классы для этих типов, например, назвав их 'manager_event' и 'employee_event'. Для таких названий определение CSS будет выглядеть так:

[Redefining the default CSS classes](Redefining the default CSS classes)

~~~html

    .manager_event {
        --dhx-scheduler-event-background: #009966;
        --dhx-scheduler-event-color: black;
    }

    .employee_event {
        --dhx-scheduler-event-background: #FF9933;
        --dhx-scheduler-event-color: black;
    }

~~~

Для более старых версий Scheduler (v6.0 и ранее) CSS‑переменные недоступны, и события можно окрасить следующими стилями:

~~~html

    /*событие в дневном или недельном представлении*/
    .dhx_cal_event.manager_event div{
        background-color: #009966 !important;
        color: black !important;
    }
    .dhx_cal_event.employee_event div{
        background-color: #FF9933 !important;
        color: black !important;
    }
 
    /*многодневное событие в представлении месяца*/
    .dhx_cal_event_line.manager_event{
        background-color: #009966 !important;
        color: black !important;
    }
    .dhx_cal_event_line.employee_event{
        background-color: #FF9933 !important;
        color: black !important;
    }

    /*событие с фиксированным временем, в представлении месяца*/
    .dhx_cal_event_clear.manager_event{
        color: black !important;
    }
    .dhx_cal_event_clear.employee_event{
        color: black !important;
    }

~~~
3. И, наконец, переопределите шаблон [event_class](api/template/event_class.md)

[Applying additional CSS classes to events:](Applying additional CSS classes to events:)
~~~js
scheduler.templates.event_class = function (start, end, event) {
    if (event.type == 'manager') return "manager_event";
    return "employee_event"; 
};
~~~

[Coloring events](https://docs.dhtmlx.com/scheduler/samples/02_customization/01_events_coloring.html)


[Styling events with templates](https://docs.dhtmlx.com/scheduler/samples/02_customization/06_templates.html)


## Загрузка цветов из данных

Если цвета приходят с сервера, используйте группы событий вместо создания таблицы стилей. Коллекция групп может описывать людей, этапы, ресурсы и любые другие категории событий.

~~~js
[
    {"key":1, "label":"John", "color":"#03A9F4", "textColor":"#FFF"},
    {"key":2, "label":"Mike", "color":"#f57730", "textColor":"#FFF"}
]
~~~

Один раз настройте коллекцию и свойство события. Коллекции из JSON можно передать в `parse()`, а для последующих обновлений использовать `updateCollection()`.

~~~js
scheduler.config.event_groups = { list: "people", property: "owner_id" };
scheduler.init("scheduler_here");
scheduler.parse({
    data: [{ id: 1, text: "Task", start_date: "2027-05-21 09:00", end_date: "2027-05-21 10:00", owner_id: 1 }],
    collections: { people: [{ key: 1, label: "John", color: "#03A9F4", textColor: "#FFF" }] }
});

// Replaces colors and labels from a later server response.
scheduler.updateCollection("people", [
    { key: 1, label: "John", color: "#1565c0", textColor: "#fff" }
]);
~~~

Scheduler определяет цвет фона и текста независимо. Сначала используются `color` или `textColor` события, затем CSS-правило с соответствующей переменной события, цвет группы и активная тема. Сохраняйте CSS-правила `event_class`, если оформление зависит не только от значения коллекции.