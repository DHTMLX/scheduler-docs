---
sidebar_label: setUserData
title: "setUserData method"
description: "sets the user data associated with the specified event"
---

# setUserData

### Description

@short: Sets the user data associated with the specified event

@signature: setUserData: (id: string, name: string, value: any) =\> void

### Parameters

- `id` - (required) *string* - the event's id
- `name` - (required) *string* - the user data name
- `value` - (required) *any* - the user data value

### Example

~~~jsx
var eventId = scheduler.addEvent({
    start_date: "16-06-2013 09:00",
    end_date:   "16-06-2013 12:00",
    text:   "Meeting"
});

scheduler.setUserData(eventId, "holder", "John");
scheduler.setUserData(eventId, "room", 5);
~~~

### Related API
- [getUserData](api/method/getuserdata.md)
