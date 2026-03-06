---
sidebar_label: "isViewExists"
title: "isViewExists method"
description: "验证是否存在指定名称的视图"
---

# isViewExists

### Description

@short: 验证是否存在指定名称的视图

@signature: isViewExists: (name: string) =\> boolean

### Parameters

- `name` - (required) *string* - 视图的名称

### Returns
- ` isExist` - (boolean) - <i>true</i> 表示找到该视图；否则，<i>false</i>

### Example

~~~jsx
scheduler.init('scheduler_here');
scheduler.load("data/events.xml");

scheduler.isViewExists("month"); //->true  /*!*/
~~~
