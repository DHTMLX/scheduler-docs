---
sidebar_label: "select"
title: "select method"
description: "지정한 이벤트를 선택합니다."
---

# select

### Description

@short: 지정한 이벤트를 선택합니다.

@signature: select: (id: string) =\> void;

### Parameters

- `id` - (required) *string* - 이벤트의 ID

### Example

~~~jsx
var eventId = scheduler.addEvent({
    start_date: "16-06-2013 09:00",
    end_date:   "16-06-2013 12:00",
    text:   "Meeting"
});

scheduler.select(eventId);
~~~

### Related API
- [unselect](api/method/unselect.md)
