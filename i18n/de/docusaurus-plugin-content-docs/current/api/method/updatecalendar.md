---
sidebar_label: "updateCalendar"
title: "updateCalendar method"
description: "zeigt das ausgewählte Datum im Mini-Calendar an"
---

# updateCalendar

### Description

@short: Zeigt das ausgewählte Datum im Mini-Calendar an

@signature: updateCalendar: (calendar: any, new_date: Date) =\> void

### Parameters

- `calendar` - (required) *object* - die Instanz des Mini-Calendars
- `new_date` - (required) *Date* - das Datum, das im Mini-Calendar angezeigt werden soll

### Example

~~~jsx
const calendar = scheduler.renderCalendar({
    container:"cal_here", 
    navigation:true,
    handler:function(date){
        scheduler.setCurrentView(date, scheduler._mode);
    }
});
...
scheduler.updateCalendar(calendar, new Date(2027,01,01));
~~~

### Details

:::note
 Die Methode erfordert, dass das [minical](guides/extensions-list.md#mini-calendar-date-picker) Plugin aktiviert ist. 
:::

### Related Guides
- [Mini-Kalender (Datumsauswahl)](guides/minicalendar.md)
