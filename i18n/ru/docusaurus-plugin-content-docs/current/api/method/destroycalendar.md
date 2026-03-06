---
sidebar_label: "destroyCalendar"
title: "destroyCalendar method"
description: "удаляет ранее созданный мини-календарь"
---

# destroyCalendar

### Description

@short: Удаляет ранее созданный мини-календарь

@signature: destroyCalendar: (name?: any) =\> void

### Parameters

- `name` - (required) *object* - объект мини-календаря, который нужно удалить (если не указан, scheduler попытается удалить самый недавно созданный мини-календарь)

### Example

~~~jsx
var calendar = scheduler.renderCalendar(...);
...
scheduler.destroyCalendar(calendar);
~~~

### Related samples
- [Mini calendar in the scheduler header](https://docs.dhtmlx.com/scheduler/samples/05_calendar/01_select.html)
- [Mini calendar with the recurring events](https://docs.dhtmlx.com/scheduler/samples/05_calendar/06_recurring_form.html)

### Details

:::note
 Для работы метода требуется активированный плагин [minical](guides/extensions-list.md#minicalendardatepicker). 
:::

### Related API
- [renderCalendar](api/method/rendercalendar.md)

### Related Guides
- [Мини-календарь (Date Picker)](guides/minicalendar.md)
