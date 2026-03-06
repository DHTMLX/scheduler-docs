---
sidebar_label: "copy"
title: "copy method"
description: "创建给定对象的深拷贝"
---

# copy

### Description

@short: 创建给定对象的深拷贝

@signature: copy: (event: any) =\> any

### Parameters

- `event` - (required) *object* - 需要复制的对象

### Returns
- ` backupEvent` - (object) - 给定对象的深拷贝

### Example

~~~jsx
var backupEvent = scheduler.copy(scheduler.getEvent(id));
~~~

### Change log
- added in version 6.0
