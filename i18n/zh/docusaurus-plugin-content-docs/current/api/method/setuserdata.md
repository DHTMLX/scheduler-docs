---
sidebar_label: "setUserData"
title: "setUserData method"
description: "将用户数据分配给特定事件"
---

# setUserData

### Description

@short: 将用户数据分配给特定事件

@signature: setUserData: (id: string, name: string, value: any) =\> void

### Parameters

- `id` - (required) *string* - 事件的唯一标识符
- `name` - (required) *string* - 用户数据的键
- `value` - (required) *any* - 与用户数据键关联的值

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
