---
sidebar_label: "onBeforeEventDragOut"
title: "onBeforeEventDragOut event"
description: "스케줄러에서 이벤트가 드래그되어 나가기 직전에 트리거됩니다."
---

# onBeforeEventDragOut

### Description

@short: 스케줄러에서 이벤트가 드래그되어 나가기 직전에 트리거됩니다.

@signature: onBeforeEventDragOut: (id: string, ev: object, e: Event) =\> boolean

### Parameters

- `id` - (required) *string* - 이벤트의 ID
- `ev` - (required) *object* - 이벤트의 데이터 객체
- `e` - (required) *Event* - 네이티브 이벤트 객체

### Returns
- ` result` - (boolean) - 기본 이벤트 동작을 계속 진행할지(<b>true</b>) 중지할지(<b>false</b>) 결정합니다.

### Example

~~~jsx
scheduler.attachEvent("onBeforeEventDragOut", function (id, ev, e){
    //여기에 커스텀 로직 작성
    return true;
});
~~~

### Details

:::note
 이 이벤트는 서로 다른 스케줄러 간에 드래그 앤 드롭할 때만 발생합니다. 
:::

### Related Guides
- ["드래그 앤 드롭(Drag-and-Drop) 작업"](guides/drag-between.md#drag-events)
