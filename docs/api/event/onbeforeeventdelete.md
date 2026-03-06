---
sidebar_label: onBeforeEventDelete
title: "onBeforeEventDelete event"
description: "fires after the user clicks on the delete button (in the event bar or details window)"
---

# onBeforeEventDelete

### Description

@short: Fires after the user clicks on the delete button (in the event bar or details window)

@signature: onBeforeEventDelete: (id: string, ev: object) =\> boolean

### Parameters

- `id` - (required) *string* - the event's id
- `ev` - (required) *object* - the event's data object

### Returns
- ` result` - (boolean) - defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>)

### Example

~~~jsx
scheduler.attachEvent("onBeforeEventDelete", function(id,ev){
    //any custom logic here
    return true;
});
~~~

### Details

The event is blockable. Return *false* to cancel the default processing.
