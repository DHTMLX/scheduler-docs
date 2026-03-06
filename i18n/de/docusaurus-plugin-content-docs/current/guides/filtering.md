---
title: "Filtern von Ereignissen"
sidebar_label: "Filtern von Ereignissen"
---

# Filtern von Ereignissen

Für jede Ansicht ist es möglich, eine Filterfunktion zu definieren, die bestimmt, welche Ereignisse im Scheduler angezeigt und welche ausgeblendet werden.

~~~js
scheduler.filter_week = function(id, event){
    if(event.name == 'New event')
        return false; // Ereignis wird gefiltert (nicht dargestellt)
        //oder
        return true; // Ereignis wird dargestellt
}
~~~

Hier bezieht sich 'week' auf den Namen der Ansicht (verwendet in *'scheduler.filter_week'*).

Die Funktion **filter_(viewName)** akzeptiert zwei Argumente:

- **id** - die Kennung des Ereignisses
- **event** - das Ereignisobjekt selbst

Es ist außerdem möglich, verschiedene Filterfunktionen für unterschiedliche Ansichten zuzuweisen:

~~~js
scheduler.filter_day = scheduler.filter_week = function(id, event){
    //some_code
}
...
scheduler.filter_timeline = function(id, event){
    //some_other code
}

~~~


[Filtering events](https://docs.dhtmlx.com/scheduler/samples/09_api/09_filtering_events.html)
