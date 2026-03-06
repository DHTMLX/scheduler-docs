---
sidebar_label: "destroyCalendar"
title: "destroyCalendar method"
description: "entfernt einen zuvor erstellten Mini-Kalender"
---

# destroyCalendar

### Description

@short: Entfernt einen zuvor erstellten Mini-Kalender

@signature: destroyCalendar: (name?: any) =\> void

### Parameters

- `name` - (required) *object* - Das Mini-Kalender-Objekt, das entfernt werden soll (wenn nicht angegeben, versucht der Scheduler, den zuletzt erstellten Mini-Kalender zu entfernen)

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
 Die Methode erfordert, dass das [minical](guides/extensions-list.md#mini-calendar-date-picker) Plugin aktiviert ist. 
:::

### Related API
- [renderCalendar](api/method/rendercalendar.md)

### Related Guides
- [Mini-Kalender (Datumsauswahl)](guides/minicalendar.md)
