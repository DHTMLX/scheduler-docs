---
sidebar_label: onAfterEventShow
title: "onAfterEventShow event"
description: "fires after the scheduler shows an event requested by the 'showEvent' method"
---

# onAfterEventShow

### Description

@short: Fires after the scheduler shows an event requested by the 'showEvent' method

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

### Related API

- [onBeforeEventShow](api/event/onbeforeeventshow.md)