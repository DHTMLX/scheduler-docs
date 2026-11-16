---
sidebar_label: onAfterEventShow
title: "onAfterEventShow event"
description: "fires after the scheduler shows an event requested by the 'showEvent' method"
---

# onAfterEventShow

### Description

@short: Fires after the scheduler shows an event requested by the `showEvent` method

@signature: onAfterEventShow: (event: object, view: string) =\> void

### Parameters

- `event` - (required) *object* - the event's object
- `view` - (required) *string* - the name of the view used to show the event

### Example

~~~jsx
scheduler.attachEvent("onAfterEventShow", function(event, view){
    // any custom logic here
});
~~~

### Details

The event belongs to the `showEvent()` lifecycle and fires after Scheduler has switched to the view that contains the requested event.

### Migration from v7.2

This event replaces the former `onAfterEventDisplay(event, view)` lifecycle event. Rename the event to `onAfterEventShow`; its `(event, view)` arguments remain unchanged.

### Related API

- [showEvent](api/method/showevent.md)
- [onBeforeEventShow](api/event/onbeforeeventshow.md)
- [Migration from v7.2 to v8.0](migration.md#event-display-and-showevent-lifecycle-events)