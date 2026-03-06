---
sidebar_label: "onEventSelected"
title: "onEventSelected event"
description: "스케줄러에서 사용자가 이벤트를 선택할 때 발생합니다."
---

# onEventSelected

### Description

@short: 스케줄러에서 사용자가 이벤트를 선택할 때 발생합니다.

@signature: onEventSelected: (id: string) =\> void;

### Parameters

- `id` - (required) *string* - 선택된 이벤트의 ID

### Example

~~~jsx
scheduler.attachEvent("onEventSelected", function(id){
    //여기에 커스텀 로직 작성
});
~~~

### Related API
- [onEventUnselected](api/event/oneventunselected.md)
