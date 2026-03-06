---
sidebar_label: "getUserData"
title: "getUserData method"
description: "ruft die Benutzerdaten ab, die mit einem bestimmten Event verknüpft sind"
---

# getUserData

### Description

@short: Ruft die Benutzerdaten ab, die mit einem bestimmten Event verknüpft sind

@signature: getUserData: (id: string, name: string) =\> any

### Parameters

- `id` - (required) *string* - die ID des Events
- `name` - (required) *string* - der Name der Benutzerdaten

### Returns
- `value` - (any) - der Wert der Benutzerdaten

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
