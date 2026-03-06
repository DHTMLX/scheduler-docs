---
sidebar_label: "unmarkCalendar"
title: "unmarkCalendar method"
description: "entfernt eine CSS-Klasse vom angegebenen Datum"
---

# unmarkCalendar

### Description

@short: Entfernt eine CSS-Klasse vom angegebenen Datum

@signature: unmarkCalendar: (calendar: any, date: Date, css: string) =\> void

### Parameters

- `calendar` - (required) *object* - das Mini-Calendar-Objekt
- `date` - (required) *Date* - das Datum, von dem die CSS-Klasse entfernt werden soll
- `css` - (required) *string* - der Name der zu entfernenden CSS-Klasse

### Example

~~~jsx
// es gibt zwei Möglichkeiten, das Calendar-Objekt zu erhalten:

// durch Erstellen eines Mini-Calendars
var calendar = scheduler.renderCalendar({
    container:"cal_here", 
    navigation:true,
    handler:function(date){
        scheduler.setCurrentView(date, scheduler._mode);
    }
});

// oder durch Auswahl des Containers mit dem Mini-Calendar
var calendar = document.querySelector(".dhx_mini_calendar");

scheduler.markCalendar(calendar, new Date(2010,3,1), "my_style");
...
scheduler.unmarkCalendar(calendar, new Date(2010,3,1), "my_style");
~~~

### Details

:::note
 Die Methode erfordert, dass das [minical](guides/extensions-list.md#mini-calendar-date-picker) Plugin aktiviert ist. 
::: 

:::note

Beachten Sie, dass diese Methode nur mit dem Mini-Calendar funktioniert, nicht mit dem Scheduler selbst.
 
:::

### Related API
- [markCalendar](api/method/markcalendar.md)

### Related Guides
- [Mini-Kalender (Datumsauswahl)](guides/minicalendar.md)
