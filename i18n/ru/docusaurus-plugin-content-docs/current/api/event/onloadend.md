---
sidebar_label: "onLoadEnd"
title: "onLoadEnd event"
description: "срабатывает один раз после завершения загрузки данных из источника данных"
---

# onLoadEnd

### Description

@short: Срабатывает один раз после завершения загрузки данных из источника данных

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
- [Загрузка данных](guides/loading-data.md)
- [Интеграция с серверной стороной](guides/server-integration.md)
