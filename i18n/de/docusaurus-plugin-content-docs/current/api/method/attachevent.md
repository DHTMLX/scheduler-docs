---
sidebar_label: "attachEvent"
title: "attachEvent method"
description: "verbindet einen Handler mit einem internen Event des dhtmlxScheduler"
---

# attachEvent

### Description

@short: Verbindet einen Handler mit einem internen Event des dhtmlxScheduler

@signature: attachEvent: (name: SchedulerEventName, handler: SchedulerCallback, settings?: any) =\> string

### Parameters

- `name` - (required) *SchedulerEventName* - der Name des Events, case-insensitive  
- `handler` - (required) *function* - die Funktion, die das Event behandelt  
- `settings` - (optional) *object* - optionale [Einstellungen](#properties-of-settings-object) für den Event-Handler

### Returns
- `event` - (string) - id die Kennung des verbundenen Event-Handlers

### Example

~~~jsx
scheduler.attachEvent("onEventSave",function(id,ev){  
    if (!ev.text) {  
        alert("Text darf nicht leer sein");  
        return false;  
    }  
    return true;  
})
~~~

### Related samples
- [Validating lightbox fields](https://docs.dhtmlx.com/scheduler/samples/02_customization/08_validation.html)
- [Recurring events](https://docs.dhtmlx.com/scheduler/samples/03_extensions/01_recurring_events.html)

### Details

Mehrere Handler können an dasselbe Event angehängt werden und werden alle ausgeführt.<br> Wenn ein Handler *false* zurückgibt, wird die zugehörige Aktion verhindert.<br> 
Die Handler werden in der Reihenfolge aufgerufen, in der sie angehängt wurden.

Alle Event-Listener, die über [event](api/method/event.md) hinzugefügt wurden, werden automatisch entfernt, wenn der [destructor](api/method/destructor.md) aufgerufen wird.

Properties of settings object 
-----------------------  
Das settings-Objekt kann zwei Eigenschaften enthalten:

1\. **id** - (*string*) eine eindeutige Kennung für den Event-Handler 

Dies ermöglicht das einfache Entfernen eines bestimmten Handlers von einem Event:

~~~js
scheduler.attachEvent("onClick", function(){  
    console.log("event click");  
}, {id: "my-click"}); /*!*/
... //später:  
gantt.detachEvent("my-click");  
~~~

2\. **once** - (*boolean*) gibt an, ob das Event nur einmal ausgeführt werden soll 

Setze dies auf *true*, um nur das erste Auftreten des Events zu behandeln, so:

~~~js
scheduler.attachEvent("onClick", function(){  
    console.log("capture next event click");  
    return true;  
}, {once: true}); /*!*/
~~~

### Related API
- [detachEvent](api/method/detachevent.md)
