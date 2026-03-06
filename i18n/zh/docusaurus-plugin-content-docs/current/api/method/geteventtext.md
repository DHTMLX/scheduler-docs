---
sidebar_label: "getEventText"
title: "getEventText method"
description: "获取与事件关联的文本"
---

# getEventText
:::warning 
此功能已棄用。
:::
### Description

@short: 获取与事件关联的文本

@signature: getEventText: (id: string) =\> string

### Parameters

- `id` - (required) *string* - 事件的标识符

### Returns
- ` start_date` - (string) - 事件的文本内容

### Example

~~~jsx
var eventId = scheduler.addEvent({
    start_date: "16-05-2013 09:00",
    end_date:   "16-05-2013 12:00",
    text:   "Meeting"
});
...
scheduler.getEvent(eventId).text; // -> "Meeting"
~~~

### Related API
- [getEventEndDate](api/method/geteventenddate.md)
- [getEventStartDate](api/method/geteventstartdate.md)
