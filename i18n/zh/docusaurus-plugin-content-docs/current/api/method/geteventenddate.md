---
sidebar_label: "getEventEndDate"
title: "getEventEndDate method"
description: "获取事件的结束日期"
---

# getEventEndDate
:::warning 
此功能已棄用。
:::
### Description

@short: 获取事件的结束日期

@signature: getEventEndDate: (id: string) =\> Date

### Parameters

- `id` - (required) *string* - 事件的ID

### Returns
- ` end_date` - (Date) - 事件的结束日期

### Example

~~~jsx
const eventId = scheduler.addEvent({
    start_date: "16-05-2027 09:00",
    end_date:   "16-05-2027 12:00",
    text:   "Meeting"
});
...
scheduler.getEvent(eventId).end_date; // -> Thu May 16 2027 12:00:00
~~~

### Related API
- [getEventStartDate](api/method/geteventstartdate.md)
- [getEventText](api/method/geteventtext.md)
