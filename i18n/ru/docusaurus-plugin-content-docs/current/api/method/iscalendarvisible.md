---
sidebar_label: isCalendarVisible
title: "isCalendarVisible method"
description: "проверяет, открыт ли в данный момент календарь в расписании"
---

# isCalendarVisible

### Description

@short: Проверяет, открыт ли в данный момент календарь в расписании

@signature: isCalendarVisible: () => boolean|HTMLElement

### Returns
- ` cal` - (boolean | HTMLElement) - <ul><li><b>HTML-элемент мини-календаря</b> - если мини-календарь в данный момент открыт</li> <li><b>false</b> - если мини-календарь в данный момент закрыт</li> </ul>

### Example

~~~jsx
//проверка, виден ли мини-календарь
const check = scheduler.isCalendarVisible(); // -> <div class="dhx_minical_popup">…</div>
~~~

### Related samples
- [Мини-календарь в заголовке расписания](https://docs.dhtmlx.com/scheduler/samples/05_calendar/01_select.html)
- [Мини-календарь с повторяющимися событиями](https://docs.dhtmlx.com/scheduler/samples/05_calendar/06_recurring_form.html)

### Details

:::note
Метод требует активации плагина [minical](guides/extensions-list.md#mini-calendar-date-picker).
:::

### Related Guides
- [Mini Calendar (Date Picker)](guides/minicalendar.md)