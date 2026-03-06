---
sidebar_label: "renderCalendar"
title: "renderCalendar method"
description: "генерирует компактный календарь"
---

# renderCalendar

### Description

@short: Генерирует компактный календарь

@signature: renderCalendar: (config: any) =\> HTMLElement

### Parameters

- `config` - (required) *object* - настройки конфигурации для календаря

### Returns
- ` div` - (HTMLElement) - HTML-элемент календаря

### Example

~~~jsx
const calendar = scheduler.renderCalendar({
    container:"cal_here", 
    navigation:true,
    handler:function(date, calendar){
        scheduler.setCurrentView(date, scheduler._mode);
    }
});
~~~

### Related samples
- [Mini calendar in the scheduler header](https://docs.dhtmlx.com/scheduler/samples/05_calendar/01_select.html)
- [Mini calendar without the scheduler](https://docs.dhtmlx.com/scheduler/samples/05_calendar/02_without_scheduler.html)

### Details

:::note
 Этот метод требует включения плагина [minical](guides/extensions-list.md#minicalendardatepicker). 
::: 

Объект конфигурации может содержать следующие свойства:

<table class="webixdoc_links">
  <tbody>
  <tr>
  <td class="webixdoc_links0"><b>container</b></td>
  <td>(<i>string, object</i>) HTML-контейнер (или его ID), в котором будет размещён календарь. Необязательный параметр.</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>position</b></td>
  <td>(<i>object</i>) задаёт позицию календаря. Может быть указана в виде координат или ID HTML-элемента.</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>date</b></td>
  <td>(<i>string</i>) устанавливает начальную дату, отображаемую в календаре</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>navigation</b></td>
  <td>(<i>boolean</i>) включает или отключает кнопки навигации по месяцам</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>handler</b></td>
  <td>(<i>function</i>) callback-функция, вызываемая при клике по дате. Получает выбранную дату и экземпляр календаря в качестве аргументов</td>
  </tr>
  </tbody>
</table>

~~~js
const calendar = scheduler.renderCalendar({
    container:"for_calendar",
    date:new Date()
});
//
const calendar = scheduler.renderCalendar({
    position:"some_id",
    date:new Date()
});
//
const calendar = scheduler.renderCalendar({
    position: { left: 100, top: 50 },
    date:new Date()
});

~~~

### Related Guides
- [Мини-календарь (Date Picker)](guides/minicalendar.md)
