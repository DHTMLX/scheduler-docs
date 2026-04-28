---
sidebar_label: attachEvent
title: "attachEvent 메서드"
description: "dhtmlxScheduler의 내부 이벤트에 핸들러를 연결합니다"
---

# attachEvent

### Description

@short: dhtmlxScheduler의 내부 이벤트에 핸들러를 연결합니다

@signature: attachEvent: (name: SchedulerEventName, handler: SchedulerCallback, settings?: any) =\> string

### Parameters

- `name` - (required) *SchedulerEventName* - 이벤트의 이름이며 대소문자 구분 없이
- `handler` - (required) *function* - 핸들러 함수
- `settings` - (optional) *object* - 이벤트 핸들러를 위한 [설정 객체](#properties-of-settings-object)

### Returns
- `event` - (string) - 연결된 이벤트 핸들러의 ID

### Example

~~~jsx
scheduler.attachEvent("onEventSave", (id, ev) => {
    if (!ev.text) {
        alert("텍스트는 비어 있을 수 없습니다");
        return false;
    }
    return true;
});
~~~

### Related samples
- [Validating lightbox fields](https://docs.dhtmlx.com/scheduler/samples/02_customization/08_validation.html)
- [Recurring events](https://docs.dhtmlx.com/scheduler/samples/03_extensions/01_recurring_events.html)

### Details

동일한 이벤트에 여러 핸들러를 연결할 수 있으며, 이들 모두가 실행됩니다.
일부 핸들러가 `false`를 반환하면 관련 작업이 차단됩니다.
이벤트 핸들러는 연결된 순서대로 처리됩니다.

All event listeners attached using [`event()`](api/method/event.md) will be detached automatically when the [`destructor()`](api/method/destructor.md) is called.

## 설정 객체의 속성

설정 객체에는 두 개의 속성이 포함될 수 있습니다:

1\. `id` - (*string*) 이벤트 핸들러의 ID

예를 들어, 지정된 이벤트에서 핸들러를 쉽게 분리(detach)할 수 있습니다:

~~~js {3}
scheduler.attachEvent("onClick", () => {
    console.log("event click");
}, { id: "my-click" });
// 나중에:
scheduler.detachEvent("my-click");
~~~

2\. `once` - (*boolean*) 이벤트가 한 번만 실행될지 정의합니다.

해당 속성을 *true*로 설정하면 이벤트의 첫 트리거를 포착할 수 있습니다. 예:

~~~js {4}
scheduler.attachEvent("onClick", () => {
    console.log("다음 이벤트 클릭을 캡처합니다");
    return true;
}, { once: true });
~~~

### Related API
- [detachEvent](api/method/detachevent.md)