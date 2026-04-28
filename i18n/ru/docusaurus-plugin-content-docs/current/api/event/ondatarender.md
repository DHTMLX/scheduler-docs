---
sidebar_label: onDataRender
title: "onDataRender событие"
description: "Срабатывает после отрисовки данных на странице"
---

# onDataRender

### Description

@short: Срабатывает после отрисовки данных на странице

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