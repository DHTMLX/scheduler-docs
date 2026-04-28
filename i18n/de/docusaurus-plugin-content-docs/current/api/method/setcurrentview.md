---
sidebar_label: setCurrentView
title: "setCurrentView Methode"
description: "Zeigt die angegebene Ansicht und das Datum an"
---

# setCurrentView

### Description

@short: Zeigt die angegebene Ansicht und das Datum an

@signature: setCurrentView: (date?: Date, view?: string) =\> void

### Parameters

- `date` - (optional) *Date* - das anzuzeigende Datum
- `view` - (optional) *string* - der Name einer anzuzeigenden Ansicht

### Example

~~~jsx
// Zeigt die aktuelle Ansicht und das Datum an. Nichts wird geändert, nur aktualisiert
scheduler.setCurrentView();
// Zeigt 2027-08-04 in der aktuell aktiven Ansicht an
scheduler.setCurrentView(new Date(2027, 7, 4));
// Zeigt 2027-06-03 in der Wochenansicht an
scheduler.setCurrentView(new Date(2027, 5, 3), "week");
~~~

### Related samples
- [Mini-Kalender im Scheduler-Header](https://docs.dhtmlx.com/scheduler/samples/05_calendar/01_select.html)
- [Mini-Kalender außerhalb des Schedulers](https://docs.dhtmlx.com/scheduler/samples/05_calendar/05_plain_structure.html)

### Details

- Die Namen der Standardansichten sind 'day', 'week', 'month'. Um eine andere Ansicht anzugeben, verwenden Sie ihren `name`-Parameter.
- Die Methode ruft [`onBeforeViewChange`](api/event/onbeforeviewchange.md) und [`onViewChange`](api/event/onviewchange.md) auf.
- Die Methode ist ähnlich wie [`updateView()`](api/method/updateview.md). Der einzige Unterschied besteht darin, dass [`updateView()`](api/method/updateview.md) keine Ereignisse erzeugt.

### Related API
- [onBeforeViewChange](api/event/onbeforeviewchange.md)
- [onViewChange](api/event/onviewchange.md)
- [updateView](api/method/updateview.md)