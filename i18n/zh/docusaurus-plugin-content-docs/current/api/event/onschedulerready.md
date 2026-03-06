---
sidebar_label: "onSchedulerReady"
title: "onSchedulerReady event"
description: "当调度器完成初始化后触发，尽管此时它尚未显示在页面上。"
---

# onSchedulerReady

### Description

@short: 当调度器完成初始化后触发，尽管此时它尚未显示在页面上。

@signature: onSchedulerReady: () =\> void

### Example

~~~jsx
scheduler.attachEvent("onSchedulerReady", function(){
    //在这里编写任何自定义逻辑
});
~~~
