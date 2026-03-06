---
sidebar_label: "onBeforeParse"
title: "onBeforeParse event"
description: "срабатывает непосредственно перед началом парсинга данных"
---

# onBeforeParse

### Description

@short: Срабатывает непосредственно перед началом парсинга данных

@signature: onBeforeParse: () =\> void

### Example

~~~jsx
scheduler.init("scheduler_here");
scheduler.attachEvent("onBeforeParse", function(){ 
    //любая пользовательская логика здесь
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
