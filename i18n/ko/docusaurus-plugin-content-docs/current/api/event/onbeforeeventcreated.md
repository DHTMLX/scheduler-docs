---
sidebar_label: "onBeforeEventCreated"
title: "onBeforeEventCreated event"
description: "사용자가 스케줄러에서 커서를 드래그하여 새 이벤트를 생성할 때 트리거됩니다."
---

# onBeforeEventCreated

### Description

@short: 사용자가 스케줄러에서 커서를 드래그하여 새 이벤트를 생성할 때 트리거됩니다.

@signature: onBeforeEventCreated: (e: Event) =\> boolean

### Parameters

- `e` - (required) *Event* - 네이티브 이벤트 객체

### Returns
- ` result` - (boolean) - 이벤트의 기본 동작이 진행되는지(<b>true</b>) 취소되는지(<b>false</b>)를 나타냅니다.

### Example

~~~jsx
scheduler.attachEvent("onBeforeEventCreated", function (e){
    //여기에 커스텀 로직을 추가할 수 있습니다
    return true;
});
~~~

### Details

이 이벤트는 [drag_create](api/config/drag_create.md) 설정 옵션이 활성화되어 있을 때만 발생한다는 점을 유의하세요.
