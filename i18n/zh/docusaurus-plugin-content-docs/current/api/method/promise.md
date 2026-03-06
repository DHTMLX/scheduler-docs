---
sidebar_label: "Promise"
title: "Promise method"
description: "用于创建 Promise 对象的构造函数"
---

# Promise

### Description

@short: 用于创建 Promise 对象的构造函数

@signature: Promise: (executor: SchedulerCallback) =\> any

### Parameters

- `executor` - (required) *function* - 一个用于设置 promise 的回调函数

### Returns
- ` promise` - (object) - 创建的 promise 对象

### Example

~~~jsx
new scheduler.Promise(function(resolve, reject) {
    setTimeout(function(){
        resolve();
    }, 5000);
}).then(function(){
    alert("Resolved")
});
~~~

### Details

这是 Promise 对象的构造函数。

### Change log
- 在 v6.0 中引入。
- 在 v7.0 中从 Bluebird 更改为原生 Promise。
