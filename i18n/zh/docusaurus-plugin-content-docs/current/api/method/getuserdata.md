---
sidebar_label: "getUserData"
title: "getUserData method"
description: "获取与特定事件关联的用户数据"
---

# getUserData

### Description

@short: 获取与特定事件关联的用户数据

@signature: getUserData: (id: string, name: string) =\> any

### Parameters

- `id` - (required) *string* - 事件的 ID
- `name` - (required) *string* - 用户数据的名称

### Returns
- `value` - (any) - 用户数据的值

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
