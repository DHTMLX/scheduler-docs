---
sidebar_label: "onDestroy"
title: "onDestroy event"
description: "当使用 [destructor](api/method/destructor.md) 方法清除调度器后触发一次"
---

# onDestroy

### Description

@short: 当使用 [destructor](api/method/destructor.md) 方法清除调度器后触发一次

@signature: onDestroy: () =\> void

### Example

~~~jsx
scheduler.attachEvent("onDestroy", function(){
   alert("释放自定义资源");
});

scheduler.destructor();
~~~

### Related API
- [destructor](api/method/destructor.md)

### Change log
- 在 v6.0 中添加
