---
sidebar_label: "event"
title: "event method"
description: "richtet einen Event-Handler an einem HTML-Element ein"
---

# event

### Description

@short: Richtet einen Event-Handler an einem HTML-Element ein

@signature: event: (node: HTMLElement|string, event: string, handler: SchedulerCallback, master?: any) =\> string

### Parameters

- `node` - (required) *HTMLElement | string* - das HTML-Element oder dessen ID
- `event` - (required) *string* - der Name des HTML-Events (ohne das Präfix 'on')
- `handler` - (required) *function* - die Funktion, die das Event behandelt
- `master` - (optional) *object* - das Objekt, auf das sich <i>this</i> innerhalb des Handlers bezieht

### Returns
- ` id` - (string) - die ID des Event-Handlers (kann mit der Methode <b>eventRemove()</b> verwendet werden)

### Example

~~~jsx
// hängt einen Handler für das 'click' Event an
scheduler.event("divId", "click", function(e){
    //e - das native Event-Objekt
    do_something();
});
~~~

### Details

Alle mit **event** hinzugefügten Event-Listener werden automatisch entfernt, wenn der [destructor](api/method/destructor.md) aufgerufen wird.

### Related API
- [eventRemove](api/method/eventremove.md)

### Change log
- hinzugefügt in Version 4.4
