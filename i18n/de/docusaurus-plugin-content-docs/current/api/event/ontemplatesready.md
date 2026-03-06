---
sidebar_label: "onTemplatesReady"
title: "onTemplatesReady event"
description: "wird ausgelöst, wenn die Scheduler-Templates initialisiert wurden"
---

# onTemplatesReady

### Description

@short: Wird ausgelöst, wenn die Scheduler-Templates initialisiert wurden

@signature: onTemplatesReady: () =\> void

### Example

~~~jsx
scheduler.attachEvent("onTemplatesReady", function(){
    //benutzerdefinierte Logik hier platzieren
});
~~~

### Related samples
- [Custom view](https://docs.dhtmlx.com/scheduler/samples/02_customization/07_custom_view.html)
- [Pointer highlighting](https://docs.dhtmlx.com/scheduler/samples/09_api/05_mouse_over_highlight.html)

### Details

Dieses Event signalisiert, dass die Templates des Schedulers vollständig vorbereitet sind.

Es wird empfohlen, jeglichen Code zur Erstellung benutzerdefinierter Views innerhalb des **onTemplatesReady** Event-Handlers zu platzieren. Dadurch wird sichergestellt, dass die Templates für die benutzerdefinierte View bereitstehen, bevor der Scheduler initialisiert wird, sodass die benutzerdefinierte View korrekt auf der Seite angezeigt wird.
