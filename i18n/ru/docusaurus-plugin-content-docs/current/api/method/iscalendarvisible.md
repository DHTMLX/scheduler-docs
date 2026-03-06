---
sidebar_label: "isCalendarVisible"
title: "isCalendarVisible method"
description: "определяет, отображается ли в данный момент календарь в scheduler"
---

# isCalendarVisible

### Description

@short: Определяет, отображается ли в данный момент календарь в scheduler

@signature: isCalendarVisible: () =\> boolean | HTMLElement

### Returns
- ` cal` - (boolean | HTMLElement) - <ul><li><b>HTML-элемент мини-календаря</b> - когда мини-календарь виден </li> <li><b>false</b> - когда мини-календарь не виден </li> </ul>

### Example

~~~jsx
//проверка, виден ли мини-календарь
var check = scheduler.isCalendarVisible(); // -> <div class="dhx_minical_popup">…</div>
~~~

### Related samples
- [Mini calendar in the scheduler header](https://docs.dhtmlx.com/scheduler/samples/05_calendar/01_select.html)
- [Mini calendar with the recurring events](https://docs.dhtmlx.com/scheduler/samples/05_calendar/06_recurring_form.html)

### Details

:::note
 Этот метод работает только если включен плагин [minical](guides/extensions-list.md#minicalendardatepicker). 
:::

### Related Guides
- [Мини-календарь (Date Picker)](guides/minicalendar.md)
