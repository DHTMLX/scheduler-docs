---
sidebar_label: "onAfterEventDisplay"
title: "onAfterEventDisplay event"
description: "스케줄러가 뷰, 날짜, 시간 등을 변경하여 'showEvent' 메서드로 지정된 이벤트를 표시할 때 트리거되며, 이벤트가 표시된 후에 발생합니다."
---

# onAfterEventDisplay

### Description

@short: 스케줄러가 뷰, 날짜, 시간 등을 변경하여 'showEvent' 메서드로 지정된 이벤트를 표시할 때 트리거되며, 이벤트가 표시된 후에 발생합니다.

@signature: onAfterEventDisplay: (event: object, string: view) =\> void

### Parameters

- `event` - (required) *object* - 이벤트 객체
- `view` - (required) *string* - 이벤트를 표시하는 데 사용된 뷰 이름

### Example

~~~jsx
scheduler.attachEvent("onAfterEventDisplay", function(event,view){
    //여기에 커스텀 로직 작성
});
~~~

### Related API
- [onBeforeEventDisplay](api/event/onbeforeeventdisplay.md)
