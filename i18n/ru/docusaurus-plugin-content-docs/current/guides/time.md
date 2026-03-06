---
title: "Время и дата"
sidebar_label: "Время и дата"
---

# Время и дата

В этом разделе представлены два селектора даты, предназначенных для выбора определённого временного диапазона.

![time_editor](/img/time_editor.png)

~~~js
scheduler.locale.labels.section_time = 'Time period';

scheduler.config.lightbox.sections = [
    { name:"text", height:50, map_to:"text", type:"textarea", focus:true },
    { name:"time", height:72, type:"time", map_to:"auto"}
];
~~~


[Basic initialization](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/01_basic_init.html)


## Свойства {#properties}

Ниже приведены основные свойства, которые часто используются с контролом 'time' (полный список смотрите [здесь](api/config/lightbox.md)):

<table class="webixdoc_links">
  <tbody>
  <tr>
  <td class="webixdoc_links0"><b>name</b></td>
  <td>(<i>string</i>) имя секции</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>height</b></td>
  <td>(<i>number</i>) высота секции</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>map_to</b></td>
  <td>(<i>string</i>) имя свойства данных, к которому привязана секция</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>type</b></td>
  <td>(<i>textarea,time,select,template,multiselect,radio,checkbox,combo</i>) тип контрола, используемого в секции. "time" указывает на контрол выбора даты и времени</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>year_range </b></td>
  <td>(<i>array, number</i>) определяет диапазон для селектора года. Можно задать двумя способами: <b>year_range: [2005, 2025]</b> - охватывает годы с 2005 по 2025 <b>year_range: 10</b> - охватывает диапазон от 10 лет до и после текущего года</td>
  </tr>
  </tbody>
</table>


## Автоматическая дата окончания в контроле Time

Чтобы задать длительность события по умолчанию и автоматически корректировать дату окончания для сохранения этой длительности, используйте настройки [event_duration](api/config/event_duration.md) и [auto_end_date](api/config/auto_end_date.md):

~~~js
// задаёт длительность события в минутах для автоматической корректировки времени окончания
scheduler.config.event_duration = 60; 
scheduler.config.auto_end_date = true;
~~~


[Automatic end date](https://docs.dhtmlx.com/scheduler/samples/02_customization/11_auto_end_date.html)


С такой настройкой при изменении времени или даты начала события в lightbox, дата и время окончания будут автоматически обновляться, чтобы длительность события оставалась равной 60 минутам (как указано в опции [event_duration](api/config/event_duration.md)).


## Порядок селекторов даты и времени

Порядок контролов даты и времени в секции 'Time period' можно изменить, а также удалить некоторые селекторы. Это делается с помощью свойства [time_format](api/config/lightbox.md):

~~~js
scheduler.config.lightbox.sections="["
  {name:"description", height:130, map_to:"text", type:"textarea", focus:true},
  {name:"time", ..., time_format:["%H:%i","%m","%d","%Y"]}
];
~~~

:::note
Обратите внимание, что это меняет только порядок элементов в массиве, но не формат отображения данных. Для изменения формата отображения времени используйте шаблон [time_picker](api/template/time_picker.md).
:::

Примеры различных форматов:

~~~js
//порядок по умолчанию
time_format:["%H:%i", "%m", "%d", "%Y"] 
//сначала месяц
time_format:["%m","%d", "%Y", "%H:%i"]
//селектор года удалён
time_format:["%H:%i", "%m", "%d"]
//некорректный пример
time_format:["%H:%i", "%M", "%d", "%Y"] // "%m" заменён на "%M"
~~~

## Мини-календарь в lightbox {#mini-calendar-in-the-lightbox}

В lightbox можно добавить мини-календарь (селектор даты) для выбора "начала" и "окончания" события.

![in_the_lightbox](/img/in_the_lightbox.png)

Чтобы добавить мини-календарь в lightbox, выполните следующие шаги:


1. Добавьте расширение на страницу:
~~~js
scheduler.plugins({
    minical: true
});
~~~
2. Измените type секции time с time на calendar_time:
~~~js
//настройка lightbox по умолчанию
scheduler.config.lightbox.sections="["
  {name:"description", height:200, map_to:"text", type:"textarea", focus:true},
  {name:"time", height:72, type:"time", map_to:"auto"}
];
//измените type с "time" на "calendar_time"
scheduler.config.lightbox.sections = [
  {name:"description", height:200, map_to:"text", type:"textarea", focus:true},
  {name:"time", height:72, type:"calendar_time", map_to:"auto" }
];
~~~


[Mini calendar in the lightbox](https://docs.dhtmlx.com/scheduler/samples/05_calendar/03_in_form.html)


Для дальнейшей настройки мини-календаря обратитесь к разделу [Mini Calendar Templates](guides/mini-calendar-templates.md).
