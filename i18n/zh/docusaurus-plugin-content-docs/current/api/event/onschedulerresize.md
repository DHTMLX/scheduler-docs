---
sidebar_label: "onSchedulerResize"
title: "onSchedulerResize event"
description: "在调度器大小即将改变之前触发"
---

# onSchedulerResize

### Description

@short: 在调度器大小即将改变之前触发

@signature: onSchedulerResize: () =\> void

### Example

~~~jsx
scheduler.attachEvent("onSchedulerResize", function(){
      //这里编写任何自定义逻辑
});
~~~

### Details

该事件通知调度器的大小已被调整，数据区域需要重新绘制。通常情况下，除非您正在开发自定义视图，否则无需处理此事件。
