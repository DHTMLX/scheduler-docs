---
sidebar_label: onBeforeParse
title: "onBeforeParse event"
description: "fires before data started to be parsed"
---

# onBeforeParse

### Description

@short: Fires before data started to be parsed

@signature: onBeforeParse: () =\> void

### Example

~~~jsx
scheduler.init("scheduler_here");
scheduler.attachEvent("onBeforeParse", function(){ 
    //any custom logic here
});
scheduler.parse(events);
~~~

### Related API
- [load](api/method/load.md)
- [parse](api/method/parse.md)
- [onParse](api/event/onparse.md)
- [onLoadStart](api/event/onloadstart.md)
- [onLoadEnd](api/event/onloadend.md)

### Related Guides
- [Loading Data](guides/loading-data.md)
