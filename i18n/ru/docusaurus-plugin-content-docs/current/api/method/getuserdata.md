---
sidebar_label: "getUserData"
title: "getUserData method"
description: "получает пользовательские данные, связанные с конкретным событием"
---

# getUserData

### Description

@short: Получает пользовательские данные, связанные с конкретным событием

@signature: getUserData: (id: string, name: string) =\> any

### Parameters

- `id` - (required) *string* - id события
- `name` - (required) *string* - название пользовательских данных

### Returns
- `value` - (any) - значение пользовательских данных

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
