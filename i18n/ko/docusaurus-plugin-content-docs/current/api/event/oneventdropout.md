---
sidebar_label: "onEventDropOut"
title: "onEventDropOut event"
description: "드래그된 이벤트가 스케줄러 영역 밖에 드롭될 때 발생합니다"
---

# onEventDropOut

### Description

@short: 드래그된 이벤트가 스케줄러 영역 밖에 드롭될 때 발생합니다

@signature: onEventDragOut: (id: string, ev: object, to: object, e: Event) =\> boolean;

### Parameters

- `id` - (required) *string* - 이벤트의 ID 
- `ev` - (required) *object* - 이벤트 객체
- `to` - (required) *object* - 대상 스케줄러 (빈 공간에 드롭된 경우 null)
- `e` - (required) *Event* - 네이티브 이벤트 객체

### Returns
- ` result` - (boolean) - 기본 이벤트 동작이 진행될지(<b>true</b>) 아니면 방지될지(<b>false</b>) 여부를 나타냅니다

### Example

~~~jsx
scheduler.attachEvent("onEventDropOut", function (id, ev, to, e){
    //여기에 커스텀 로직을 추가할 수 있습니다
    return true;
});
~~~

### Details

:::note
 이 이벤트는 스케줄러 간 드래그 앤 드롭 작업 중에만 발생합니다. 
:::

### Related Guides
- ["드래그 앤 드롭(Drag-and-Drop) 작업"](guides/drag-between.md#drag-events)
