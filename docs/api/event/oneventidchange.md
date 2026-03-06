---
sidebar_label: onEventIdChange
title: "onEventIdChange event"
description: "fires when the id of an event is changed"
---

# onEventIdChange

### Description

@short: Fires when the id of an event is changed

@signature: onEventIdChange: (old_id: string, new_id: string) =\> void;

### Parameters

- `old_id` - (required) *string* - the initial event's id    
- `new_id` - (required) *string* - a new event's id

### Example

~~~jsx
scheduler.attachEvent("onEventIdChange", function(old_id,new_id){
    //any custom logic here
});
~~~

### Details

Normally, the event occurs after receiving confirmation for the insert operation (changing the client-side ID to DB's ID )
