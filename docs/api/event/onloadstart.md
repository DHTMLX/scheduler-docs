---
sidebar_label: onLoadStart
title: "onLoadStart event"
description: "fires immediately before loading data from the data source has been started"
---

# onLoadStart

### Description

@short: Fires immediately before loading data from the data source has been started

@signature: onLoadStart: () =\> void

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
- [onLoadEnd](api/event/onloadend.md)
- [onBeforeParse](api/event/onbeforeparse.md)
- [onParse](api/event/onparse.md)

### Related Guides
- [Loading Data](guides/loading-data.md)
- [Server-Side Integration](guides/server-integration.md)
