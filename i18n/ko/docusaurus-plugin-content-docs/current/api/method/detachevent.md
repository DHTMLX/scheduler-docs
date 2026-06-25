---
sidebar_label: "detachEvent"
title: "detachEvent method"
description: "이전에 attachEvent 메서드를 사용하여 추가한 이벤트 핸들러를 제거합니다."
---

# detachEvent

### Description

@short: 이전에 attachEvent 메서드를 사용하여 추가한 이벤트 핸들러를 제거합니다.

@signature: detachEvent: (id: string) =\> void

### Parameters

- `id` - (required) *string* - 이벤트 핸들러의 식별자

### Example

~~~jsx
const myEvent = scheduler.attachEvent("onClick", function (id){
    ...//event handler 코드
});
...
scheduler.detachEvent(myEvent);
~~~

### Details

[event](api/method/event.md)를 통해 추가된 모든 이벤트 리스너는 [destructor](api/method/destructor.md)가 호출될 때 자동으로 제거됩니다.

### Related API
- [attachEvent](api/method/attachevent.md)
