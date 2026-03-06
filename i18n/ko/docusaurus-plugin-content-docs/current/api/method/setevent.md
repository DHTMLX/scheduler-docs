---
sidebar_label: "setEvent"
title: "setEvent method"
description: "스케줄러의 데이터 풀에 새 이벤트를 추가합니다."
---

# setEvent

### Description

@short: 스케줄러의 데이터 풀에 새 이벤트를 추가합니다.

@signature: setEvent: (id: string | number, event: any) =\> void

### Parameters

- `id` - (required) *string | number* -     이벤트의 ID
- `event` - (required) *object* - 이벤트 객체

### Example

~~~jsx
scheduler.setEvent(1, {
    start_date: new Date(2013, 05, 16, 09, 00),
    end_date:   new Date(2013, 05, 16, 12, 00),
    text:   "Meeting",
    holder: "John", 
    room:   "5"     
});
scheduler.setCurrentView();
~~~

### Details

이 메서드는 [addEvent](api/method/addevent.md)와 유사하게 작동합니다.

**setEvent()**와 **addEvent()**의 주요 차이점은 다음과 같습니다:

- [addEvent](api/method/addevent.md) 메서드는 이벤트를 스케줄러 화면에 추가하고 [onEventAdded](api/event/oneventadded.md) / [onEventChanged](api/event/oneventchanged.md) 이벤트를 발생시킵니다. 이 이벤트들은 원본 데이터 소스(예: 데이터베이스)를 업데이트하는 데 사용할 수 있습니다.
- **setEvent()** 메서드는 단순히 내부 데이터 풀에 이벤트를 추가하며, 어떠한 이벤트도 발생시키지 않습니다. 새 이벤트로 스케줄러 화면을 업데이트하려면 별도로 [setCurrentView](api/method/setcurrentview.md)를 호출해야 합니다.

### Related API
- [setCurrentView](api/method/setcurrentview.md)
- [addEvent](api/method/addevent.md)
- [onEventAdded](api/event/oneventadded.md)
- [onEventChanged](api/event/oneventchanged.md)

### Related Guides
- ["이벤트 추가/삭제"](guides/adding-events.md)
