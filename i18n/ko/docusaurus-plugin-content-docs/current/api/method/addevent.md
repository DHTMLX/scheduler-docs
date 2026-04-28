---
sidebar_label: addEvent
title: "addEvent method"
description: "새로운 이벤트를 추가합니다"
---

# addEvent

### Description

@short: 새로운 이벤트를 추가합니다

@signature: addEvent: (event: any) =\> string

### Parameters

- `event` - (required) *object* - 이벤트 객체

### Returns
- `id` - (string) - 이벤트의 id

### Example

~~~jsx
scheduler.addEvent({
    start_date: "2027-06-16 09:00",
    end_date: "2027-06-16 12:00",
    text: "Meeting",
    holder: "John", // userdata
    room: "5" // userdata
});
~~~

### Related samples
- [Lightbox 필드 유효성 검사](https://docs.dhtmlx.com/scheduler/samples/02_customization/08_validation.html)
- [커스텀 이벤트 박스](https://docs.dhtmlx.com/scheduler/samples/02_customization/27_custom_event_box.html)

### Details

:::note

이 메서드는 [onEventAdded](api/event/oneventadded.md) 또는 [onEventChanged](api/event/oneventchanged.md) 이벤트를 트리거합니다
 
:::

이벤트 객체는 다음과 같은 속성을 포함할 수 있습니다:

- `start_date` - (*Date,string*) 이벤트가 시작될 예정인 날짜. 속성이 문자열로 지정되면 "%d-%m-%Y %H:%i" 형식을 사용해야 합니다(기본 형식을 변경하려면 [`api_date`](api/config/api_date.md) 옵션을 사용). [recurring events](guides/recurring-events.md)의 경우 `start_date` 속성의 값은 Date 타입이어야 합니다.
- `end_date` - (*Date,string*) 이벤트가 완료될 예정인 날짜. 속성이 문자열로 지정되면 "%d-%m-%Y %H:%i" 형식을 사용해야 합니다(기본 형식을 변경하려면 [`api_date`](api/config/api_date.md) 옵션을 사용). [recurring events](guides/recurring-events.md)의 경우 `end_date` 속성의 값은 Date 타입이어야 합니다.
- `text` - (*string*) 이벤트의 텍스트.
- `id` - (*string*) 이벤트의 id. 명시하지 않으면 이벤트의 id가 자동으로 생성됩니다.
- `userdata` - (*hash*) 'key-value' 쌍으로 표현된 사용자 정의 속성의 모음.

### Related API
- [api_date](api/config/api_date.md)
- [addEventNow](api/method/addeventnow.md)
- [deleteEvent](api/method/deleteevent.md)

### Related Guides
- [이벤트 추가/삭제](guides/adding-events.md)