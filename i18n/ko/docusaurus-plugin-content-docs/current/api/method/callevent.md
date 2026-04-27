---
sidebar_label: "callEvent"
title: "callEvent method"
description: "내부 이벤트를 트리거합니다"
---

# callEvent

### Description

@short: 내부 이벤트를 트리거합니다

@signature: callEvent: (name: string, params: any[]) =\> boolean

### Parameters

- `name` - (required) *string* - 이벤트 이름, 대소문자 구분 없음
- `params` - (required) *array* - 이벤트와 관련된 데이터를 포함하는 배열

### Returns
- ` result` - (boolean) - <i>false</i>, 이벤트 핸들러 중 하나라도 <i>false</i>를 반환하면 <i>false</i>를 반환합니다. 그렇지 않으면 <i>true</i>를 반환합니다.

### Example

~~~jsx
scheduler.attachEvent("CustomEvent", function(param1, param2){
    return true;
});

const res = scheduler.callEvent("CustomEvent", [param1, param2]);
~~~

### Details

이벤트는 보통 자동으로 트리거되므로, 이 메서드를 직접 호출하는 경우는 드뭅니다.

### Related API
- [attachEvent](api/method/attachevent.md)
