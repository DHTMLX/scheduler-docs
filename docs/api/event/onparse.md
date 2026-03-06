---
sidebar_label: onParse
title: "onParse event"
description: "fires after data was parsed (became available for API) but before it was rendered in the Scheduler"
---

# onParse

### Description

@short: Fires after data was parsed (became available for API) but before it was rendered in the Scheduler

@signature: onParse: () =\> void

### Example

~~~jsx
scheduler.init("scheduler_here");
scheduler.attachEvent("onParse", function(){alert("Data was parsed")});
scheduler.parse(events);
~~~

### Related API
- [load](api/method/load.md)
- [parse](api/method/parse.md)
- [onBeforeParse](api/event/onbeforeparse.md)
- [onLoadStart](api/event/onloadstart.md)
- [onLoadEnd](api/event/onloadend.md)

### Related Guides
- [Loading Data](guides/loading-data.md)
