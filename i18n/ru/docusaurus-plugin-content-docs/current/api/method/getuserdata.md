---
sidebar_label: getUserData
title: "getUserData метод"
description: "Получает данные пользователя, связанные с указанным событием"
---

# getUserData

### Description

@short: Получает данные пользователя, связанные с указанным событием

@signature: getUserData: (id: string, name: string) =\> any

### Parameters

- `id` - (required) *string* - идентификатор события
- `name` - (required) *string* - имя данных пользователя

### Returns
- `value` - (any) - значение данных пользователя

### Example

~~~jsx
const eventId = scheduler.addEvent({
    start_date: "16-06-2027 09:00",
    end_date:   "16-06-2027 12:00",
    text:   "Meeting"
});

scheduler.setUserData(eventId, "holder", "John");
...
scheduler.getUserData(eventId, "holder");// ->"John"
~~~

### Related API
- [setUserData](api/method/setuserdata.md)