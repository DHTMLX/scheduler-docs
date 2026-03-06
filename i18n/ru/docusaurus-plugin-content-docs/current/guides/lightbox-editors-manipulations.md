---
title: "Манипуляции с Lightbox"
sidebar_label: "Манипуляции с Lightbox"
---

# Манипуляции с Lightbox

## Получение/установка значения элемента управления {#gettingsettingthecontrolvalue}

Чтобы получить или изменить значение контрола секции, используйте объект [formSection](api/method/formsection.md) следующим образом:

~~~js
// получить значение
var value = scheduler.formSection('description').getValue();

// установить значение
scheduler.formSection('description').setValue('abc');
~~~


[Setting/getting values of lightbox's controls](https://docs.dhtmlx.com/scheduler/samples/02_customization/22_opertions_with_lightbox.html)


## Открытие lightbox по одному клику {#openingthelightboxonasingleclick}

Вы можете настроить открытие lightbox по одному клику. Для этого используйте событие [onClick](api/event/onclick.md) вместе с методом [showLightbox](api/method/showlightbox.md):

~~~js
scheduler.attachEvent("onClick", function (id, e){
    scheduler.showLightbox(id);
    return true;
});
~~~

**Related sample** [Opening the lightbox on one click](https://snippet.dhtmlx.com/5/50e639d2a)

С такой настройкой при клике левой кнопкой мыши по блоку события откроется lightbox.

## Проверка, открыт ли lightbox {#checkingwhetherthelightboxisopened}

Чтобы узнать, открыт ли сейчас lightbox, проверьте свойство **lightbox_id** из объекта состояния, возвращаемого методом [getState](api/method/getstate.md). 
Если lightbox открыт, будет возвращён id события в lightbox; если нет - 'null' или 'undefined':

~~~js
if (scheduler.getState().lightbox_id){
    // обработка случая, когда lightbox открыт
} else {
    // обработка случая, когда lightbox закрыт
}
~~~

## Связывание свойств объекта события с секциями lightbox {#mapping-properties-of-an-event-object-to-the-lightbox-sections}

Чтобы связать свойство объекта события с секцией lightbox, выполните следующие шаги:

- Убедитесь, что ваш источник данных предоставляет события в [поддерживаемом формате](guides/data-formats.md)

~~~js
{ 
   "data":[
      {
          "id":"1",
          "start_date":"2019-03-02 00:00:00",
          "end_date":"2019-03-04 00:00:00",
          "text":"Graduation ceremony",
          "type":"1",
          "location":"London"
      },
      ...
   ]                                       
}
~~~

Обратите внимание, что все свойства, возвращаемые вашим источником данных, добавляются к объектам событий и доступны через [клиентский API](guides/event-object-operations.md).

- Чтобы связать контрол lightbox с определённым свойством, укажите свойство **map_to** секции с именем свойства события:

~~~js
scheduler.config.lightbox.sections="["
    {name:"description", height:70, map_to:"text", type:"textarea" , focus:true},
    {name:"locationInput", height:35, map_to:"location", type:"textarea" },
    {name:"typeSelect", map_to:"type", type:"select", options:scheduler.serverList("types")},
    {name:"time", type:"time", map_to:"auto"}
];
~~~

[time](guides/time.md) и [recurring](guides/recurring-events.md#recurringlightbox) контролы являются исключениями, так как всегда связаны с фиксированными свойствами (**event.start_date/event.end_date** и **event.rec_type/event.event_length/event.event_pid** соответственно).

## Автоматическая дата окончания в контроле Time {#automatic-end-date-in-the-time-control}

Чтобы задать стандартную длительность события и автоматически обновлять дату окончания для сохранения этой длительности, настройте следующие параметры:

~~~js
// укажите длительность события в минутах для параметра auto_end_time
scheduler.config.event_duration = 60; 
scheduler.config.auto_end_date = true;
~~~


[Automatic end date](https://docs.dhtmlx.com/scheduler/samples/02_customization/11_auto_end_date.html)


Теперь, когда пользователь изменяет время или дату начала события в lightbox, время и дата окончания будут автоматически подстраиваться так, чтобы длительность события оставалась 60 минут (как указано в опции [event_duration](api/config/event_duration.md)).

## Установка значения по умолчанию для контрола lightbox {#setting-the-default-value-for-a-lightboxs-control}

Чтобы задать значение по умолчанию для секции lightbox, используйте свойство **default_value** этой секции.

Например, если добавлена пользовательская секция для местоположения события с именем 'Location', по умолчанию она будет пустой при создании нового события. Чтобы по умолчанию отображался определённый адрес (например, Гринвичская обсерватория), настройте lightbox так:

~~~js
scheduler.config.lightbox.sections = [
    { name:"description", height:50, map_to:"text", type:"textarea", focus:true },
    { name:"location", height:43, map_to:"event_location", type:"textarea", 
    default_value:"Blackheath Avenue London,Greenwich,Greater London SE10 8XJ,UK"},
    { name:"time", height:72, type:"time", map_to:"auto"}
];
~~~

Обратите внимание, что **default_value** задаёт стандартное содержимое только для секции lightbox, а не для нового события. Это означает, что новое событие получит это значение только после открытия lightbox и сохранения события.

Чтобы присвоить значение по умолчанию непосредственно при создании новых событий, используйте событие [onEventCreated](api/event/oneventcreated.md):

~~~js
scheduler.attachEvent("onEventCreated", function(id,e){
    scheduler.getEvent(id).location = 'Blackheath Avenue London, Greenwich...';
    scheduler.updateEvent(id); // отрисовка обновлённого события
    return true;
});
~~~

## Изменение порядка и удаление селекторов даты и времени {#changingtheorderofdatetimecontrolsandremovingtimeselectors}

Вы можете изменить порядок или убрать элементы управления датой и временем в секции 'Период времени', установив свойство **time_format**:

~~~js
scheduler.config.lightbox.sections="["
  {name:"description", height:130, map_to:"text", type:"textarea" , focus:true},
  {name:"time", ..., time_format:["%H:%i","%m","%d","%Y"]}
];
~~~

:::note
Обратите внимание, что это изменяет только порядок элементов в массиве, но не формат отображения данных.
:::

Например, вы можете настроить формат так:

~~~js
// по умолчанию
time_format:["%H:%i", "%m", "%d", "%Y"] 
// сначала месяц
time_format:["%m","%d", "%Y", "%H:%i"]
// без выбора года
time_format:["%H:%i", "%m", "%d"]
// некорректное использование
time_format:["%H:%i", "%M", "%d", "%Y"] // "%m" ошибочно заменено на "%M"
~~~

## Режим только для чтения {#readonlymode}

Подробнее о режиме только для чтения читайте в разделе [Режим только для чтения](guides/readonly.md).

## Скрытие секции для некоторых событий {#makingasectionhiddenforsomeevents}

Чтобы скрыть секцию для определённых событий, переопределите её метод **set_value** следующим образом:


~~~js
scheduler.form_blocks.textarea.set_value="function(node,value,ev){"
    node.firstChild.value="value||""";
    var style = ev.some_property?"":"none";
    node.style.display="style;" // область редактора
    node.previousSibling.style.display="style;" // заголовок секции
    scheduler.setLightboxSize(); // скорректировать размер lightbox
}
~~~

### Опция "Событие на весь день"

Чтобы включить опцию "событие на весь день" в lightbox, установите опцию [full_day](api/config/full_day.md) в *true*:

~~~js
scheduler.config.full_day  = true;
~~~

После этого флажок **Full Day** появится слева в секции **Time period**. При его выборе все поля ввода в этой секции станут неактивными, а длительность события будет установлена на весь день - с **0:00 AM** выбранной даты до **0:00 AM** следующего дня.


[Full day events](https://docs.dhtmlx.com/scheduler/samples/02_customization/12_full_day_event.html)


## Типы lightbox {#linkingselectcontrols}

Lightbox доступен в двух стилях:

- Стандартный (широкий);
- Короткий.

В скине по умолчанию доступен только стандартный (широкий) lightbox, а скины 'glossy' или 'classic' позволяют выбрать между двумя вариантами.

Для выбора нужного типа используйте свойство [wide_form](api/config/wide_form.md):

~~~js
scheduler.config.wide_form = true;
~~~


**Стандартный (широкий) lightbox**:

![scheduler_wide_form.png](/img/scheduler_wide_form.png)

**Короткая форма**:

![scheduler_standard_form.png](/img/scheduler_standard_form.png)


### Кнопка в заголовке секции

Вы можете добавить пользовательскую кнопку в заголовок секции следующим образом:

- Добавьте свойство 'button' в объект секции:

~~~js
{name:"description", height:130, map_to:"text", type:"textarea", button:"help"}
~~~

- Определите надпись для кнопки:

~~~js
// 'help' соответствует значению свойства 'button'
scheduler.locale.labels.button_help = "Help label";
~~~

- Укажите обработчик нажатия на кнопку:

~~~
scheduler.form_blocks.textarea.button_click="function(index,button,shead,sbody){"
    // ваш код
}
~~~

Здесь:

- **index** - (*number*) индекс секции, начиная с нуля
- **button** - (*HTMLElement*) элемент кнопки
- **shead** - (*HTMLElement*) элемент заголовка секции
- **sbody** - (*HTMLElement*) элемент тела секции


Вы можете изменить изображение кнопки с помощью этого CSS-класса:

~~~js
.dhx_custom_button_help{
    background-image:url(imgs/but_help.gif);
}
~~~

## Связывание select-контролов {#linkingselectcontrols}

Select-контролы в lightbox можно сделать зависимыми друг от друга. Для этого используйте [onchange property](guides/select.md#properties) select-контрола, как показано ниже:

~~~js
var update_select_options = function(select, options) { // вспомогательная функция
    select.options.length = 0;
    for (var i="0;" i<options.length; i++) {
        var option = options[i];
        select[i] = new Option(option.label, option.key);
    }
};

var parent_onchange = function(event) {
    var new_child_options = child_select_options[this.value];
    update_select_options(scheduler.formSection('child').control, new_child_options);
};
scheduler.attachEvent("onBeforeLightbox", function(id){
    var ev = scheduler.getEvent(id);
    if (!ev.child_id) {
        var parent_id = ev.parent_id||parent_select_options[0].key;
        var new_child_options = child_select_options[parent_id];
        update_select_options(
            scheduler.formSection('child').control, new_child_options
        );
    }
    return true;
});

scheduler.config.lightbox.sections="["
    ...
    {name:"parent", height:23, type:"select", options: parent_select_options, 
     map_to:"parent_id", onchange:parent_onchange },
    {name:"child", height:23, type:"select", options: child_select_options, 
     map_to:"child_id" }
    ...
];
~~~


[Linking select controls in the lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/26_linked_selects_in_lightbox.html)


![linking_controls](/img/linking_controls.png)

Событие <b>onchange</b> срабатывает при выборе пользователем другого значения в родительской секции и обновляет опции дочерней секции.

## Динамическое изменение секций lightbox {#dynamic-changing-of-the-lightbox-sections}

Возможно изменять секции lightbox "на лету". Это значит, что вы можете скрывать, блокировать или показывать различные секции lightbox в зависимости от заданной конфигурации.

Для этого используйте метод [resetLightbox()](api/method/resetlightbox.md). Пример:

1. Сначала создайте два массива, определяющие разные наборы контролов для lightbox.

~~~js
var full_lightbox = [
    { name: "description", height: 200, map_to: "text", type: "textarea", focus: true},
    { name: "hidden", height: 23, map_to: "hidden", type: "textarea"},
    { name: "time", height: 72, type: "time", map_to: "auto"}
];
var restricted_lightbox = [
    { name: "description", height: 200, map_to: "text", type: "textarea", focus: true},
    { name: "time", height: 72, type: "time", map_to: "auto"}
];
~~~

2. Далее реализуйте следующее:

- Перед открытием нового lightbox вызовите метод <b>resetLightbox()</b> для очистки текущих контролов и создания нового lightbox с нужным набором секций.

- Получите объект события по его id и определите условие, по которому будет выбрана нужная конфигурация lightbox. В примере ниже используется атрибут "restricted".

~~~js
scheduler.attachEvent("onBeforeLightbox", function(event_id) {
    scheduler.resetLightbox();
    var ev = scheduler.getEvent(event_id);
    scheduler.config.lightbox.sections = (ev.restricted) ?
        restricted_lightbox : full_lightbox;
    return true;
});
~~~

3. Свойство 'restricted' события определяет, будет ли использоваться конфигурация "restricted_lightbox". Если оно не задано, будет показан полный lightbox.

~~~js
scheduler.init('scheduler_here', new Date(2017, 5, 30), "week");
scheduler.parse([
    { start_date: "2017-06-27 04:00", end_date: "2017-06-27 7:00", 
        text: "Restricted event", hidden: "You won't see me", restricted: true },
    { start_date: "2017-06-29 05:00", end_date: "2017-06-29 11:00", 
        text: "Full access", hidden: "Hidden text" }
]);
~~~

![dinamicchanges_lightbox](/img/dinamicchanges_lightbox.png)


[Dynamic changing of lightbox configurations](https://docs.dhtmlx.com/scheduler/samples/02_customization/29_changing_lightbox_configurations.html)
