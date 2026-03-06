---
title: "Тултипы"
sidebar_label: "Тултипы"
---

# Тултипы 

*Если вы используете dhtmlxScheduler 6.0 или более раннюю версию, пожалуйста, ознакомьтесь с подробностями [здесь](guides/tooltips-legacy.md).*

Чтобы отображать тултипы для событий, необходимо один раз на странице включить расширение **Tooltip**.

~~~js
scheduler.plugins({
    tooltip: true
});
~~~

После включения тултипы будут отображаться с настройками по умолчанию.

![tooltip](/img/tooltip.png)


[Tooltips](https://docs.dhtmlx.com/scheduler/samples/03_extensions/20_tooltip.html)


После активации расширения тултипы будут автоматически показываться с использованием стандартной конфигурации.


## Пользовательский текст 

По умолчанию тултипы отображают три свойства события:

1. Дата начала события.
2. Дата окончания события.
3. Текст события.

Чтобы изменить текст тултипа, используйте шаблон [tooltip_text](api/template/tooltip_text.md):

~~~js
scheduler.templates.tooltip_text = function(start,end,event) {
    return "<b>Event:</b> "+event.text+"

<b>Start date:</b> "+
    scheduler.templates.tooltip_date_format(start)+"

"+
    "<b>End date:</b> "+scheduler.templates.tooltip_date_format(end);
};
~~~


## API тултипов {#tooltip-api}

### Объект тултипа

Объект тултипа доступен как **scheduler.ext.tooltips.tooltip**. Он предоставляет методы для управления позицией, содержимым и видимостью тултипа:

- **getNode()** - возвращает HTML-элемент тултипа  
- **setViewport()** - ограничивает позицию тултипа границами указанного HTML-элемента
    - **node** - (*HTMLElement*) контейнер-элемент
- **show()** - отображает тултип по заданным координатам относительно document.body. Принимает разные параметры в зависимости от желаемой позиции:
    - Для отображения по конкретным координатам передайте: 
        - **left** - (*number*) X-координата
        - **top** - (*number*) Y-координата 
    - Для отображения по координатам мышиного события (с учетом *tooltip_offset_x/y* и viewport), передайте:
        - **event** - (*Event*) объект мышиного события  
- **hide()** - скрывает элемент тултипа
- **setContent()**- задает HTML-содержимое тултипа. Параметр:
    - **html** - (*string*) HTML-строка для отображения в тултипе

### Методы

Несколько методов позволяют управлять поведением тултипа при наведении на DOM-элементы.

#### scheduler.ext.tooltips.attach() {#attach}

Добавляет тултип с детальной конфигурацией. Принимает объект с настройками тултипа, включая:

- **selector** - (*string*) CSS-селектор элементов, для которых отслеживаются мышиные события
- **onmouseenter** - (*function*) вызывается при наведении мыши на элемент, параметры:
     - **event** - (*Event*) нативное мышиное событие
    - **node** -  (*HTMLElement*) целевой HTML-элемент
- **onmousemove** - (*function*) вызывается при перемещении мыши внутри элемента, параметры:
    - **event** - (*Event*) нативное мышиное событие
    - **node** -  (*HTMLElement*) целевой HTML-элемент
- **onmouseleave** - (*function*) вызывается при уходе мыши с элемента, параметры:    
    - **event** - (*Event*) нативное мышиное событие
    - **node** -  (*HTMLElement*) целевой HTML-элемент
- **global** - (*boolean*) отслеживать ли мышиные события на всей странице (*true*) или только внутри элемента Gantt (*false*). По умолчанию *false*.

#### scheduler.ext.tooltips.tooltipFor() {#tooltipfor}

Добавляет тултип для конкретного элемента Gantt. Это упрощённая версия **attach()**. Принимает объект с:

- **selector** - (*string*) CSS-селектор элемента Gantt, к которому добавляется тултип
- **html** - (*function*) функция-шаблон для тултипа, получает:
    - **event** - (*Event*) нативное мышиное событие
    - **node** -  (*HTMLElement*) целевой HTML-элемент
  возвращает строку с содержимым тултипа.
- **global** - (*boolean*) необязательный, отслеживает мышиные события на всей странице (*true*) или только внутри элемента Gantt (*false*). По умолчанию *false*. 

#### scheduler.ext.tooltips.detach() {#detach}

Удаляет тултип. Принимает:

- **selector** - (*string*) CSS-селектор элемента Gantt


## Тултипы для различных элементов

По умолчанию тултипы добавляются только к событиям Gantt, но возможно назначить тултипы для любого другого элемента Gantt.

Соответствующие методы в [API тултипов](#tooltip-api):

- метод [**scheduler.ext.tooltips.tooltipFor()**](#tooltipfor) 

Обратите внимание, что [scheduler.ext.tooltips.tooltipFor()](#tooltipfor) следует вызывать после инициализации Gantt. Например, его можно разместить внутри обработчика события [onSchedulerReady](api/event/onschedulerready.md):

~~~js
scheduler.attachEvent("onSchedulerReady", function(){
    scheduler.ext.tooltips.tooltipFor({
        selector: ".dhx_matrix_scell",
        html: function (event, node) {
            const sectionId = scheduler.getActionData(event).section;
            const timeline = scheduler.getView("timeline");
            var section = timeline.y_unit[timeline.order[sectionId]];
            return `Tooltip for <b>${section.label}</b>`;
        }
    });
});

~~~


[Tooltips](https://docs.dhtmlx.com/scheduler/samples/06_timeline/12_section_tooltip.html)


В качестве альтернативы используйте такой подход:

~~~js
scheduler.init("scheduler_here");

scheduler.ext.tooltips.tooltipFor({
    selector: ".dhx_matrix_scell",
    html: function (event, node) {
        const sectionId = scheduler.getActionData(event).section;
        const timeline = scheduler.getView("timeline");
        var section = timeline.y_unit[timeline.order[sectionId]];
        return `Tooltip for <b>${section.label}</b>`;
    }
});
~~~

Тултипы, добавленные таким образом, будут следовать за указателем мыши и учитывать настройки *[tooltip_offset_x](api/config/tooltip_offset_x.md)*, *[tooltip_offset_y](api/config/tooltip_offset_y.md)*, *[tooltip_timeout](api/config/tooltip_timeout.md)* и
[tooltip_hide_timeout](api/config/tooltip_hide_timeout.md).

- метод [**scheduler.ext.tooltips.attach()**](#attach) 

Этот метод предоставляет более продвинутую настройку поведения тултипа на основе перемещения мыши.

## Настройка поведения тултипа

Вы можете изменить стандартное поведение тултипа, удалив встроенный обработчик и добавив свой собственный. Вот как это сделать:

- Удалите стандартный обработчик тултипа с задач с помощью [**scheduler.ext.tooltips.detach**](#detach):

~~~js
// удаляем встроенный обработчик тултипа с задач
scheduler.ext.tooltips.detach(`[${scheduler.config.event_attribute}]`);
~~~

- Добавьте свое собственное поведение тултипа через [**scheduler.ext.tooltips.attach()**](#attach). Пример ниже показывает тултип только над таблицей:

~~~js
scheduler.ext.tooltips.tooltipFor({
  selector: `[${scheduler.config.event_attribute}]`,
  html: (event: MouseEvent) => {
     if (scheduler.config.touch && !scheduler.config.touch_tooltip) {
     return;
   }
 
   const evNode = event.target.closest(`[${scheduler.config.event_attribute}]`);
   const evId = evNode.getAttribute(scheduler.config.event_attribute);
   if(scheduler.getEvent(evId)){
     const ev = scheduler.getEvent(evId);
     return scheduler.templates.tooltip_text(ev.start_date, ev.end_date, ev);
   }
   return null;
  },
  global: false
});
~~~

## Таймаут

Время отображения и скрытия тултипа можно настроить через параметры.

Чтобы задать задержку (в миллисекундах) перед появлением тултипа для задачи, используйте свойство [tooltip_timeout](api/config/tooltip_timeout.md):

~~~js
scheduler.config.tooltip_timeout = 50;
scheduler.init("scheduler_here");
~~~


Чтобы управлять тем, как долго (в миллисекундах) тултип остается видимым после ухода курсора, используйте свойство [tooltip_hide_timeout](api/config/tooltip_hide_timeout.md):

~~~js
scheduler.config.tooltip_hide_timeout = 5000;
scheduler.init("scheduler_here");
~~~

## Позиция

Положение тултипа можно скорректировать, изменив значения смещений с помощью следующих параметров конфигурации:

- [tooltip_offset_x](api/config/tooltip_offset_x.md) - горизонтальное смещение тултипа
- [tooltip_offset_y](api/config/tooltip_offset_y.md) - вертикальное смещение тултипа

~~~js
scheduler.config.tooltip_offset_x = 30;
scheduler.config.tooltip_offset_y = 40;
 
scheduler.init("scheduler_here");
~~~

## Область отображения

По умолчанию тултипы прикрепляются к **document.body**. При необходимости вы можете ограничить область отображения тултипа определённым контейнером до инициализации Gantt следующим образом:

~~~js
scheduler.attachEvent("onSchedulerReady", function(){
    var tooltips = scheduler.ext.tooltips;
     tooltips.tooltip.setViewport(container);
});

scheduler.init("scheduler_here");
~~~
