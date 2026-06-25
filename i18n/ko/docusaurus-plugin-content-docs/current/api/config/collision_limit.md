---
sidebar_label: "collision_limit"
title: "collision_limit config"
description: "단일 시간 슬롯에 허용되는 최대 이벤트 수를 정의합니다"
---

# collision_limit

### Description

@short: 단일 시간 슬롯에 허용되는 최대 이벤트 수를 정의합니다

@signature: collision_limit: number

### Example

~~~jsx
scheduler.config.collision_limit = 2;
...
scheduler.init('scheduler_here',new Date(2027,05,11),"week");
~~~

**Default value:** 1

### Details

:::note
 이 속성은 [collision](guides/extensions-list.md#collision) 플러그인이 활성화된 경우에만 작동합니다. 
:::

### Related Guides
- ["타임 슬롯에서 중복 이벤트 방지하기"](guides/collisions.md)
