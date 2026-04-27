---
sidebar_label: onLoadStart
title: "onLoadStart событие"
description: "Срабатывает непосредственно перед началом загрузки данных из источника данных"
---

# onLoadStart

### Description

@short: Срабатывает непосредственно перед началом загрузки данных из источника данных

@signature: onLoadStart: () => void

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