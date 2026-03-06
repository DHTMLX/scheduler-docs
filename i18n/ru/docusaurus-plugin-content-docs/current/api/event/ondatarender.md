---
sidebar_label: "onDataRender"
title: "onDataRender event"
description: "срабатывает после того, как данные полностью отрисованы на странице"
---

# onDataRender

### Description

@short: Срабатывает после того, как данные полностью отрисованы на странице

@signature: onDataRender: () =\> void

### Example

~~~jsx
scheduler.attachEvent("onDataRender", function(){
    alert("Данные были отрисованы на странице")
});

scheduler.init("scheduler_here");
scheduler.parse(demo_events);
~~~

### Related API
- [onEventLoading](api/event/oneventloading.md)
- [onSchedulerReady](api/event/onschedulerready.md)
