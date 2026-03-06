---
sidebar_label: "updateEvent"
title: "updateEvent method"
description: "지정된 이벤트를 수정합니다."
---

# updateEvent

### Description

@short: 지정된 이벤트를 수정합니다.

@signature: updateEvent: (id: string) =\> void

### Parameters

- `id` - (required) *string* - 이벤트의 id

### Example

~~~jsx
var eventId = scheduler.addEvent({
    start_date: "16-06-2013 09:00",
    end_date:   "16-06-2013 12:00",
    text:   "Meeting"
});
 
scheduler.getEvent(eventId).text = "Conference"; // 이벤트 세부 정보를 업데이트합니다.
scheduler.getEvent(id).start_date = new Date();   // 시작 날짜를 변경합니다.
scheduler.updateEvent(id);   // 업데이트된 이벤트를 다시 그립니다.
~~~

### Related samples
- [Recurring events](https://docs.dhtmlx.com/scheduler/samples/03_extensions/01_recurring_events.html)
- [Creating message boxes](https://docs.dhtmlx.com/scheduler/samples/09_api/02_dhtmlx_message.html)

### Related API
- [getEvent](api/method/getevent.md)

### Related Guides
- ["Server-Side Integration"](guides/server-integration.md)
