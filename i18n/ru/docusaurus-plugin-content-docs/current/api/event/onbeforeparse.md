---
sidebar_label: onBeforeParse
title: "onBeforeParse событие"
description: "Вызывается перед началом парсинга данных"
---

# onBeforeParse

### Description

@short: Срабатывает перед началом парсинга данных

@signature: onBeforeParse: () =\> void

### Example

~~~jsx
scheduler.init("scheduler_here");
scheduler.attachEvent("onBeforeParse", function(){ 
    // любая ваша логика здесь
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
- [Загрузка данных](guides/loading-data.md)