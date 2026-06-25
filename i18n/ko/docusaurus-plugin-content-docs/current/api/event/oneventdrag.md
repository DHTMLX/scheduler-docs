---
sidebar_label: onEventDrag
title: "onEventDrag 이벤트"
description: "사용자가 스케줄러에서 이벤트를 드래그/크기 조정할 때 발생합니다"
---

# onEventDrag

### Description

@short: Scheduler에서 사용자가 이벤트를 드래그/크기를 조정할 때 발생합니다

@signature: onEventDrag: (id: string, mode: string, e: Event) =\> void;

### Parameters

- `id` - (required) *string* - 이벤트의 ID
- `mode` - (required) *string* - 드래그 모드: "move","resize" 또는 "new-size" (새로운 이벤트를 생성)
- `e` - (required) *Event* - 네이티브 이벤트 객체

### Example

~~~jsx
scheduler.attachEvent("onEventDrag", (id, mode, e) => {
    // 여기에 사용자 정의 로직 작성
});
~~~

### Related samples
- [Read-only lightbox](https://docs.dhtmlx.com/scheduler/samples/03_extensions/12_readonly_form.html)
- [Read-only events](https://docs.dhtmlx.com/scheduler/samples/03_extensions/14_readonly_event.html)

### Details

Modes description:

- `move` - 사용자가 Scheduler 위에서 이벤트를 드래그합니다
- `resize` - 사용자가 드래그 앤 드롭으로 이벤트의 크기를 조정합니다
- `new-size` - 사용자가 드래그 앤 드롭으로 새 이벤트를 생성합니다