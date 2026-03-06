---
sidebar_label: "collision_limit"
title: "collision_limit config"
description: "定义单个时间段内允许的最大事件数量"
---

# collision_limit

### Description

@short: 定义单个时间段内允许的最大事件数量

@signature: collision_limit: number

### Example

~~~jsx
scheduler.config.collision_limit = 2;
...
scheduler.init('scheduler_here',new Date(2010,05,11),"week");
~~~

**Default value:** 1

### Details

:::note
 该属性仅在启用[collision](guides/extensions-list.md#collision) 插件时生效。 
:::

### Related Guides
- [타임 슬롯에서 중복 이벤트 방지하기](guides/collisions.md)
