---
sidebar_label: onBeforeDrag
title: "onBeforeDrag event"
description: "사용자가 drag/resize 작업을 시작할 때 발생합니다 (버전 2.1+)"
---

# onBeforeDrag

### Description

@short: 사용자가 drag/resize 작업을 시작할 때 발생합니다(버전 2.1+)

@signature: onBeforeDrag: (id: string, mode: string, e: Event) =\> boolean

### Parameters

- `id` - (required) *string* - 이벤트의 ID
- `mode` - (required) *string* - 드래그 모드: "move","resize" 또는 "create"
- `e` - (required) *Event* - 네이티브 이벤트 객체

### Returns
- `result` - (boolean) - 이벤트의 기본 동작이 트리거될지 여부를 정의합니다 (`true`) 또는 취소될지 (`false`)

### Example

~~~jsx
scheduler.attachEvent("onBeforeDrag", (id, mode, e) => {
    // any custom logic here
    return true;
});
~~~

### Related samples
- [읽기 전용 lightbox](https://docs.dhtmlx.com/scheduler/samples/03_extensions/12_readonly_form.html)
- [읽기 전용 이벤트](https://docs.dhtmlx.com/scheduler/samples/03_extensions/14_readonly_event.html)

### Details

사용자가 Scheduler 내에서 드래그할 수 있는 요소를 클릭할 때 이벤트가 발생합니다.

For the "create" mode, the `id` value is not provided, because a new event is not created yet.