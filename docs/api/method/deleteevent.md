---
sidebar_label: deleteEvent
title: "deleteEvent method"
description: "deletes the specified event"
---

# deleteEvent

### Description

@short: Deletes the specified event

@signature: deleteEvent: (id: string|number) =\> void

### Parameters

- `id` - (required) *string | number* -     the event's id

### Example

~~~jsx
scheduler.init('scheduler_here',new Date(2009,5,30),"day");
scheduler.parse([
   {id:1, start_date:"06/30/2009 09:00", end_date:"06/30/2009 12:00", text:"Task1"},
   {id:2, start_date:"06/30/2009 12:00", end_date:"06/30/2009 20:00", text:"Task2"},
   {id:3, start_date:"06/30/2009 08:00", end_date:"06/30/2009 12:00", text:"Task3"}
],"json");
...
scheduler.deleteEvent(3);
~~~

### Related samples
- [Fully custom lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/16_custom_form.html)
- [Recurring events](https://docs.dhtmlx.com/scheduler/samples/03_extensions/01_recurring_events.html)

### Details

The method can also take the second parameter:

- **silent** - (*boolean*) if set to *true*, **deleteEvent** will work only on the client-side, and won't trigger any server calls:

~~~js
// removes the specified event only from the client-side
scheduler.deleteEvent(id, true); 
~~~

Usually, the second parameter is used for server-error handling purposes.

### Related API
- [addEvent](api/method/addevent.md)
- [addEventNow](api/method/addeventnow.md)

### Related Guides
- [Adding/Deleting Events](guides/adding-events.md)
