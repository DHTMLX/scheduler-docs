---
sidebar_label: destroyCalendar
title: "destroyCalendar метод"
description: "уничтожает ранее созданный мини-календарь"
---

# destroyCalendar

### Description

@short: Уничтожает ранее созданный мини-календарь

@signature: destroyCalendar: (name?: any) =\> void

### Parameters

- `name` - (optional) *object* - объект мини-календаря (если не указано, планировщик попытается <br> удалить последний созданный мини календарь)

### Example

~~~jsx
const calendar = scheduler.renderCalendar(...);
...
scheduler.destroyCalendar(calendar);
~~~

### Related samples
- [Мини-календарь в заголовке планировщика](https://docs.dhtmlx.com/scheduler/samples/05_calendar/01_select.html)
- [Мини-календарь с повторяющимися событиями](https://docs.dhtmlx.com/scheduler/samples/05_calendar/06_recurring_form.html)

### Details

:::note
 Метод требует, чтобы плагин [minical](guides/extensions-list.md#mini-calendar-date-picker) был активирован.
:::

### Related API
- [renderCalendar](api/method/rendercalendar.md)

### Related Guides
- [Мини-календарь (Date Picker)](guides/minicalendar.md)