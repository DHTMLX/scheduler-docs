---
sidebar_label: "onViewMoreClick"
title: "onViewMoreClick event"
description: "Wird ausgelöst, wenn der Benutzer im Monatsansicht auf den Link 'View more' klickt (dies gilt nur für die Monatsansicht)"
---

# onViewMoreClick

### Description

@short: Wird ausgelöst, wenn der Benutzer im Monatsansicht auf den Link 'View more' klickt (dies gilt nur für die Monatsansicht)

@signature: onViewChange: (date: object) =\> boolean

### Parameters

- `date` - (required) *object* - Das Datum der Zelle, in der der Benutzer auf den Link 'View more' geklickt hat

### Returns
- ` result` - (boolean) - Bestimmt, ob die Standardaktion des Events ausgeführt wird (<b>true</b>) oder verhindert wird (<b>false</b>)

### Example

~~~jsx
scheduler.attachEvent("onViewMoreClick", function(date){
    //Hier kann benutzerdefinierte Logik eingefügt werden
});
~~~

### Related samples
- ['View more' link in the Month view](https://docs.dhtmlx.com/scheduler/samples/02_customization/31_view_more.html)

### Details

Dieses Event kann blockiert werden. Wenn *false* zurückgegeben wird, wird verhindert, dass die Monatsansicht nach dem Klick auf den Link 'View more' zur Tagesansicht wechselt.

### Related API
- [max_month_events](api/config/max_month_events.md)
- [month_events_link](api/template/month_events_link.md)

### Related Guides
- [Monatsansicht](views/month.md#limiting-the-number-of-events-in-a-cell)
