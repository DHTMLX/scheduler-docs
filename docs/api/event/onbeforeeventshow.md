---
sidebar_label: onBeforeEventShow
title: "onBeforeEventShow event"
description: "fires before the scheduler shows an event requested by the 'showEvent' method"
---

# onBeforeEventShow

### Description

@short: Fires before the scheduler shows an event requested by the `showEvent` method

@signature: onBeforeEventShow: (event: object, view: string) =\> boolean

### Parameters

- `event` - (required) *object* - the event's object
- `view` - (required) *string* - the name of the view used to show the event

### Returns

- `result` - (boolean) - defines whether the event will be shown (`true`) or the action will be cancelled (`false`)

### Example

~~~jsx
scheduler.attachEvent("onBeforeEventShow", function(event, view){
    return true;
});
~~~

### Details

The event belongs to the `showEvent()` lifecycle. It does not run while Scheduler renders ordinary events; use [onBeforeEventDisplay](api/event/onbeforeeventdisplay.md) to filter rendered events.

### Migration from v7.2

This event replaces the former `onBeforeEventDisplay(event, view)` lifecycle event. Rename the event to `onBeforeEventShow`; its `(event, view)` arguments remain unchanged.

### Related API

- [showEvent](api/method/showevent.md)
- [onAfterEventShow](api/event/onaftereventshow.md)
- [Migration from v7.2 to v8.0](migration.md#event-display-and-showevent-lifecycle-events)