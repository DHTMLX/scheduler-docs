---
sidebar_label: "setEventText"
title: "setEventText method"
description: "특정 이벤트의 텍스트를 업데이트합니다"
---

# setEventText
:::warning 
이 기능은 더 이상 지원되지 않습니다.
:::
### Description

@short: 특정 이벤트의 텍스트를 업데이트합니다

@signature: setEventText: (id: string, text: string) =\> void

### Parameters

- `id` - (required) *string* - 이벤트의 고유 식별자
- `text` - (required) *string* - 업데이트할 이벤트의 텍스트 내용

### Example

~~~jsx
var eventId = scheduler.addEvent({
    start_date: new Date(2013,1,10),
    end_date:   new Date(2013,1,13),
    text:   "Conference"
});
...
scheduler.getEvent(eventId).text = "Meeting";
scheduler.updateEvent(eventId);
~~~

### Related API
- [getEventText](api/method/geteventtext.md)
