---
sidebar_label: updateView
title: "updateView Methode"
description: "zeigt die angegebene Ansicht und das Datum an (löst keine Events aus)"
---

# updateView

### Description

@short: Zeigt die angegebene Ansicht und das Datum an (löst keine Events aus)

@signature: updateView: (date?: Date, view?: string) =\> void

### Parameters

- `date` - (optional) *Date* - das Datum, das gesetzt wird
- `view` - (optional) *string* - der Ansichtsname

### Example

~~~jsx
// displays the current view and date. Doesn't change anything, just refreshes
scheduler.updateView();
// displays 2027-08-04 in the currently active view
scheduler.updateView(new Date(2027, 7, 4));
// displays 2027-06-03 in the Week view
scheduler.updateView(new Date(2027, 5, 3), "week");
~~~

### Related samples
- [Ereignisse filtern](https://docs.dhtmlx.com/scheduler/samples/09_api/09_filtering_events.html)

### Details

- Beim Aufruf ohne Parameter aktualisiert die Funktion lediglich die aktuelle Ansicht.
- Die Namen der Standardansichten sind 'day', 'week', 'month'. Um eine andere Ansicht anzugeben, verwenden Sie ihren `name`-Parameter.
- Die Methode ist ähnlich wie [`setCurrentView()`](api/method/setcurrentview.md). Der einzige Unterschied besteht darin, dass im Gegensatz zu `updateView()`, [`setCurrentView()`](api/method/setcurrentview.md) die Events [`onBeforeViewChange`](api/event/onbeforeviewchange.md) und [`onViewChange`](api/event/onviewchange.md) erzeugt.

### Related API
- [setCurrentView](api/method/setcurrentview.md)
- [onBeforeViewChange](api/event/onbeforeviewchange.md)
- [onViewChange](api/event/onviewchange.md)