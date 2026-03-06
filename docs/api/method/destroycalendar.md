---
sidebar_label: destroyCalendar
title: "destroyCalendar method"
description: "destroys previously created mini-calendar"
---

# destroyCalendar

### Description

@short: Destroys previously created mini-calendar

@signature: destroyCalendar: (name?: any) =\> void

### Parameters

- `name` - (optional) *object* - the mini-calendar's object (if not specified, the scheduler attempts <br> to destroy the last created mini calendar)

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
 The method requires the [minical](guides/extensions-list.md#mini-calendar-date-picker) plugin to be activated. 
:::

### Related API
- [renderCalendar](api/method/rendercalendar.md)

### Related Guides
- [Mini Calendar (Date Picker)](guides/minicalendar.md)
