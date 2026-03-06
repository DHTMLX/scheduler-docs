---
sidebar_label: "render"
title: "render method"
description: "aktualisiert die Scheduler-Anzeige"
---

# render

### Description

@short: Aktualisiert die Scheduler-Anzeige

@signature: render: (date?: Date, view?: string) =\> void

### Parameters

- `date` - (optional) *Date* - das anzuzeigende Datum
- `view` - (optional) *string* - der Name der Ansicht, zu der gewechselt werden soll

### Example

~~~jsx
// Layout mit neuer Konfiguration aktualisieren
scheduler.config.hour_size_px = 88;
scheduler.render();


// zu einem anderen Datum wechseln
scheduler.render(new Date(2020,7,4));

// zu einer anderen Ansicht wechseln
scheduler.render(null, "week");
~~~

### Details

Diese Methode fungiert als Alias für [scheduler.setCurrentView](api/method/setcurrentview.md) und verhält sich identisch.

- Standard-View-Namen sind 'day', 'week' und 'month'. Für andere Views verwenden Sie deren <b>name</b>-Parameter.
- Der Aufruf dieser Methode löst die Events [onBeforeViewChange](api/event/onbeforeviewchange.md) und [onViewChange](api/event/onviewchange.md) aus.
- Sie ist ähnlich wie [updateView](api/method/updateview.md), aber der entscheidende Unterschied ist, dass [updateView](api/method/updateview.md) **keine Events auslöst**.

### Related API
- [setCurrentView](api/method/setcurrentview.md)
- [onBeforeViewChange](api/event/onbeforeviewchange.md)
- [onViewChange](api/event/onviewchange.md)
- [updateView](api/method/updateview.md)
