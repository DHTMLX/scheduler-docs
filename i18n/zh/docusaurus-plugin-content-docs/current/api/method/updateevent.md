---
sidebar_label: "updateEvent"
title: "updateEvent method"
description: "修改指定的事件"
---

# updateEvent

### Description

@short: 修改指定的事件

@signature: updateEvent: (id: string) =\> void

### Parameters

- `id` - (required) *string* - 事件的 id

### Example

~~~jsx
var eventId = scheduler.addEvent({
    start_date: "16-06-2013 09:00",
    end_date:   "16-06-2013 12:00",
    text:   "Meeting"
});
 
scheduler.getEvent(eventId).text = "Conference"; // 更新事件的详情
scheduler.getEvent(id).start_date = new Date();   // 更改开始日期
scheduler.updateEvent(id);   // 重新绘制更新后的事件
~~~

### Related samples
- [Recurring events](https://docs.dhtmlx.com/scheduler/samples/03_extensions/01_recurring_events.html)
- [Creating message boxes](https://docs.dhtmlx.com/scheduler/samples/09_api/02_dhtmlx_message.html)

### Related API
- [getEvent](api/method/getevent.md)

### Related Guides
- [Server-Side Integration](guides/server-integration.md#triggeringdatasavingfromscript)
