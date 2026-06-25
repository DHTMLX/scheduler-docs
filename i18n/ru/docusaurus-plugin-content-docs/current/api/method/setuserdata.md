---
sidebar_label: setUserData
title: "setUserData метод"
description: "устанавливает пользовательские данные, связанные с указанным событием"
---

# setUserData

### Description

@short: Устанавливает пользовательские данные, связанные с указанным событием

@signature: setUserData: (id: string, name: string, value: any) =\> void

### Parameters

- `id` - (required) *string* - идентификатор события
- `name` - (required) *string* - имя пользовательских данных
- `value` - (required) *any* - значение пользовательских данных

### Example

~~~jsx
const eventId = scheduler.addEvent({
    start_date: "16-06-2027 09:00",
    end_date:   "16-06-2027 12:00",
    text:   "Meeting"
});

scheduler.setUserData(eventId, "holder", "John");
scheduler.setUserData(eventId, "room", 5);
~~~ 

### Related API
- [getUserData](api/method/getuserdata.md)