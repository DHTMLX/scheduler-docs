--- 
sidebar_label: renderCalendar
title: "renderCalendar method"
description: "создает мини-календарь"
---

# renderCalendar

### Description

@short: Создает мини-календарь

@signature: renderCalendar: (config: any) =\> HTMLElement

### Parameters

- `config` - (required) *object* - объект конфигурации календаря

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
- [Мини-календарь в заголовке планировщика](https://docs.dhtmlx.com/scheduler/samples/05_calendar/01_select.html)
- [Мини-календарь без планировщика](https://docs.dhtmlx.com/scheduler/samples/05_calendar/02_without_scheduler.html)

### Details

:::note
 Метод требует активации плагина [minical](guides/extensions-list.md#mini-calendar-date-picker).
::: 

Объект конфигурации может содержать следующие свойства:

<table class="webixdoc_links">
  <tbody>
  <tr>
  <td class="webixdoc_links0"><b>container</b></td>
  <td>(<i>string, object</i>) HTML-контейнер (или его id), в который будет инициализирован календарь. Опционально</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>position</b></td>
  <td>(<i>object</i>) положение календаря. Может быть задано как набор координат или идентификатор HTML-объекта</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>date</b></td>
  <td>(<i>string</i>) начальная дата календаря</td>
  </tr>
  <tr>
  <td class="webixdoc_links0" style="vertical-align: top;"><b>navigation</b></td>
  <td>(<i>boolean</i>) включает/выключает кнопки навигации по месяцам</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>handler</b></td>
  <td>(<i>function</i>) функция-обработчик, которая будет обрабатывать клики по календарю. Принимает выбранную дату и объект календаря в качестве параметров</td>
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
- [Мини-календарь (Выбор даты)](guides/minicalendar.md)