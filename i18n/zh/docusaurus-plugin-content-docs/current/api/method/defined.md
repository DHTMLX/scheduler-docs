---
sidebar_label: "defined"
title: "defined method"
description: "当参数为 undefined 时返回 false；否则返回 true"
---

# defined

### Description

@short: 当参数为 undefined 时返回 false；否则返回 true

@signature: defined: (event: any) =\> boolean

### Parameters

- `event` - (required) *object* - 要检查的对象

### Returns
- ` state` - (boolean) - 参数为 undefined 时返回 false，否则返回 true

### Example

~~~jsx
// 检查 event 对象是否定义了 "custom_property" 属性
if(scheduler.defined(event.custom_property)){
  // ..
};
~~~

### Change log
- 版本 6.0 中添加
