---
sidebar_label: setEvent
title: "setEvent method"
description: "adds a new event to the scheduler's data pool"
---

# setEvent

### Description

@short: Adds a new event to the scheduler's data pool

@signature: setEvent: (id: string|number, event: any) =\> void

### Parameters

- `id` - (required) *string | number* -     the event's id
- `event` - (required) *object* - the event object

### Example

~~~jsx
scheduler.setEvent(1, {
    start_date: new Date(2027, 05, 16, 09, 00),
    end_date:   new Date(2027, 05, 16, 12, 00),
    text:   "Meeting",
    holder: "John", 
    room:   "5"     
});
scheduler.setCurrentView();
~~~

### Details

The method is similar to [addEvent](api/method/addevent.md).

The difference between the **setEvent()** and **addEvent()** methods is:

- The [addEvent](api/method/addevent.md) draws the event in the scheduler and invokes the [onEventAdded](api/event/oneventadded.md) / [onEventChanged](api/event/oneventchanged.md) events that can trigger  updating 
data in the original data source (e.g. database).
- The **setEvent()** method doesn't invoke any events and just adds an event to  the data pool. To draw the event in the scheduler you should call 
the [setCurrentView](api/method/setcurrentview.md) method additionally.

### Related API
- [setCurrentView](api/method/setcurrentview.md)
- [addEvent](api/method/addevent.md)
- [onEventAdded](api/event/oneventadded.md)
- [onEventChanged](api/event/oneventchanged.md)

### Related Guides
- [Adding/Deleting Events](guides/adding-events.md)
