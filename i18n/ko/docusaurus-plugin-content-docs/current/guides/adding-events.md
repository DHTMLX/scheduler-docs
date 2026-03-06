---
title: "이벤트 추가/삭제"
sidebar_label: "이벤트 추가/삭제"
---

# 이벤트 추가/삭제

## 이벤트 추가하기 {#addingevents}

스케줄러에 이벤트를 추가하는 방법은 세 가지가 있습니다:

1. [addEvent](api/method/addevent.md) - 새로운 이벤트를 생성하고 [onEventAdded](api/event/oneventadded.md) 또는 [onEventChanged](api/event/oneventchanged.md) 이벤트를 트리거합니다.
2. [addEventNow](api/method/addeventnow.md) - 새로운 이벤트를 생성하고 확인을 위해 라이트박스를 엽니다. 이 메서드는 어떤 이벤트도 트리거하지 않습니다.
3. [setEvent](api/method/setevent.md) - 이벤트를 스케줄러의 데이터 풀에 직접 추가하며, 이벤트를 트리거하지 않습니다.

가장 권장되는 방법은 [addEvent](api/method/addevent.md) 메서드를 사용하는 것입니다:

~~~js
var eventId = scheduler.addEvent({
    start_date: "16-06-2019 09:00",
    end_date:   "16-06-2019 12:00",
    text:   "Meeting",
    holder: "John",  // 사용자 데이터
    room:   "5"      // 사용자 데이터
});
~~~


[Validating lightbox fields](https://docs.dhtmlx.com/scheduler/samples/02_customization/08_validation.html)


[Default values for lightbox controls](https://docs.dhtmlx.com/scheduler/samples/02_customization/28_lightbox_default_value.html)


## 이벤트 수정하기 {#updatingevents}

스케줄러에서 이벤트를 수정하는 경우는 두 가지 시나리오가 있습니다:

1. 변경사항을 서버로 전송하지 않고 단순히 이벤트를 다시 렌더링하고 싶을 때는 [updateEvent](api/method/updateevent.md) 를 사용하세요.
2. 변경사항을 적용하고 서버에 저장해야 할 때는 [addEvent](guides/adding-events.md#addingevents) 메서드를 사용하는 것이 더 좋습니다.

~~~js
var eventId = scheduler.addEvent({
    start_date: "16-06-2019 09:00",
    end_date:   "16-06-2019 12:00",
    text:   "Meeting"
});
 
var event = scheduler.getEvent(eventId);
event.text = "Conference"; // 이벤트 데이터 수정

scheduler.updateEvent(event.id); // 서버로 전송하지 않고 다시 렌더링
//또는
scheduler.addEvent(event.id); // 다시 렌더링하고 서버에 업데이트 전송
~~~


## 이벤트 삭제하기 {#deletingevents}

스케줄러에서 이벤트를 제거하려면 [deleteEvent](api/method/deleteevent.md) 메서드를 사용하세요:

~~~js
scheduler.parse([
   {id:1, start_date:"06/30/2009 09:00", end_date:"06/30/2009 12:00", text:"Task1"},
   {id:2, start_date:"06/30/2009 12:00", end_date:"06/30/2009 20:00", text:"Task2"}
],"json");
...
scheduler.deleteEvent(2);
~~~


dataProcessor가 초기화되어 있으면, 스케줄러에서 추가되거나 삭제된 이벤트는 자동으로 데이터 소스에 반영됩니다. 자세한 내용은 ["Server-Side Integration"](guides/server-integration.md) 가이드를 참고하세요.


[Fully custom lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/16_custom_form.html)
