---
sidebar_label: "checkCollision"
title: "checkCollision method"
description: "验证给定的事件是否在相同时段与任何已有事件重叠"
---

# checkCollision

### Description

@short: 验证给定的事件是否在相同时段与任何已有事件重叠

@signature: checkCollision: (event: any) =\> boolean

### Parameters

- `event` - (required) *object* - 事件对象

### Returns
- ` result` - (boolean) - 如果事件时间段已被占用，返回 <i>false</i>，否则返回 <i>true</i>。

### Example

~~~jsx
var event = {
   text : "New Event",
   start_date : new Date(2013, 02, 20, 10, 00),
   end_date : new Date(2013, 02, 20, 14, 00)
};

var isOccupied = scheduler.checkCollision(event); // 返回 'true' 或 'false'
~~~

### Details

:::note
 此方法需要启用 [collision](guides/extensions-list.md#collision) 插件。 
:::

请注意，此方法会触发 [](api/event/oneventcollision.md) 事件。

### Related API
- [](api/event/oneventcollision.md)

### Related Guides
- [타임 슬롯에서 중복 이벤트 방지하기](guides/collisions.md)
