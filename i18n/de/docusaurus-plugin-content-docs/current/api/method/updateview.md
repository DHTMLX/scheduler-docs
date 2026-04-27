---
sidebar_label: "updateView"
title: "updateView method"
description: "Zeigt die angegebene Ansicht und das Datum an, ohne irgendwelche Events auszulösen"
---

# updateView

### Description

@short: Zeigt die angegebene Ansicht und das Datum an, ohne irgendwelche Events auszulösen

@signature: updateView: (date?: Date, view?: string) =\> void

### Parameters

- `date` - (optional) *Date* - (optional) das zu setzende Datum
- `view` - (optional) *string* - (optional) der Name der Ansicht

### Example

~~~jsx
// aktualisiert die aktuelle Ansicht und das Datum, ohne Änderungen vorzunehmen
scheduler.updateView();
// zeigt den 4. Juli 2027 in der aktuellen Ansicht an
scheduler.updateView(new Date(2027,7,4));
// zeigt den 3. Mai 2027 in der Wochen-Ansicht an
scheduler.updateView(new Date(2027,5,3), "week");
~~~

### Related samples
- [Filtering events](https://docs.dhtmlx.com/scheduler/samples/09_api/09_filtering_events.html)

### Details

- Wird diese Funktion ohne Parameter aufgerufen, wird einfach die aktuelle Ansicht aktualisiert. 
- Die Standard-View-Namen sind 'day', 'week' und 'month'. Um eine andere Ansicht zu verwenden, geben Sie den **Name**-Parameter an.
- Diese Methode ähnelt [setCurrentView](api/method/setcurrentview.md). Der wesentliche Unterschied besteht darin, dass im Gegensatz zu **updateView** bei [setCurrentView](api/method/setcurrentview.md) die Events [onBeforeViewChange](api/event/onbeforeviewchange.md) und [onViewChange](api/event/onviewchange.md) ausgelöst werden.

### Related API
- [setCurrentView](api/method/setcurrentview.md)
- [onBeforeViewChange](api/event/onbeforeviewchange.md)
- [onViewChange](api/event/onviewchange.md)
