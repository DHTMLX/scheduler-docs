---
sidebar_label: onBeforeEventDisplay
title: "onBeforeEventDisplay event"
description: "fires before an event is rendered and allows preventing its display"
---

# onBeforeEventDisplay

### Description

@short: Fires before an event is rendered and allows preventing its display

@signature: onBeforeEventDisplay: (id: string | number, event: object) =\> boolean

### Parameters

- `id` - (required) *string | number* - the event's id
- `event` - (required) *object* - the event's object

### Returns
- ` result` - (boolean) - defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>)

### Example

~~~jsx
scheduler.attachEvent("onBeforeEventDisplay", function(id, event){
    return event.priority !== "low";
});
~~~

### Details

The event is called for every event considered for rendering, including events in the mini calendar. Return `false` to hide the event. If several handlers are attached, all of them must return `true` for the event to be displayed.

### Related API
- [onBeforeEventShow](api/event/onbeforeeventshow.md)
- [onAfterEventShow](api/event/onaftereventshow.md)