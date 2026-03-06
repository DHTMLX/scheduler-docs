---
sidebar_label: "bind"
title: "bind method"
description: "创建一个新函数，该函数在被调用时，其 <i>this</i> 关键字被设置为指定的值"
---

# bind

### Description

@short: 创建一个新函数，该函数在被调用时，其 <i>this</i> 关键字被设置为指定的值

@signature: bind: (method: SchedulerCallback, thisArg: any) =\> SchedulerCallback

### Parameters

- `method` - (required) *function* - 要绑定的函数
- `thisArg` - (required) *object* - 绑定函数调用时用作 <i>this</i> 上下文的值

### Returns
- ` bound_function` - (function) - 一个新函数，该函数调用时会使用指定的 <i>this</i> 上下文来执行原函数

### Example

~~~jsx
scheduler.bind(method, thisArg);
~~~

### Details

此方法作为兼容 IE8 的替代方案，用于替代 [Function.prototype.bind()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind) 函数。

### Change log
- 版本 6.0 中新增
