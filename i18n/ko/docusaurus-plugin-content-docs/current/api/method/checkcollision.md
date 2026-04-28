---
sidebar_label: "checkCollision"
title: "checkCollision method"
description: "주어진 이벤트가 동일 시간대에 존재하는 다른 이벤트와 겹치는지 확인합니다."
---

# checkCollision

### Description

@short: 주어진 이벤트가 동일 시간대에 존재하는 다른 이벤트와 겹치는지 확인합니다.

@signature: checkCollision: (event: any) =\> boolean

### Parameters

- `event` - (required) *object* - 이벤트 객체

### Returns
- ` result` - (boolean) - 이벤트 시간대가 이미 사용 중이면 <i>false</i>를 반환하고, 그렇지 않으면 <i>true</i>를 반환합니다.

### Example

~~~jsx
const event = {
   text : "New Event",
   start_date : new Date(2027, 02, 20, 10, 00),
   end_date : new Date(2027, 02, 20, 14, 00)
};

const isOccupied = scheduler.checkCollision(event); // 'true' 또는 'false' 반환
~~~

### Details

:::note
 이 메서드를 사용하려면 [collision](guides/extensions-list.md#collision) 플러그인이 활성화되어 있어야 합니다. 
:::

이 메서드는 [](api/event/oneventcollision.md) 이벤트를 트리거한다는 점을 유의하세요.

### Related API
- [](api/event/oneventcollision.md)

### Related Guides
- ["타임 슬롯에서 중복 이벤트 방지하기"](guides/collisions.md)
