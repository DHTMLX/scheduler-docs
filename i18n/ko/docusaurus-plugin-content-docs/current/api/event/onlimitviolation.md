---
sidebar_label: "onLimitViolation"
title: "onLimitViolation event"
description: "사용자가 현재 제한되거나 차단된 시간에 이벤트를 할당하려고 할 때 트리거됩니다."
---

# onLimitViolation

### Description

@short: 사용자가 현재 제한되거나 차단된 시간에 이벤트를 할당하려고 할 때 트리거됩니다.

@signature: onLimitViolation: (id: string, obj: object) =\> void;

### Parameters

- `id` - (required) *string* - 이벤트 ID
- `obj` - (required) *object* - 이벤트 객체

### Example

~~~jsx
scheduler.attachEvent("onLimitViolation", function  (id, obj){
    //여기에 사용자 정의 로직 작성
});
~~~

### Details

이 이벤트는 사용자가 이벤트의 시간을 제한되거나 차단된 기간으로 설정하려고 할 때마다 발생합니다. 이러한 제한은 다음을 통해 구성할 수 있습니다:

- [limit_start](api/config/limit_start.md) 및 [limit_end](api/config/limit_end.md) 옵션
- [addMarkedTimespan](api/method/addmarkedtimespan.md) 메서드

:::note

이 이벤트 핸들러에서 'true'를 반환하면 제한을 우회하여 이벤트를 허용되지 않은 시간에 할당할 수 있습니다.
 
:::
