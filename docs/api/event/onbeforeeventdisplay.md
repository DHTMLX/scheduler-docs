---
sidebar_label: onBeforeEventDisplay
title: "onBeforeEventDisplay event"
description: "fires when the 'showEvent' method is called to show a specific event and fires BEFORE the event is displayed"
---

# onBeforeEventDisplay

### Description

@short: Fires when the 'showEvent' method is called to show a specific event and fires BEFORE the event is displayed

@signature: onBeforeEventDisplay: (event: object, view: string) =\> boolean

### Parameters

- `event` - (required) *object* - the event's object
- `view` - (required) *string* - the name of a view used to display the event

### Returns
- ` result` - (boolean) - defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>)

### Example

~~~jsx
scheduler.attachEvent("onBeforeEventDisplay", function(event,view){
    //any custom logic here
    return true;
});
~~~

### Related API
- [onAfterEventDisplay](api/event/onaftereventdisplay.md)
