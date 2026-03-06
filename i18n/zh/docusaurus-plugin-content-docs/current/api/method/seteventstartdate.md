---
sidebar_label: "setEventStartDate"
title: "setEventStartDate method"
description: "更新事件的开始日期"
---

# setEventStartDate
:::warning 
此功能已棄用。
:::
### Description

@short: 更新事件的开始日期

@signature: setEventStartDate: (id: string, date: Date) =\> void

### Parameters

- `id` - (required) *string* - 事件的ID
- `date` - (required) *Date* - 事件的新开始日期

### Example

~~~jsx
var eventId = scheduler.addEvent({
    start_date: new Date(2013,1,10),
    end_date:   new Date(2013,1,13),
    text:   "Conference"
});
...
scheduler.getEvent(eventId).start_date = new Date(2013,1,09);
scheduler.updateEvent(eventId);
~~~

### Related API
- [setEventEndDate](api/method/seteventenddate.md)
