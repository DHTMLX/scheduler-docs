---
sidebar_label: checkEvent
title: "checkEvent method"
description: "checks whether an event has some handler(s) specified"
---

# checkEvent

### Description

@short: Checks whether an event has some handler(s) specified

@signature: checkEvent: (name: SchedulerEventName) =\> boolean

### Parameters

- `name` - (required) *SchedulerEventName* - the event's name

### Returns
- `isExist` - (boolean) - returns <i>true</i>, if some handler is specified for the event

### Example

~~~jsx
scheduler.attachEvent("onEventSave",function(id,data){
    if (data.text.length<20) {
        alert("Text too small");
        return false;
    }
    return true;
})
...        
scheduler.checkEvent("onEventSave"); //returns 'true'
~~~

### Related API
- [attachEvent](api/method/attachevent.md)
