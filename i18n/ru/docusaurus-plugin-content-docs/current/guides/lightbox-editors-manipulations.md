---
title: "Манипуляции с Lightbox" 
sidebar_label: "Манипуляции с Lightbox" 
---

# Манипуляции с Lightbox

## Получение/установка значения элемента управления секцией

Чтобы получить/установить значение элемента управления секции, используйте объект [formSection](api/method/formsection.md) как в примере:

~~~js
//чтобы получить значение
const value = scheduler.formSection('description').getValue();

//чтобы установить значение
scheduler.formSection('description').setValue('abc');
~~~

[Установка/получение значений элементов управления Lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/22_opertions_with_lightbox.html)

## Открытие Lightbox одним кликом

Можно открыть существующий Lightbox одним кликом. Для этого используйте событие [onClick](api/event/onclick.md) и метод [showLightbox](api/method/showlightbox.md):

~~~js
scheduler.attachEvent("onClick", function (id, e){
    scheduler.showLightbox(id);
    return true;
});
~~~

**Связанный пример** [Opening the lightbox on one click](https://snippet.dhtmlx.com/5/50e639d2a)

Lightbox откроется, когда пользователь нажмет левую кнопку мыши по области события.

## Проверка того, открыт ли Lightbox

Чтобы проверить, открыт ли Lightbox в данный момент, используйте свойство **lightbox_id** объекта состояния, возвращаемого методом [getState](api/method/getstate.md). 
Если Lightbox открыт, метод вернет id открытого события, в противном случае вернется null или undefined:

~~~js
if (scheduler.getState().lightbox_id){
    //код для открытого Lightbox
} else {
    //код для закрытого Lightbox
}
~~~

## Связывание свойств объекта события с секциями Lightbox

Чтобы связать свойство объекта события с секцией Lightbox, сделайте следующее:

- Убедитесь, что ваш источник данных возвращает события в [поддерживаемом формате](guides/data-formats.md)

~~~js
{ 
   "data":[
      {
          "id":"1",
          "start_date":"2027-03-02 00:00:00",
          "end_date":"2027-03-04 00:00:00",
          "text":"Graduation ceremony",
          "type":"1",
          "location":"London"
      },
      ...
   ]                                       
}
~~~

Примечание: все свойства, возвращаемые вашим источником данных, будут добавлены к объектам событий и будут доступны через [client-side API](guides/event-object-operations.md).

- Чтобы связать элемент управления Lightbox с конкретным свойством, укажите имя свойства события в свойство **map_to** раздела:

~~~js
scheduler.config.lightbox.sections=[
    {name:"description", height:70, map_to:"text", type:"textarea" , focus:true},
    {name:"locationInput", height:35, map_to:"location", type:"textarea" },
    {name:"typeSelect", map_to:"type", type:"select", options:scheduler.serverList("types")},
    {name:"time", type:"time", map_to:"auto"}
];
~~~

Исключения составляют управляющие элементы [time] и [recurring], которые всегда сопоставляются фиксированным свойствам (**event.start_date/event.end_date** и **event.rec_type/event.event_length/event.event_pid** соответственно).

## Автоматическая конечная дата в контроле Time

Чтобы задать начальную продолжительность событий и чтобы конечная дата автоматически изменялась, чтобы сохранить это значение, используйте свойства [event_duration](api/config/event_duration.md) и [auto_end_date](api/config/auto_end_date.md):

~~~js
//укажите длительность события в минутах для параметра auto_end_time
scheduler.config.event_duration = 60; 
scheduler.config.auto_end_date = true;
~~~

[Автоматическая конечная дата](https://docs.dhtmlx.com/scheduler/samples/02_customization/11_auto_end_date.html)

При такой конфигурации каждый раз, когда пользователь изменяет время начала события или дату начала в Lightbox, время/дата окончания события будут изменяться автоматически, чтобы продолжительность события была равна 60 минут (значение опции [event_duration]).

## Установка значения по умолчанию для элемента управления Lightbox

Чтобы задать значение по умолчанию для секции Lightbox, используйте свойство **default_value** объекта секции.

Например, вы добавили на Lightbox пользовательскую секцию, которая отображает место расположения события, и назвали её «Location». При создании нового события поле будет пустым. Чтобы корректировать такое поведение и, скажем, по умолчанию отображать адрес Greenwich Observatory, задайте Lightbox так:

~~~js
scheduler.config.lightbox.sections = [
    { name:"description", height:50, map_to:"text", type:"textarea", focus:true },
    { name:"location", height:43, map_to:"event_location", type:"textarea", 
    default_value:"Blackheath Avenue London,Greenwich,Greater London SE10 8XJ,UK"},
    { name:"time", height:72, type:"time", map_to:"auto"}
];
~~~

Примечание: свойство **default_value** задает значение по умолчанию для секции Lightbox, а не для нового события, то есть новое событие получит указанное значение только после того, как пользователь откроет Lightbox и сохранит событие.

Чтобы установить значение по умолчанию непосредственно для новых событий, используйте событие [onEventCreated](api/event/oneventcreated.md):

~~~js
scheduler.attachEvent("onEventCreated", function(id,e){
    scheduler.getEvent(id).location = 'Blackheath Avenue London, Greenwich...';
    scheduler.updateEvent(id); // отрисовывает обновленное событие
    return true;
});
~~~

## Изменение порядка элементов управления датой и временем и удаление селекторов времени

Есть возможность изменить порядок элементов управления датой и временем в разделе 'Time period' или удалить некоторые из них. Это делается через свойство **time_format**:

~~~js
scheduler.config.lightbox.sections= [
  {name:"description", height:130, map_to:"text", type:"textarea" , focus:true},
  {name:"time", ..., time_format:["%H:%i","%m","%d","%Y"]}
];
~~~

:::note
Примечание: вы не можете изменить формат представления данных, только порядок элементов в массиве.
:::

Например, можно изменить порядок формата следующим образом:

~~~js
//по умолчанию
time_format:["%H:%i", "%m", "%d", "%Y"] 
//месяц стоит в начале
time_format:["%m","%d", "%Y", "%H:%i"]
// селектор года удален
time_format:["%H:%i", "%m", "%d"]
// неверно
time_format:["%H:%i", "%M", "%d", "%Y"] //"%m" изменено на "%M"
~~~

## Режим только для чтения

Подробную информацию о режиме только для чтения смотрите в разделе [Read-only Mode](guides/readonly.md).

## Сделать раздел скрытым для некоторых событий

Чтобы сделать раздел скрытым для конкретных событий, переопределите его метод **set_value**, как в примере:

~~~js
scheduler.form_blocks.textarea.set_value = function(node,value,ev){
    node.firstChild.value= value || "";
    let style = ev.some_property ? "" : "none";
    node.style.display = "style;" // область редактора
    node.previousSibling.style.display = "style;" // заголовок секции
    scheduler.setLightboxSize(); // корректный размер lightbox
}
~~~

### Опция "Событие на весь день"

Чтобы добавить опцию «полный день» в Lightbox, задайте опцию [full_day](api/config/full_day.md) в значение true.
Для этого просто добавьте следующую строку кода:

~~~js
scheduler.config.full_day  = true;
~~~

После включения опции [full_day](api/config/full_day.md) флажок **Full Day** будет отображаться в левой части раздела **Time period**. После выбора все поля раздела будут заблокированы, и длительность события будет считаться как полный день с 0:00 текущей даты клетки до 0:00 следующего дня.

[Полные события на день](https://docs.dhtmlx.com/scheduler/samples/02_customization/12_full_day_event.html)

## Типы Lightbox

Lightbox может быть представлен в одном из двух типов:

- Standard (wide);
- Short.

В стандартной теме Lightbox может быть представлен только в типе стандартного (широкого), тогда как в темах 'glossy' или 'classic' можно выбрать между типами.

Чтобы установить нужный тип, используйте свойство [wide_form](api/config/wide_form.md):

~~~js
scheduler.config.wide_form = true;
~~~

**Standard (wide) Lightbox**:

![scheduler_wide_form.png](/img/scheduler_wide_form.png)

**Short form**:

![scheduler_standard_form.png](/img/scheduler_standard_form.png)

### Кнопка в заголовке секции

Можно добавить на заголовок секции пользовательскую кнопку. Чтобы добавить кнопку в заголовок секции, выполните следующие шаги:

- Укажите свойство 'button' в объекте секции:

~~~js
{name:"description", height:130, map_to:"text", type:"textarea", button:"help"}
~~~

- Укажите подпись к кнопке:

~~~js
// 'help' — значение свойства 'button'
scheduler.locale.labels.button_help = "Help label";
~~~

- Укажите обработчик кликов по кнопке:

~~~js
scheduler.form_blocks.textarea.button_click = function(index,button,shead,sbody){
    // любой пользовательский код
}
~~~

где:

- **index** - (*число*) индекс секции. Нумерация начинается с нуля
- **button** - (*HTMLElement*) HTML-элемент кнопки
- **shead** - (*HTMLElement*) HTML-элемент заголовка секции
- **sbody** - (*HTMLElement*) HTML-элемент тела секции

Вы можете определить изображение, которое используется для кнопки, через следующий CSS-класс:

~~~css
.dhx_custom_button_help{
    background-image:url(imgs/but_help.gif);
}
~~~

## Связывание управляющих элементов select

Можно сделать так, чтобы управляющие элементы select в Lightbox зависели друг от друга. Для этого используйте свойство onchange элемента select, как в примере:

~~~js
const update_select_options = function(select, options) { // вспомогательная функция
    select.options.length = 0;
    for (let i = 0; i < options.length; i++) {
        let option = options[i];
        select[i] = new Option(option.label, option.key);
    }
};

const parent_onchange = function(event) {
    const new_child_options = child_select_options[this.value];
    update_select_options(scheduler.formSection('child').control, new_child_options);
};
scheduler.attachEvent("onBeforeLightbox", function(id){
    const ev = scheduler.getEvent(id);
    if (!ev.child_id) {
        const parent_id = ev.parent_id||parent_select_options[0].key;
        const new_child_options = child_select_options[parent_id];
        update_select_options(
            scheduler.formSection('child').control, new_child_options
        );
    }
    return true;
});

scheduler.config.lightbox.sections= [
    ...
    {name:"parent", height:23, type:"select", options: parent_select_options, 
     map_to:"parent_id", onchange:parent_onchange },
    {name:"child", height:23, type:"select", options: child_select_options, 
     map_to:"child_id" }
    ...
];
~~~

[Связывание управляющих элементов в Lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/26_linked_selects_in_lightbox.html)

![linking_controls.png](/img/linking_controls.png)

Событие <b>onchange</b> вызывается, когда пользователь изменяет выбранный вариант в родительском разделе. Варианты в дочернем разделе будут изменяться соответствующим образом.

## Динамическое изменение конфигураций Lightbox

Существует возможность динамически менять секции Lightbox. Это означает, что секции Lightbox могут быть скрыты, заблокированы или отображены в зависимости от заданной конфигурации.

Вы можете динамически изменять секции Lightbox через метод [resetLightbox()](api/method/resetlightbox.md). Например:

1. Создайте два массива конфигурации Lightbox, которые будут содержать два разных набора контролов.

~~~js
const full_lightbox = [
    { name: "description", height: 200, map_to: "text", type: "textarea", focus: true},
    { name: "hidden", height: 23, map_to: "hidden", type: "textarea"},
    { name: "time", height: 72, type: "time", map_to: "auto"}
];
const restricted_lightbox = [
    { name: "description", height: 200, map_to: "text", type: "textarea", focus: true},
    { name: "time", height: 72, type: "time", map_to: "auto"}
];
~~~

2. На следующем шаге выполните следующие действия:

- Перед отображением нового Lightbox вызовите метод resetLightbox() для удаления текущего набора контролов формы редактирования и генерации нового объекта Lightbox с другим набором контролов.

- Получите объект события по его id и укажите условие, в зависимости от которого будет применяться та или иная конфигурация Lightbox. В приведенном ниже примере условие задается через атрибут "restricted".

~~~js
scheduler.attachEvent("onBeforeLightbox", function(event_id) {
    scheduler.resetLightbox();
    const ev = scheduler.getEvent(event_id);
    scheduler.config.lightbox.sections = (ev.restricted) ?
        restricted_lightbox : full_lightbox;
    return true;
});
~~~

3. Используйте свойство события 'restricted' для применения конфигурации "restricted_lightbox". В противном случае будет отображаться полный Lightbox.

~~~js
scheduler.init('scheduler_here', new Date(2027, 5, 30), "week");
scheduler.parse([
    { start_date: "2027-06-27 04:00", end_date: "2027-06-27 7:00", 
        text: "Restricted event", hidden: "You won't see me", restricted: true },
    { start_date: "2027-06-29 05:00", end_date: "2027-06-29 11:00", 
        text: "Full access", hidden: "Hidden text" }
]);
~~~

![dinamicchanges_lightbox.png](/img/dinamicchanges_lightbox.png)

[Динамическое изменение конфигураций Lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/29_changing_lightbox_configurations.html)