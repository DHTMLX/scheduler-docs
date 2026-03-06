---
sidebar_label: "setCurrentView"
title: "setCurrentView method"
description: "zeigt die ausgewählte Ansicht und das Datum an"
---

# setCurrentView

### Description

@short: Zeigt die ausgewählte Ansicht und das Datum an

@signature: setCurrentView: (date?: Date, view?: string) =\> void

### Parameters

- `date` - (optional) *Date* - das anzuzeigende Datum
- `view` - (optional) *string* - der Name der anzuzeigenden Ansicht

### Example

~~~jsx
// aktualisiert die aktuelle Ansicht und das Datum ohne Änderungen vorzunehmen
scheduler.setCurrentView();
// zeigt den 4. Juli 2012 in der aktuellen Ansicht an
scheduler.setCurrentView(new Date(2012,7,4));
// zeigt den 3. Mai 2012 in der Wochen-Ansicht an
scheduler.setCurrentView(new Date(2012,5,3), "week");
~~~

### Related samples
- [Mini calendar in the scheduler header](https://docs.dhtmlx.com/scheduler/samples/05_calendar/01_select.html)
- [Mini calendar outside the scheduler](https://docs.dhtmlx.com/scheduler/samples/05_calendar/05_plain_structure.html)

### Details

- Standard-View-Namen sind 'day', 'week' und 'month'. Für jede andere Ansicht verwenden Sie den <b>Name</b>-Parameter.
- Das Aufrufen dieser Methode löst die [onBeforeViewChange](api/event/onbeforeviewchange.md) und [onViewChange](api/event/onviewchange.md) aus.
- Diese Methode ist ähnlich wie [updateView](api/method/updateview.md), aber der entscheidende Unterschied ist, dass [updateView](api/method/updateview.md) **keine Events auslöst**.

### Related API
- [onBeforeViewChange](api/event/onbeforeviewchange.md)
- [onViewChange](api/event/onviewchange.md)
- [updateView](api/method/updateview.md)
