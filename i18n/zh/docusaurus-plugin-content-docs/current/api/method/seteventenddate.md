---
sidebar_label: "setEventEndDate"
title: "setEventEndDate method"
description: "更新事件的结束日期"
---

# setEventEndDate
:::warning 
此功能已棄用。
:::
### Description

@short: 更新事件的结束日期

@signature: setEventEndDate: (id: string, date: Date) =\> void

### Parameters

- `id` - (required) *string* - 事件的唯一标识符
- `date` - (required) *Date* - 事件更新后的结束日期

### Example

~~~jsx
var eventId = scheduler.addEvent({
    start_date: new Date(2013,1,10),
    end_date:   new Date(2013,1,13),
    text:   "Conference"
});
...
scheduler.getEvent(eventId).end_date = new Date(2013,1,15);    
scheduler.updateEvent(eventId);
~~~

### Related API
- [setEventStartDate](api/method/seteventstartdate.md)
