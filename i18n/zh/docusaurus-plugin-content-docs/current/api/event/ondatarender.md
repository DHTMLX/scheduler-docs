---
sidebar_label: "onDataRender"
title: "onDataRender event"
description: "当数据完成在页面上的渲染时触发"
---

# onDataRender

### Description

@short: 当数据完成在页面上的渲染时触发

@signature: onDataRender: () =\> void

### Example

~~~jsx
scheduler.attachEvent("onDataRender", function(){
    alert("数据已在页面上渲染完成")
});

scheduler.init("scheduler_here");
scheduler.parse(demo_events);
~~~

### Related API
- [onEventLoading](api/event/oneventloading.md)
- [onSchedulerReady](api/event/onschedulerready.md)
