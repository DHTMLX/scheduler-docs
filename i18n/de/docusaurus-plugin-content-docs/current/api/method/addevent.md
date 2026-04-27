---
sidebar_label: "addEvent"
title: "addEvent method"
description: "fügt ein neues Event hinzu"
---

# addEvent

### Description

@short: Fügt ein neues Event hinzu

@signature: addEvent: (event: any) =\> string

### Parameters

- `event` - (required) *object* - Das Event-Objekt

### Returns
- ` id` - (string) - Die ID des Events

### Example

~~~jsx
scheduler.addEvent({
    start_date: "16-06-2027 09:00",
    end_date:    "16-06-2027 12:00",
    text:    "Meeting",
    holder:    "John", // userdata
    room:    "5"     // userdata
});
~~~

### Related samples
- [Validating lightbox fields](https://docs.dhtmlx.com/scheduler/samples/02_customization/08_validation.html)
- [Custom event box](https://docs.dhtmlx.com/scheduler/samples/02_customization/27_custom_event_box.html)

### Details

:::note
  
Die Methode löst das Event [onEventAdded](api/event/oneventadded.md) oder [onEventChanged](api/event/oneventchanged.md) aus 
 
:::

Das Event-Objekt kann die folgenden Eigenschaften enthalten:

- **start_date** - (*Date,string*) Das Datum, an dem das Event beginnt. Wird es als String angegeben, muss es das Format "%d-%m-%Y %H:%i" haben (um das Standardformat anzupassen, siehe die Option in [api_date](api/config/api_date.md)). Für [wiederkehrende Events](guides/recurring-events.md) muss **start_date** vom Typ Date sein.  
- **end_date** - (*Date,string*) Das Datum, an dem das Event endet. Wird es als String angegeben, muss es das Format "%d-%m-%Y %H:%i" verwenden (zur Anpassung des Standardformats siehe die Option in [api_date](api/config/api_date.md)). Für [wiederkehrende Events](guides/recurring-events.md) muss **end_date** vom Typ Date sein.  
- **text** - (*string*) Die Beschreibung des Events.  
- **id** - (*string*) Die ID des Events. Wird sie weggelassen, wird automatisch eine ID generiert.  
- **userdata** - (*hash*) Eine Sammlung benutzerdefinierter Eigenschaften als 'key-value'-Paare.

### Related API
- [api_date](api/config/api_date.md)
- [addEventNow](api/method/addeventnow.md)
- [deleteEvent](api/method/deleteevent.md)

### Related Guides
- [Hinzufügen/Löschen von Ereignissen](guides/adding-events.md)
