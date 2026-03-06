---
title: "Пользовательский цвет события"
sidebar_label: "Пользовательский цвет события"
---

# Пользовательский цвет события

Существует три способа настроить цвет события:

1. [Указание цветовых значений непосредственно в свойствах объекта события](guides/custom-events-color.md#specifyingcolorsinpropertiesoftheeventobject);
2. [Добавление дополнительных CSS-классов к событию](guides/custom-events-color.md#attachingadditionalcssclassestoanevent);
3. [Динамическая генерация стилей из данных](guides/custom-events-color.md#loadingcolorswithdata).

![custom_event_color](/img/custom_event_color.png)

## Указание цветов в свойствах объекта события {#specifyingcolorsinpropertiesoftheeventobject}

Чтобы назначить пользовательский цвет событию, просто добавьте одно или оба из следующих свойств в объект данных события:

- **textColor** - задаёт цвет шрифта события;
- **color** - задаёт цвет фона события.

![custom_color_model](/img/custom_color_model.png)

~~~js title="Установка цвета события в объекте данных"
scheduler.parse([
   {id:1, start_date:"2019-05-21",end_date:"2019-05-25",text:"Task1", color:"red"},
   {id:2, start_date:"2019-06-02",end_date:"2019-06-05",text:"Task2", color:"blue"}
],"json");
...
scheduler.getEvent(1).color = "yellow";
scheduler.updateEvent(1);
~~~

Имейте в виду, что это специальные свойства. Планировщик автоматически проверяет их и применяет указанные цвета к контейнеру и тексту события. Если они отсутствуют, используются цвета по умолчанию.

Эти свойства поддерживают любые допустимые CSS-форматы цвета, например:

~~~js
ev.color = "#FF0000";
ev.color = "red";
ev.color = "rgb(255,0,0)";
~~~

## Добавление дополнительных CSS-классов к событию {#attachingadditionalcssclassestoanevent}

Другой способ задать цвет события - добавить к нему пользовательский CSS-класс или классы.

### Методика

Вы можете применить CSS-класс к событию, используя шаблон [event_class](api/template/event_class.md).


По умолчанию шаблон выглядит так:

~~~js
scheduler.templates.event_class = function(start, end, ev){
     return "";
}
~~~
*Эта функция возвращает строку, которая будет добавлена к атрибуту class события, поэтому вы можете возвращать разные классы в зависимости от состояния события.*


[Coloring events](https://docs.dhtmlx.com/scheduler/samples/02_customization/01_events_coloring.html)


### Пример

Предположим, вы хотите окрашивать события по-разному в зависимости от того, относятся ли они к менеджерам или сотрудникам: зелёный для менеджеров и оранжевый для сотрудников. Вот как это сделать:

1. Добавьте дополнительное свойство в вашу модель данных, например 'type', которое будет содержать тип пользователя: 'manager' или 'employee'. 

 ![extended_data_model](/img/extended_data_model.png)
2. Создайте CSS-классы, соответствующие этим типам, например 'manager_event' и 'employee_event'. CSS может выглядеть так:

 


~~~js title="Переопределение стандартных CSS-классов"
~~~html
<style>
  .manager_event {
        --dhx-scheduler-event-background: #009966;
        --dhx-scheduler-event-color: black;
  }

  .employee_event {
        --dhx-scheduler-event-background: #FF9933;
        --dhx-scheduler-event-color: black;
  }
</style>
~~~

Для версий Scheduler 6.0 и ниже, которые не поддерживают CSS-переменные, используйте такие стили:

~~~html
<style>
  /* событие в дневном или недельном виде */
  .dhx_cal_event.manager_event div{
  background-color: #009966 !important;
  color: black !important;
  }
  .dhx_cal_event.employee_event div{
  background-color: #FF9933 !important;
  color: black !important;
  }
 
  /* многодневное событие в месячном виде */
  .dhx_cal_event_line.manager_event{
  background-color: #009966 !important;
  color: black !important;
  }
  .dhx_cal_event_line.employee_event{
  background-color: #FF9933 !important;
  color: black !important;
  }

  /* событие с фиксированным временем в месячном виде */
  .dhx_cal_event_clear.manager_event{
  color: black !important;
  }
  .dhx_cal_event_clear.employee_event{
  color: black !important;
  }
</style>
~~~
3. Наконец, переопределите шаблон [event_class](api/template/event_class.md) для назначения классов:

 


~~~js title="Применение дополнительных CSS-классов к событиям:"
scheduler.templates.event_class = function (start, end, event) {
  if (event.type == 'manager') return "manager_event";
  return "employee_event"; 
};
~~~


[Coloring events](https://docs.dhtmlx.com/scheduler/samples/02_customization/01_events_coloring.html)


[Styling events with templates](https://docs.dhtmlx.com/scheduler/samples/02_customization/06_templates.html)


## Загрузка цветов из данных {#loadingcolorswithdata}

Когда цвета приходят из данных backend — например, когда цвета задач зависят от этапов или назначенных ресурсов и не могут быть жёстко заданы — вы можете генерировать стили динамически из данных.

Допустим, у вас есть список пользователей, назначенных на задачи, и стили задач зависят от свойств пользователя:

~~~js
[
  {"key":1, "label":"John", "backgroundColor":"#03A9F4", "textColor":"#FFF"},
  {"key":2, "label":"Mike", "backgroundColor":"#f57730", "textColor":"#FFF"},
  {"key":3, "label":"Anna", "backgroundColor":"#e157de", "textColor":"#FFF"},
  {"key":4, "label":"Bill", "backgroundColor":"#78909C", "textColor":"#FFF"},
  {"key":7, "label":"Floe", "backgroundColor":"#8D6E63", "textColor":"#FFF"}
]
~~~

В этом случае пользователи и их цвета управляются отдельно от планировщика, который заранее не знает ни идентификаторов пользователей, ни их цветов.

Практический подход:

- Определите именованный serverList для этой коллекции:

~~~js
scheduler.serverList("people");
~~~

- Загрузите эти опции на страницу, используя один из поддерживаемых [форматов данных](guides/data-formats.md#json-with-collections) или через собственный XHR-запрос.

- После загрузки динамически сгенерируйте CSS-стили из данных:

~~~js
scheduler.attachEvent("onLoadEnd", function(){
  // используйте уникальный ID для style-элемента
  var styleId = "dynamicSchedulerStyles";
 
  // повторно используйте style-элемент, если он уже существует
 
  var element = document.getElementById(styleId);
  if(!element){
  element = document.createElement("style");
  element.id = styleId;
  document.querySelector("head").appendChild(element);
  }
  var html = [];
  var resources = scheduler.serverList("people");
 
  // создайте CSS-правила для каждого пользователя и вставьте их в style-элемент
 
  resources.forEach(function(r){
        html.push(`.event_resource_${r.key} {
            --dhx-scheduler-event-background:${r.backgroundColor};
            --dhx-scheduler-event-color:${r.textColor};
        }`);
  });
  element.innerHTML = html.join("");
});
~~~

- Затем назначьте сгенерированные классы в шаблоне event_class:

~~~js
scheduler.templates.event_class = function (start, end, event) {
  var css = [];
 
  if(event.owner_id){
  css.push("event_resource_" + event.owner_id);
  }
 
  return css.join(" ");
};
~~~
