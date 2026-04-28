--- 
sidebar_label: attachEvent
title: "attachEvent-Methode"
description: "bindet den Handler an ein internes Ereignis des dhtmlxScheduler"
---

# attachEvent

### Description

@short: Bindet den Handler an ein internes Ereignis des dhtmlxScheduler

@signature: attachEvent: (name: SchedulerEventName, handler: SchedulerCallback, settings?: any) =\> string

### Parameters

- `name` - (required) *SchedulerEventName* - der Name des Ereignisses, Groß-/Kleinschreibung wird ignoriert
- `handler` - (required) *Funktion* - die Handler-Funktion
- `settings` - (optional) *object* - optional, ein [Objekt mit Einstellungen](#properties-of-settings-object) für den Event-Handler

### Returns
- `event` - (string) - die ID des angehängten Event-Handlers

### Example

~~~jsx
scheduler.attachEvent("onEventSave", (id, ev) => {
    if (!ev.text) {
        alert("Text must not be empty");
        return false;
    }
    return true;
});
~~~

### Related samples
- [Validierung von Lightbox-Feldern](https://docs.dhtmlx.com/scheduler/samples/02_customization/08_validation.html)
- [Wiederkehrende Ereignisse](https://docs.dhtmlx.com/scheduler/samples/03_extensions/01_recurring_events.html)

### Details

Sie können mehrere Handler für dasselbe Ereignis anhängen, und alle werden ausgeführt.
Wenn einige der Handler `false` zurückgeben, wird die entsprechende Operation blockiert.
Ereignis-Handler werden in derselben Reihenfolge verarbeitet, in der sie angehängt wurden.

Alle Event-Listener, die mit [`event()`](api/method/event.md) angehängt wurden, werden automatisch entfernt, wenn [`destructor()`](api/method/destructor.md) aufgerufen wird.

## Eigenschaften des Settings-Objekts

Das Settings-Objekt kann zwei Eigenschaften enthalten:

1\. `id` - (*string*) die ID des Event-Handlers

Beispiel: Du kannst einen Handler einfach vom angegebenen Event trennen:

~~~js {3}
scheduler.attachEvent("onClick", () => {
    console.log("event click");
}, { id: "my-click" });
// nach einer Weile:
scheduler.detachEvent("my-click");
~~~

2\. `once` - (*boolean*) definiert, ob das Event nur einmal ausgeführt wird

Setze die Eigenschaft auf *true*, wenn du beim ersten Auslösen des Events den ersten Trigger erfassen möchtest, wie in:

~~~js {4}
scheduler.attachEvent("onClick", () => {
    console.log("capture next event click");
    return true;
}, { once: true });
~~~

### Related API
- [detachEvent](api/method/detachevent.md)