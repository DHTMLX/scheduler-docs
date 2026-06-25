---
sidebar_label: onLoadEnd
title: "Событие onLoadEnd"
description: "срабатывает после того, как загрузка данных из источника данных завершена"
---

# onLoadEnd

### Description

@short: Срабатывает после загрузки данных из источника данных.

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
- [Загрузка данных](guides/loading-data.md)
- [Интеграция на стороне сервера](guides/server-integration.md)