---
sidebar_label: "showEvent"
title: "showEvent method"
description: "현재 또는 선택된 뷰에서 지정된 이벤트를 표시하고 하이라이트합니다."
---

# showEvent

### Description

@short: 현재 또는 선택된 뷰에서 지정된 이벤트를 표시하고 하이라이트합니다.

@signature: showEvent: (id: string, view?: string) =\> void

### Parameters

- `id` - (required) *string* - 이벤트의 id
- `view` - (optional) *string* - 뷰 이름

### Example

~~~jsx
// 'id=someId'인 이벤트를 주간(week) 뷰에 표시합니다.
scheduler.showEvent(someId,"week");

// 'id=someId'인 이벤트를 현재 활성화된 뷰에 표시합니다.
scheduler.showEvent(someId);
~~~

### Related samples
- [Making an event currently displayable](https://docs.dhtmlx.com/scheduler/samples/09_api/08_show_event.html)

### Details

- 기본 뷰 이름은 'day', 'week', 'month'입니다. 다른 뷰를 사용하려면 해당 뷰의 **이름**을 파라미터로 제공하세요.
- 이 메서드는 [onBeforeEventDisplay](api/event/onbeforeeventdisplay.md) 와 [onAfterEventDisplay](api/event/onaftereventdisplay.md) 이벤트를 발생시킵니다.


예를 들어, 프로그래밍 방식으로 새 이벤트를 추가한 후 다음과 같이 스케줄러에 표시할 수 있습니다:

~~~js
var eventId = scheduler.addEvent({
    start_date: "08-06-2013 09:00",
    end_date:   "08-06-2013 11:00",
    text:   "Meeting"
});
...
scheduler.showEvent(eventId);
~~~
![showEvent_method](/img/showEvent_method.png)
