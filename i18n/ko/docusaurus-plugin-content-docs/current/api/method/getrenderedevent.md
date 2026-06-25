---
sidebar_label: "getRenderedEvent"
title: "getRenderedEvent method"
description: "현재 표시되고 있는 이벤트의 HTML 요소를 반환합니다."
---

# getRenderedEvent

### Description

@short: 현재 표시되고 있는 이벤트의 HTML 요소를 반환합니다.

@signature: getRenderedEvent: (id: string) =\> HTMLElement

### Parameters

- `id` - (required) *string* - 이벤트의 ID

### Returns
- `event` - (HTMLElement) - **이벤트의 HTML 요소** - 스케줄러에서 이벤트가 보이는 경우 반환됩니다. <br> **'null'** - 메서드 호출 시 이벤트가 스케줄러에 보이지 않는 경우 반환됩니다.

### Example

~~~jsx
const eventId = scheduler.addEvent({
    start_date: "16-05-2027 09:00",
    end_date:   "16-05-2027 12:00",
    text:   "Meeting"
});
const eventObj = scheduler.getRenderedEvent(eventId);
//-> <div event_id="123649234723" ...>09:00 Meeting</div>
~~~

### Details

:::note

버전 3.5부터 사용 가능합니다.
 
:::
