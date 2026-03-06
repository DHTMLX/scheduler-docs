---
sidebar_label: onConfirmedBeforeEventDelete
title: "onConfirmedBeforeEventDelete event"
description: "fires after the user clicks on the delete button and confirms the deletion (in the event's bar or details window)"
---

# onConfirmedBeforeEventDelete

### Description

@short: Fires after the user clicks on the delete button and confirms the deletion (in the event's bar or details window)

@signature: onConfirmedBeforeEventDelete: (id: string, e: Event) =\> boolean;

### Parameters

- `id` - (required) *string* - the event's id
- `e` - (required) *Event* - a native event object

### Returns
- ` result` - (boolean) - defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>)

### Example

~~~jsx
scheduler.attachEvent("onConfirmedBeforeEventDelete", function(id,e){
    //any custom logic here
    return true;
});
~~~

### Details

The event is blockable. Return *false* to cancel the default processing.
