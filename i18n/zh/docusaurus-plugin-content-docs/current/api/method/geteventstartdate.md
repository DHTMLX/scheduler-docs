---
sidebar_label: "getEventStartDate"
title: "getEventStartDate method"
description: "获取事件的开始日期"
---

# getEventStartDate
:::warning 
此功能已棄用。
:::
### Description

@short: 获取事件的开始日期

@signature: getEventStartDate: (id: string) =\> Date

### Parameters

- `id` - (required) *string* - 事件的唯一标识符

### Returns
- ` start_date` - (Date) - 事件的开始日期和时间

### Example

~~~jsx
var eventId = scheduler.addEvent({
    start_date: "16-05-2013 09:00",
    end_date:   "16-05-2013 12:00",
    text:   "Meeting"
});
...
scheduler.getEvent(eventId).start_date; // -> Thu May 16 2013 09:00:00
~~~

### Related API
- [getEventEndDate](api/method/geteventenddate.md)
- [getEventText](api/method/geteventtext.md)
