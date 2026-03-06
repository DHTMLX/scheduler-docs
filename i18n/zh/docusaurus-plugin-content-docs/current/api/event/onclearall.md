---
sidebar_label: "onClearAll"
title: "onClearAll event"
description: "当调度器的数据被清除后触发一次"
---

# onClearAll

### Description

@short: 当调度器的数据被清除后触发一次

@signature: onClearAll: () =\> void

### Example

~~~jsx
scheduler.attachEvent("onClearAll", function (){
    //这里编写任何自定义逻辑
});
~~~

### Details

该事件由 [clearAll](api/method/clearall.md) 方法触发。
