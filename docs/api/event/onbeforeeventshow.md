---
sidebar_label: onBeforeEventShow
title: "onBeforeEventShow event"
description: "fires when the 'showEvent' method is called and before the event is shown"
---

# onBeforeEventShow

### Description

@short: Fires when the 'showEvent' method is called and before the event is shown

@signature: onBeforeEventShow: (event: object, view: string) =\> boolean

### Parameters

- `event` - (required) *object* - the event's object
- `view` - (required) *string* - the name of a view used to show the event

### Returns

- `result` - (boolean) - defines whether the event will be shown (`true`) or the action will be cancelled (`false`)

### Example

~~~jsx
scheduler.attachEvent("onBeforeEventShow", function(event, view){
    return true;
});
~~~

### Related API

- [onAfterEventShow](api/event/onaftereventshow.md)