---
sidebar_label: "onBeforeEventDragIn"
title: "onBeforeEventDragIn event"
description: "드래그된 이벤트가 스케줄러 영역에 진입하기 직전에 발생합니다."
---

# onBeforeEventDragIn

### Description

@short: 드래그된 이벤트가 스케줄러 영역에 진입하기 직전에 발생합니다.

@signature: onBeforeEventDragIn: (id: string, e: Event) =\> boolean

### Parameters

- `id` - (required) *string* - 이벤트의 id
- `e` - (required) *Event* - 네이티브 이벤트 객체

### Returns
- ` result` - (boolean) - 기본 이벤트 동작이 계속 진행되는지(<b>true</b>) 취소되는지(<b>false</b>)를 결정합니다.

### Example

~~~jsx
scheduler.attachEvent("onBeforeEventDragIn", function (id, e){
    // 여기에 커스텀 로직을 작성하세요
    return true;
});
~~~

### Details

:::note
 이 이벤트는 서로 다른 스케줄러 간의 드래그 앤 드롭 작업 중에만 발생합니다. 
:::

### Related Guides
- ["드래그 앤 드롭(Drag-and-Drop) 작업"](guides/drag-between.md#drag-events)
