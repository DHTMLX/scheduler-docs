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

Если цвета являются частью данных, поступающих из бэкенда, например когда цвет задачи связан с этапом или ресурсом, назначенным задаче и которые не могут быть зашиты непосредственно на странице, возможно распространить решение — генерировать стили из ваших данных вручную.

Предположим, у вас есть следующая коллекция пользователей, которых можно назначать на задачи. Стиль задач должен задаваться свойствами записей пользователей:

~~~js
[
    {"key":1, "label":"John", "backgroundColor":"#03A9F4", "textColor":"#FFF"},
    {"key":2, "label":"Mike", "backgroundColor":"#f57730", "textColor":"#FFF"},
    {"key":3, "label":"Anna", "backgroundColor":"#e157de", "textColor":"#FFF"},
    {"key":4, "label":"Bill", "backgroundColor":"#78909C", "textColor":"#FFF"},
    {"key":7, "label":"Floe", "backgroundColor":"#8D6E63", "textColor":"#FFF"}
]
~~~

В этом случае пользователи и их цвета создаются и управляются разными частями приложения, и scheduler обычно не знает идентификаторы пользователей и их цвета заранее.

Вот что можно сделать в этом случае:

- Определите именованный serverList для этой коллекции

~~~js
scheduler.serverList("people");
~~~

- Загрузите варианты на страницу, используя один из поддерживаемых [data formats](guides/data-formats.md#json-with-collections) или вручную через собственный xhr

- Как только варианты загружены, можно генерировать CSS‑стили из данных:

~~~js
scheduler.attachEvent("onLoadEnd", function(){
    // используйте произвольный идентификатор для элемента стилей
    const styleId = "dynamicSchedulerStyles";
 
    // если вы будете повторно загружать варианты с цветами - повторно используйте ранее
    // созданный элемент стилей
 
    let element = document.getElementById(styleId);
    if(!element){
        element = document.createElement("style");
        element.id = styleId;
        document.querySelector("head").appendChild(element);
    }
    let html = [];
    const resources = scheduler.serverList("people");
 
    // сгенерируйте стили CSS для каждой опции и запишите CSS в элемент стилей,
 
    resources.forEach(function(r){
        html.push(`.event_resource_${r.key} {
            --dhx-scheduler-event-background:${r.backgroundColor};
            --dhx-scheduler-event-color:${r.textColor};
        }`);
    });
    element.innerHTML = html.join("");
});
~~~

- После этого вы сможете присвоить связанные классы, которые вы сгенерировали из шаблона класса:

~~~js
scheduler.templates.event_class = function (start, end, event) {
    let css = [];
 
    if(task.owner_id){
        css.push("event_resource_" + event.owner_id);
    }
 
    return css.join(" ");
};
~~~