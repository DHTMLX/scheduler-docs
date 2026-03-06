---
sidebar_label: "attachEvent"
title: "attachEvent method"
description: "dhtmlxScheduler의 내부 이벤트에 핸들러를 연결합니다."
---

# attachEvent

### Description

@short: DhtmlxScheduler의 내부 이벤트에 핸들러를 연결합니다.

@signature: attachEvent: (name: SchedulerEventName, handler: SchedulerCallback, settings?: any) =\> string

### Parameters

- `name` - (required) *SchedulerEventName* - 이벤트 이름으로, 대소문자를 구분하지 않습니다.
- `handler` - (required) *function* - 이벤트를 처리할 함수
- `settings` - (optional) *object* - 선택 사항으로, 이벤트 핸들러에 대한 [설정 객체](#propertiesofsettingsobject)

### Returns
- `event` - (string) - id 연결된 이벤트 핸들러의 식별자

### Example

~~~jsx
scheduler.attachEvent("onEventSave",function(id,ev){
    if (!ev.text) {
        alert("텍스트는 비어 있을 수 없습니다");
        return false;
    }
    return true;
})
~~~

### Related samples
- [Validating lightbox fields](https://docs.dhtmlx.com/scheduler/samples/02_customization/08_validation.html)
- [Recurring events](https://docs.dhtmlx.com/scheduler/samples/03_extensions/01_recurring_events.html)

### Details

동일한 이벤트에 여러 핸들러를 연결할 수 있으며, 모두 실행됩니다.<br> 만약 어떤 핸들러가 *false*를 반환하면, 관련 동작이 중단됩니다.<br>
핸들러들은 연결된 순서대로 호출됩니다.

[event](api/method/event.md)를 통해 추가된 모든 이벤트 리스너는 [destructor](api/method/destructor.md)가 호출될 때 자동으로 제거됩니다.

## 설정 객체의 속성 {#propertiesofsettingsobject}

설정 객체는 두 가지 속성을 포함할 수 있습니다:

1\. **id** - (*string*) 이벤트 핸들러의 고유 식별자 

이 식별자를 사용하면 특정 핸들러를 이벤트에서 쉽게 제거할 수 있습니다:

~~~js
scheduler.attachEvent("onClick", function(){
    console.log("event click");
}, {id: "my-click"}); /*!*/
... //나중에:
gantt.detachEvent("my-click");
~~~

2\. **once** - (*boolean*) 이벤트가 한 번만 실행되어야 하는지 여부

이 값을 *true*로 설정하면, 이벤트가 처음 발생할 때만 처리됩니다. 예를 들어:

~~~js
scheduler.attachEvent("onClick", function(){
    console.log("다음 이벤트 클릭을 캡처합니다");
    return true;
}, {once: true}); /*!*/
~~~

### Related API
- [detachEvent](api/method/detachevent.md)
