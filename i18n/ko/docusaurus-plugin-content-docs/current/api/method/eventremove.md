---
sidebar_label: "eventRemove"
title: "eventRemove method"
description: "HTML 요소에서 이벤트 핸들러를 제거합니다."
---

# eventRemove

### Description

@short: HTML 요소에서 이벤트 핸들러를 제거합니다.

@signature: eventRemove: (id: string) =\> void

### Parameters

- `id` - (required) *string* - 이벤트 핸들러의 id

### Example

~~~jsx
const eventId = scheduler.event("divId", "click", function(e){
    do_something();
});

scheduler.eventRemove(eventId);
~~~

### Details

[event](api/method/event.md)를 통해 추가된 모든 이벤트 리스너는 [destructor](api/method/destructor.md)가 실행될 때 자동으로 제거됩니다.

### Related API
- [event](api/method/event.md)

### Change log
- 버전 4.4에서 추가됨
