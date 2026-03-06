---
sidebar_label: "onDragEnd"
title: "onDragEnd event"
description: "드래그 또는 리사이즈 작업이 완료되었을 때 트리거됩니다"
---

# onDragEnd

### Description

@short: 드래그 또는 리사이즈 작업이 완료되었을 때 트리거됩니다

@signature: onDragEnd: (id: string, mode: string, e: Event) =\> void;

### Parameters

- `id` - (required) *string* - 이벤트의 식별자
- `mode` - (required) *string* - 드래그 작업의 유형: "move", "resize", 또는 "create"
- `e` - (required) *Event* - 네이티브 이벤트 객체

### Example

~~~jsx
var dragged_event;
scheduler.attachEvent("onBeforeDrag", function (id, mode, e){
    // 드래그 중인 이벤트를 캡처하는 데 사용됩니다
    dragged_event = scheduler.getEvent(id); 
    return true;
});

scheduler.attachEvent("onDragEnd", function(id, mode, e){
    var event_obj = dragged_event;
    // 여기에 사용자 정의 로직을 작성하세요
});
~~~

### Related API
- [onBeforeDrag](api/event/onbeforedrag.md)
