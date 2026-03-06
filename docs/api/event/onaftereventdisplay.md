---
sidebar_label: onAfterEventDisplay
title: "onAfterEventDisplay event"
description: "fires when the scheduler switches views, days, time etc. to show the event specified by the 'showEvent' method and fires AFTER the event is displayed"
---

# onAfterEventDisplay

### Description

@short: Fires when the scheduler switches views, days, time etc. to show the event specified by the 'showEvent' method and fires AFTER the event is displayed

@signature: onAfterEventDisplay: (event: object, string: view) =\> void

### Parameters

- `event` - (required) *object* - the event's object
- `view` - (required) *string* - the name of a view used to display the event

### Example

~~~jsx
scheduler.attachEvent("onAfterEventDisplay", function(event,view){
    //any custom logic here
});
~~~

### Related API
- [onBeforeEventDisplay](api/event/onbeforeeventdisplay.md)
