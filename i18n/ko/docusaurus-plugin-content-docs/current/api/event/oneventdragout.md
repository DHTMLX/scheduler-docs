---
sidebar_label: "onEventDragOut"
title: "onEventDragOut event"
description: "드래그된 이벤트가 스케줄러 영역을 벗어날 때 발생합니다."
---

# onEventDragOut

### Description

@short: 드래그된 이벤트가 스케줄러 영역을 벗어날 때 발생합니다.

@signature: onEventDragOut: (id: string, e: Event) =\> void;

### Parameters

- `id` - (required) *string* - 이벤트의 id
- `e` - (required) *Event* - 네이티브 이벤트 객체

### Example

~~~jsx
scheduler.attachEvent("onEventDragOut", function (id, e){
    //여기에 커스텀 로직 작성
});
~~~

### Details

:::note
 이 이벤트는 서로 다른 스케줄러 간의 드래그 앤 드롭 동작 중에만 발생합니다. 
:::

### Related Guides
- ["드래그 앤 드롭(Drag-and-Drop) 작업"](guides/drag-between.md#drag-events)
