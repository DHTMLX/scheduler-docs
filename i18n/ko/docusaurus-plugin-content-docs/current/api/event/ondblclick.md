---
sidebar_label: "onDblClick"
title: "onDblClick event"
description: "사용자가 이벤트를 더블 클릭할 때 발생합니다."
---

# onDblClick

### Description

@short: 사용자가 이벤트를 더블 클릭할 때 발생합니다.

@signature: onDblClick: (id: string, e: Event) =\> boolean;

### Parameters

- `id` - (required) *string* - 이벤트의 id
- `e` - (required) *Event* - 네이티브 이벤트 객체

### Returns
- ` result` - (boolean) - 이벤트의 기본 동작이 진행될지(<b>true</b>) 아니면 차단될지(<b>false</b>)를 나타냅니다.

### Example

~~~jsx
scheduler.attachEvent("onDblClick", function (id, e){
    //여기에 사용자 정의 로직 작성
    return true;
})
~~~

### Details

이 이벤트는 차단할 수 있습니다. *false*를 반환하면 기본 동작이 실행되지 않습니다.
