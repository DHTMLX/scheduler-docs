---
sidebar_label: "onBeforeEventDisplay"
title: "onBeforeEventDisplay event"
description: "'showEvent' 메서드가 특정 이벤트를 표시하기 직전에 트리거되며, 이벤트가 나타나기 전에 코드를 실행할 수 있습니다."
---

# onBeforeEventDisplay

### Description

@short: 'showEvent' 메서드가 특정 이벤트를 표시하기 직전에 트리거되며, 이벤트가 나타나기 전에 코드를 실행할 수 있습니다.

@signature: onBeforeEventDisplay: (event: object, view: string) =\> boolean

### Parameters

- `event` - (required) *object* - 이벤트 객체
- `view` - (required) *string* - 이벤트를 표시하는 데 사용된 뷰 이름

### Returns
- ` result` - (boolean) - 이벤트의 기본 동작이 진행될지(<b>true</b>) 취소될지(<b>false</b>) 결정합니다.

### Example

~~~jsx
scheduler.attachEvent("onBeforeEventDisplay", function(event,view){
    //여기에 사용자 정의 로직 작성
    return true;
});
~~~

### Related API
- [onAfterEventDisplay](api/event/onaftereventdisplay.md)
