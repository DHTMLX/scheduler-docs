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

The event fires for every event considered for rendering, including recurring occurrences and events used for mini-calendar marks. It runs in addition to the current view's `filter_<view>` function.

You can attach more than one `onBeforeEventDisplay` handler. An event is displayed only when the view filter and every attached handler return `true`. Detaching one handler does not affect the others.

### Migration from v7.2

In v7.2, `onBeforeEventDisplay(event, view)` belonged to the `showEvent()` lifecycle. In v8.0, use [onBeforeEventShow](api/event/onbeforeeventshow.md) for that behavior. The v8.0 `onBeforeEventDisplay` event is the rendering predicate documented on this page and receives `(id, event)`.

### Related API
- [onBeforeEventShow](api/event/onbeforeeventshow.md)
- [onAfterEventShow](api/event/onaftereventshow.md)