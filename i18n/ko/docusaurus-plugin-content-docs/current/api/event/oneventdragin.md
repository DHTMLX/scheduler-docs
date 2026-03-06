---
sidebar_label: "onEventDragIn"
title: "onEventDragIn event"
description: "드래그된 이벤트가 스케줄러에 진입할 때 발생합니다"
---

# onEventDragIn

### Description

@short: 드래그된 이벤트가 스케줄러에 진입할 때 발생합니다

@signature: onEventDragIn: (id: string, e: Event) =\> void;

### Parameters

- `id` - (required) *string* - 이벤트의 id
- `e` - (required) *Event* - 네이티브 이벤트 객체

### Example

~~~jsx
scheduler.attachEvent("onEventDragIn", function (id, e){
    //여기에 커스텀 로직 작성
});
~~~

### Details

:::note
 이 이벤트는 서로 다른 스케줄러 간의 drag-and-drop 동작 중에만 발생합니다. 
:::

### Related Guides
- ["드래그 앤 드롭(Drag-and-Drop) 작업"](guides/drag-between.md#drag-events)
