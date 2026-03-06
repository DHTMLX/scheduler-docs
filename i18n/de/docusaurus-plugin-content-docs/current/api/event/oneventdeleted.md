---
sidebar_label: "onEventDeleted"
title: "onEventDeleted event"
description: "Wird ausgelöst unmittelbar nachdem ein Event gelöscht wurde (verfügbar ab Version 3.0+)"
---

# onEventDeleted

### Description

@short: Wird ausgelöst unmittelbar nachdem ein Event gelöscht wurde (verfügbar ab Version 3.0+)

@signature: onEventDeleted: (id: string, ev: object) =\> void;

### Parameters

- `id` - (required) *string* - die ID des Events
- `ev` - (required) *object* - das Event-Objekt

### Example

~~~jsx
scheduler.attachEvent("onEventDeleted", function(id,ev){
    // benutzerdefinierter Code
});
~~~

### Related samples
- [Highlighted timespans in Month view](https://docs.dhtmlx.com/scheduler/samples/09_api/07_highlighted_timespans_month_view.html)

### Details

Dieses Event wird ausgelöst, unabhängig davon, ob die DataProcessor-Bibliothek verwendet wird oder nicht.
