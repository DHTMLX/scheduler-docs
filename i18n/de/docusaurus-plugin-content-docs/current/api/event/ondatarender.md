---
sidebar_label: "onDataRender"
title: "onDataRender event"
description: "Wird ausgelöst, sobald die Daten auf der Seite vollständig gerendert wurden"
---

# onDataRender

### Description

@short: Wird ausgelöst, sobald die Daten auf der Seite vollständig gerendert wurden

@signature: onDataRender: () =\> void

### Example

~~~jsx
scheduler.attachEvent("onDataRender", function(){
    alert("Daten wurden auf der Seite gerendert")
});

scheduler.init("scheduler_here");
scheduler.parse(demo_events);
~~~

### Related API
- [onEventLoading](api/event/oneventloading.md)
- [onSchedulerReady](api/event/onschedulerready.md)
