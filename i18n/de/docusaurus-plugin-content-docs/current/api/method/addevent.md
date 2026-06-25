--- 
sidebar_label: addEvent
title: "addEvent method"
description: "fügt ein neues Ereignis hinzu"
---

# addEvent

### Description

@short: Fügt ein neues Ereignis hinzu

@signature: addEvent: (event: any) =\> string

### Parameters

- `event` - (required) *object* - das Ereignis-Objekt

### Returns
- `id` - (*string*) die Ereignis-ID

### Example

~~~jsx
scheduler.addEvent({
    start_date: "2027-06-16 09:00",
    end_date: "2027-06-16 12:00",
    text: "Meeting",
    holder: "John", // userdata
    room: "5" // userdata
});
~~~

### Related samples
- [Validierung von Lightbox-Feldern](https://docs.dhtmlx.com/scheduler/samples/02_customization/08_validation.html)
- [Benutzerdefinierte Event-Box](https://docs.dhtmlx.com/scheduler/samples/02_customization/27_custom_event_box.html)

### Details

:::note

Die Methode löst das [`onEventAdded`](api/event/oneventadded.md) oder [`onEventChanged`](api/event/oneventchanged.md) Ereignis aus.

:::  

Das Ereignis-Objekt kann folgende Eigenschaften haben:

- `start_date` - (*Date,string*) das Datum, an dem das Ereignis beginnen soll. Wenn die Eigenschaft als String angegeben wird, sollte das Format "%d-%m-%Y %H:%i" verwendet werden (um das Standardformat zu ändern, verwenden Sie die [`api_date`](api/config/api_date.md) Option). Bei [Wiederkehrenden Ereignissen](guides/recurring-events.md) muss der Wert der Eigenschaft `start_date` vom Date-Typ sein.
- `end_date` - (*Date,string*) das Datum, an dem das Ereignis voraussichtlich abgeschlossen wird. Wenn die Eigenschaft als String angegeben wird, sollte das Format "%d-%m-%Y %H:%i" verwendet werden (um das Standardformat zu ändern, verwenden Sie die [`api_date`](api/config/api_date.md) Option). Bei [Wiederkehrenden Ereignissen](guides/recurring-events.md) muss der Wert der Eigenschaft `end_date` vom Date-Typ sein.
- `text` - (*string*) der Text des Ereignisses.
- `id` - (*string*) die Ereignis-ID. Wenn nicht angegeben, wird die Ereignis-ID automatisch generiert.
- `userdata` - (*hash*) eine Sammlung benutzerdefinierter Eigenschaften, dargestellt als 'Key-Value'-Paarungen.

### Related API
- [api_date](api/config/api_date.md)
- [addEventNow](api/method/addeventnow.md)
- [deleteEvent](api/method/deleteevent.md)

### Related Guides
- [Hinzufügen/Löschen von Ereignissen](guides/adding-events.md)