---
sidebar_label: "onLoadStart"
title: "onLoadStart event"
description: "срабатывает непосредственно перед началом процесса загрузки данных из источника данных"
---

# onLoadStart

### Description

@short: Срабатывает непосредственно перед началом процесса загрузки данных из источника данных

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
- [Загрузка данных](guides/loading-data.md)
- [Интеграция с серверной стороной](guides/server-integration.md)
