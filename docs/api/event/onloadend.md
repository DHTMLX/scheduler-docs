---
sidebar_label: onLoadEnd
title: "onLoadEnd event"
description: "fires after loading data from the data source has been completed"
---

# onLoadEnd

### Description

@short: Fires after loading data from the data source has been completed

@signature: onLoadEnd: () =\> void

### Example

~~~jsx
scheduler.attachEvent("onLoadStart", function(){
    scheduler.config.readonly = true;
});

scheduler.attachEvent("onLoadEnd", function(){
    scheduler.config.readonly = false;
});
~~~

### Related API
- [load](api/method/load.md)
- [onLoadStart](api/event/onloadstart.md)
- [onBeforeParse](api/event/onbeforeparse.md)
- [onParse](api/event/onparse.md)

### Related Guides
- [Loading Data](guides/loading-data.md)
- [Server-Side Integration](guides/server-integration.md)
