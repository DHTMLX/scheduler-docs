---
sidebar_label: "unselect"
title: "unselect method"
description: "지정된 이벤트에서 선택을 제거합니다."
---

# unselect

### Description

@short: 지정된 이벤트에서 선택을 제거합니다.

@signature: unselect: (id?: string) =\> void

### Parameters

- `id` - (optional) *string* - 이벤트의 ID (ID가 제공되지 않으면 현재 선택된 이벤트의 선택이 해제됩니다)

### Example

~~~jsx
var eventId = scheduler.addEvent({
    start_date: "16-06-2013 09:00",
    end_date:   "16-06-2013 12:00",
    text:   "Meeting"
});

scheduler.select(eventId);

scheduler.unselect();
~~~

### Related API
- [select](api/method/select.md)
