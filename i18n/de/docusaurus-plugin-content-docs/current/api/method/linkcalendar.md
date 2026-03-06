---
sidebar_label: "linkCalendar"
title: "linkCalendar method"
description: "Diese Methode aktualisiert das aktive Datum im Mini-Kalender, sobald sich das aktive Datum im Scheduler ändert."
---

# linkCalendar

### Description

@short: Diese Methode aktualisiert das aktive Datum im Mini-Kalender, sobald sich das aktive Datum im Scheduler ändert.

@signature: linkCalendar: (calendar: any, shift: SchedulerCallback) =\> void

### Parameters

- `calendar` - (required) *object* - Die Instanz des Mini-Kalenders.
- `shift` - (required) *function* - Eine Funktion, die den Unterschied zwischen den aktiven Daten im Mini-Kalender und im Scheduler bestimmt. Sie erhält das Datum des Schedulers als Eingabe und gibt das Datum zurück, das im Mini-Kalender angezeigt werden soll.

### Example

~~~jsx
var calendar = scheduler.renderCalendar({
    container:"cal_here", 
    navigation:true,
    handler:function(date){
        scheduler.setCurrentView(date, scheduler._mode);
    }
});

// Der Mini-Kalender zeigt stets ein Datum einen Monat vor dem Scheduler an
scheduler.linkCalendar(calendar, function(date){
    return scheduler.date.add(date, 1, "month");  
});
~~~

### Related samples
- [Mini calendar outside the scheduler](https://docs.dhtmlx.com/scheduler/samples/05_calendar/05_plain_structure.html)

### Details

:::note
 Diese Methode setzt voraus, dass das [minical](guides/extensions-list.md#mini-calendar-date-picker) Plugin aktiviert ist. 
:::

### Related Guides
- [Mini-Kalender (Datumsauswahl)](guides/minicalendar.md)
