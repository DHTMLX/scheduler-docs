---
sidebar_label: "onEventCreated"
title: "onEventCreated event"
description: "wird ausgelöst, wenn ein Benutzer beginnt, ein neues Event zu erstellen (entweder durch Doppelklick oder Drag & Drop)"
---

# onEventCreated

### Description

@short: Wird ausgelöst, wenn ein Benutzer beginnt, ein neues Event zu erstellen (entweder durch Doppelklick oder Drag & Drop)

@signature: onEventCreated: (id: string, e: Event) =\> void;

### Parameters

- `id` - (required) *string* - die eindeutige Kennung des Events
- `e` - (required) *Event* - das native Event-Objekt

### Example

~~~jsx
scheduler.attachEvent("onEventCreated", function(id,e){
    //hier kann benutzerdefinierte Logik hinzugefügt werden
});
~~~
