---
sidebar_label: "onEventUnselected"
title: "onEventUnselected event"
description: "사용자가 다른 이벤트를 선택하여 이벤트 선택을 해제할 때 트리거됩니다."
---

# onEventUnselected

### Description

@short: 사용자가 다른 이벤트를 선택하여 이벤트 선택을 해제할 때 트리거됩니다.

@signature: onEventUnselected: (id: string) =\> void;

### Parameters

- `id` - (required) *string* - 선택 해제된 이벤트의 id

### Example

~~~jsx
scheduler.attachEvent("onEventUnselected", function(id){
    //여기에 사용자 정의 로직 작성
});
~~~

### Related API
- [onEventSelected](api/event/oneventselected.md)
