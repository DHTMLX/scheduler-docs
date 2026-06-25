---
title: "Тултипы"
sidebar_label: "Тултипы"
---

# Тултипы

*Если вы используете dhtmlxScheduler 6.0 или более раннюю версию, пожалуйста, ознакомьтесь с подробностями [здесь](guides/tooltips-legacy.md).*

Чтобы отображать тултипы для событий, следует активировать расширение **Tooltip** на странице.

~~~js
scheduler.plugins({
    tooltip: true
});
~~~

После этого тултипы будут отображаться с настройками по умолчанию.

![тултип](/img/tooltip.png)


[Тултипы](https://docs.dhtmlx.com/scheduler/samples/03_extensions/20_tooltip.html)


Как только расширение активировано, тултипы будут автоматически отображаться с настройками по умолчанию.


## Пользовательский текст 

По умолчанию тултипы отображают 3 свойства события:

1. Дата начала события.
2. Дата окончания события.
3. Текст события.

Чтобы задать пользовательский текст для тултипов, используйте шаблон [tooltip_text](api/template/tooltip_text.md):

~~~js
scheduler.templates.tooltip_text = function(start,end,event) {
    return "<b>Event:</b> "+event.text+"

<b>Start date:</b> "+
    scheduler.templates.tooltip_date_format(start)+"

"+
    "<b>End date:</b> "+scheduler.templates.tooltip_date_format(end);
};
~~~


## API тултипа

### Объект тултипа

Вы можете получить объект тултипа как **scheduler.ext.tooltips.tooltip**. Этот объект позволяет управлять положением, содержимым и видимостью тултипа через набор методов:

- **getNode()** - возвращает HTML-элемент тултипа  
- **setViewport()** - фиксирует положение тултипа в границах указанного HTML-элемента
    - **node** - (*HTMLElement*) HTML-узел
- **show()** - отображает тултип по конкретным координатам (относительно document.body). Метод может принимать разные параметры, в зависимости от положения, в котором вы хотите показать тултип:
    - Чтобы отобразить тултип по конкретным координатам (относительно document.body), передайте: 
        - **left** - (*number*) X-координата
        - **top** - (*number*) Y-координата 
    - Чтобы отобразить тултип по координатам события мыши (*tooltip_offset_x/y* и область просмотра будут учтены), передайте:
        - **event** - (*Event*) нативное событие мыши  
- **hide()** - скрывает HTML-элемент тултипа
- **setContent()**- помещает HTML-содержимое в тултип. В качестве параметра принимает:
    - **html** - (*string*) строка с HTML-содержимым для тултипа

### Методы

Существуют несколько методов, которые позволяют контролировать поведение тултипа при наведении на элементы DOM.

<h4 id="attach">scheduler.ext.tooltips.attach()</h4>

Добавляет всплывающую подсказку с расширенными настройками. Метод принимает в качестве параметра объект с настройками всплывающей подсказки. С помощью этого метода можно настроить следующие параметры:

- **selector** - (*string*) определяет CSS-селектор элементов, на которые следует слушать события мыши
- **onmouseenter** - (*function*) обработчик, вызываемый при входе курсора мыши в элемент. Параметры:
     - **event** - (*Event*) нативное событие мыши
    - **node** -  (*HTMLElement*) HTML-узел
- **onmousemove** - (*function*) обработчик, вызываемый при перемещении курсора мыши внутри элемента. Параметры:
    - **event** - (*Event*) нативное событие мыши
    - **node** -  (*HTMLElement*) HTML-узел
- **onmouseleave** - (*function*) обработчик, вызываемый когда курсор мыши покидает элемент. Параметры:    
    - **event** - (*Event*) нативное событие мыши
    - **node** -  (*HTMLElement*) HTML-узел
- **global** - (*boolean*) определяет, слушает ли модуль события мыши по всей странице (*true*) или только внутри элемента Scheduler (*false*). По умолчанию значение установлено в *false*.

<h4 id="tooltipfor">scheduler.ext.tooltips.tooltipFor()</h4>

Добавляет всплывающую подсказку для указанного элемента планировщика. Это упрощенная версия метода **attach()**. Метод принимает в качестве параметра *объект с подробными сведениями о всплывающей подсказке*. Этот объект имеет следующие свойства:

- **selector** - (*string*) CSS-селектор элемента Scheduler, к которому нужно добавить тултип
- **html** - (*function*) шаблон тултипа. Функция-шаблон принимает два параметра в свою очередь:
    - **event** - (*Event*) нативное событие мыши
    - **node** -  (*HTMLElement*) HTML-узел
  и возвращает строку-шаблон
- **global** - (*boolean*) необязательный, определяет, слушает ли модуль события мыши по всей странице (*true*) или только внутри элемента Scheduler (*false*). По умолчанию значение равно *false*. 

<h4 id="detach">scheduler.ext.tooltips.detach()</h4> 

удаляет тултип. В качестве параметра метод принимает:

- **selector** - (*string*) CSS-селектор элемента Scheduler


## Тултипы для разных элементов

По умолчанию тултипы добавляются только к событиям Scheduler, но вы также можете задать тултипы для любого другого элемента Scheduler.

Существуют два соответствующих метода в [API тултипа](#tooltip-api) для этой цели:

- метод [**scheduler.ext.tooltips.tooltipFor()**](#methods) 

Обратите внимание: метод [scheduler.ext.tooltips.tooltipFor()](#methods) должен вызываться после завершения инициализации Scheduler. Например, можно поместить вызов внутри обработчика события [onSchedulerReady](api/event/onschedulerready.md) так:

~~~js
scheduler.attachEvent("onSchedulerReady", function(){
    scheduler.ext.tooltips.tooltipFor({
        selector: ".dhx_matrix_scell",
        html: function (event, node) {
            const sectionId = scheduler.getActionData(event).section;
            const timeline = scheduler.getView("timeline");
            const section = timeline.y_unit[timeline.order[sectionId]];
            return `Tooltip for <b>${section.label}</b>`;
        }
    });
});

~~~


[Тултипы](https://docs.dhtmlx.com/scheduler/samples/06_timeline/12_section_tooltip.html)


В качестве альтернативы используйте такой подход:

~~~js
scheduler.init("scheduler_here");

scheduler.ext.tooltips.tooltipFor({
    selector: ".dhx_matrix_scell",
    html: function (event, node) {
        const sectionId = scheduler.getActionData(event).section;
        const timeline = scheduler.getView("timeline");
        const section = timeline.y_unit[timeline.order[sectionId]];
        return `Tooltip for <b>${section.label}</b>`;
    }
});
~~~

Подсказка, добавленная таким образом, будет следовать за указателем мыши и использовать настройки *[tooltip_offset_x](api/config/tooltip_offset_x.md)*, *[tooltip_offset_y](api/config/tooltip_offset_y.md)*, *[tooltip_timeout](api/config/tooltip_timeout.md)*, и
[tooltip_hide_timeout](api/config/tooltip_hide_timeout.md) настроек.

- метод [**scheduler.ext.tooltips.attach()**](#attach) 

Этот метод позволяет добавлять тултипы с расширенной конфигурацией, чтобы адаптировать поведение тултипа к перемещению указателя мыши.

## Настройка поведения тултипа

Существует возможность изменить поведение тултипа по умолчанию. Это можно сделать, удалив встроенный обработчик тултипа и добавив свой собственный. Выполните приведённые ниже шаги:

- Удалите встроенный обработчик тултипа из задач с помощью метода [**scheduler.ext.tooltips.detach**](#methods):

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

## Тайм-аут

Вы можете настроить время отображения и скрытия тултипа с помощью соответствующих настроек.

Чтобы указать период времени (в миллисекундах) до появления тултипа для задачи, используйте свойство [tooltip_timeout](api/config/tooltip_timeout.md):

~~~js
scheduler.config.tooltip_timeout = 50;
scheduler.init("scheduler_here");
~~~


Чтобы определить, как долго (в миллисекундах) тултип будет отображаться после перемещения курсора на другую позицию, используйте свойство [tooltip_hide_timeout](api/config/tooltip_hide_timeout.md):

~~~js
scheduler.config.tooltip_hide_timeout = 5000;
scheduler.init("scheduler_here");
~~~

## Позиция

Положение тултипа настраивается изменением смещений относительно его базового положения через две конфигурационные свойства:

- [tooltip_offset_x](api/config/tooltip_offset_x.md) - задаёт горизонтальное смещение положения тултипа
- [tooltip_offset_y](api/config/tooltip_offset_y.md) - задаёт вертикальное смещение положения тултипа

~~~js
scheduler.config.tooltip_offset_x = 30;
scheduler.config.tooltip_offset_y = 40;
 
scheduler.init("scheduler_here");
~~~

## Область отображения

По умолчанию тултипы прикреплены к **document.body**. При необходимости можно ограничить отображение тултипов контейнером до инициализации Scheduler, используя приведённый ниже код:

~~~js
scheduler.attachEvent("onSchedulerReady", function(){
    const tooltips = scheduler.ext.tooltips;
    tooltips.tooltip.setViewport(container);
});

scheduler.init("scheduler_here");
~~~