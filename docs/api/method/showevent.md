---
sidebar_label: showEvent
title: "showEvent method"
description: "shows and highlights the specified event in the current or specified view"
---

# showEvent

### Description

@short: Shows and highlights the specified event in the current or specified view

@signature: showEvent: (id: string, view?: string) =\> void

### Parameters

- `id` - (required) *string* - the event's id
- `view` - (optional) *string* - the view name

### Example

~~~jsx
//shows the event with 'id=someId' in the Week view
scheduler.showEvent(someId,"week");

//shows the event with 'id=someId' in the currently active view
scheduler.showEvent(someId);
~~~

### Related samples
- [Making an event currently displayable](https://docs.dhtmlx.com/scheduler/samples/09_api/08_show_event.html)

### Details

- The names for default views are 'day', 'week', 'month'. To specify any other view - use its **name** parameter.
- The method invokes the [onBeforeEventDisplay](api/event/onbeforeeventdisplay.md) and [onAfterEventDisplay](api/event/onaftereventdisplay.md) events.


For example, you programmatically add a new event and want to show it in the scheduler:

~~~js
var eventId = scheduler.addEvent({
    start_date: "08-06-2013 09:00",
    end_date:   "08-06-2013 11:00",
    text:   "Meeting"
});
...
scheduler.showEvent(eventId);
~~~
![showEvent_method](/img/showEvent_method.png)
