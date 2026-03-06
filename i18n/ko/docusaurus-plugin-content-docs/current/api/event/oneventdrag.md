---
sidebar_label: "onEventDrag"
title: "onEventDrag event"
description: "스케줄러 내에서 이벤트가 드래그되거나 크기 조정될 때 트리거됩니다."
---

# onEventDrag

### Description

@short: 스케줄러 내에서 이벤트가 드래그되거나 크기 조정될 때 트리거됩니다.

@signature: onEventDrag: (id: string, mode: string, ev: Event) =\> void;

### Parameters

- `id` - (required) *string* - 이벤트의 ID
- `mode` - (required) *string* - 드래그 모드: "move", "resize", 또는 "new-size" (새 이벤트 생성 시)
- `e` - (required) *Event* - 네이티브 이벤트 객체

### Example

~~~jsx
scheduler.attachEvent("onEventDrag", function (id, mode, e){
    //여기에 커스텀 로직을 추가할 수 있습니다.
});
~~~

### Related samples
- [Read-only lightbox](https://docs.dhtmlx.com/scheduler/samples/03_extensions/12_readonly_form.html)
- [Read-only events](https://docs.dhtmlx.com/scheduler/samples/03_extensions/14_readonly_event.html)

### Details

모드 설명:

- **move** - 이벤트가 스케줄러 내에서 드래그되고 있습니다.
- **resize** - 드래그 앤 드롭을 사용하여 이벤트 크기가 조정되고 있습니다.
- **new-size** - 드래그 앤 드롭을 통해 새 이벤트가 생성되고 있습니다.
