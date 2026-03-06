---
sidebar_label: "onError"
title: "onError event"
description: "[assert](api/method/assert.md)가 'false' 값을 받을 때, 즉 assertion이 실패했을 때 트리거됩니다."
---

# onError

### Description

@short: [assert](api/method/assert.md)가 'false' 값을 받을 때, 즉 assertion이 실패했을 때 트리거됩니다.

@signature: onError: (errorMessage: string) =\> boolean;

### Parameters

- `errorMessage` - (required) *string* - [assert](api/method/assert.md) 메서드로부터 전달된 에러 메시지를 포함하는 문자열

### Returns
- ` result` - (boolean) - 이벤트의 기본 동작이 계속 진행될지(<b>true</b>) 아니면 중단될지(<b>false</b>) 결정합니다.

### Example

~~~jsx
scheduler.attachEvent("onError", function(errorMessage){
    scheduler.message({
        text:"Error"
    });
    return true;
});
~~~

### Details

이 이벤트는 차단할 수 있습니다. false를 반환하면 기본 동작인 화면 우측 상단의 빨간 박스 내 에러 메시지 표시가 중단됩니다.

### Change log
- 6.0 버전에 추가됨
