---
sidebar_label: "onLoadStart"
title: "onLoadStart event"
description: "在从数据源开始加载数据之前触发"
---

# onLoadStart

### Description

@short: 在从数据源开始加载数据之前触发

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
- [데이터 불러오기](guides/loading-data.md)
- [Server-Side Integration](guides/server-integration.md)
