---
sidebar_label: onDataRender
title: "onDataRender event"
description: "fires after data has been rendered on the page"
---

# onDataRender

### Description

@short: Fires after data has been rendered on the page

@signature: onDataRender: () =\> void

### Example

~~~jsx
scheduler.attachEvent("onDataRender", function(){
    alert("Data was rendered on the page")
});

scheduler.init("scheduler_here");
scheduler.parse(demo_events);
~~~

### Related API
- [onEventLoading](api/event/oneventloading.md)
- [onSchedulerReady](api/event/onschedulerready.md)
