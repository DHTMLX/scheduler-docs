---
sidebar_label: getUserData
title: "getUserData method"
description: "gets the user data associated with the specified event"
---

# getUserData

### Description

@short: Gets the user data associated with the specified event

@signature: getUserData: (id: string, name: string) =\> any

### Parameters

- `id` - (required) *string* - the event's id
- `name` - (required) *string* - the user data name

### Returns
- `value` - (any) - the user data value

### Example

~~~jsx
var eventId = scheduler.addEvent({
    start_date: "16-06-2013 09:00",
    end_date:   "16-06-2013 12:00",
    text:   "Meeting"
});

scheduler.setUserData(eventId, "holder", "John");
...
scheduler.getUserData(eventId, "holder");// ->"John"
~~~

### Related API
- [setUserData](api/method/setuserdata.md)
