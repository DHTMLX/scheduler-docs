---
sidebar_label: "onEventLoading"
title: "onEventLoading event"
description: "데이터 소스에서 이벤트가 로드될 때 트리거됩니다."
---

# onEventLoading

### Description

@short: 데이터 소스에서 이벤트가 로드될 때 트리거됩니다.

@signature: onEventLoading: (ev: object) =\> boolean;

### Parameters

- `ev` - (required) *object* - 이벤트 객체 (데이터 항목을 나타냄)

### Returns
- ` result` - (boolean) - 기본 이벤트 동작이 진행될지(<b>true</b>) 취소될지(<b>false</b>) 결정합니다.

### Example

~~~jsx
scheduler.attachEvent("onEventLoading", function(ev){
    //여기에 커스텀 로직을 추가할 수 있습니다
    return true;
});
~~~

### Details

- 이 이벤트는 차단할 수 있습니다. *false*를 반환하면 데이터 항목이 scheduler에 로드되는 것을 방지합니다.
- 데이터 소스의 모든 데이터 항목에 대해 트리거됩니다.
