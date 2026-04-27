---
sidebar_label: "addEvent"
title: "addEvent method"
description: "새 이벤트를 추가합니다"
---

# addEvent

### Description

@short: 새 이벤트를 추가합니다

@signature: addEvent: (event: any) =\> string

### Parameters

- `event` - (required) *object* - 이벤트 객체

### Returns
- ` id` - (string) - 이벤트의 id

### Example

~~~jsx
scheduler.addEvent({
    start_date: "16-06-2027 09:00",
    end_date:    "16-06-2027 12:00",
    text:    "Meeting",
    holder:    "John", // userdata
    room:    "5"     // userdata
});
~~~

### Related samples
- [Validating lightbox fields](https://docs.dhtmlx.com/scheduler/samples/02_customization/08_validation.html)
- [Custom event box](https://docs.dhtmlx.com/scheduler/samples/02_customization/27_custom_event_box.html)

### Details

:::note

이 메서드는 [onEventAdded](api/event/oneventadded.md) 또는 [onEventChanged](api/event/oneventchanged.md) 이벤트를 트리거합니다
 
:::

이벤트 객체는 다음과 같은 속성을 포함할 수 있습니다:

- **start_date** - (*Date,string*) 이벤트가 시작되는 날짜입니다. 문자열로 제공할 경우 "%d-%m-%Y %H:%i" 형식을 따라야 합니다 (기본 형식을 변경하려면 [api_date](api/config/api_date.md) 옵션을 참고하세요). [반복 이벤트](guides/recurring-events.md)의 경우, **start_date**는 Date 타입이어야 합니다.    
- **end_date** - (*Date,string*) 이벤트가 종료되는 날짜입니다. 문자열로 제공할 경우 "%d-%m-%Y %H:%i" 형식을 따라야 합니다 (기본 형식을 변경하려면 [api_date](api/config/api_date.md) 옵션을 참고하세요). [반복 이벤트](guides/recurring-events.md)의 경우, **end_date**는 Date 타입이어야 합니다.
- **text** - (*string*) 이벤트 설명입니다.
- **id** - (*string*) 이벤트 식별자입니다. 생략 시 자동으로 id가 생성됩니다.
- **userdata** - (*hash*) 'key-value' 쌍으로 표현된 사용자 정의 속성 집합입니다.

### Related API
- [api_date](api/config/api_date.md)
- [addEventNow](api/method/addeventnow.md)
- [deleteEvent](api/method/deleteevent.md)

### Related Guides
- ["이벤트 추가/삭제"](guides/adding-events.md)
