---
sidebar_label: "setUserData"
title: "setUserData method"
description: "назначает пользовательские данные для конкретного события"
---

# setUserData

### Description

@short: Назначает пользовательские данные для конкретного события

@signature: setUserData: (id: string, name: string, value: any) =\> void

### Parameters

- `id` - (required) *string* - уникальный идентификатор события
- `name` - (required) *string* - ключ для пользовательских данных
- `value` - (required) *any* - значение, которое будет связано с ключом пользовательских данных

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
