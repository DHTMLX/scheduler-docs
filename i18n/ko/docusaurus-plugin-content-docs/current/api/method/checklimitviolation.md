---
sidebar_label: "checkLimitViolation"
title: "checkLimitViolation method"
description: "주어진 이벤트가 차단된 시간 구간과 겹치는지 여부를 결정합니다."
---

# checkLimitViolation

### Description

@short: 주어진 이벤트가 차단된 시간 구간과 겹치는지 여부를 결정합니다.

@signature: checkLimitViolation: (event: any) =\> boolean

### Parameters

- `event` - (required) *object* - 이벤트 객체

### Returns
- `isBlocked` - (boolean) - 이벤트가 차단된 시간 내에 포함되면 <i>true</i>를 반환하며, 그렇지 않으면 <i>false</i>를 반환합니다.

### Example

~~~jsx
var event = {
   text : "New Event",
   start_date : new Date(2013, 02, 20, 10, 00),
   end_date : new Date(2013, 02, 20, 14, 00)
};

var isBlocked = scheduler.checkLimitViolation(event); // 'true' 또는 'false' 반환
~~~

### Details

:::note
 이 메서드는 [limit](guides/extensions-list.md#limit) 플러그인이 활성화되어 있어야 합니다. 
:::

이 메서드는 [onLimitViolation](api/event/onlimitviolation.md) 이벤트를 트리거한다는 점을 유념하세요.

### Related API
- [onLimitViolation](api/event/onlimitviolation.md)
