---
title: "Ereignisse filtern"
sidebar_label: "Ereignisse filtern"
---

# Filtern von Ereignissen

Für jede angegebene Ansicht können Sie eine Filterfunktion festlegen, die bestimmt, welche Ereignisse im Scheduler angezeigt werden und welche nicht.

~~~js
scheduler.filter_week = (id, event) => {
    if (event.name === 'New event') {
        return false; // event will be filtered (not rendered)
    }

    return true; // event will be rendered
};
~~~

Hier ist `"week"` der Name einer Ansicht in `scheduler.filter_week`.

Die `filter_(viewName)`-Methode nimmt 2 Parameter entgegen:

- `id` - die ID des Ereignisses
- `event` - das Ereignis-Objekt

Denken Sie daran, Sie können verschiedene Filterfunktionen für verschiedene Ansichten festlegen:

~~~js
scheduler.filter_day = scheduler.filter_week = (id, event) => {
    // some code
};
...
scheduler.filter_timeline = (id, event) => {
    // some other code
};

~~~

### Verwandte Beispiele
- [Ereignisse filtern](https://docs.dhtmlx.com/scheduler/samples/09_api/09_filtering_events.html)