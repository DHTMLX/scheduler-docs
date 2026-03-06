---
sidebar_label: "onDataRender"
title: "onDataRender event"
description: "데이터가 페이지에 렌더링을 완료했을 때 한 번 트리거됩니다"
---

# onDataRender

### Description

@short: 데이터가 페이지에 렌더링을 완료했을 때 한 번 트리거됩니다

@signature: onDataRender: () =\> void

### Example

~~~jsx
scheduler.attachEvent("onDataRender", function(){
    alert("데이터가 페이지에 렌더링되었습니다")
});

scheduler.init("scheduler_here");
scheduler.parse(demo_events);
~~~

### Related API
- [onEventLoading](api/event/oneventloading.md)
- [onSchedulerReady](api/event/onschedulerready.md)
