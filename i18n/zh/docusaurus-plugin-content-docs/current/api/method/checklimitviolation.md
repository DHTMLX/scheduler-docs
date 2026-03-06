---
sidebar_label: "checkLimitViolation"
title: "checkLimitViolation method"
description: "判断给定的事件是否与被阻止的时间段重叠"
---

# checkLimitViolation

### Description

@short: 判断给定的事件是否与被阻止的时间段重叠

@signature: checkLimitViolation: (event: any) =\> boolean

### Parameters

- `event` - (required) *object* - 事件对象

### Returns
- `isBlocked` - (boolean) - 如果事件发生在被阻止的时间内，返回 <i>true</i>，否则返回 <i>false</i>。

### Example

~~~jsx
var event = {
   text : "New Event",
   start_date : new Date(2013, 02, 20, 10, 00),
   end_date : new Date(2013, 02, 20, 14, 00)
};

var isBlocked = scheduler.checkLimitViolation(event); //返回 'true' 或 'false'
~~~

### Details

:::note
 该方法需要激活 [limit](guides/extensions-list.md#limit) 插件。 
:::

请注意，该方法会触发 [onLimitViolation](api/event/onlimitviolation.md) 事件。

### Related API
- [onLimitViolation](api/event/onlimitviolation.md)
