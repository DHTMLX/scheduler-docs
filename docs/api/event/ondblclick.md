---
sidebar_label: onDblClick
title: "onDblClick event"
description: "fires when the user double clicks on an event"
---

# onDblClick

### Description

@short: Fires when the user double clicks on an event

@signature: onDblClick: (id: string, e: Event) =\> boolean;

### Parameters

- `id` - (required) *string* - the event's id
- `e` - (required) *Event* - a native event object

### Returns
- ` result` - (boolean) - defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>)

### Example

~~~jsx
scheduler.attachEvent("onDblClick", function (id, e){
    //any custom logic here
    return true;
})
~~~

### Details

The event is blockable. Return *false* to cancel the default behaviour.
