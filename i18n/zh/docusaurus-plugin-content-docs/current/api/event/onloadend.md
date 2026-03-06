---
sidebar_label: "onLoadEnd"
title: "onLoadEnd event"
description: "当数据源的数据加载完成时触发"
---

# onLoadEnd

### Description

@short: 当数据源的数据加载完成时触发

@signature: onLoadEnd: () =\> void

### Example

~~~jsx
```javascript
scheduler.attachEvent("onLoadStart", function(){
    scheduler.config.readonly = true;
});

scheduler.attachEvent("onLoadEnd", function(){
    scheduler.config.readonly = false;
});
```
~~~

### Related API
- [load](api/method/load.md)
- [onLoadStart](api/event/onloadstart.md)
- [onBeforeParse](api/event/onbeforeparse.md)
- [onParse](api/event/onparse.md)

### Related Guides
- [데이터 불러오기](guides/loading-data.md)
- [Server-Side Integration](guides/server-integration.md)
