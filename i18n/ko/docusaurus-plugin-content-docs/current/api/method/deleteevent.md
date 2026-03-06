---
sidebar_label: "deleteEvent"
title: "deleteEvent method"
description: "지정된 이벤트를 제거합니다."
---

# deleteEvent

### Description

@short: 지정된 이벤트를 제거합니다.

@signature: deleteEvent: (id: string | number) =\> void

### Parameters

- `id` - (required) *string | number* -     이벤트의 ID

### Example

~~~jsx
scheduler.init('scheduler_here',new Date(2009,5,30),"day");
scheduler.parse([
   {id:1, start_date:"06/30/2009 09:00", end_date:"06/30/2009 12:00", text:"Task1"},
   {id:2, start_date:"06/30/2009 12:00", end_date:"06/30/2009 20:00", text:"Task2"},
   {id:3, start_date:"06/30/2009 08:00", end_date:"06/30/2009 12:00", text:"Task3"}
],"json");
...
scheduler.deleteEvent(3);
~~~

### Related samples
- [Fully custom lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/16_custom_form.html)
- [Recurring events](https://docs.dhtmlx.com/scheduler/samples/03_extensions/01_recurring_events.html)

### Details

이 메서드는 두 번째 매개변수를 받을 수 있습니다:

- **silent** - (*boolean*) 이 값을 *true*로 설정하면 **deleteEvent**가 클라이언트 측에서만 작동하여 서버 요청을 하지 않습니다:

~~~js
// 지정된 이벤트를 클라이언트 측에서만 삭제합니다.
scheduler.deleteEvent(id, true); 
~~~

이 두 번째 매개변수는 주로 서버 오류를 처리할 때 사용됩니다.

### Related API
- [addEvent](api/method/addevent.md)
- [addEventNow](api/method/addeventnow.md)

### Related Guides
- ["이벤트 추가/삭제"](guides/adding-events.md)
